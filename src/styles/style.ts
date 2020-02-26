import { Edge } from '../constants/edge';
import { Node } from '../constants/node';
import { Color } from './constants/color';
import { Shape } from './constants/shape';
import { Size } from './constants/size';
import { Width } from './constants/width';
import { Utility } from './utility';

export class Style {

  public applicationCSS: any = [
    // the stylesheet for the graph
    {
      selector: 'node.highlight',
      style: {
        'overlay-color': Color.HIGHLIGHT_NODE,
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
      // tslint:disable-next-line:object-literal-sort-keys
      css: {
        'background-opacity': 0.333,
        'font-size': Size.COMPOUND_NODE_LABEL_SIZE,
        'text-max-width': node => {
          return node.width();
        },
        'text-wrap': 'wrap',
        // tslint:disable-next-line:object-literal-sort-keys
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
        'line-color': edge => {
          return this.styleUtility.edgeColor(edge);
        },
        'line-style': Shape.COLLAPSED_EDGE,
        // tslint:disable-next-line:object-literal-sort-keys
        display: edge => {
          return this.styleUtility.edgeDisplay(edge);
        },
        width: edge => {
          return this.styleUtility.edgeWidth(edge);
        },
      },
    },
    {
      selector: 'edge.expand',
      style: {
        'control-point-step-size': 40,
        'curve-style': 'bezier',
        'line-color': edge => {
          return edge.data(Edge.COLOR);
        },
        'line-style': edge => {
          return edge.data(Edge.SHAPE);
        },
        // tslint:disable-next-line:object-literal-sort-keys
        display: 'element',
        width: Width.DEFAULT_EDGE,
      },
    },
    {
      selector: 'edge.affected',
      style: {
        'line-color': edge => {
          if (edge.data(Edge.AFFECTED_BY_MUTATION)) {
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
        'overlay-color': Color.HIGHLIGHT_NODE,
        'overlay-opacity': 0.333,
        'overlay-padding': Width.OVERLAY_EDGE_BORDER_WIDTH,
      },
    },
  ];

  private styleUtility: Utility;

  constructor() {
    this.styleUtility = new Utility();
  }
}
