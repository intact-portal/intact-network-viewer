import { Constants } from './../constants';
import { Style } from './../style';
import { Utility } from './../utility';

export class NodeShapeLegend {
  private shapes: string[];
  private utility: Utility;

  private TAG_IMG_URL = require('./images/node-shapes/tag.svg');
  private ELLIPSE_IMG_URL = require('./images/node-shapes/ellipse.svg');
  private TRIANGLE_IMG_URL = require('./images/node-shapes/triangle.svg');
  private DIAMOND_IMG_URL = require('./images/node-shapes/diamond.svg');
  private ROUNDED_RECTANGLE_IMG_URL = require('./images/node-shapes/rounded-rectangle.svg');
  private CUT_TRIANGLE_IMG_URL = require('./images/node-shapes/upsidedown-cut-triangle.svg');

  constructor(shapes: any, utility: Utility) {
    this.utility = utility;
    this.shapes = shapes;
  }

  public createLegend(): HTMLDivElement {
    const legendDiv = this.utility.createLegendDivFor(
      Constants.NODE_SHAPE_LEGEND_DIV_ID,
      Constants.NODE_SHAPE_LEGEND_TITLE,
    );

    let isSingleElement: boolean = false;
    if (this.shapes.length === 1) {
      isSingleElement = true;
    }

    this.shapes.forEach(shape => {
      switch (shape) {
        case Constants.NODE_SHAPE_ELLIPSE: {
          const divListElement = this.utility.createDivElementFor(
            this.ELLIPSE_IMG_URL,
            Constants.NODE_SHAPE_ELLIPSE_LABEL,
            isSingleElement,
            false
          );
          legendDiv.appendChild(divListElement);
          break;
        }
        case Constants.NODE_SHAPE_TRIANGLE: {
          const divListElement = this.utility.createDivElementFor(
            this.TRIANGLE_IMG_URL,
            Constants.NODE_SHAPE_TRIANGLE_LABEL,
            isSingleElement,
            false
          );
          legendDiv.appendChild(divListElement);
          break;
        }
        case Constants.NODE_SHAPE_DIAMOND: {
          const divListElement = this.utility.createDivElementFor(
            this.DIAMOND_IMG_URL,
            Constants.NODE_SHAPE_DIAMOND_LABEL,
            isSingleElement,
            false
          );
          legendDiv.appendChild(divListElement);
          break;
        }
        case Constants.NODE_SHAPE_ROUNDED_RECTANGLE: {
          const divListElement = this.utility.createDivElementFor(
            this.ROUNDED_RECTANGLE_IMG_URL,
            Constants.NODE_SHAPE_ROUNDED_RECTANGLE_LABEL,
            isSingleElement,
            false
          );
          legendDiv.appendChild(divListElement);
          break;
        }
        case Constants.NODE_SHAPE_CUT_TRIANGLE: {
          const divListElement = this.utility.createDivElementFor(
            this.CUT_TRIANGLE_IMG_URL,
            Constants.NODE_SHAPE_CUT_TRIANGLE_LABEL,
            isSingleElement,
            false
          );
          legendDiv.appendChild(divListElement);
          break;
        }
        default: {
          const divListElement = this.utility.createDivElementFor(
            this.TAG_IMG_URL,
            Constants.NODE_SHAPE_TAG_LABEL,
            isSingleElement,
            false
          );
          legendDiv.appendChild(divListElement);
          break;
        }
      }
    });

    return legendDiv;
  }
}
