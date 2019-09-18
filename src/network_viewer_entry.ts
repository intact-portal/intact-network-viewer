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
    var edges = JSON.parse(JSON.stringify(this.data)).filter(function (entry) {
      return entry.group === 'edges';
    });
    this.edgesSize=edges.length;
    if(this.edgesSize>300){
      this.timeout = 1000;
    }else{
      this.timeout = 1;
    }
    setTimeout(() => {
      this.cy = cytoscape({
        container: $('#' + this.graphContainerDivId), // container to render in
        elements: this.data,

        style: [
          // the stylesheet for the graph
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
        ],

        layout: Constants.FCOSE_LAYOUT_OPTIONS,
      });

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
