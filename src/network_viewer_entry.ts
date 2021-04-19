import cytoscape from 'cytoscape';
import avsdf from 'cytoscape-avsdf';
import cola from 'cytoscape-cola';
import fcose from 'cytoscape-fcose';
import cyforcelayout from 'cytoscape-ngraph.forcelayout';

import $ from 'jquery';
import 'jquery-ui';
import 'jquery-ui/ui/widgets/autocomplete';
import { Spinner } from 'spin.js';
import 'spin.js/spin.css';

import { Export } from './export';
import { Global } from './global';
import { Interaction } from './interaction/interaction';
import { Listener } from './interaction/listener';
import { AvsdfLayout } from './layouts/avsdf_layout';
import { ColaLayout } from './layouts/cola_layout';
import { Constants } from './layouts/constants';
import { FcoseLayout } from './layouts/fcose_layout';
import { NgraphLayout } from './layouts/ngraph_layout';
import { Utility } from './layouts/utility';
import { NetworkLegend } from './legend/network-legend';
import { Style } from './styles/style';

declare const require: any;
const graphml = require('cytoscape-graphml');
graphml(cytoscape, $);
cytoscape.use(fcose);
cytoscape.use(cyforcelayout);
cytoscape.use(avsdf);
cytoscape.use(cola);

export class GraphPort {
  // field
  private graphContainerDivId: string;
  private json!: any;
  private export: Export;
  private interaction!: Interaction;
  private nodeLabels!: string[];
  private nodeMap!: Map<string, any>;
  private spinner: Spinner;
  private spinTarget: any;
  private suggestionBoxId: string;
  private style!: Style;
  private edgesSize!: number;
  private timeout!: number;
  private isExpand!: boolean;
  private isAffectingMutation!: boolean;
  private layoutName!: string;
  private utility: Utility;

  // constructor
  constructor(graphContainerDivId: string, suggestionBoxId: string) {
    this.graphContainerDivId = graphContainerDivId;
    this.export = new Export();
    //TODO Replace by something similar to Material Design spinner like https://github.com/ZulNs/LoadingSpinner.js
    this.spinner = new Spinner(Constants.SPINNER_OPTIONS);
    this.spinTarget = document.getElementById(this.graphContainerDivId) as HTMLDivElement;
    this.suggestionBoxId = suggestionBoxId;
    this.utility = new Utility();
    new Listener();
  }

  // function
  public initializeWithData(json, isExpand: boolean, isAffectingMutation: boolean, layoutName: string): void {
    this.startLoadingImage();
    this.json = json;
    this.style = new Style(json.legend || new NetworkLegend());
    this.updateGraphState(isExpand, isAffectingMutation, layoutName);
    this.executeGraphCalculations();
    setTimeout(() => {
      Global.graphcy = cytoscape({
        container: $('#' + this.graphContainerDivId), // container to render in
        elements: this.data,
        wheelSensitivity: 0.2,
        maxZoom: Constants.INITIAL_MAX_ZOOM,
        minZoom: Constants.INITIAL_MIN_ZOOM,
        style: this.style.applicationCSS,
        boxSelectionEnabled: false,
        layout: this.getLayoutOption(),
      });
      Global.graphcy.userZoomingEnabled(false);
      Global.graphcy.container().addEventListener('click', () => Global.graphcy.userZoomingEnabled(true));
      this.utility.fit();
      this.changeEdgeState();
      this.interaction = new Interaction();
      this.loadAutoSuggestion();
      this.stopLoadingImage();
    }, this.timeout);
  }

  public expandEdges(isExpand: boolean, isAffectingMutation: boolean): void {
    if (this.interaction) {
      this.interaction.resetAppliedClasses(); // this is needed to undo any selection
      this.updateGraphState(isExpand, isAffectingMutation, null);
      this.changeEdgeState();
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
    this.updateGraphState(null, null, layoutName);
    this.utility.setInitialMaxZoomLevel();
    this.utility.setInitialMinZoomLevel();
    this.startLoadingImage();
    setTimeout(() => {
      switch (layoutName) {
        case 'ngraph': {
          const ngraphLayout: NgraphLayout = new NgraphLayout();
          ngraphLayout.execute();
          break;
        }
        case 'avsdf': {
          const avsdfLayout: AvsdfLayout = new AvsdfLayout();
          avsdfLayout.execute();
          break;
        }
        case 'cola': {
          const colaLayout: ColaLayout = new ColaLayout();
          colaLayout.execute();
          break;
        }
        default: {
          const fcoseLayout: FcoseLayout = new FcoseLayout();
          fcoseLayout.execute();
          break;
        }
      }
      this.utility.setUserMaxZoomLevel();
      this.utility.setUserMinZoomLevel();
      this.stopLoadingImage();
    }, this.timeout);
  }

  private changeEdgeState(): void {
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

  private getLayoutOption(): any {
    let layoutOption: any;

    switch (this.layoutName) {
      case 'avsdf': {
        layoutOption = Constants.AVSDF_LAYOUT_OPTIONS;
        break;
      }
      default: {
        layoutOption = Constants.FCOSE_LAYOUT_OPTIONS;
        break;
      }
    }

    return layoutOption;
  }

  private startLoadingImage(): void {
    this.spinner.spin(this.spinTarget);
  }

  private stopLoadingImage(): void {
    this.spinner.stop();
  }

  private updateGraphState(isExpand: any, isAffectingMutation: any, layoutName: any) {
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

  private get data(): JSON {
    return this.json.data || this.json;
  }
}
