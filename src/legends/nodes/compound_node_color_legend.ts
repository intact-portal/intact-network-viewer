import { Constants } from './../constants';
import { Utility } from './../utility';

export class CompoundNodeColorLegend {
  private colors: string[];
  private utility: Utility;

  private META_NODE_IMG_URL = require('./images/node-colors/meta-node.svg');
  private OTHERS_IMG_URL = require('./images/node-colors/others.svg');

  constructor(colors: any, utility: Utility) {
    this.utility = utility;
    this.colors = colors;
  }

  public createLegend(): HTMLDivElement {
    const legendDiv = this.utility.createLegendDivFor(
      Constants.COMPOUND_NODE_COLOR_LEGEND_DIV_ID,
      Constants.COMPOUND_NODE_COLOR_LEGEND_TITLE
    );

    this.colors.forEach(color => {
      const trimmedColor = color.replace(/\s/g, '');
      switch (trimmedColor) {
        case Constants.META_NODE_COLOR: {
          const divListElement = this.utility.createDivElementFor(this.META_NODE_IMG_URL, Constants.META_NODE_COLOR_LABEL);
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
