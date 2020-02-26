import { Color } from '../../styles/constants/color';
import { Constants } from './../constants';
import { Utility } from './../utility';

export class NodeBorderColorLegend {
  private borders: string[];
  private utility: Utility;

  private MUTATED_INTERACTOR_IMG_URL = require('./images/node-borders/mutated-interactor.svg');

  constructor(borders: any, utility: Utility) {
    this.utility = utility;
    this.borders = borders;
  }

  public createLegend(): HTMLDivElement {
    const legendDiv = this.utility.createLegendDivFor(
      Constants.NODE_BORDER_LEGEND_DIV_ID,
      Constants.NODE_BORDER_LEGEND_TITLE
    );

    this.borders.forEach(border => {
      const trimmedBorder = border.replace(/\s/g, '');
      switch (trimmedBorder) {
        case Color.HIGHLIGHT_MUTATION: {
          const divListElement = this.utility.createDivElementFor(this.MUTATED_INTERACTOR_IMG_URL, Constants.NODE_BORDER_MUTATED_LABEL);
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
