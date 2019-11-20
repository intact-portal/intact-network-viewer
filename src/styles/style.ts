import { Edge } from '../constants/edge';
import { Node } from '../constants/node';
import { Color } from './constants/color';
import { Shape } from './constants/shape';
import { Size } from './constants/size';
import { Width } from './constants/width';
import { Utility } from './utility';

export class Style {
  private styleUtility: Utility;

  constructor() {
    this.styleUtility = new Utility();
  }

  public applicationCSS: any = [
    // the stylesheet for the graph
    {
      selector: 'node.highlight',
      style: {
        'overlay-color': '#000000',
        'overlay-opacity': 0.333,
        'overlay-padding': Width.OVERLAY_NODE_BORDER_WIDTH,
      },
    },
    {
      selector: 'node.neighbour-highlight',
      style: {
        'overlay-color': Color.HIGHLIGHT_NEIGHBOUR,
        'overlay-opacity': 0.333,
        'overlay-padding': Width.OVERLAY_NODE_BORDER_WIDTH,
      },
    },
    {
      selector: 'node',
      style: {
        'background-color': node => {
          return node.data(Node.COLOR);
        },
        shape: node => {
          return node.data(Node.SHAPE);
        },
        width: node => {
          return this.styleUtility.nodeWidth(node);
        },

        /*label: 'data(preferred_id)',*/
      },
    },

    {
      selector: 'node:parent',
      css: {
        'background-opacity': 0.333,
        'font-size': Size.COMPOUND_NODE_LABEL_SIZE,
        'text-wrap': 'wrap',
        'text-max-width': node => {
          return node.width();
        },
        label: node => {
          return node.data(Node.SPECIES);
        },
      },
    },

    {
      selector: 'edge',
      style: {
        'control-point-step-size': 0,
        'curve-style': 'haystack',
        'line-color': edge => {
          return this.styleUtility.edgeColor(edge);
        },
        'line-style': Shape.COLLAPSED_EDGE,
        width: edge => {
          return this.styleUtility.edgeWidth(edge);
        },
      },
    },
    {
      selector: 'edge:loop',
      style: {
        'control-point-step-size': 40,
        'curve-style': 'bezier',
        'line-style': Shape.COLLAPSED_EDGE,
        'line-color': edge => {
          return this.styleUtility.edgeColor(edge);
        },
        width: edge => {
          return this.styleUtility.edgeWidth(edge);
        },
        display: edge => {
          return this.styleUtility.edgeDisplay(edge);
        },
      },
    },
    {
      selector: 'edge.expand',
      style: {
        'control-point-step-size': 40,
        'curve-style': 'bezier',
        'line-style': edge => {
          return edge.data(Edge.SHAPE);
        },
        'line-color': edge => {
          return edge.data(Edge.COLOR);
        },
        width: Width.DEFAULT_EDGE,
        display: 'element',
      },
    },
    {
      selector: 'edge.disrupted',
      style: {
        'line-color': edge => {
          if (edge.data(Edge.DISRUPTED_BY_MUTATION)) {
            return Color.HIGHLIGHT_MUTATION;
          }
          return Color.LOWLIGHT;
        },
      },
    },
    {
      selector: 'node.mutation',
      style: {
        'border-color': node => {
          if (node.data(Node.MUTATION)) {
            return Color.HIGHLIGHT_MUTATION;
          }
          return Color.DEFAULT_NODE_BORDER;
        },
        'border-width': node => {
          if (node.data(Node.MUTATION)) {
            return Width.MUTATED_NODE_BORDER;
          }
          return Width.DEFAULT_NODE_BORDER;
        },
      },
    },
    {
      selector: 'edge.neighbour-highlight',
      style: {
        'overlay-color': Color.HIGHLIGHT_NEIGHBOUR,
        'overlay-opacity': 0.333,
        'overlay-padding': Width.OVERLAY_EDGE_BORDER_WIDTH,
      },
    },
  ];
}
