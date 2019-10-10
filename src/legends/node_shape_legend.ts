import { Constants } from './constants';
import { Style } from './style';

export class NodeShapeLegend {
  private shapes: Array<string>;

  private TAG_IMG_URL=  require('./images/node-shapes/tag.svg');
  private ELLIPSE_IMG_URL=  require('./images/node-shapes/ellipse.svg');
  private TRIANGLE_IMG_URL=  require('./images/node-shapes/triangle.svg');
  private DIAMOND_IMG_URL=  require('./images/node-shapes/diamond.svg');
  private ROUNDED_RECTANGLE_IMG_URL=  require('./images/node-shapes/rounded-rectangle.svg');
  private CUT_TRIANGLE_IMG_URL=  require('./images/node-shapes/upsidedown-cut-triangle.svg');

  constructor(shapes: any) {
    this.shapes = shapes;
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
    nodeShapeLegendDiv.setAttribute('style', Style.LEGEND_DIV);

    var nodeShapeLegendHeader = <HTMLElement>document.createElement('h3');
    nodeShapeLegendHeader.setAttribute('style', Style.LEGEND_HEADER);
    nodeShapeLegendHeader.innerHTML = Constants.NODE_SHAPE_LEGEND_TITLE;
    nodeShapeLegendDiv.appendChild(nodeShapeLegendHeader);

    this.shapes.forEach(shape => {
          switch(shape){
              case Constants.NODE_SHAPE_ELLIPSE: {
                  let nodeShapeLegendDivListElement =this.createDivElementFor(this.ELLIPSE_IMG_URL,Constants.NODE_SHAPE_ELLIPSE_LABEL);
                  nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                  break;
              }
              case Constants.NODE_SHAPE_TRIANGLE: {
                  let nodeShapeLegendDivListElement =this.createDivElementFor(this.TRIANGLE_IMG_URL,Constants.NODE_SHAPE_TRIANGLE_LABEL);
                  nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                  break;
              }
              case Constants.NODE_SHAPE_DIAMOND: {
                  let nodeShapeLegendDivListElement =this.createDivElementFor(this.DIAMOND_IMG_URL,Constants.NODE_SHAPE_DIAMOND_LABEL);
                  nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                  break;
              }
              case Constants.NODE_SHAPE_ROUNDED_RECTANGLE: {
                  let nodeShapeLegendDivListElement =this.createDivElementFor(this.ROUNDED_RECTANGLE_IMG_URL,Constants.NODE_SHAPE_ROUNDED_RECTANGLE_LABEL);
                  nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                  break;
              }
              case Constants.NODE_SHAPE_CUT_TRIANGLE: {
                  let nodeShapeLegendDivListElement =this.createDivElementFor(this.CUT_TRIANGLE_IMG_URL,Constants.NODE_SHAPE_CUT_TRIANGLE_LABEL);
                  nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                  break;
              }
              default: {
                  let nodeShapeLegendDivListElement =this.createDivElementFor(this.TAG_IMG_URL,Constants.NODE_SHAPE_TAG_LABEL);
                  nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                  break;
              }
          }
      });

    return nodeShapeLegendDiv;
  }
}
