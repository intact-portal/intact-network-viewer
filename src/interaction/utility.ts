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


        let detailElement = <HTMLParagraphElement>document.createElement('p');
        let detailLabelElement = <HTMLElement>document.createElement('strong');
        detailLabelElement.innerHTML=detailLabel+": ";
        detailElement.appendChild(detailLabelElement)
        detailElement.append(detailValue);
        divListElement.appendChild(detailElement);

/*        let detailValueElement = <HTMLParagraphElement>document.createElement('p');
      //  detailValueElement.setAttribute('style',Style.VALUE);
        detailValueElement.innerHTML=detailValue;
        divListElement.appendChild(detailValueElement);*/

        return divListElement;
    }

    public insertCSSClassesInDOMForToolTip():void{
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = Style.TOOL_TIP_CSS_CLASS;
        document.getElementsByTagName('head')[0].appendChild(style);
    }

}