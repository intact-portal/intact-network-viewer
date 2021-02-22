import { Edge } from '../constants/edge';
import { Node } from '../constants/node';
import { Color } from './constants/color';
import { Size } from './constants/size';
import { Width } from './constants/width';
import { Utility } from './utility';
import { NetworkLegend } from '../legend/network-legend';
import { EdgeShape } from './constants/edge-shape';

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
        'background-color': node => node.data(Node.COLOR),
        'shape': node => node.data(Node.SHAPE),
        'height': '45px',
        'width': node => this.styleUtility.nodeWidth(node),
        'label': node => node.data(Node.INTERACTOR_NAME),
        'font-size': 12,
        'text-outline-color': 'black',
        'text-outline-opacity': 0.5,
        'text-outline-width': 2,
        'text-halign': 'center',
        'text-valign': 'center',
        'color': 'white',
      },
    },

    {
      selector: 'node:parent',
      css: {
        'background-opacity': 0.333,
        'font-size': Size.COMPOUND_NODE_LABEL_SIZE,
        'text-max-width': node => node.width(),
        'text-wrap': 'wrap',
        'label': node => node.data(Node.SPECIES),
      },
    },
    {
      selector: 'edge',
      style: {
        'control-point-step-size': 0,
        'curve-style': 'haystack',
        'line-color': edge => edge.data(Edge.COLLAPSED_COLOR),
        'line-style': EdgeShape.SOLID_LINE,
        'width': edge => this.styleUtility.edgeWidth(edge),
      },
    },
    {
      selector: 'edge:loop',
      style: {
        'control-point-step-size': 40,
        'curve-style': 'bezier',
        'line-color': edge => edge.data(Edge.COLLAPSED_COLOR),
        'line-style': EdgeShape.SOLID_LINE,
        'display': edge => this.styleUtility.edgeDisplay(edge),
        'width': edge => this.styleUtility.edgeWidth(edge),
      },
    },
    {
      selector: 'edge.expand',
      style: {
        'control-point-step-size': 40,
        'curve-style': 'bezier',
        'line-color': edge => edge.data(Edge.COLOR),
        'line-style': edge => edge.data(Edge.SHAPE),
        'display': 'element',
        'width': Width.DEFAULT_EDGE,
      },
    },
    {
      selector: 'edge.affected',
      style: {
        'line-color': edge => edge.data(Edge.AFFECTED_BY_MUTATION) ? this.legend.edge_legend.mutation_color.true.value : this.legend.edge_legend.mutation_color.false.value,
        'width': edge => edge.data(Edge.AFFECTED_BY_MUTATION) ? this.legend.edge_legend.mutation_width.true.value : this.legend.edge_legend.mutation_width.false.value
      },
    },
    {
      selector: 'node.mutation',
      style: {
        'border-color': node => node.data(Node.MUTATION) ? this.legend.node_legend.border_color.true.value : this.legend.node_legend.border_color.false.value,
        'border-width': node => node.data(Node.MUTATION) ?  this.legend.node_legend.border_width.true.value : this.legend.node_legend.border_width.false.value,
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
  private legend: NetworkLegend;

  constructor(legend: NetworkLegend) {
    this.styleUtility = new Utility(legend.edge_legend.summary_width);
    this.legend = legend;
  }
}
