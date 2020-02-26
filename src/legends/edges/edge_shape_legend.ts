import { Constants } from './../constants';
import { Utility } from './../utility';

export class EdgeShapesLegend {
  private shapes: string[];
  private utility: Utility;

  private SPOKE_EXPANDED_IMG_URL = require('./images/edge-shapes/dashed-line.svg');

  constructor(shapes: any, utility: Utility) {
    this.utility = utility;
    this.shapes = shapes;
  }

  public createLegend(): HTMLDivElement {
    const legendDiv = this.utility.createLegendDivFor(
      Constants.EDGE_SHAPES_LEGEND_DIV_ID,
      Constants.EDGE_SHAPES_LEGEND_TITLE
    );

    this.shapes.forEach(shapes => {
      switch (shapes) {
        case Constants.EDGE_SHAPE_SPOKE_EXPANDED: {
          const divListElement = this.utility.createDivElementFor(this.SPOKE_EXPANDED_IMG_URL, Constants.EDGE_SHAPE_SPOKE_EXPANDED_LABEL);
          legendDiv.appendChild(divListElement);
          break;
        }
        default: {
          break;
        }
      }
    });
    return legendDiv;
  }
}
