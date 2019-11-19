import { Constants } from './constants';
import { Edge } from '../constants/edge';
import { Style } from './style';
import { Utility } from './utility';

export class EdgeDetails {
  private edge: any;
  private utility: Utility;

  constructor(edge: any, utility: Utility) {
    this.edge = edge;
    this.utility = utility;
  }

  public createDetails(): HTMLDivElement {
    const detailDiv = this.utility.createDetailsDivFor(Constants.EDGE_DETAILS_DIV_ID);
    let detectionMethodDivElement;

    let interactionAcDivElement;

    if (this.edge.hasClass('expand')) {
      interactionAcDivElement = this.utility.createDivElementFor(
        Constants.INTERACTION_AC_LABEL,
        this.edge.data(Edge.INTERACTION_AC),
      );
      detectionMethodDivElement = this.utility.createDivElementFor(
        Constants.INTERACTION_DETECTION_METHOD_LABEL,
        this.edge.data(Edge.INTERACTION_DETECTION_METHOD),
      );
    } else {
      const detectionMethodsSet = new Set<string>();
      this.edge.parallelEdges().forEach(edge => {
        detectionMethodsSet.add(edge.data(Edge.INTERACTION_DETECTION_METHOD));
      });
      detectionMethodDivElement = this.utility.createDivElementFor(
        Constants.NO_DETECTION_METHODS_LABEL,
        detectionMethodsSet.size
      );
    }
    const miScoreDivElement = this.utility.createDivElementFor(Constants.MISCORE_LABEL, this.edge.data(Edge.MI_SCORE));

    detailDiv.appendChild(miScoreDivElement);
    detailDiv.appendChild(detectionMethodDivElement);
    if (interactionAcDivElement != null) {
      detailDiv.appendChild(interactionAcDivElement);
    }

    return detailDiv;
  }
}
