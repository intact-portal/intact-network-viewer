import { NetworkViewerStates } from '../../network_viewer_states';
import { Constants } from './../constants';
import { Style } from './../style';
import { Utility } from './../utility';

export class EdgeColorLegend {
  private colors: string[];
  private utility: Utility;

  private PHYSICAL_ASSOCIATION_IMG_URL = require('./images/edge-colors/physical-association.svg');
  private ASSOCIATION_IMG_URL = require('./images/edge-colors/association.svg');
  private COLOCALIZATION_IMG_URL = require('./images/edge-colors/colocalization.svg');
  private DEPHOSPHORYLATION_REACTION_IMG_URL = require('./images/edge-colors/dephosphorylation-reaction.svg');
  private DIRECT_INTERACTION_IMG_URL = require('./images/edge-colors/direct-interaction.svg');
  private MUTATION_IN_INTERACTION_IMG_URL = require('./images/edge-colors/mutation-in-interaction.svg');
  private OTHERS_IMG_URL = require('./images/edge-colors/others.svg');
  private PHOSPHORYLATION_REACTION_IMG_URL = require('./images/edge-colors/phosphorylation-reaction.svg');
  private MI_SCORE_IMG_URL = require('./images/edge-colors/miscore.svg');

  constructor(colors: any, utility: Utility) {
    this.utility = utility;
    this.colors = colors;
  }

  public createLegend(graphState: string): HTMLDivElement {
    const legendDiv = this.utility.createLegendDivFor(
        Constants.EDGE_COLOR_LEGEND_DIV_ID,
        Constants.EDGE_COLOR_LEGEND_TITLE
    );

    if (graphState === NetworkViewerStates.COLLAPSED) {
      legendDiv.appendChild(this.createMiScoreDivElement(this.MI_SCORE_IMG_URL));
    } else {
      let isSingleElement: boolean = false;
      if (this.colors.length === 1) {
        isSingleElement = true;
      }

      this.colors.forEach(color => {
        const trimmedColor = color.replace(/\s/g, '');
        switch (trimmedColor) {
          case Constants.EDGE_COLOR_PHYSICAL_ASSOCIATION: {
            const divListElement = this.utility.createDivElementFor(
                this.PHYSICAL_ASSOCIATION_IMG_URL,
                Constants.EDGE_COLOR_PHYSICAL_ASSOCIATION_LABEL,
                isSingleElement,
                true
            );
            legendDiv.appendChild(divListElement);
            break;
          }
          case Constants.EDGE_COLOR_ASSOCIATION: {
            const divListElement = this.utility.createDivElementFor(
                this.ASSOCIATION_IMG_URL,
                Constants.EDGE_COLOR_ASSOCIATION_LABEL,
                isSingleElement,
                true
            );
            legendDiv.appendChild(divListElement);
            break;
          }
          case Constants.EDGE_COLOR_COLOCALIZATION: {
            const divListElement = this.utility.createDivElementFor(
                this.COLOCALIZATION_IMG_URL,
                Constants.EDGE_COLOR_COLOCALIZATION_LABEL,
                isSingleElement,
                true
            );
            legendDiv.appendChild(divListElement);
            break;
          }
          case Constants.EDGE_COLOR_DEPHOSPHORYLATION_REACTION: {
            const divListElement = this.utility.createDivElementFor(
                this.DEPHOSPHORYLATION_REACTION_IMG_URL,
                Constants.EDGE_COLOR_DEPHOSPHORYLATION_REACTION_LABEL,
                isSingleElement,
                true
            );
            legendDiv.appendChild(divListElement);
            break;
          }
          case Constants.EDGE_COLOR_DIRECT_INTERACTION: {
            const divListElement = this.utility.createDivElementFor(
                this.DIRECT_INTERACTION_IMG_URL,
                Constants.EDGE_COLOR_DIRECT_INTERACTION_LABEL,
                isSingleElement,
                true
            );
            legendDiv.appendChild(divListElement);
            break;
          }
          case Constants.EDGE_COLOR_MUTATION_IN_INTERACTION: {
            const divListElement = this.utility.createDivElementFor(
                this.MUTATION_IN_INTERACTION_IMG_URL,
                Constants.EDGE_COLOR_MUTATION_IN_INTERACTION_LABEL,
                true,
                true
            );
            legendDiv.appendChild(divListElement);
            break;
          }
          case Constants.EDGE_COLOR_PHOSPHORYLATION_REACTION: {
            const divListElement = this.utility.createDivElementFor(
                this.PHOSPHORYLATION_REACTION_IMG_URL,
                Constants.EDGE_COLOR_PHOSPHORYLATION_REACTION_LABEL,
                isSingleElement,
                true
            );
            legendDiv.appendChild(divListElement);
            break;
          }
          case Constants.EDGE_COLOR_OTHERS: {
            const divListElement = this.utility.createDivElementFor(
                this.OTHERS_IMG_URL,
                Constants.EDGE_COLOR_OTHERS_LABEL,
                isSingleElement,
                true
            );
            legendDiv.appendChild(divListElement);
            break;
          }
          default: {
            break;
          }
        }
      });
    }

    return legendDiv;
  }

  private createMiScoreDivElement(elementImage: string): HTMLDivElement {
    const miscoreLegendDivElement = document.createElement('div') as HTMLDivElement;

    miscoreLegendDivElement.setAttribute('style', Style.MISCORE_SUB_DIV);

    const miScoreLegendImage = document.createElement('img') as HTMLImageElement;
    miScoreLegendImage.setAttribute('src', elementImage);

    miScoreLegendImage.setAttribute('style', Style.MISCORE_GRADIENT_IMG);
    miscoreLegendDivElement.appendChild(miScoreLegendImage);

    const miScoreLegendImageLabel = document.createElement('p') as HTMLParagraphElement;
    miScoreLegendImageLabel.setAttribute('style', Style.MISCORE_TEXT);
    miScoreLegendImageLabel.innerHTML = Constants.MI_SCORE_LABEL;
    miscoreLegendDivElement.appendChild(miScoreLegendImageLabel);

    return miscoreLegendDivElement;
  }


}
