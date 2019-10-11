import {Style} from "./style";
export class Utility {

   public createDivElementFor(elementImage:string,elementText:string,isSingleDiv:boolean,isEdge : boolean):HTMLDivElement {
        let nodeShapeLegendDivListElement = <HTMLDivElement>document.createElement('div');
        let divStyle;
        if(isSingleDiv){
            divStyle =  Style.LEGEND_SUB_DIV;
        }else {
            divStyle = Style.NODE_SHAPE_DIV_LIST;
        }
        nodeShapeLegendDivListElement.setAttribute('style', divStyle);

        let nodeShapeLegendImage = <HTMLImageElement>document.createElement('img');
        nodeShapeLegendImage.setAttribute('src',elementImage);

       let imgStyle;
       if(isEdge){
           imgStyle = Style.EDGE_IMG;
       }else{
           imgStyle = Style.NODE_SHAPE_IMG;
       }
        nodeShapeLegendImage.setAttribute('style',imgStyle);
        nodeShapeLegendDivListElement.appendChild(nodeShapeLegendImage);

        let nodeShapeLegendImageLabel = <HTMLParagraphElement>document.createElement('p');
        nodeShapeLegendImageLabel.setAttribute('style',Style.NODE_SHAPE_TEXT);
        nodeShapeLegendImageLabel.innerHTML=elementText;
        nodeShapeLegendDivListElement.appendChild(nodeShapeLegendImageLabel);

        return nodeShapeLegendDivListElement;
    }
}