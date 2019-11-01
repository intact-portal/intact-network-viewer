import {Utility} from "./utility";
import {Constants} from "./constants";
export class EdgeDetails {

    private edge:any;
    private utility: Utility;

    constructor(edge:any,utility:Utility) {
        this.edge = edge;
        this.utility = utility;
    }

    public createDetails():HTMLDivElement {
        let detailDiv = this.utility.createDetailsDivFor(Constants.EDGE_DETAILS_DIV_ID);

        let miScoreDivElement = this.utility.createDivElementFor(Constants.INTERACTION_DETECTION_METHOD_LABEL,this.edge.data('interaction_detection_method'));

        detailDiv.appendChild(miScoreDivElement);

        return detailDiv;
    }
}