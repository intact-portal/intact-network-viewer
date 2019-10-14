import { Color } from './constants/color';
import { Shape } from './constants/shape';
import { Width } from './constants/width';

export class Utility {
  public edgeWidth(edge: any): string {
    if (edge.parallelEdges().size() > 1) {
      return Width.COLLAPSED_EDGE;
    }
    return Width.DEFAULT_EDGE;
  }

  public edgeColor(edge: any): string {
    return edge.data('collapsed_color');
  }

  public edgeDisplay(edge: any): string {
    if (edge.parallelEdges().size() > 1) {
      var sortedEdges = edge.parallelEdges().sort(function(a, b) {
        return a.data('id') - b.data('id');
      });
      var firstEdge = sortedEdges.first();
      if (firstEdge.data('id') != edge.data('id')) {
        return 'none';
      }
    }
    return 'element';
  }

  public nodeWidth(node: any): string {
    if (node.data('shape') === Shape.ROUNDED_RECTANGLE) {
      return Width.RECTANGULAR_NODE_WIDTH;
    }
    return node.height();
  }
}