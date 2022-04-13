import { Edge } from '../constants/edge';
import { Node } from '../constants/node';
import { NetworkLegend } from '../legend/network-legend';
import { Color } from './constants/color';
import { EdgeShape } from './constants/edge-shape';
import { NodeShape } from './constants/node-shape';
import { Size } from './constants/size';
import { Width } from './constants/width';
import { Utility } from './utility';
import { Stylesheet } from 'cytoscape';

export class Style {
  public applicationCSS: Stylesheet[] = [
    // the stylesheet for the graph
    {
      selector: 'node.highlight',
      style: {
        'underlay-color': Color.HIGHLIGHT_NODE,
        'underlay-opacity': 0.333,
        'underlay-padding': Width.UNDERLAY_NODE_BORDER_WIDTH,
        'z-index': 10000,
      },
    },
    {
      selector: 'node.neighbour-highlight',
      style: {
        'underlay-color': Color.HIGHLIGHT_NEIGHBOUR,
        'underlay-opacity': 0.333,
        'underlay-padding': Width.UNDERLAY_NODE_BORDER_WIDTH,
        'z-index': 9999,
      },
    },
    {
      selector: 'node',
      style: {
        'background-color': node => node.data(Node.COLOR),
        shape: node => node.data(Node.SHAPE),
        height: node => (node.data(Node.SHAPE) === NodeShape.HEXAGON ? node.width() / 1.1547005 : node.width()),
        width: '45px',
        label: node => node.data(Node.INTERACTOR_NAME),
        'font-size': 12,
        'text-outline-color': 'black',
        'text-outline-opacity': 0.5,
        'text-outline-width': 2,
        'text-halign': 'center',
        'text-valign': 'center',
        color: 'white',
      },
    },
    {
      selector: 'edge',
      style: {
        'control-point-step-size': 0,
        'curve-style': 'haystack',
        'line-color': edge => edge.data(Edge.COLLAPSED_COLOR),
        'line-style': EdgeShape.SOLID_LINE,
        display: 'none',
        width: edge => this.styleUtility.edgeWidth(edge),
        'mid-source-arrow-shape': ele => ele.data(Edge.NEGATIVE) ? 'chevron' : 'none',
        'mid-target-arrow-shape': ele => ele.data(Edge.NEGATIVE) ? 'chevron' : 'none',
        'mid-source-arrow-color': 'red',
        'mid-target-arrow-color': 'red',
      },
    },
    {
      selector: 'edge.first',
      style: {
        display: 'element',
      },
    },
    {
      selector: 'edge:loop',
      style: {
        'control-point-step-size': 40,
        'curve-style': 'bezier',
        'line-color': edge => edge.data(Edge.COLLAPSED_COLOR),
        'line-style': EdgeShape.SOLID_LINE,
        width: edge => this.styleUtility.edgeWidth(edge),
      },
    },
    {
      selector: 'edge.expand',
      style: {
        'control-point-step-size': 40,
        'curve-style': 'bezier',
        'line-color': edge => edge.data(Edge.COLOR),
        'line-style': edge => edge.data(Edge.SHAPE),
        display: 'element',
        width: Width.DEFAULT_EDGE,
      },
    },
    {
      selector: 'edge.affected',
      style: {
        'line-color': edge =>
          edge.data(Edge.AFFECTED_BY_MUTATION)
            ? this.legend.edge_legend.mutation_color.true.value
            : this.legend.edge_legend.mutation_color.false.value,
        width: edge =>
          edge.data(Edge.AFFECTED_BY_MUTATION)
            ? this.legend.edge_legend.mutation_width.true.value
            : this.legend.edge_legend.mutation_width.false.value,
      },
    },
    {
      selector: 'node.mutation',
      style: {
        'border-color': node =>
          node.data(Node.MUTATION)
            ? this.legend.node_legend.border_color.true.value
            : this.legend.node_legend.border_color.false.value,
        'border-width': node =>
          node.data(Node.MUTATION)
            ? this.legend.node_legend.border_width.true.value
            : this.legend.node_legend.border_width.false.value,
      },
    },
    {
      selector: 'node:parent',
      css: {
        'background-opacity': 0.333,
        'font-size': Size.COMPOUND_NODE_LABEL_SIZE,
        'color': 'black',
        'text-max-width': node => node.width(),
        'text-margin-y': -5,
        'text-outline-opacity': 0,
        'text-outline-width': 0,
        'text-wrap': 'wrap',
        'text-halign': 'center',
        'text-valign': 'top',
        'border-width': 1,
        'border-color': '#bebebe',
        label: node => node.data(Node.SPECIES),
      },
    },
    {
      selector: 'edge.neighbour-highlight',
      style: {
        'underlay-color': Color.HIGHLIGHT_NODE,
        'underlay-opacity': 0.333,
        'underlay-padding': (e) => e.width() / 2 + 6,
        'z-index': 9998,
      },
    },
  ];

  private styleUtility: Utility;
  private legend: NetworkLegend;

  constructor(legend: NetworkLegend) {
    this.styleUtility = new Utility(legend.edge_legend.summary_width);
    this.legend = legend;
  }
}
