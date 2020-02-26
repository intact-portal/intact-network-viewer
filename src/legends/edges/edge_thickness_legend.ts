import { Width } from '../../styles/constants/width';
import { Constants } from '../constants';
import { Utility } from '../utility';

export class EdgeThicknessLegend {
  private thickness: string[];
  private utility: Utility;

  private SINGLE_INTERACTION_COLLAPSED_IMG_URL = require('./images/edge-thickness/continuous-line.svg');
  private MULT_INTERACTION_COLLAPSED_IMG_URL = require('./images/edge-thickness/thick-line.svg');

  constructor(thickness: any, utility: Utility) {
    this.utility = utility;
    this.thickness = thickness;
  }

  public createLegend(): HTMLDivElement {
    const legendDiv = this.utility.createLegendDivFor(
      Constants.EDGE_THICKNESS_LEGEND_DIV_ID,
      Constants.EDGE_THICKNESS_LEGEND_TITLE
    );

    this.thickness.forEach(thickness => {
      switch (thickness) {
        case Width.COLLAPSED_EDGE: {
          const divListElement = this.utility.createDivElementFor(this.MULT_INTERACTION_COLLAPSED_IMG_URL, Constants.EDGE_MULT_INTERACTION_COLLAPSED_LABEL);
          legendDiv.appendChild(divListElement);
          break;
        }
        case Width.DEFAULT_EDGE: {
          const divListElement = this.utility.createDivElementFor(this.SINGLE_INTERACTION_COLLAPSED_IMG_URL, Constants.EDGE_SINGLE_INTERACTION_COLLAPSED_LABEL);
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
