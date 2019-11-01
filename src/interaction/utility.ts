import {Style} from "./style";
export class Utility {

    public createDetailsDivFor(detailDivId:string):HTMLDivElement {
        var legendDiv = <HTMLDivElement>document.createElement('div');
        legendDiv.setAttribute('id', detailDivId);
        legendDiv.setAttribute('style', Style.DETAILS_DIV);
        return legendDiv;
    }

    public createDivElementFor(detailLabel:string,detailValue:string):HTMLDivElement {
        let divListElement = <HTMLDivElement>document.createElement('div');

        divListElement.setAttribute('style', Style.DETAIL_SUB_DIV);


        let detailLabel = <HTMLParagraphElement>document.createElement('p');
        detailLabel.setAttribute('style',Style.LABEL);
        detailLabel.innerHTML=detailLabel+":";
        divListElement.appendChild(nodeShapeLegendImageLabel);

        let detailValue = <HTMLParagraphElement>document.createElement('p');
        detailLabel.setAttribute('style',Style.VALUE);
        detailLabel.innerHTML=detailValue;
        divListElement.appendChild(detailLabel);

        return divListElement;
    }

}