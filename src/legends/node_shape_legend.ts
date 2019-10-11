import { Constants } from './constants';
import { Style } from './style';
import {Utility} from "./utility";

export class NodeShapeLegend {
  private shapes: Array<string>;
  private utility: Utility;

  private TAG_IMG_URL=  require('./images/node-shapes/tag.svg');
  private ELLIPSE_IMG_URL=  require('./images/node-shapes/ellipse.svg');
  private TRIANGLE_IMG_URL=  require('./images/node-shapes/triangle.svg');
  private DIAMOND_IMG_URL=  require('./images/node-shapes/diamond.svg');
  private ROUNDED_RECTANGLE_IMG_URL=  require('./images/node-shapes/rounded-rectangle.svg');
  private CUT_TRIANGLE_IMG_URL=  require('./images/node-shapes/upsidedown-cut-triangle.svg');

  constructor(shapes: any,utility: Utility) {
    this.utility = utility;
    this.shapes = shapes;
  }

 public createLegend(): HTMLDivElement {
    var nodeShapeLegendDiv = <HTMLDivElement>document.createElement('div');
    nodeShapeLegendDiv.setAttribute('id', Constants.NODE_SHAPE_LEGEND_DIV_ID);
    nodeShapeLegendDiv.setAttribute('style', Style.LEGEND_DIV);

    var nodeShapeLegendHeader = <HTMLElement>document.createElement('h3');
    nodeShapeLegendHeader.setAttribute('style', Style.LEGEND_HEADER);
    nodeShapeLegendHeader.innerHTML = Constants.NODE_SHAPE_LEGEND_TITLE;
    nodeShapeLegendDiv.appendChild(nodeShapeLegendHeader);

     let isSingleElement : boolean = false;
     if(this.shapes.length == 1){
         isSingleElement = true;
     }

    this.shapes.forEach(shape => {
          switch(shape){
              case Constants.NODE_SHAPE_ELLIPSE: {
                  let nodeShapeLegendDivListElement =this.utility.createDivElementFor(this.ELLIPSE_IMG_URL,Constants.NODE_SHAPE_ELLIPSE_LABEL,isSingleElement);
                  nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                  break;
              }
              case Constants.NODE_SHAPE_TRIANGLE: {
                  let nodeShapeLegendDivListElement =this.utility.createDivElementFor(this.TRIANGLE_IMG_URL,Constants.NODE_SHAPE_TRIANGLE_LABEL,isSingleElement);
                  nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                  break;
              }
              case Constants.NODE_SHAPE_DIAMOND: {
                  let nodeShapeLegendDivListElement =this.utility.createDivElementFor(this.DIAMOND_IMG_URL,Constants.NODE_SHAPE_DIAMOND_LABEL,isSingleElement);
                  nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                  break;
              }
              case Constants.NODE_SHAPE_ROUNDED_RECTANGLE: {
                  let nodeShapeLegendDivListElement =this.utility.createDivElementFor(this.ROUNDED_RECTANGLE_IMG_URL,Constants.NODE_SHAPE_ROUNDED_RECTANGLE_LABEL,isSingleElement);
                  nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                  break;
              }
              case Constants.NODE_SHAPE_CUT_TRIANGLE: {
                  let nodeShapeLegendDivListElement =this.utility.createDivElementFor(this.CUT_TRIANGLE_IMG_URL,Constants.NODE_SHAPE_CUT_TRIANGLE_LABEL,isSingleElement);
                  nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                  break;
              }
              default: {
                  let nodeShapeLegendDivListElement =this.utility.createDivElementFor(this.TAG_IMG_URL,Constants.NODE_SHAPE_TAG_LABEL,isSingleElement);
                  nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                  break;
              }
          }
      });

    return nodeShapeLegendDiv;
  }
}
