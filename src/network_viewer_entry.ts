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
import { FcoseLayout } from './layouts/fcose_layout';
import { NgraphLayout } from './layouts/ngraph_layout';
import { Spinner } from 'spin.js';

import 'spin.js/spin.css';

import $ from 'jquery';

cytoscape.use(fcose);
cytoscape.use(cise);
cytoscape.use(cyforcelayout);
cytoscape.use(avsdf);
cytoscape.use(cola);

export class InitializeGraph {
  // field
  private graphContainerDivId: string;
  private cy: any;
  private data: JSON;
  private spinner: Spinner;
  private spinTarget: any;
  private edgesSize!: number;
  private timeout!: number;

  // constructor
  constructor(graphContainerDivId: string, data) {
    this.graphContainerDivId = graphContainerDivId;
    this.data = data;
    this.spinner = new Spinner(Constants.SPINNER_OPTIONS);
    this.spinTarget = document.getElementById(this.graphContainerDivId) as HTMLDivElement;
    this.initializeCytoscape();
  }

  public expandEdges(isExpand: boolean): void {
      var controlPointSize;
      var curveStyle;
      if (isExpand) {
          curveStyle='bezier';
          controlPointSize = 40;

      } else {
          curveStyle = 'haystack';
          controlPointSize = 0;

      }

      this.cy.style()
          .selector('edge')
          .style({
              'curve-style':curveStyle,
              'control-point-step-size': controlPointSize
          }).update() // indicate the end of your new stylesheet so that it can be updated on elements
      ;


  }

  private loadInteractiveMethods(): void {
    this.loadEdgeOnclickMethod();
    this.loadOnSelectBoxMethod();
    this.loadUnSelectNodeMethod();
    this.loadOnNodeTapMethod();
    this.loadOnTapUnselectMethod();
  }

  private loadEdgeOnclickMethod():void{
    this.cy.edges().on('click', function(e){
      var clickedNode = e.target.data('interaction_type');
      e.target.parallelEdges().forEach( function(ele, i, eles){
        alert (ele.data('interaction_type'));
      } );

    });
  }

  private loadOnSelectBoxMethod():void{
    this.cy.nodes().on('boxselect', function(e){
      var boxNode = e.target;
      boxNode.addClass('highlight');

    });
  }

  private loadUnSelectNodeMethod():void{
    this.cy.nodes().on('unselect', function(e){
      var boxNode = e.target;
      boxNode.removeClass('highlight');

    });
  }

  private loadOnNodeTapMethod():void{
    var localCy=this.cy;// need to do this as you cannot have this inside function
    this.cy.nodes().on('tap', function(e){
      var tappedNode = e.target;
      var directlyConnectedEdges = tappedNode.closedNeighbourhood();
      tappedNode.addClass('highlight');
      directlyConnectedEdges.addClass('neighbour-highlight');
      directlyConnectedEdges.nodes().addClass('neighbour-highlight');
      localCy.fit(directlyConnectedEdges);
    });
  }

  private loadOnTapUnselectMethod():void{
    var localCy=this.cy;// need to do this as you cannot have this inside function
    this.cy.nodes().on('tapunselect', function(e){
      var tappedNode = e.target;
      var directlyConnectedEdges = tappedNode.closedNeighbourhood();
      tappedNode.removeClass('highlight');
      directlyConnectedEdges.removeClass('neighbour-highlight');
      directlyConnectedEdges.nodes().removeClass('neighbour-highlight');
      localCy.fit(localCy.nodes());
    });
  }



  private executeGraphCalculations(): void{
    var edges = JSON.parse(JSON.stringify(this.data)).filter(function (entry) {
      return entry.group === 'edges';
    });
    this.edgesSize=edges.length;
    if(this.edgesSize>300){
      this.timeout = 1000;
    }else{
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

        style: [
          // the stylesheet for the graph
          {
            selector: 'node.highlight',
            style: {
              'overlay-color': '#000000',
              'overlay-padding': '8px',
              'overlay-opacity':0.333
            }
          },
          {
            selector: 'node.neighbour-highlight',
            style: {
              'border-color': '#CC0000',
              'border-width': '4px'
            }
          },
          {
            selector: 'node',
            style: {
              //'shape': 'triangle',// Bioactive Entity
              //'shape': 'diamond', // RNA
              //'shape':'round-rectangle',// Gene
             // 'shape':'circle',//Protein
             // shape: 'vee',// DNA
             // shape:'ellipse',
              shape:'data(shape)',
             'background-color': 'data(color)',
              /*label: 'data(preferred_id)',*/
            },
          },

          {
            selector: 'node:parent',
            css: {
              'background-opacity': 0.333,
              /*'font-size': 50,*/
              label: 'data(species)',
            },
          },

          {
            selector: 'edge',
            style: {
              /*'target-arrow-color': '#000000',
              'target-arrow-shape': 'triangle',*/
              'line-color': 'data(color)',
              width: 3,
              'curve-style':'bezier',
                'control-point-step-size':0
            },
          },
          {
            selector: 'edge.neighbour-highlight',
            style: {
              'line-color': '#CC0000',
            }
          }
        ],
        /*boxSelectionEnabled: false,*/
        layout: Constants.FCOSE_LAYOUT_OPTIONS,
      });
      this.loadInteractiveMethods();
      this.stopLoadingImage();
      }, this.timeout);
  }

  private startLoadingImage(): void {
    this.spinner.spin(this.spinTarget);
  }

  private stopLoadingImage(): void {
    this.spinner.stop();
  }
}
