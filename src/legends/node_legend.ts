import { Constants } from './constants';
import { Style } from './style';

export class NodeLegend {
  private nodes: any;
  private shapes: Set<string>;

  constructor(nodes: any) {
    this.nodes = nodes;
    this.shapes = new Set<string>();
    this.initializeNodeShapes();
  }

  private initializeNodeShapes(): void {
      this.nodes.forEach(node => {
           this.shapes.add(<string>node.data('shape'));
      });
  }

  private createDivElementFor(elementImage:string,elementText:string):HTMLDivElement {
      var nodeShapeLegendDivListElement = <HTMLDivElement>document.createElement('div');
      nodeShapeLegendDivListElement.setAttribute('style', Style.NODE_SHAPE_DIV_LIST);

      var nodeShapeLegendImage = <HTMLImageElement>document.createElement('img');
      nodeShapeLegendImage.setAttribute('src',elementImage);
      nodeShapeLegendImage.setAttribute('style',Style.NODE_SHAPE_IMG);
      nodeShapeLegendDivListElement.appendChild(nodeShapeLegendImage);

      var nodeShapeLegendImageLabel = <HTMLParagraphElement>document.createElement('p');
      nodeShapeLegendImageLabel.setAttribute('style',Style.NODE_SHAPE_TEXT);
      nodeShapeLegendImageLabel.innerHTML=elementText;
      nodeShapeLegendDivListElement.appendChild(nodeShapeLegendImageLabel);

      return nodeShapeLegendDivListElement;
  }

  public createLegend(layoutType: string): HTMLDivElement {
    var nodeShapeLegendDiv = <HTMLDivElement>document.createElement('div');
    nodeShapeLegendDiv.setAttribute('id', Constants.NODE_SHAPE_LEGEND_DIV_ID);

    var nodeShapeLegendHeader = <HTMLElement>document.createElement('h3');
    nodeShapeLegendHeader.setAttribute('style', Style.LEGEND_HEADER);
    nodeShapeLegendHeader.innerHTML = Constants.NODE_SHAPE_LEGEND_TITLE;
    nodeShapeLegendDiv.appendChild(nodeShapeLegendHeader);

    this.shapes.forEach(shape => {
          switch(shape){
              case 'ellipse': {
                  let nodeShapeLegendDivListElement =this.createDivElementFor('./images/ellipse.svg',Constants.NODE_SHAPE_ELLIPSE_LABEL);
                  nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                  break;
              }
              case 'triangle': {
                  let nodeShapeLegendDivListElement =this.createDivElementFor('./images/triangle.svg',Constants.NODE_SHAPE_TRIANGLE_LABEL);
                  nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                  break;
              }
              case 'diamond': {
                  let nodeShapeLegendDivListElement =this.createDivElementFor('./images/diamond.svg',Constants.NODE_SHAPE_DIAMOND_LABEL);
                  nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                  break;
              }
              case 'round-rectangle': {
                  let nodeShapeLegendDivListElement =this.createDivElementFor('./images/rounded-rectangle.svg',Constants.NODE_SHAPE_ROUNDED_RECTANGLE_LABEL);
                  nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                  break;
              }
              case 'vee': {
                  let nodeShapeLegendDivListElement =this.createDivElementFor('./images/upsidedown-cut-triangle.svg',Constants.NODE_SHAPE_CUT_TRIANGLE_LABEL);
                  nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                  break;
              }
              default: {
                  let nodeShapeLegendDivListElement =this.createDivElementFor('./images/tag.svg',Constants.NODE_SHAPE_TAG_LABEL);
                  nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                  break;
              }
          }
      });

    return nodeShapeLegendDiv;
  }
}
