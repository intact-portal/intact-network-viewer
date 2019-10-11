
import {NodeLegend} from "./nodes/node_legend";
import {NetworkViewerStates} from "../network_viewer_states";
import {Utility} from "./utility";
export class ParentLegend {
  private cy: any;
  private nodeLegend: NodeLegend;

  constructor(cy: any) {
    this.cy = cy;
    let utility = new Utility();
    this.nodeLegend = new NodeLegend(cy.nodes(),utility);

  }

  public createLegend(parentLegendId: string, layoutType: string): void {
    let parentDiv = document.getElementById(parentLegendId) as HTMLDivElement;
    parentDiv.innerHTML = '';

    parentDiv.appendChild(this.nodeLegend.createShapeLegend('collapsed'));
    parentDiv.appendChild(this.nodeLegend.createColorLegend('collapsed'));

    if(layoutType==NetworkViewerStates.MUTATION_EFFECTED){
      parentDiv.appendChild(this.nodeLegend.createBorderLegend('collapsed'));
    }
  }
}
