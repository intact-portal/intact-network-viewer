import { Constants } from './../constants';
import { Style } from './../style';
import { Utility } from './../utility';

export class NodeColorLegend {
  private colors: string[];
  private utility: Utility;

  private HOMO_SAPIENS_IMG_URL = require('./images/node-colors/homo-sapiens.svg');
  private ARABIDOPSIS_THALIANA_IMG_URL = require('./images/node-colors/arabidopsis-thaliana.svg');
  private CAENORHABDITIS_ELEGANS_IMG_URL = require('./images/node-colors/caenorhabditis-elegans.svg');
  private CHEMICAL_SYNTHESIS_IMG_URL = require('./images/node-colors/chemical-synthesis.svg');
  private DROSOPHILA_MELANOGASTER_IMG_URL = require('./images/node-colors/drosophila-melanogaster.svg');
  private ESCHERICHIA_COLI_IMG_URL = require('./images/node-colors/escherichia-coli.svg');
  private MOUSE_IMG_URL = require('./images/node-colors/mouse.svg');
  private SACCHAROMYCES_CEREVISIAE_IMG_URL = require('./images/node-colors/saccharomyces-cerevisiae.svg');
  private META_NODE_IMG_URL = require('./images/node-colors/meta-node.svg');
  private OTHERS_IMG_URL = require('./images/node-colors/others.svg');

  constructor(colors: any, utility: Utility) {
    this.utility = utility;
    this.colors = colors;
  }

  public createLegend(): HTMLDivElement {
    const legendDiv = this.utility.createLegendDivFor(
      Constants.NODE_COLOR_LEGEND_DIV_ID,
      Constants.NODE_COLOR_LEGEND_TITLE
    );

    let isSingleElement: boolean = false;
    if (this.colors.length === 1) {
      isSingleElement = true;
    }

    this.colors.forEach(color => {
      const trimmedColor = color.replace(/\s/g, '');
      switch (trimmedColor) {
        case Constants.NODE_COLOR_HOMO_SAPIENS: {
          const divListElement = this.utility.createDivElementFor(
            this.HOMO_SAPIENS_IMG_URL,
            Constants.NODE_COLOR_HOMO_SAPIENS_LABEL,
            isSingleElement,
            false
          );
          legendDiv.appendChild(divListElement);
          break;
        }
        case Constants.NODE_COLOR_ARABIDOPSIS_THALIANA: {
          const divListElement = this.utility.createDivElementFor(
            this.ARABIDOPSIS_THALIANA_IMG_URL,
            Constants.NODE_COLOR_ARABIDOPSIS_THALIANA_LABEL,
            isSingleElement,
            false
          );
          legendDiv.appendChild(divListElement);
          break;
        }
        case Constants.NODE_COLOR_CAENORHABDITIS_ELEGANS: {
          const divListElement = this.utility.createDivElementFor(
            this.CAENORHABDITIS_ELEGANS_IMG_URL,
            Constants.NODE_COLOR_CAENORHABDITIS_ELEGANS_LABEL,
            isSingleElement,
            false
          );
          legendDiv.appendChild(divListElement);
          break;
        }
        case Constants.NODE_COLOR_CHEMICAL_SYNTHESIS: {
          const divListElement = this.utility.createDivElementFor(
            this.CHEMICAL_SYNTHESIS_IMG_URL,
            Constants.NODE_COLOR_CHEMICAL_SYNTHESIS_LABEL,
            isSingleElement,
            false
          );
          legendDiv.appendChild(divListElement);
          break;
        }
        case Constants.NODE_COLOR_DROSOPHILA_MELANOGASTER: {
          const divListElement = this.utility.createDivElementFor(
            this.DROSOPHILA_MELANOGASTER_IMG_URL,
            Constants.NODE_COLOR_DROSOPHILA_MELANOGASTER_LABEL,
            isSingleElement,
            false
          );
          legendDiv.appendChild(divListElement);
          break;
        }
        case Constants.NODE_COLOR_ESCHERICHIA_COLI: {
          const divListElement = this.utility.createDivElementFor(
            this.ESCHERICHIA_COLI_IMG_URL,
            Constants.NODE_COLOR_ESCHERICHIA_COLI_LABEL,
            isSingleElement,
            false
          );
          legendDiv.appendChild(divListElement);
          break;
        }
        case Constants.NODE_COLOR_MOUSE: {
          const divListElement = this.utility.createDivElementFor(
            this.MOUSE_IMG_URL,
            Constants.NODE_COLOR_MOUSE_LABEL,
            isSingleElement,
            false
          );
          legendDiv.appendChild(divListElement);
          break;
        }
        case Constants.NODE_COLOR_SACCHAROMYCES_CEREVISIAE: {
          const divListElement = this.utility.createDivElementFor(
            this.SACCHAROMYCES_CEREVISIAE_IMG_URL,
            Constants.NODE_COLOR_SACCHAROMYCES_CEREVISIAE_LABEL,
            isSingleElement,
            false
          );
          legendDiv.appendChild(divListElement);
          break;
        }
        case Constants.META_NODE_COLOR: {
          const divListElement = this.utility.createDivElementFor(
            this.META_NODE_IMG_URL,
            Constants.META_NODE_COLOR_LABEL,
            isSingleElement,
            false
          );
          legendDiv.appendChild(divListElement);
          break;
        }
        default: {
          const divListElement = this.utility.createDivElementFor(
            this.OTHERS_IMG_URL,
            Constants.NODE_COLOR_OTHERS_LABEL,
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
