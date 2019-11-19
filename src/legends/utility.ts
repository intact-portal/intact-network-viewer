import { Style } from './style';

export class Utility {
  public createDivElementFor(
    elementImage: string,
    elementText: string,
    isSingleDiv: boolean,
    isEdge: boolean
  ): HTMLDivElement {
    const nodeShapeLegendDivListElement = document.createElement('div') as HTMLDivElement;
    let divStyle;
    let textstyle;

    if (isSingleDiv) {
      divStyle = Style.LEGEND_SUB_DIV;
      textstyle = Style.TEXT;
    } else {
      divStyle = Style.DIV_LIST;
      textstyle = Style.TEXTS;
    }
    nodeShapeLegendDivListElement.setAttribute('style', divStyle);

    const nodeShapeLegendImage = document.createElement('img') as HTMLImageElement;
    nodeShapeLegendImage.setAttribute('src', elementImage);

    let imgStyle;
    if (isEdge) {
      imgStyle = Style.EDGE_IMG;
    } else {
      imgStyle = Style.NODE_IMG;
    }
    nodeShapeLegendImage.setAttribute('style', imgStyle);
    nodeShapeLegendDivListElement.appendChild(nodeShapeLegendImage);

    const nodeShapeLegendImageLabel = document.createElement('p') as HTMLParagraphElement;
    nodeShapeLegendImageLabel.setAttribute('style', textstyle);
    nodeShapeLegendImageLabel.innerHTML = elementText;
    nodeShapeLegendDivListElement.appendChild(nodeShapeLegendImageLabel);

    return nodeShapeLegendDivListElement;
  }

  public createLegendDivFor(legendDivId: string, legendTitle: string): HTMLDivElement {
    const legendDiv = document.createElement('div') as HTMLDivElement;
    legendDiv.setAttribute('id', legendDivId);
    legendDiv.setAttribute('style', Style.LEGEND_DIV);

    const legendHeader = document.createElement('h3') as HTMLElement;
    legendHeader.setAttribute('style', Style.LEGEND_HEADER);
    legendHeader.innerHTML = legendTitle;
    legendDiv.appendChild(legendHeader);

    return legendDiv;
  }
}
