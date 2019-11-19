import { Color } from './constants/color';
import { Shape } from './constants/shape';
import { Width } from './constants/width';
import { Edge } from '../constants/edge';
import { Node } from '../constants/node';

export class Utility {
  public edgeWidth(edge: any): string {
    if (edge.parallelEdges().size() > 1) {
      return Width.COLLAPSED_EDGE;
    }
    return Width.DEFAULT_EDGE;
  }

  public edgeColor(edge: any): string {
    return edge.data(Edge.COLLAPSED_COLOR);
  }

  public edgeDisplay(edge: any): string {
    if (edge.parallelEdges().size() > 1) {
      var sortedEdges = edge.parallelEdges().sort(function(a, b) {
        return a.data(Edge.ID) - b.data(Edge.ID);
      });
      var firstEdge = sortedEdges.first();
      if (firstEdge.data(Edge.ID) != edge.data(Edge.ID)) {
        return 'none';
      }
    }
    return 'element';
  }

  public nodeWidth(node: any): string {
    if (node.data(Node.SHAPE) === Shape.ROUNDED_RECTANGLE) {
      return Width.RECTANGULAR_NODE_WIDTH;
    }
    return node.height();
  }

  public parentNodeLabelSize(node: any): number {
    if (node.style('font-size') > 20) {
      return 20;
    } else {
      return node.style('font-size');
    }
  }
}
