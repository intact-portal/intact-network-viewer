import { Color } from './constants/color';
import { Shape } from './constants/shape';
import { Width } from './constants/width';

export class StyleUtility {

    public edgeShape(edge:any): string {
        if(edge.parallelEdges().size()>1){
            return Shape.COLLAPSED_EDGE;
        }
        return edge.data('shape');
    }

    public edgeWidth(edge:any): number {
        if(edge.parallelEdges().size()>1){
            return Width.COLLAPSED_EDGE;
        }
        return Width.DEFAULT_EDGE;
    }

    public edgeColor(edge:any): string{
        if(edge.parallelEdges().size()>1){
            return edge.data('collapsed_color');
        }
        return edge.data('color');
    }

    public edgeDisplay(edge:any): string {

        if(edge.parallelEdges().size()>1){
            var sortedEdges=edge.parallelEdges().sort(function( a, b ){
                return a.data('id') - b.data('id');
            });
            var firstEdge=sortedEdges.first();
            if(firstEdge.data('id')!=edge.data('id')){
                return 'none';
            }
        }
        return 'element';
    }
}