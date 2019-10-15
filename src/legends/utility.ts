import {Style} from "./style";
export class Utility {

   public createDivElementFor(elementImage:string,elementText:string,isSingleDiv:boolean,isEdge : boolean):HTMLDivElement {
        let nodeShapeLegendDivListElement = <HTMLDivElement>document.createElement('div');
        let divStyle;
       let  textstyle;

        if(isSingleDiv){
            divStyle =  Style.LEGEND_SUB_DIV;
            textstyle= Style.TEXT;
        }else {
            divStyle = Style.DIV_LIST;
            textstyle= Style.TEXTS;
        }
        nodeShapeLegendDivListElement.setAttribute('style', divStyle);

        let nodeShapeLegendImage = <HTMLImageElement>document.createElement('img');
        nodeShapeLegendImage.setAttribute('src',elementImage);

       let imgStyle;
       if(isEdge){
           imgStyle = Style.EDGE_IMG;
       }else{
           imgStyle = Style.NODE_IMG;
       }
        nodeShapeLegendImage.setAttribute('style',imgStyle);
        nodeShapeLegendDivListElement.appendChild(nodeShapeLegendImage);

        let nodeShapeLegendImageLabel = <HTMLParagraphElement>document.createElement('p');
        nodeShapeLegendImageLabel.setAttribute('style',textstyle);
        nodeShapeLegendImageLabel.innerHTML=elementText;
        nodeShapeLegendDivListElement.appendChild(nodeShapeLegendImageLabel);

        return nodeShapeLegendDivListElement;
    }

    public createLegendDivFor(legendDivId:string,legendTitle:string):HTMLDivElement{
    var legendDiv = <HTMLDivElement>document.createElement('div');
        legendDiv.setAttribute('id', legendDivId);
        legendDiv.setAttribute('style', Style.LEGEND_DIV);

    var legendHeader = <HTMLElement>document.createElement('h3');
        legendHeader.setAttribute('style', Style.LEGEND_HEADER);
        legendHeader.innerHTML = legendTitle;
        legendDiv.appendChild(legendHeader);

        return legendDiv;
}
}