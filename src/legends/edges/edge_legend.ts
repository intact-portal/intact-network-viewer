import {Utility} from "./../utility";
import {EdgeColorLegend} from "./edge_color_legend";
import {EdgeThicknessLegend} from "./edge_thickness_legend";

export class EdgeLegend {
    private shapes!:Array<string>;
    private colors!:Array<string>;
    private thickness!:Array<string>;
    private edgeColorLegend:EdgeColorLegend;
    private edgeThicknessLegend:EdgeThicknessLegend;

    constructor(edges: any,utility:Utility) {
        this.initializeEdgeShapesColorsAndThickness(edges);
        /*this.nodeShapeLegend = new NodeShapeLegend(this.shapes,utility);*/
        this.edgeColorLegend = new EdgeColorLegend(this.colors,utility);
       this.edgeThicknessLegend= new EdgeThicknessLegend(this.thickness,utility);
    }

    private initializeEdgeShapesColorsAndThickness(edges : any):void {

        let shapesSet=new Set<string>();
        let colorsSet=new Set<string>();
        let thicknessSet=new Set<string>();

        edges.forEach(node => {
            shapesSet.add(node.style('line-style'));
            colorsSet.add(node.style('line-color'));
            thicknessSet.add(node.style( 'width' ));
        });

        this.shapes=Array.from(shapesSet.values());
        this.shapes.sort(function(a, b){
            if(a=='tag'){
                return 1;
            }
            if(b=='tag'){
                return -1;
            }
            if (a > b) {
                return 1;
            }
            if (b > a) {
                return -1;
            }
            return 0;
        });

        this.colors=Array.from(colorsSet.values());
        this.colors.sort(function(a, b){
            let colorA=a.replace(/\s/g, "");
            let colorB=b.replace(/\s/g, "");
            if(colorA=='rgb(153,153,153)'){
                return 1;
            }

            if(colorB=='rgb(153,153,153)'){
                return -1;
            }
            if (a > b) {
                return 1;
            }
            if (b > a) {
                return -1;
            }
            return 0;
        });

        this.thickness=Array.from(thicknessSet.values());
        this.thickness.sort(function(a, b){
            if (a > b) {
                return 1;
            }
            if (b > a) {
                return -1;
            }
            return 0;
        });
    }

    public createColorLegend(graphState: string): HTMLDivElement {
        return this.edgeColorLegend.createLegend(graphState);
    }

    public createThicknessLegend(): HTMLDivElement {
        return this.edgeThicknessLegend.createLegend();
    }
}
