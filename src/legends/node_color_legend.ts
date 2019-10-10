import { Constants } from './constants';
import { Style } from './style';
import {NetworkViewerStates} from "../network_viewer_states";

export class NodeColorLegend {
    private colors: Array<string>;

    private HOMO_SAPIENS_IMG_URL=  require('./images/node-colors/homo-sapiens.svg');
    private ARABIDOPSIS_THALIANA_IMG_URL = require('./images/node-colors/arabidopsis-thaliana.svg');
    private CAENORHABDITIS_ELEGANS_IMG_URL=  require('./images/node-colors/caenorhabditis-elegans.svg');
    private CHEMICAL_SYNTHESIS_IMG_URL=  require('./images/node-colors/chemical-synthesis.svg');
    private DROSOPHILA_MELANOGASTER_IMG_URL=  require('./images/node-colors/drosophila-melanogaster.svg');
    private ESCHERICHIA_COLI_IMG_URL=  require('./images/node-colors/escherichia-coli.svg');
    private MOUSE_IMG_URL=  require('./images/node-colors/mouse.svg');
    private SACCHAROMYCES_CEREVISIAE_IMG_URL=  require('./images/node-colors/saccharomyces-cerevisiae.svg');
    private OTHERS_IMG_URL=  require('./images/node-colors/others.svg');

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
        nodeShapeLegendDiv.setAttribute('id', Constants.NODE_COLOR_LEGEND_DIV_ID);
        nodeShapeLegendDiv.setAttribute('style', Style.LEGEND_DIV);

        var nodeShapeLegendHeader = <HTMLElement>document.createElement('h3');
        nodeShapeLegendHeader.setAttribute('style', Style.LEGEND_HEADER);
        nodeShapeLegendHeader.innerHTML = Constants.NODE_COLOR_LEGEND_TITLE;
        nodeShapeLegendDiv.appendChild(nodeShapeLegendHeader);

        this.colors.forEach(color => {
            switch(color){
                case Constants.NODE_COLOR_HOMO_SAPIENS: {
                    let nodeShapeLegendDivListElement =this.createDivElementFor(this.HOMO_SAPIENS_IMG_URL,Constants.NODE_COLOR_HOMO_SAPIENS_LABEL);
                    nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                    break;
                }
                case Constants.NODE_COLOR_ARABIDOPSIS_THALIANA: {
                    let nodeShapeLegendDivListElement =this.createDivElementFor(this.ARABIDOPSIS_THALIANA_IMG_URL,Constants.NODE_COLOR_ARABIDOPSIS_THALIANA_LABEL);
                    nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                    break;
                }
                case Constants.NODE_COLOR_CAENORHABDITIS_ELEGANS: {
                    let nodeShapeLegendDivListElement =this.createDivElementFor(this.CAENORHABDITIS_ELEGANS_IMG_URL,Constants.NODE_COLOR_CAENORHABDITIS_ELEGANS_LABEL);
                    nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                    break;
                }
                case Constants.NODE_COLOR_CHEMICAL_SYNTHESIS: {
                    let nodeShapeLegendDivListElement =this.createDivElementFor(this.CHEMICAL_SYNTHESIS_IMG_URL,Constants.NODE_COLOR_CHEMICAL_SYNTHESIS_LABEL);
                    nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                    break;
                }
                case Constants.NODE_COLOR_DROSOPHILA_MELANOGASTER: {
                    let nodeShapeLegendDivListElement =this.createDivElementFor(this.DROSOPHILA_MELANOGASTER_IMG_URL,Constants.NODE_COLOR_DROSOPHILA_MELANOGASTER_LABEL);
                    nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                    break;
                }
                case Constants.NODE_COLOR_ESCHERICHIA_COLI: {
                    let nodeShapeLegendDivListElement =this.createDivElementFor(this.ESCHERICHIA_COLI_IMG_URL,Constants.NODE_COLOR_ESCHERICHIA_COLI_LABEL);
                    nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                    break;
                }
                case Constants.NODE_COLOR_MOUSE: {
                    let nodeShapeLegendDivListElement =this.createDivElementFor(this.MOUSE_IMG_URL,Constants.NODE_COLOR_MOUSE_LABEL);
                    nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                    break;
                }
                case Constants.NODE_COLOR_SACCHAROMYCES_CEREVISIAE: {
                    let nodeShapeLegendDivListElement =this.createDivElementFor(this.SACCHAROMYCES_CEREVISIAE_IMG_URL,Constants.NODE_COLOR_SACCHAROMYCES_CEREVISIAE_LABEL);
                    nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                    break;
                }
                default: {
                    let nodeShapeLegendDivListElement =this.createDivElementFor(this.OTHERS_IMG_URL,Constants.NODE_COLOR_OTHERS_LABEL);
                    nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                    break;
                }
            }
        });

        return nodeShapeLegendDiv;
    }
}
