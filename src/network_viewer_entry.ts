import avsdf from 'cytoscape-avsdf';
import cise from 'cytoscape-cise';
import cola from 'cytoscape-cola';
import cyforcelayout from 'cytoscape-ngraph.forcelayout';
import cytoscape from 'cytoscape';
import fcose from 'cytoscape-fcose';

import { AvsdfLayout } from './layouts/avsdf_layout';
import { CiseLayout } from './layouts/cise_layout';
import { ColaLayout } from './layouts/cola_layout';
import { Constants } from './layouts/constants';
import { Export } from './export';
import { FcoseLayout } from './layouts/fcose_layout';
import { NgraphLayout } from './layouts/ngraph_layout';
import { Spinner } from 'spin.js';
import { Style } from './styles/style';
import 'spin.js/spin.css';

import $ from 'jquery';
import { ParentLegend } from './legends/parent_legend';
import {NetworkViewerStates} from "./network_viewer_states";

var graphml = require('cytoscape-graphml');
graphml(cytoscape, $);
cytoscape.use(fcose);
cytoscape.use(cise);
cytoscape.use(cyforcelayout);
cytoscape.use(avsdf);
cytoscape.use(cola);

export class InitializeGraph {
  // field
  private graphContainerDivId: string;
  private legendDivId: string;
  private cy: any;
  private data: JSON;
  private legend!: ParentLegend;
  private spinner: Spinner;
  private spinTarget: any;
  private style: Style;
  private edgesSize!: number;
  private timeout!: number;
  private isExpand: boolean;
  private isMutationDisrupted: boolean;
  private layoutName: string;

  // constructor
  constructor(graphContainerDivId: string, legendDivId: string, data, isExpand: boolean, isMutationDisrupted: boolean,layoutName: string) {
    this.graphContainerDivId = graphContainerDivId;
    this.legendDivId = legendDivId;
    this.data = data;
    this.spinner = new Spinner(Constants.SPINNER_OPTIONS);
    this.spinTarget = document.getElementById(this.graphContainerDivId) as HTMLDivElement;
    this.style = new Style();
    this.isExpand = isExpand;
    this.isMutationDisrupted = isMutationDisrupted;
    this.layoutName = layoutName;
    this.initializeCytoscape();
  }

  public expandEdges(isExpand: boolean, isMutationDisrupted: boolean): void {
    if (isExpand) {
      this.cy.edges().addClass('expand');
      this.cy.$(':loop').addClass('expand');
    } else {
      this.cy.edges().removeClass('expand');
      this.cy.$(':loop').removeClass('expand');
    }

    if (isMutationDisrupted) {
      this.cy.edges().addClass('disrupted');
      this.cy.nodes().addClass('mutation');
    } else {
      this.cy.edges().removeClass('disrupted');
      this.cy.nodes().removeClass('mutation');
    }

    this.updateLegendsWithGraphState(isExpand,isMutationDisrupted);
  }

  public export(exportTo: string): void {
    const exportObj: Export = new Export(this.cy);
    exportObj.exportAsGraphml();
  }

  private updateLegendsWithGraphState(isExpand: boolean, isMutationDisrupted: boolean): void {
    if (isMutationDisrupted){
      this.legend = new ParentLegend(this.cy);
      this.legend.createLegend(this.legendDivId,NetworkViewerStates.MUTATION_EFFECTED);
    } else if (isExpand){
      this.legend = new ParentLegend(this.cy);
      this.legend.createLegend(this.legendDivId,NetworkViewerStates.EXPANDED);
    } else {
      this.legend = new ParentLegend(this.cy);
      this.legend.createLegend(this.legendDivId,NetworkViewerStates.COLLAPSED);
    }
  }

  private loadInteractiveMethods(): void {
    this.loadEdgeOnclickMethod();
    this.loadOnSelectBoxMethod();
    this.loadUnSelectNodeMethod();
    this.loadOnNodeTapMethod();
    this.loadOnTapUnselectMethod();
  }

  private loadEdgeOnclickMethod(): void {
    this.cy.edges().on('click', function(e) {
      var clickedNode = e.target.data('interaction_ac');
      alert('ac is' + clickedNode);
      /*e.target.parallelEdges().forEach( function(ele, i, eles){
        alert (ele.data('interaction_type'));
      } );*/
    });
  }

  private loadOnSelectBoxMethod(): void {
    this.cy.nodes().on('boxselect', function(e) {
      var boxNode = e.target;
      boxNode.addClass('highlight');
    });
  }

  private loadUnSelectNodeMethod(): void {
    this.cy.nodes().on('unselect', function(e) {
      var boxNode = e.target;
      boxNode.removeClass('highlight');
    });
  }

  private loadOnNodeTapMethod(): void {
    var localCy = this.cy; // need to do this as you cannot have this inside function
    this.cy.nodes().on('tap', function(e) {
      var tappedNode = e.target;
      var directlyConnectedEdges = tappedNode.closedNeighbourhood();
      tappedNode.addClass('highlight');
      directlyConnectedEdges.addClass('neighbour-highlight');
      directlyConnectedEdges.nodes().addClass('neighbour-highlight');
      localCy.fit(directlyConnectedEdges);
    });
  }

  private loadOnTapUnselectMethod(): void {
    var localCy = this.cy; // need to do this as you cannot have this inside function
    this.cy.nodes().on('tapunselect', function(e) {
      var tappedNode = e.target;
      var directlyConnectedEdges = tappedNode.closedNeighbourhood();
      tappedNode.removeClass('highlight');
      directlyConnectedEdges.removeClass('neighbour-highlight');
      directlyConnectedEdges.nodes().removeClass('neighbour-highlight');
      localCy.fit();
    });
  }

  private executeGraphCalculations(): void {
    var edges = JSON.parse(JSON.stringify(this.data)).filter(function(entry) {
      return entry.group === 'edges';
    });
    this.edgesSize = edges.length;
    if (this.edgesSize > 300) {
      this.timeout = 1000;
    } else {
      this.timeout = 1;
    }
  }

  public applyLayout(layoutName: string): void {
    switch (layoutName) {
      case 'ngraph': {
        this.startLoadingImage();
        setTimeout(() => {
          const ngraphLayout: NgraphLayout = new NgraphLayout(this.cy);
          ngraphLayout.execute();
          this.stopLoadingImage();
        }, this.timeout);
        break;
      }
      case 'cise': {
        this.startLoadingImage();
        setTimeout(() => {
          const ciseLayout: CiseLayout = new CiseLayout(this.cy);
          ciseLayout.execute();
          this.stopLoadingImage();
        }, this.timeout);
        break;
      }
      case 'avsdf': {
        this.startLoadingImage();
        setTimeout(() => {
          const avsdfLayout: AvsdfLayout = new AvsdfLayout(this.cy);
          avsdfLayout.execute();
          this.stopLoadingImage();
        }, this.timeout);
        break;
      }
      case 'cola': {
        this.startLoadingImage();
        setTimeout(() => {
          const colaLayout: ColaLayout = new ColaLayout(this.cy);
          colaLayout.execute();
          this.stopLoadingImage();
        }, this.timeout);
        break;
      }
      default: {
        this.startLoadingImage();
        setTimeout(() => {
          const fcoseLayout: FcoseLayout = new FcoseLayout(this.cy);
          fcoseLayout.execute();
          this.stopLoadingImage();
        }, this.timeout);
        break;
      }
    }
  }

  // function
  private disp(): void {
    // console.log('Engine is  :   ' + this.graphContainerDivId);
  }

  // function
  private initializeCytoscape(): void {
    this.startLoadingImage();
    this.executeGraphCalculations();
    setTimeout(() => {
      this.cy = cytoscape({
        container: $('#' + this.graphContainerDivId), // container to render in
        elements: this.data,

        style: this.style.applicationCSS,
        // boxSelectionEnabled: false,
        layout:this.getLayoutOption(),
      });
      this.loadInteractiveMethods();
      this.expandEdges(this.isExpand, this.isMutationDisrupted);
      this.stopLoadingImage();
    }, this.timeout);
  }

  private getLayoutOption(): any{

    let layoutOption : any;

    switch (this.layoutName) {
     case 'cise': {
        layoutOption= Constants.CISE_LAYOUT_OPTIONS;
        break;
      }
      case 'avsdf': {
        layoutOption= Constants.AVSDF_LAYOUT_OPTIONS;
        break;
      }
     default: {
        layoutOption= Constants.FCOSE_LAYOUT_OPTIONS;
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
}
