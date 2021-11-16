import { NodeSingular } from 'cytoscape';
import { Node } from '../constants/node';
import { Constants } from './constants';
import { Utility } from './utility';

export class NodeDetails {
  private node: NodeSingular;
  private utility: Utility;

  constructor(node: NodeSingular, utility: Utility) {
    this.node = node;
    this.utility = utility;
  }

  public createDetails(): HTMLDivElement {
    const detailDiv = this.utility.createDetailsDivFor(Constants.NODE_DETAILS_DIV_ID);

    let interactorName = this.node.data(Node.INTERACTOR_NAME);
    if (interactorName == null) {
      interactorName = 'NA';
    }

    const interactorNameDivElement = this.utility.createDivElementFor(Constants.INTERACTOR_NAME_LABEL, interactorName);

    const interactorIdDivElement = this.utility.createDivElementFor(
      Constants.INTERACTOR_ID_LABEL,
      this.node.data(Node.INTERACTOR_ID)
    );

    const interactorTypeDivElement = this.utility.createDivElementFor(
      Constants.INTERACTOR_TYPE_LABEL,
      this.node.data(Node.INTERACTOR_TYPE)
    );

    const speciesDivElement = this.utility.createDivElementFor(Constants.SPECIES_LABEL, this.node.data(Node.SPECIES));

    const interactorAcDivElement = this.utility.createDivElementFor(
      Constants.INTERACTOR_AC_LABEL,
      this.node.data(Node.INTERACTOR_AC)
    );

    detailDiv.appendChild(interactorNameDivElement);
    detailDiv.appendChild(interactorIdDivElement);
    detailDiv.appendChild(interactorTypeDivElement);
    detailDiv.appendChild(speciesDivElement);
    detailDiv.appendChild(interactorAcDivElement);

    return detailDiv;
  }
}
