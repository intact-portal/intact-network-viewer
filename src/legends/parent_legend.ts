import { NetworkViewerStates } from '../network_viewer_states';
import { Global } from './../global';
import { EdgeLegend } from './edges/edge_legend';
import { NodeLegend } from './nodes/node_legend';
import { Utility } from './utility';

export class ParentLegend {
  private nodeLegend: NodeLegend;
  private edgeLegend: EdgeLegend;

  constructor() {
    const utility = new Utility();
    this.nodeLegend = new NodeLegend(Global.graphcy.nodes(), utility);
    this.edgeLegend = new EdgeLegend(Global.graphcy.edges(), utility);
  }

  public createLegend(parentLegendId: string, graphState: string): void {
    const parentDiv = document.getElementById(parentLegendId) as HTMLDivElement;
    parentDiv.innerHTML = '';

    parentDiv.appendChild(this.nodeLegend.createColorLegend());

    if (Global.graphcy.nodes().parent().length > 0) {
      parentDiv.appendChild(this.nodeLegend.createCompoundNodeColorLegend());
    }

    if (graphState === NetworkViewerStates.MUTATION_EFFECTED) {
      parentDiv.appendChild(this.nodeLegend.createBorderLegend());
    }

    parentDiv.appendChild(this.nodeLegend.createShapeLegend());

    parentDiv.appendChild(this.edgeLegend.createColorLegend(graphState));

    if (graphState === NetworkViewerStates.COLLAPSED) {
      parentDiv.appendChild(this.edgeLegend.createThicknessLegend());
    }

    if (graphState === NetworkViewerStates.EXPANDED || graphState === NetworkViewerStates.MUTATION_EFFECTED) {
      const shapeLegendDiv: HTMLDivElement = this.edgeLegend.createShapesLegend();
      if (shapeLegendDiv != null) {
        parentDiv.appendChild(shapeLegendDiv);
      }
    }
  }
}
