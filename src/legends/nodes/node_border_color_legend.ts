import { Constants } from './../constants';
import { Style } from './../style';
import {Color} from "../../styles/constants/color";
import {Utility} from "./../utility";

export class NodeBorderColorLegend {
    private borders: Array<string>;
    private utility: Utility;

    private MUTATED_INTERACTOR_IMG_URL=  require('./images/node-borders/mutated-interactor.svg');

    constructor(borders: any,utility: Utility) {
        this.utility = utility;
        this.borders = borders;
    }

    public createLegend(): HTMLDivElement {

        let legendDiv = this.utility.createLegendDivFor(Constants.NODE_BORDER_LEGEND_DIV_ID,Constants.NODE_BORDER_LEGEND_TITLE);

        this.borders.forEach(border => {
            let trimmedBorder = border.replace(/\s/g, "");
            switch(trimmedBorder){
                    case Color.HIGHLIGHT_MUTATION: {
                    let nodeShapeLegendDivListElement =this.utility.createDivElementFor(this.MUTATED_INTERACTOR_IMG_URL,Constants.NODE_BORDER_MUTATED_LABEL,true,false);
                        legendDiv.appendChild(nodeShapeLegendDivListElement);
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
