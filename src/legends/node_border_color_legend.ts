import { Constants } from './constants';
import { Style } from './style';
import {Color} from "../styles/constants/color";
import {Utility} from "./utility";

export class NodeBorderColorLegend {
    private borders: Array<string>;
    private utility: Utility;

    private MUTATED_INTERACTOR_IMG_URL=  require('./images/node-borders/mutated-interactor.svg');

    constructor(borders: any,utility: Utility) {
        this.utility = utility;
        this.borders = borders;
    }

    public createLegend(): HTMLDivElement {
        var nodeShapeLegendDiv = <HTMLDivElement>document.createElement('div');
        nodeShapeLegendDiv.setAttribute('id', Constants.NODE_BORDER_LEGEND_DIV_ID);
        nodeShapeLegendDiv.setAttribute('style', Style.LEGEND_DIV);

        var nodeShapeLegendHeader = <HTMLElement>document.createElement('h3');
        nodeShapeLegendHeader.setAttribute('style', Style.LEGEND_HEADER);
        nodeShapeLegendHeader.innerHTML = Constants.NODE_BORDER_LEGEND_TITLE;
        nodeShapeLegendDiv.appendChild(nodeShapeLegendHeader);

        this.borders.forEach(border => {
            switch(border){
                case Color.HIGHLIGHT_MUTATION: {
                    let nodeShapeLegendDivListElement =this.utility.createDivElementFor(this.MUTATED_INTERACTOR_IMG_URL,Constants.NODE_BORDER_MUTATED_LABEL,true);
                    nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                    break;
                }
                default: {
                    break;
                }
            }
        });

        return nodeShapeLegendDiv;
    }
}
