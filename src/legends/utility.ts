import { Style } from './style';

export class Utility {
  public createDivElementFor(elementImage: string, elementText: string): HTMLDivElement {
    const nodeShapeLegendDivListElement = document.createElement('div') as HTMLDivElement;
    const nodeShapeLegendImage = document.createElement('img') as HTMLImageElement;
    const nodeShapeLegendImageLabel = document.createTextNode(elementText);

    nodeShapeLegendImage.setAttribute('src', elementImage);
    nodeShapeLegendDivListElement.classList.add('legend-label');

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

  public shapeSorter(shapeA: string, shapeB: string): number {
    if (shapeA === 'tag') {
      return 1;
    }
    if (shapeB === 'tag') {
      return -1;
    }
    if (shapeA > shapeB) {
      return 1;
    }
    if (shapeB > shapeA) {
      return -1;
    }
    return 0;
  }
}
