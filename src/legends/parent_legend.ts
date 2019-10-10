import { NodeShapeLegend } from './node_shape_legend';
export class ParentLegend {
  private cy: any;
  private nodeShapeLegend: NodeShapeLegend;

  constructor(cy: any) {
    this.cy = cy;
    this.nodeShapeLegend = new NodeShapeLegend(cy.nodes());
  }

  public createLegend(parentLegendId: string, layoutType: string): void {
    let parentDiv = document.getElementById(parentLegendId) as HTMLDivElement;
    parentDiv.innerHTML = '';

    parentDiv.appendChild(this.nodeShapeLegend.createLegend('collapsed'));
  }
}
