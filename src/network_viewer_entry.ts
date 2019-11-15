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
/*import 'tippy.js/dist/tippy.css';*/


import $ from 'jquery';
import 'jquery-ui';
import 'jquery-ui/ui/widgets/autocomplete';
import { ParentLegend } from './legends/parent_legend';
import {NetworkViewerStates} from "./network_viewer_states";
import {Interaction} from "./interaction/interaction";
import {Node} from "./constants/node";
import {Utility} from "./layouts/utility";
import {Listener} from "./interaction/listener";
import { Global } from "./global";

var graphml = require('cytoscape-graphml');
graphml(cytoscape, $);
cytoscape.use(fcose);
cytoscape.use(cise);
cytoscape.use(cyforcelayout);
cytoscape.use(avsdf);
cytoscape.use(cola);

var globalCy: any;



export class InitializeGraph {
  // field
  private graphContainerDivId: string;
  private legendDivId: string;
  private cy: any;
  private data!: JSON;
  private interaction!: Interaction;
  private legend!: ParentLegend;
  private nodeLabels!: Array<string>;
  private nodeMap!: Map<string,any>;
  private spinner: Spinner;
  private spinTarget: any;
  private suggestionBoxId:string;
  private style: Style;
  private edgesSize!: number;
  private timeout!: number;
  private isExpand!: boolean;
  private isMutationDisrupted!: boolean;
  private layoutName!: string;
  private utility:Utility;

  // constructor
  constructor(graphContainerDivId: string, legendDivId: string, suggestionBoxId:string) {
    this.graphContainerDivId = graphContainerDivId;
    this.legendDivId = legendDivId;
    this.spinner = new Spinner(Constants.SPINNER_OPTIONS);
    this.spinTarget = document.getElementById(this.graphContainerDivId) as HTMLDivElement;
    this.style = new Style();
    this.suggestionBoxId = suggestionBoxId;
    this.utility=new Utility();
    new Listener();

  }

  public expandEdges(isExpand: boolean, isMutationDisrupted: boolean): void {
    this.interaction.resetAppliedClasses();// this is needed to undo any selection
    this.updateGraphState(isExpand,isMutationDisrupted,null);
    this.changeEdgeState();
    this.updateLegends();
  }


  private changeEdgeState(): void {

    if (this.isExpand) {
      this.cy.edges().addClass('expand');
      this.cy.$(':loop').addClass('expand');
    } else {
      this.cy.edges().removeClass('expand');
      this.cy.$(':loop').removeClass('expand');
    }

    if (this.isMutationDisrupted) {
      this.cy.edges().addClass('disrupted');
      this.cy.nodes().addClass('mutation');
    } else {
      this.cy.edges().removeClass('disrupted');
      this.cy.nodes().removeClass('mutation');
    }
  }

  public export(exportTo: string): void {
    const exportObj: Export = new Export(this.cy);
    exportObj.exportAsGraphml();
  }

  public reset(): void {
    this.initializeWithData(this.data,this.isExpand,this.isMutationDisrupted,this.layoutName);
  }

  public search(interactorName:string): void {
    this.interaction.resetAppliedClasses();// this is needed to undo any selection
    let searchedNode=this.nodeMap.get(interactorName);
    if(searchedNode!=null) {
      this.utility.setHighlightAndFocusMaxZoomLevel();
      this.cy.animate({
        fit: {
          eles: searchedNode,
          padding: 20,
        }
      }, {
        duration: 1000
      });
      searchedNode.addClass('highlight');
      this.utility.setUserMaxZoomLevel();
    }
  }

  private updateLegends(): void {
    if (this.isMutationDisrupted){
      this.legend = new ParentLegend(this.cy);
      this.legend.createLegend(this.legendDivId,NetworkViewerStates.MUTATION_EFFECTED);
    } else if (this.isExpand){
      this.legend = new ParentLegend(this.cy);
      this.legend.createLegend(this.legendDivId,NetworkViewerStates.EXPANDED);
    } else {
      this.legend = new ParentLegend(this.cy);
      this.legend.createLegend(this.legendDivId,NetworkViewerStates.COLLAPSED);
    }
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
    this.updateGraphState(null,null,layoutName);
    this.utility.setInitialMaxZoomLevel();
    this.utility.setInitialMinZoomLevel();
    this.startLoadingImage();
    setTimeout(() => {
    switch (layoutName) {
      case 'ngraph': {
          const ngraphLayout: NgraphLayout = new NgraphLayout(this.cy);
          ngraphLayout.execute();
        break;
      }
      case 'cise': {
          const ciseLayout: CiseLayout = new CiseLayout(this.cy);
          ciseLayout.execute();
        break;
      }
      case 'avsdf': {
          const avsdfLayout: AvsdfLayout = new AvsdfLayout(this.cy);
          avsdfLayout.execute();
        break;
      }
      case 'cola': {
          const colaLayout: ColaLayout = new ColaLayout(this.cy);
          colaLayout.execute();
        break;
      }
      default: {
          const fcoseLayout: FcoseLayout = new FcoseLayout(this.cy);
          fcoseLayout.execute();
        break;
      }
    }
      this.cy.on('layoutstop', (e)=> {
        this.utility.setUserMaxZoomLevel();
        this.utility.setUserMinZoomLevel();
     });
      this.stopLoadingImage();
    }, this.timeout);

  }

  // function
  private disp(): void {
    // console.log('Engine is  :   ' + this.graphContainerDivId);
  }

  // function
  public initializeWithData(data, isExpand: boolean, isMutationDisrupted: boolean,layoutName: string): void {
    this.startLoadingImage();
    this.data = data;
    this.updateGraphState(isExpand,isMutationDisrupted,layoutName);
    this.executeGraphCalculations();
    setTimeout(() => {
      this.cy = cytoscape({
        container: $('#' + this.graphContainerDivId), // container to render in
        elements: this.data,

        'maxZoom':Constants.INITIAL_MAX_ZOOM,
        'minZoom':Constants.INITIAL_MIN_ZOOM,
        style: this.style.applicationCSS,
         boxSelectionEnabled: false,
        layout:this.getLayoutOption(),
      });
      Global.graphcy=this.cy;
      this.cy.on('layoutstop', (e)=> {
        this.fit();
      });
      this.changeEdgeState();
      this.updateLegends();
      this.interaction = new Interaction(this.cy);
      this.loadAutoSuggestion();
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

  private updateGraphState(isExpand: any, isMutationDisrupted: any,layoutName: any){
    if(isExpand!=null){
      this.isExpand = isExpand;
    }
    if(isMutationDisrupted!=null){
      this.isMutationDisrupted = isMutationDisrupted;
    }
    if(layoutName!=null){
      this.layoutName = layoutName;
    }
  }

  private fit(): void{
    this.utility.setInitialMaxZoomLevel();
    this.utility.setInitialMinZoomLevel();
    this.cy.fit();
    this.utility.setUserMaxZoomLevel();
    this.utility.setUserMinZoomLevel();
  }

  private fitWithCurrentZoom(): void{
    this.cy.maxZoom(this.cy.zoom());
    this.utility.setInitialMinZoomLevel();
    this.cy.fit();
    this.utility.setUserMaxZoomLevel();
    this.utility.setUserMinZoomLevel();
  }

  private loadAutoSuggestion():void {
    this.nodeLabels = new Array<string>();
    this.nodeMap = new Map();

    this.cy.nodes().forEach((node)=> {
      if(node.data('label')!=null) {
        let nodeName=node.data('label');
        this.nodeLabels.push(nodeName);
        this.nodeMap.set(nodeName, node);
      }

    });

    $('#'+this.suggestionBoxId).autocomplete({
      source: this.nodeLabels,
      select: function (event, ui) {
        $(this).val(ui.item ? ui.item : " ");},

      change: function (event, ui) {
        if (!ui.item) {
          this.value = '';}
        else{
          // return your label here
        }
      }
    });


}
}
