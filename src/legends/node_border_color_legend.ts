import { Constants } from './constants';
import { Style } from './style';

export class NodeBorderColorLegend {
    private borders: Array<string>;

    private MUTATED_INTERACTOR_IMG_URL=  require('./images/node-borders/mutated-interactor.svg');

    constructor(borders: any) {
        this.borders = borders;
    }

    private createDivElementFor(elementImage:string,elementText:string):HTMLDivElement {
        var nodeShapeLegendDivListElement = <HTMLDivElement>document.createElement('div');
        nodeShapeLegendDivListElement.setAttribute('style', Style.NODE_SHAPE_DIV_LIST);

        var nodeShapeLegendImage = <HTMLImageElement>document.createElement('img');
        nodeShapeLegendImage.setAttribute('src',elementImage);
        nodeShapeLegendImage.setAttribute('style',Style.NODE_SHAPE_IMG);
        nodeShapeLegendDivListElement.appendChild(nodeShapeLegendImage);

        var nodeShapeLegendImageLabel = <HTMLParagraphElement>document.createElement('p');
        nodeShapeLegendImageLabel.setAttribute('style',Style.NODE_SHAPE_TEXT);
        nodeShapeLegendImageLabel.innerHTML=elementText;
        nodeShapeLegendDivListElement.appendChild(nodeShapeLegendImageLabel);

        return nodeShapeLegendDivListElement;
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
                case Constants.NODE_BORDER_COLOR_MUTATED: {
                    let nodeShapeLegendDivListElement =this.createDivElementFor(this.MUTATED_INTERACTOR_IMG_URL,Constants.NODE_BORDER_MUTATED_LABEL);
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
