import { Constants } from './constants';
import { Style } from './style';

export class NodeShapeLegend {
  private shapes: Array<string>;

  private TAG=  require('./images/node-shapes/tag.svg');
  private ELLIPSE=  require('./images/node-shapes/ellipse.svg');
  private TRIANGLE=  require('./images/node-shapes/triangle.svg');
  private DIAMOND=  require('./images/node-shapes/diamond.svg');
  private ROUNDED_RECTANGLE=  require('./images/node-shapes/rounded-rectangle.svg');
  private CUT_TRIANGLE=  require('./images/node-shapes/upsidedown-cut-triangle.svg');

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

    var nodeShapeLegendHeader = <HTMLElement>document.createElement('h3');
    nodeShapeLegendHeader.setAttribute('style', Style.LEGEND_HEADER);
    nodeShapeLegendHeader.innerHTML = Constants.NODE_SHAPE_LEGEND_TITLE;
    nodeShapeLegendDiv.appendChild(nodeShapeLegendHeader);

    this.shapes.forEach(shape => {
          switch(shape){
              case 'ellipse': {
                  let nodeShapeLegendDivListElement =this.createDivElementFor(this.ELLIPSE,Constants.NODE_SHAPE_ELLIPSE_LABEL);
                  nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                  break;
              }
              case 'triangle': {
                  let nodeShapeLegendDivListElement =this.createDivElementFor(this.TRIANGLE,Constants.NODE_SHAPE_TRIANGLE_LABEL);
                  nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                  break;
              }
              case 'diamond': {
                  let nodeShapeLegendDivListElement =this.createDivElementFor(this.DIAMOND,Constants.NODE_SHAPE_DIAMOND_LABEL);
                  nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                  break;
              }
              case 'round-rectangle': {
                  let nodeShapeLegendDivListElement =this.createDivElementFor(this.ROUNDED_RECTANGLE,Constants.NODE_SHAPE_ROUNDED_RECTANGLE_LABEL);
                  nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                  break;
              }
              case 'vee': {
                  let nodeShapeLegendDivListElement =this.createDivElementFor(this.CUT_TRIANGLE,Constants.NODE_SHAPE_CUT_TRIANGLE_LABEL);
                  nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                  break;
              }
              default: {
                  let nodeShapeLegendDivListElement =this.createDivElementFor(this.TAG,Constants.NODE_SHAPE_TAG_LABEL);
                  nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                  break;
              }
          }
      });

    return nodeShapeLegendDiv;
  }
}
