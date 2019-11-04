import {Utility} from "./utility";
import {Constants} from "./constants";
import {Style} from "./style";
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

/*        let detailLabel=Constants.INTERACTION_DETECTION_METHOD_LABEL;
        let detailValue=this.edge.data('interaction_detection_method')

        let detailLabelElement = <HTMLParagraphElement>document.createElement('p');
        //detailLabelElement.setAttribute('style',Style.LABEL);
        detailLabelElement.innerHTML=detailLabel+":";
        detailDiv.appendChild(detailLabelElement);

        let detailValueElement = <HTMLParagraphElement>document.createElement('p');
        //detailValueElement.setAttribute('style',Style.VALUE);
        detailValueElement.innerHTML=detailValue;
        detailDiv.appendChild(detailValueElement);

        detailDiv.style.display = 'block';*/

        //return detailDiv;
    }
}