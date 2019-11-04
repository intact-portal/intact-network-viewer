import {Style} from "./style";
export class Utility {

    public createDetailsDivFor(detailDivId:string):HTMLDivElement {
        var legendDiv = <HTMLDivElement>document.createElement('div');
        legendDiv.setAttribute('id', detailDivId);
       // legendDiv.setAttribute('style', Style.DETAILS_DIV);
        return legendDiv;
    }

    public createDivElementFor(detailLabel:string,detailValue:string):HTMLDivElement {
        let divListElement = <HTMLDivElement>document.createElement('div');

     //   divListElement.setAttribute('style', Style.DETAIL_SUB_DIV);


        let detailLabelElement = <HTMLParagraphElement>document.createElement('p');
      //  detailLabelElement.setAttribute('style',Style.LABEL);
        detailLabelElement.innerHTML=detailLabel+":";
        divListElement.appendChild(detailLabelElement);

        let detailValueElement = <HTMLParagraphElement>document.createElement('p');
      //  detailValueElement.setAttribute('style',Style.VALUE);
        detailValueElement.innerHTML=detailValue;
        divListElement.appendChild(detailValueElement);

        return divListElement;
    }

}