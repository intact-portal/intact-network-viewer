import avsdf from 'cytoscape-avsdf';
import cise from 'cytoscape-cise';
import cola from 'cytoscape-cola';
import cyforcelayout from 'cytoscape-ngraph.forcelayout';
import cytoscape from 'cytoscape';
import fcose from 'cytoscape-fcose';

import { AvsdfLayout } from './layouts/avsdf_layout';
import { CiseLayout } from './layouts/cise_layout';
import { ColaLayout } from './layouts/cola_layout';
import { Color } from './layouts/constants/color';
import { Constants } from './layouts/constants';
import { FcoseLayout } from './layouts/fcose_layout';
import { NgraphLayout } from './layouts/ngraph_layout';
import { Shape } from './layouts/constants/shape';
import { Spinner } from 'spin.js';
import { Width } from './layouts/constants/width';

import 'spin.js/spin.css';

import $ from 'jquery';
import {Export} from "./export";
var graphml = require('cytoscape-graphml');
graphml( cytoscape, $ );
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
  private isExpand:boolean;
  private isMutationDisrupted:boolean;

  // constructor
  constructor(graphContainerDivId: string, data,isExpand:boolean,isMutationDisrupted:boolean) {
    this.graphContainerDivId = graphContainerDivId;
    this.data = data;
    this.spinner = new Spinner(Constants.SPINNER_OPTIONS);
    this.spinTarget = document.getElementById(this.graphContainerDivId) as HTMLDivElement;
    this.initializeCytoscape();
    this.isExpand=isExpand;
    this.isMutationDisrupted=isMutationDisrupted;
  }

  public expandEdges(isExpand: boolean,isMutationDisrupted:boolean): void {
      if (isExpand) {
          this.cy.edges().addClass('expand');
          this.cy.$(':loop').addClass('expand');
      } else {
          this.cy.edges().removeClass('expand');
          this.cy.$(':loop').removeClass('expand');
      }

      if(isMutationDisrupted){
          this.cy.edges().addClass('disrupted');
          this.cy.nodes().addClass('mutation');
      } else{
          this.cy.edges().removeClass('disrupted');
          this.cy.nodes().removeClass('mutation');
      }

  }

    public export(exportTo:string ): void {
        const exportObj: Export = new Export(this.cy);
        exportObj.exportAsGraphml();
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
      var clickedNode = e.target.data('interaction_ac');
        alert('ac is'+clickedNode);
      /*e.target.parallelEdges().forEach( function(ele, i, eles){
        alert (ele.data('interaction_type'));
      } );*/

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
      localCy.fit();
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
              'line-color': edge => {
                return this.edgeColor(edge);
              },
              'line-style':edge => {
                  return this.edgeShape(edge);
              },
              width: edge => {
                  return this.edgeWidth(edge);
              },
              'curve-style':'bezier',
                'control-point-step-size':0
            },
          },
            {
                selector: 'edge:loop',
                style: {
                    'line-color': edge => {
                        return this.edgeColor(edge);
                    },
                    'line-style':edge => {
                        return this.edgeShape(edge);
                    },
                    width: edge => {
                        return this.edgeWidth(edge);
                    },

                    'curve-style':'bezier',
                    'control-point-step-size':40,
                    display: edge => {
                        return this.edgeDisplay(edge);
                    }


                },
            },
            {
                selector: 'edge.expand',
                style:  {
                'control-point-step-size': 40,
                'line-style':edge => {
                      return edge.data('shape');

                },
                'line-color': edge => {
                    return edge.data('color');


                },
                width : Width.DEFAULT_EDGE,
                display:'element',
                }
            },
            {
                selector: 'edge.disrupted',
                style:  {
                    'line-color': edge => {
                        if(edge.data('disrupted_by_mutation')){
                            return Color.HIGHLIGHT_MUTATION;
                        }
                        return edge.data('color');
                    }
                }
            },
            {
                selector: 'node.mutation',
                style: {
                    'border-color': node => {
                        if(node.data('mutation')){
                            return Color.HIGHLIGHT_MUTATION;
                        }
                        return Color.DEFAULT_NODE_BORDER;
                    },
                    'border-width': node => {
                        if (node.data('mutation')) {
                            return Width.MUTATED_NODE_BORDER;
                        }
                        return Width.DEFAULT_NODE_BORDER;
                    }
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
      this.expandEdges(this.isExpand,this.isMutationDisrupted);
      this.stopLoadingImage();
      }, this.timeout);
  }

  private startLoadingImage(): void {
    this.spinner.spin(this.spinTarget);
  }

  private stopLoadingImage(): void {
    this.spinner.stop();
  }

  private edgeShape(edge:any): string {
  if(edge.parallelEdges().size()>1){
    return Shape.COLLAPSED_EDGE;
  }
  return edge.data('shape');
}

    private edgeWidth(edge:any): number {
        if(edge.parallelEdges().size()>1){
            return Width.COLLAPSED_EDGE;
        }
        return Width.DEFAULT_EDGE;
    }

    private edgeColor(edge:any): string{
        if(edge.parallelEdges().size()>1){
            return edge.data('collapsed_color');
        }
        return edge.data('color');
    }

    private edgeDisplay(edge:any): string {

        if(edge.parallelEdges().size()>1){
            var sortedEdges=edge.parallelEdges().sort(function( a, b ){
                return a.data('id') - b.data('id');
            });
            var firstEdge=sortedEdges.first();
            if(firstEdge.data('id')!=edge.data('id')){
              return 'none';
            }
         }
        return 'element';
   }
}
