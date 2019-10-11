import { Constants } from './../constants';
import {NodeColorLegend} from "./node_color_legend";
import {NodeShapeLegend} from "./node_shape_legend";
import {NodeBorderColorLegend} from "./node_border_color_legend";
import {Utility} from "./../utility";

export class NodeLegend {
    private shapes!:Array<string>;
    private colors!:Array<string>;
    private borderColors!:Array<string>;

    private nodeShapeLegend: NodeShapeLegend;
    private nodeColorLegend: NodeColorLegend;
    private nodeBorderColorLegend: NodeBorderColorLegend;

    constructor(nodes: any,utility:Utility) {
        this.initializeNodeShapesColorsAndBorders(nodes);
        this.nodeShapeLegend = new NodeShapeLegend(this.shapes,utility);
        this.nodeColorLegend = new NodeColorLegend(this.colors,utility);
        this.nodeBorderColorLegend = new NodeBorderColorLegend(this.borderColors,utility);
    }

    private initializeNodeShapesColorsAndBorders(nodes : any):void {

        let shapesSet=new Set<string>();
        let colorsSet=new Set<string>();
        let borderColorSet=new Set<string>();

        nodes.forEach(node => {
            shapesSet.add(node.style('shape'));
            colorsSet.add(node.style('background-color'));
            borderColorSet.add(node.style( 'border-color' ));
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
            if(colorA=='rgb(173,188,148)'){
                return 1;
            }else if (colorA=='rgb(220,220,220)'){
                return -1;
            }

            if(colorB=='rgb(173,188,148)'){
                return -1;
            }else if (colorB=='rgb(220,220,220)'){
                return 1;
            }
            if (a > b) {
                return 1;
            }
            if (b > a) {
                return -1;
            }
            return 0;
        });

        this.borderColors=Array.from(borderColorSet.values());
        this.borderColors.sort(function(a, b){
            if (a > b) {
                return 1;
            }
            if (b > a) {
                return -1;
            }
            return 0;
        });


    }

    public createShapeLegend(layoutType: string): HTMLDivElement {
        return this.nodeShapeLegend.createLegend() ;
    }

    public createColorLegend(layoutType: string): HTMLDivElement {
        return this.nodeColorLegend.createLegend() ;
    }

    public createBorderLegend(layoutType: string): HTMLDivElement {
        return this.nodeBorderColorLegend.createLegend() ;
    }

}