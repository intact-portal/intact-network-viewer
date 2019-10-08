import {NodeLegend} from "./node_legend";
export class ParentLegend {

    private cy: any;
    private nodeLegend: NodeLegend;
    // constructor
    constructor(cy: any) {
        this.cy = cy;
        this.nodeLegend = new NodeLegend(cy.nodes());
    }

    public createLegend(parentLegendId:string,layoutType:string): void {
       let parentDiv = document.getElementById(parentLegendId) as HTMLDivElement;
       // parentDiv.empty();

        parentDiv.appendChild(this.nodeLegend.createLegend('collapsed'));
    }
}
