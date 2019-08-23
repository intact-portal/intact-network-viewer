import cytoscape from 'cytoscape';
import fcose from 'cytoscape-fcose';
import { FcoseLayout } from './layouts/fcose_layout';
cytoscape.use(fcose);
import $ from 'jquery';

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

    /*const fcoseLayout: FcoseLayout = new FcoseLayout(this.cy);
    fcoseLayout.execute();*/
  }
}
