import { Constants } from './../constants';
import { Style } from './../style';
import { Utility } from './../utility';
import { NetworkViewerStates } from '../../network_viewer_states';
import { Width } from '../../styles/constants/width';

export class EdgeThicknessLegend {
  private thickness: Array<string>;
  private utility: Utility;

  private SINGLE_INTERACTION_COLLAPSED_IMG_URL = require('./images/edge-thickness/continious-line.svg');
  private MULT_INTERACTION_COLLAPSED_IMG_URL = require('./images/edge-thickness/thick-line.svg');

  constructor(thickness: any, utility: Utility) {
    this.utility = utility;
    this.thickness = thickness;
  }

  public createLegend(): HTMLDivElement {
    let legendDiv = this.utility.createLegendDivFor(
      Constants.EDGE_THICKNESS_LEGEND_DIV_ID,
      Constants.EDGE_THICKNESS_LEGEND_TITLE,
    );

    let isSingleElement: boolean = false;
    if (this.thickness.length == 1) {
      isSingleElement = true;
    }

    this.thickness.forEach(thickness => {
      switch (thickness) {
        case Width.COLLAPSED_EDGE: {
          let divListElement = this.utility.createDivElementFor(
            this.MULT_INTERACTION_COLLAPSED_IMG_URL,
            Constants.EDGE_MULT_INTERACTION_COLLAPSED_LABEL,
            isSingleElement,
            true,
          );
          legendDiv.appendChild(divListElement);
          break;
        }
        case Width.DEFAULT_EDGE: {
          let divListElement = this.utility.createDivElementFor(
            this.SINGLE_INTERACTION_COLLAPSED_IMG_URL,
            Constants.EDGE_SINGLE_INTERACTION_COLLAPSED_LABEL,
            isSingleElement,
            true,
          );
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
