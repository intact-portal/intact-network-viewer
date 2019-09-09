import cytoscape from 'cytoscape';
import fcose from 'cytoscape-fcose';
import cise from 'cytoscape-cise';
import cyforcelayout from 'cytoscape-ngraph.forcelayout';
import avsdf from 'cytoscape-avsdf';
import cola from 'cytoscape-cola';

import { FcoseLayout } from './layouts/fcose_layout';
import {CiseLayout} from "./layouts/cise_layout";
import $ from 'jquery';
import {NgraphLayout} from "./layouts/ngraph_layout";
import {AvsdfLayout} from "./layouts/avsdf_layout";
import {ColaLayout} from "./layouts/cola_layout";
cytoscape.use(fcose);
cytoscape.use(cise);
cytoscape.use(cyforcelayout);
cytoscape.use( avsdf );
cytoscape.use( cola );


export class InitializeGraph {
  // field
  private graphContainerDivId: string;
  private cy: any;
  private data: JSON;

  // constructor
  constructor(graphContainerDivId: string, data) {
    this.graphContainerDivId = graphContainerDivId;
    this.data = data;
    this.initializeCytoscape();
  }

  // function
  private disp(): void {
    // console.log('Engine is  :   ' + this.graphContainerDivId);
  }

  // function
  private initializeCytoscape(): void {
    this.cy = cytoscape({
      container: $('#' + this.graphContainerDivId), // container to render in
      elements: this.data,

      style: [
        // the stylesheet for the graph
        {
          selector: 'node',
          style: {
            'background-color': 'data(color)',
            'label':'data(id)'
          },
        },

        {
          selector: 'node:parent',
          css: {
            'background-opacity': 0.333,
            'font-size':50,
            'label':'data(species)'
          },

        },

        {
          selector: 'edge',
          style: {
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
            width: 3,
          },
        },
      ],

        layout: {
            name: 'fcose',
            rows: 1
        }
    });
  }

  public applyLayout(layoutName: string): void {

    switch(layoutName) {
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
      case 'avsdf':{
        const avsdfLayout: AvsdfLayout = new AvsdfLayout(this.cy);
        avsdfLayout.execute();
        break;
      }
      case 'cola':{
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
  }
}
