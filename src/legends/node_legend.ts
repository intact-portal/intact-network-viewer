import {Constants} from "./constants";
import {Style} from "./style";
export class NodeLegend {

    private nodes: any;

    constructor(nodes: any) {
        this.nodes = nodes;
    }

    public createLegend(layoutType:string): HTMLDivElement {
        var nodeShapeLegendDiv = <HTMLDivElement>(document.createElement('div'));
        nodeShapeLegendDiv.setAttribute("id", Constants.NODE_SHAPE_LEGEND_DIV_ID);

        var nodeShapeLegendHeader = <HTMLElement>(document.createElement('h3'));
        nodeShapeLegendHeader.setAttribute("style", Style.LEGEND_HEADER);
        nodeShapeLegendHeader.innerHTML=Constants.NODE_SHAPE_LEGEND_TITLE;

        nodeShapeLegendDiv.appendChild(nodeShapeLegendHeader);

        return nodeShapeLegendDiv;
    }
}