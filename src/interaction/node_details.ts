import {Utility} from "./utility";
import {Constants} from "./constants";
import {Style} from "./style";
import {Node} from "../constants/node";
export class NodeDetails {

    private node:any;
    private utility: Utility;

    constructor(node:any,utility:Utility) {
        this.node = node;
        this.utility = utility;
    }

    public createDetails():HTMLDivElement {
        let detailDiv = this.utility.createDetailsDivFor(Constants.NODE_DETAILS_DIV_ID);


        let interactorAcDivElement= this.utility.createDivElementFor(Constants.INTERACTOR_AC_LABEL, this.node.data(Node.INTERACTOR_AC));

        let interactorName=this.node.data(Node.INTERACTOR_NAME);
        if(interactorName==null) {
            interactorName='NA';
        }

        let interactorNameDivElement = this.utility.createDivElementFor(Constants.INTERACTOR_NAME_LABEL, interactorName);

        let interactorTypeDivElement = this.utility.createDivElementFor(Constants.INTERACTOR_TYPE_LABEL, this.node.data(Node.INTERACTOR_TYPE));

        let speciesDivElement = this.utility.createDivElementFor(Constants.SPECIES_LABEL,this.node.data(Node.SPECIES));

        detailDiv.appendChild(interactorAcDivElement);
        detailDiv.appendChild(interactorNameDivElement);
        detailDiv.appendChild(interactorTypeDivElement);
        detailDiv.appendChild(speciesDivElement);

        return detailDiv;

    }
}