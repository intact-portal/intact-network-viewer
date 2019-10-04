import { Color } from './constants/color';
import { Shape } from './constants/shape';
import {StyleUtility} from "./style_utility";
import { Width } from './constants/width';

export class Style {

  private styleUtility: StyleUtility;

  constructor() {
    this.styleUtility = new StyleUtility();
  }

  public applicationCSS: any =[
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
          return this.styleUtility.edgeColor(edge);
        },
        'line-style':edge => {
          return this.styleUtility.edgeShape(edge);
        },
        width: edge => {
          return this.styleUtility.edgeWidth(edge);
        },
        'curve-style':'bezier',
        'control-point-step-size':0
      },
    },
    {
      selector: 'edge:loop',
      style: {
        'line-color': edge => {
          return this.styleUtility.edgeColor(edge);
        },
        'line-style':edge => {
          return this.styleUtility.edgeShape(edge);
        },
        width: edge => {
          return this.styleUtility.edgeWidth(edge);
        },

        'curve-style':'bezier',
        'control-point-step-size':40,
        display: edge => {
          return this.styleUtility.edgeDisplay(edge);
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
  ];
}