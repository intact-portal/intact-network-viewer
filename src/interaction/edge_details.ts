import {Utility} from "./utility";
import {Constants} from "./constants";
import {Style} from "./style";
import {Edge} from "../constants/edge";
export class EdgeDetails {

    private edge:any;
    private utility: Utility;

    constructor(edge:any,utility:Utility) {
        this.edge = edge;
        this.utility = utility;
    }

    public createDetails():HTMLDivElement {
        let detailDiv = this.utility.createDetailsDivFor(Constants.EDGE_DETAILS_DIV_ID);
        let detectionMethodDivElement;

        let interactionAcDivElement;

        if(this.edge.hasClass('expand')) {
            interactionAcDivElement= this.utility.createDivElementFor(Constants.INTERACTION_AC_LABEL, this.edge.data(Edge.INTERACTION_AC));
            detailDiv.appendChild(interactionAcDivElement);
            detectionMethodDivElement = this.utility.createDivElementFor(Constants.INTERACTION_DETECTION_METHOD_LABEL, this.edge.data(Edge.INTERACTION_DETECTION_METHOD));
        }else{
            let detectionMethodsSet=new Set<string>();
            this.edge.parallelEdges().forEach(edge => {
               detectionMethodsSet.add(edge.data(Edge.INTERACTION_DETECTION_METHOD));
            });
            detectionMethodDivElement = this.utility.createDivElementFor(Constants.NO_DETECTION_METHODS_LABEL, detectionMethodsSet.size);
        }
        let miScoreDivElement = this.utility.createDivElementFor(Constants.MISCORE_LABEL,this.edge.data(Edge.MI_SCORE));


        detailDiv.appendChild(miScoreDivElement);
        detailDiv.appendChild(detectionMethodDivElement);

        return detailDiv;

    }
}