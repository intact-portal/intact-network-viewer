import { Style } from './style';

export class Utility {
  public createDivElementFor(
      elementImage: string,
      elementText: string
  ): HTMLDivElement {

    const nodeShapeLegendDivListElement = document.createElement('div') as HTMLDivElement;
    const nodeShapeLegendImage = document.createElement('img') as HTMLImageElement;
    const nodeShapeLegendImageLabel = document.createTextNode(elementText);

    nodeShapeLegendImage.setAttribute('src', elementImage);

    nodeShapeLegendDivListElement.appendChild(nodeShapeLegendImage);
    nodeShapeLegendDivListElement.appendChild(nodeShapeLegendImageLabel);

    return nodeShapeLegendDivListElement;
  }

  public createLegendDivFor(legendDivId: string, legendTitle: string): HTMLDivElement {
    const legendDiv = document.createElement('div') as HTMLDivElement;
    const legendHeader = document.createElement('h5') as HTMLElement;

    legendHeader.innerHTML = legendTitle;

    legendDiv.setAttribute('id', legendDivId);
    legendDiv.appendChild(legendHeader);

    return legendDiv;
  }
}
