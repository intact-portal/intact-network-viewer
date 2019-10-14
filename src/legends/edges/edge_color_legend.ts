import { Constants } from './../constants';
import { Style } from './../style';
import {Utility} from "./../utility";
import {NetworkViewerStates} from "../../network_viewer_states";

export class EdgeColorLegend {
    private colors: Array<string>;
    private utility: Utility;

    private PHYSICAL_ASSOCIATION_IMG_URL=  require('./images/edge-colors/physical-association.svg');
    private ASSOCIATION_IMG_URL=  require('./images/edge-colors/association.svg');
    private COLOCALIZATION_IMG_URL=  require('./images/edge-colors/colocalization.svg');
    private DEPHOSPHORYLATION_REACTION_IMG_URL=  require('./images/edge-colors/dephosphorylation-reaction.svg');
    private DIRECT_INTERACTION_IMG_URL=  require('./images/edge-colors/direct-interaction.svg');
    private MUTATION_IN_INTERACTION_IMG_URL=  require('./images/edge-colors/mutation-in-interaction.svg');
    private OTHERS_IMG_URL=  require('./images/edge-colors/others.svg');
    private PHOSPHORYLATION_REACTION_IMG_URL=  require('./images/edge-colors/phosphorylation-reaction.svg');
    private MI_SCORE_IMG_URL=  require('./images/edge-colors/miscore.svg');

    constructor(colors: any,utility: Utility) {
        this.utility = utility;
        this.colors = colors;
    }

    private createMiScoreDivElement(elementImage:string):HTMLDivElement {
        let nodeShapeLegendDivListElement = <HTMLDivElement>document.createElement('div');
        let divStyle;
        let  textstyle;

        nodeShapeLegendDivListElement.setAttribute('style', Style.LEGEND_SUB_DIV);

        let nodeShapeLegendImage = <HTMLImageElement>document.createElement('img');
        nodeShapeLegendImage.setAttribute('src',elementImage);

        //nodeShapeLegendImage.setAttribute('style',imgStyle);
        nodeShapeLegendDivListElement.appendChild(nodeShapeLegendImage);

        return nodeShapeLegendDivListElement;
    }

    public createLegend(layoutType: string): HTMLDivElement {
        var nodeShapeLegendDiv = <HTMLDivElement>document.createElement('div');
        nodeShapeLegendDiv.setAttribute('id', Constants.EDGE_COLOR_LEGEND_DIV_ID);
        nodeShapeLegendDiv.setAttribute('style', Style.LEGEND_DIV);

        var nodeShapeLegendHeader = <HTMLElement>document.createElement('h3');
        nodeShapeLegendHeader.setAttribute('style', Style.LEGEND_HEADER);
        nodeShapeLegendHeader.innerHTML = Constants.EDGE_COLOR_LEGEND_TITLE;
        nodeShapeLegendDiv.appendChild(nodeShapeLegendHeader);

        if(layoutType==NetworkViewerStates.COLLAPSED){
            nodeShapeLegendDiv.appendChild(this.createMiScoreDivElement(this.MI_SCORE_IMG_URL));
        }else {

            let isSingleElement:boolean = false;
            if (this.colors.length == 1) {
                isSingleElement = true;
            }

            this.colors.forEach(color => {
                let trimmedColor = color.replace(/\s/g, "");
                switch (trimmedColor) {
                    case Constants.EDGE_COLOR_PHYSICAL_ASSOCIATION:
                    {
                        let nodeShapeLegendDivListElement = this.utility.createDivElementFor(this.PHYSICAL_ASSOCIATION_IMG_URL, Constants.EDGE_COLOR_PHYSICAL_ASSOCIATION_LABEL, isSingleElement, true);
                        nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                        break;
                    }
                    case Constants.EDGE_COLOR_ASSOCIATION:
                    {
                        let nodeShapeLegendDivListElement = this.utility.createDivElementFor(this.ASSOCIATION_IMG_URL, Constants.EDGE_COLOR_ASSOCIATION_LABEL, isSingleElement, true);
                        nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                        break;
                    }
                    case Constants.EDGE_COLOR_COLOCALIZATION:
                    {
                        let nodeShapeLegendDivListElement = this.utility.createDivElementFor(this.COLOCALIZATION_IMG_URL, Constants.EDGE_COLOR_COLOCALIZATION_LABEL, isSingleElement, true);
                        nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                        break;
                    }
                    case Constants.EDGE_COLOR_DEPHOSPHORYLATION_REACTION:
                    {
                        let nodeShapeLegendDivListElement = this.utility.createDivElementFor(this.DEPHOSPHORYLATION_REACTION_IMG_URL, Constants.EDGE_COLOR_DEPHOSPHORYLATION_REACTION_LABEL, isSingleElement, true);
                        nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                        break;
                    }
                    case Constants.EDGE_COLOR_DIRECT_INTERACTION:
                    {
                        let nodeShapeLegendDivListElement = this.utility.createDivElementFor(this.DIRECT_INTERACTION_IMG_URL, Constants.EDGE_COLOR_DIRECT_INTERACTION_LABEL, isSingleElement, true);
                        nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                        break;
                    }
                    case Constants.EDGE_COLOR_MUTATION_IN_INTERACTION:
                    {
                        let nodeShapeLegendDivListElement = this.utility.createDivElementFor(this.MUTATION_IN_INTERACTION_IMG_URL, Constants.EDGE_COLOR_MUTATION_IN_INTERACTION_LABEL, isSingleElement, true);
                        nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                        break;
                    }
                    case Constants.EDGE_COLOR_PHOSPHORYLATION_REACTION:
                    {
                        let nodeShapeLegendDivListElement = this.utility.createDivElementFor(this.PHOSPHORYLATION_REACTION_IMG_URL, Constants.EDGE_COLOR_PHOSPHORYLATION_REACTION_LABEL, isSingleElement, true);
                        nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                        break;
                    }
                    default:
                    {
                        let nodeShapeLegendDivListElement = this.utility.createDivElementFor(this.OTHERS_IMG_URL, Constants.EDGE_COLOR_OTHERS_LABEL, isSingleElement, true);
                        nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                        break;
                    }
                }
            });
        }

        return nodeShapeLegendDiv;
    }
}
