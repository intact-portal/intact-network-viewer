import { Constants } from './constants';
import { Style } from './style';

export class NodeColorLegend {
    private colors: Array<string>;

    private HOMO_SAPIENS=  require('./images/node-colors/homo-sapiens.svg');

    constructor(colors: any) {
        this.colors = colors;
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

    public createLegend(layoutType: string): HTMLDivElement {
        var nodeShapeLegendDiv = <HTMLDivElement>document.createElement('div');
        nodeShapeLegendDiv.setAttribute('id', Constants.NODE_SHAPE_LEGEND_DIV_ID);

        var nodeShapeLegendHeader = <HTMLElement>document.createElement('h3');
        nodeShapeLegendHeader.setAttribute('style', Style.LEGEND_HEADER);
        nodeShapeLegendHeader.innerHTML = Constants.NODE_SHAPE_LEGEND_TITLE;
        nodeShapeLegendDiv.appendChild(nodeShapeLegendHeader);

        this.colors.forEach(shape => {
            switch(shape){
                case Constants.NODE_COLOR_HOMO_SAPEINS: {
                    let nodeShapeLegendDivListElement =this.createDivElementFor(this.HOMO_SAPIENS,Constants.NODE_SHAPE_ELLIPSE_LABEL);
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
