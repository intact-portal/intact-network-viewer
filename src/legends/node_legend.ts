export class NodeLegend {

    private nodes: any;

    constructor(nodes: any) {
        this.nodes = nodes;
    }

    public createLegend(layoutType:string): HTMLDivElement {
        var nodeShapeLegendDiv = <HTMLDivElement>(document.createElement('div'));
        nodeShapeLegendDiv.setAttribute("id", "node-shape-legend");

        var nodeShapeLegendHeader = <HTMLElement>(document.createElement('h3'));
        nodeShapeLegendHeader.setAttribute("style", "text-align: center;");
        nodeShapeLegendHeader.innerHTML='Node Shape Legend';

        nodeShapeLegendDiv.appendChild(nodeShapeLegendHeader);

        return nodeShapeLegendDiv;
    }
}