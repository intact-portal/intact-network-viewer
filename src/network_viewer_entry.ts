import * as cytoscape from 'cytoscape';
import { ElementDefinition, LayoutOptions } from 'cytoscape';
import avsdf from 'cytoscape-avsdf';
import cise from 'cytoscape-cise';
import fcose from 'cytoscape-fcose';
import layoutUtilities from 'cytoscape-layout-utilities';

import 'jquery-ui';
import 'jquery-ui/ui/widgets/autocomplete';
import { Spinner } from 'spin.js';
import 'spin.js/spin.css';

import { Export } from './export';
import { Global } from './global';
import { Interaction } from './interaction/interaction';
import { Listener } from './interaction/listener';
import { CiseLayout } from './layouts/cise_layout';
import { Constants } from './layouts/constants';
import { Utility } from './layouts/utility';
import { NetworkLegend } from './legend/network-legend';
import { Style } from './styles/style';

const graphml = require('cytoscape-graphml');
graphml(cytoscape, $);
cytoscape.use(fcose);
cytoscape.use(avsdf);
cytoscape.use(cise);
cytoscape.use(layoutUtilities);

export class GraphPort {
  // field
  private graphContainerDivId: string;
  private json!: any;
  private export: Export;
  private interaction!: Interaction;
  private nodeLabels!: string[];
  private nodeMap!: Map<string, any>;
  private spinner: Spinner;
  private spinTarget: HTMLDivElement;
  private suggestionBoxId: string;
  private style!: Style;
  private edgesSize!: number;
  private timeout!: number;
  private isExpand!: boolean;
  private isAffectingMutation!: boolean;
  private layoutName!: string;
  private utility: Utility;

  private ciseOptions = Constants.CISE_LAYOUT_OPTIONS;
  private calculateCiseClusters = true;

  // constructor
  constructor(graphContainerDivId: string, suggestionBoxId: string) {
    this.graphContainerDivId = graphContainerDivId;
    this.export = new Export();
    // TODO Replace by something similar to Material Design spinner like https://github.com/ZulNs/LoadingSpinner.js
    this.spinner = new Spinner(Constants.SPINNER_OPTIONS);
    this.spinTarget = document.getElementById(this.graphContainerDivId) as HTMLDivElement;
    this.suggestionBoxId = suggestionBoxId;
    this.utility = new Utility();
    new Listener();
  }

  // function
  public initializeWithData(json, isExpand: boolean, isAffectingMutation: boolean, layoutName: string): void {
    this.startLoadingImage();
    console.time('graph-time');
    this.json = json;
    this.style = new Style(json.legend || new NetworkLegend());
    this.updateGraphState(isExpand, isAffectingMutation, layoutName);
    if (this.calculateCiseClusters) {
      this.ciseOptions.clusters = CiseLayout.getClustersFromData(this.data);
    }
    this.executeGraphCalculations();
    let self = this;
    setTimeout(() => {
      Global.graphcy = cytoscape({
        container: $('#' + this.graphContainerDivId).get()[0], // container to render in
        elements: this.data,
        wheelSensitivity: 0.2,
        maxZoom: Constants.INITIAL_MAX_ZOOM,
        minZoom: Constants.INITIAL_MIN_ZOOM,
        style: this.style.applicationCSS,
        boxSelectionEnabled: false,
        ready: function() {
          this.layout(self.getLayoutOption()).run();
          if (self.getLayoutOption().name === 'fcose')
          self.packComponents(this);
        },
      });
      Global.graphcy.userZoomingEnabled(false);
      Global.graphcy.container().addEventListener('click', () => Global.graphcy.userZoomingEnabled(true));
      this.utility.fit();
      this.changeEdgeState();
      this.interaction = new Interaction(this.graphContainerDivId);
      this.loadAutoSuggestion();
      this.stopLoadingImage();
      console.timeEnd('graph-time');
    }, this.timeout);
  }

  public packComponents(cy: cytoscape.Core) {
    let rect = this.spinTarget.getBoundingClientRect();
    let options: LayoutUtil.Options = {
      desiredAspectRatio: Math.round((rect.width / rect.height + Number.EPSILON) * 100) / 100,
      utilityFunction: 2,
      componentSpacing: 80,
      polyominoGridSizeFactor: 5,
    };
    const api = cy.layoutUtilities(options);

    const components = cy.elements(':visible').components();
    const subgraphs: LayoutUtil.Component[] = components.map((component) => ({
      edges: component.edges().map((edge) => ({
        startX: edge.sourceEndpoint().x,
        startY: edge.sourceEndpoint().y,
        endX: edge.targetEndpoint().x,
        endY: edge.targetEndpoint().y,
      })),
      nodes: component.nodes().map((node) => {
        const bb = node.boundingBox({});
        return { x: bb.x1, y: bb.y1, width: bb.w, height: bb.h };
      }),
    }));

    const result = api.packComponents(subgraphs, true);
    components.forEach(function(component, index) {
      component.nodes().layout({
        name: 'preset',
        transform: (node) => ({
          x: node.position('x') + result.shifts[index].dx,
          y: node.position('y') + result.shifts[index].dy,
        }),
      }).run();
    });

  }

  public expandEdges(isExpand: boolean, isAffectingMutation: boolean): void {
    if (this.interaction) {
      this.startLoadingImage();
      this.interaction.resetAppliedClasses(); // this is needed to undo any selection
      this.updateGraphState(isExpand, isAffectingMutation, null);
      this.changeEdgeState();
      this.stopLoadingImage();
    }
  }

  public exportAs(filetype: string): void {
    switch (filetype) {
      case 'graphml': {
        this.export.exportAsGraphml();
        break;
      }
      case 'png': {
        this.export.exportAsPng();
        break;
      }
      case 'svg': {
        this.export.exportAsSvg();
        break;
      }
      default: {
        break;
      }
    }
  }

  public reset(): void {
    this.initializeWithData(this.json, this.isExpand, this.isAffectingMutation, this.layoutName);
  }

  public search(interactorName: string): void {
    this.interaction.resetAppliedClasses(); // this is needed to undo any selection
    const searchedNode = this.nodeMap.get(interactorName);
    if (searchedNode != null) {
      this.utility.setHighlightAndFocusMaxZoomLevel();
      Global.graphcy.animate(
        {
          fit: {
            eles: searchedNode,
            padding: 20,
          },
        },
        {
          duration: 1000,
        },
      );
      searchedNode.addClass('highlight');
      this.utility.setUserMaxZoomLevel();
    }
  }

  public applyLayout(layoutName: string): void {
    this.startLoadingImage();
    // let previousLayout = this.layoutName;
    // this.updateGraphState(null, null, layoutName);
    // this.utility.setInitialMaxZoomLevel();
    // this.utility.setInitialMinZoomLevel();
    // setTimeout(() => {
    //   switch (layoutName) {
    //     case 'cise': {
    //       if (previousLayout === 'avsdf') {
    this.calculateCiseClusters = false;
    this.initializeWithData(this.json, this.isExpand, this.isAffectingMutation, layoutName);
    this.calculateCiseClusters = true;
    //       } else {
    //         Global.graphcy.layout(this.ciseOptions).run();
    //       }
    //       break;
    //     }
    //     case 'avsdf': {
    //       Global.graphcy.layout(Constants.AVSDF_OPTIONS).run();
    //       break;
    //     }
    //     default: {
    //       const fcoseLayout: FcoseLayout = new FcoseLayout();
    //       fcoseLayout.execute();
    //       break;
    //     }
    //   }
    //   this.utility.fit();
    //   this.stopLoadingImage();
    // }, 0);
  }

  private changeEdgeState(): void {
    this.startLoadingImage();
    if (this.isExpand) {
      Global.graphcy.edges().addClass('expand');
      Global.graphcy.$(':loop').addClass('expand');
    } else {
      Global.graphcy.edges().removeClass('expand');
      Global.graphcy.$(':loop').removeClass('expand');
    }

    if (this.isAffectingMutation) {
      Global.graphcy.edges().addClass('affected');
      Global.graphcy.nodes().addClass('mutation');
    } else {
      Global.graphcy.edges().removeClass('affected');
      Global.graphcy.nodes().removeClass('mutation');
    }
    this.stopLoadingImage();
  }

  private executeGraphCalculations(): void {
    const edges = JSON.parse(JSON.stringify(this.data)).filter(entry => {
      return entry.group === 'edges';
    });
    this.edgesSize = edges.length;
    if (this.edgesSize > 300) {
      this.timeout = 1000;
    } else {
      this.timeout = 1;
    }
  }

  // function
  private disp(): void {
    // console.log('Engine is  :   ' + this.graphContainerDivId);
  }

  private getLayoutOption(): LayoutOptions {
    let layoutOption: any;
    switch (this.layoutName) {
      case 'cise': {
        layoutOption = this.ciseOptions;
        break;
      }
      case 'avsdf': {
        layoutOption = Constants.AVSDF_OPTIONS;
        break;
      }
      default: {
        layoutOption = Constants.FCOSE_LAYOUT_OPTIONS;
        break;
      }
    }
    return layoutOption;
  }

  startLoadingImage(): void {
    if (!this.spinTarget) {
      this.spinTarget = document.getElementById(this.graphContainerDivId) as HTMLDivElement;
    }
    this.spinner.spin(this.spinTarget);
  }

  stopLoadingImage(): void {
    this.spinner.stop();
  }

  private updateGraphState(isExpand: boolean, isAffectingMutation: boolean, layoutName: string) {
    if (isExpand != null) {
      this.isExpand = isExpand;
    }
    if (isAffectingMutation != null) {
      this.isAffectingMutation = isAffectingMutation;
    }
    if (layoutName != null) {
      this.layoutName = layoutName;
    }
  }

  private fitWithCurrentZoom(): void {
    Global.graphcy.maxZoom(Global.graphcy.zoom());
    this.utility.setInitialMinZoomLevel();
    Global.graphcy.fit();
    this.utility.setUserMaxZoomLevel();
    this.utility.setUserMinZoomLevel();
  }

  private loadAutoSuggestion(): void {
    this.nodeLabels = new Array<string>();
    this.nodeMap = new Map();

    Global.graphcy.nodes().forEach(node => {
      const nodeName = node.data('label');
      if (nodeName != null) {
        this.nodeLabels.push(nodeName);
        this.nodeMap.set(nodeName, node);
      }
    });

    // @ts-ignore
    $('#' + this.suggestionBoxId).autocomplete({
      source: this.nodeLabels,
      select: function(event, ui) {
        $(this).val(ui.item ? ui.item : ' ');
      },

      change: function(event, ui) {
        if (!ui.item) {
          this.value = '';
        } else {
          // return your label here
        }
      },
    });
  }

  private get data(): ElementDefinition[] {
    return this.json.data || this.json;
  }
}
