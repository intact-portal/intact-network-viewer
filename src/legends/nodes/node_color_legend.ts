import { Constants } from './../constants';
import { Style } from './../style';
import {Utility} from "./../utility";

export class NodeColorLegend {
    private colors: Array<string>;
    private utility: Utility;

    private HOMO_SAPIENS_IMG_URL=  require('./images/node-colors/homo-sapiens.svg');
    private ARABIDOPSIS_THALIANA_IMG_URL = require('./images/node-colors/arabidopsis-thaliana.svg');
    private CAENORHABDITIS_ELEGANS_IMG_URL=  require('./images/node-colors/caenorhabditis-elegans.svg');
    private CHEMICAL_SYNTHESIS_IMG_URL=  require('./images/node-colors/chemical-synthesis.svg');
    private DROSOPHILA_MELANOGASTER_IMG_URL=  require('./images/node-colors/drosophila-melanogaster.svg');
    private ESCHERICHIA_COLI_IMG_URL=  require('./images/node-colors/escherichia-coli.svg');
    private MOUSE_IMG_URL=  require('./images/node-colors/mouse.svg');
    private SACCHAROMYCES_CEREVISIAE_IMG_URL=  require('./images/node-colors/saccharomyces-cerevisiae.svg');
    private META_NODE_IMG_URL=  require('./images/node-colors/meta-node.svg');
    private OTHERS_IMG_URL=  require('./images/node-colors/others.svg');

    constructor(colors: any,utility: Utility) {
        this.utility = utility;
        this.colors = colors;
        this.utility = new Utility();
    }

    public createLegend(): HTMLDivElement {
        var nodeShapeLegendDiv = <HTMLDivElement>document.createElement('div');
        nodeShapeLegendDiv.setAttribute('id', Constants.NODE_COLOR_LEGEND_DIV_ID);
        nodeShapeLegendDiv.setAttribute('style', Style.LEGEND_DIV);

        var nodeShapeLegendHeader = <HTMLElement>document.createElement('h3');
        nodeShapeLegendHeader.setAttribute('style', Style.LEGEND_HEADER);
        nodeShapeLegendHeader.innerHTML = Constants.NODE_COLOR_LEGEND_TITLE;
        nodeShapeLegendDiv.appendChild(nodeShapeLegendHeader);

        let isSingleElement : boolean = false;
        if(this.colors.length == 1){
            isSingleElement = true;
        }

        this.colors.forEach(color => {
            let trimmedColor = color.replace(/\s/g, "");
            switch(trimmedColor){
                case Constants.NODE_COLOR_HOMO_SAPIENS: {
                    let nodeShapeLegendDivListElement =this.utility.createDivElementFor(this.HOMO_SAPIENS_IMG_URL,Constants.NODE_COLOR_HOMO_SAPIENS_LABEL,isSingleElement);
                    nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                    break;
                }
                case Constants.NODE_COLOR_ARABIDOPSIS_THALIANA: {
                    let nodeShapeLegendDivListElement =this.utility.createDivElementFor(this.ARABIDOPSIS_THALIANA_IMG_URL,Constants.NODE_COLOR_ARABIDOPSIS_THALIANA_LABEL,isSingleElement);
                    nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                    break;
                }
                case Constants.NODE_COLOR_CAENORHABDITIS_ELEGANS: {
                    let nodeShapeLegendDivListElement =this.utility.createDivElementFor(this.CAENORHABDITIS_ELEGANS_IMG_URL,Constants.NODE_COLOR_CAENORHABDITIS_ELEGANS_LABEL,isSingleElement);
                    nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                    break;
                }
                case Constants.NODE_COLOR_CHEMICAL_SYNTHESIS: {
                    let nodeShapeLegendDivListElement =this.utility.createDivElementFor(this.CHEMICAL_SYNTHESIS_IMG_URL,Constants.NODE_COLOR_CHEMICAL_SYNTHESIS_LABEL,isSingleElement);
                    nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                    break;
                }
                case Constants.NODE_COLOR_DROSOPHILA_MELANOGASTER: {
                    let nodeShapeLegendDivListElement =this.utility.createDivElementFor(this.DROSOPHILA_MELANOGASTER_IMG_URL,Constants.NODE_COLOR_DROSOPHILA_MELANOGASTER_LABEL,isSingleElement);
                    nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                    break;
                }
                case Constants.NODE_COLOR_ESCHERICHIA_COLI: {
                    let nodeShapeLegendDivListElement =this.utility.createDivElementFor(this.ESCHERICHIA_COLI_IMG_URL,Constants.NODE_COLOR_ESCHERICHIA_COLI_LABEL,isSingleElement);
                    nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                    break;
                }
                case Constants.NODE_COLOR_MOUSE: {
                    let nodeShapeLegendDivListElement =this.utility.createDivElementFor(this.MOUSE_IMG_URL,Constants.NODE_COLOR_MOUSE_LABEL,isSingleElement);
                    nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                    break;
                }
                case Constants.NODE_COLOR_SACCHAROMYCES_CEREVISIAE: {
                    let nodeShapeLegendDivListElement =this.utility.createDivElementFor(this.SACCHAROMYCES_CEREVISIAE_IMG_URL,Constants.NODE_COLOR_SACCHAROMYCES_CEREVISIAE_LABEL,isSingleElement);
                    nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                    break;
                }
                case Constants.META_NODE_COLOR: {
                    let nodeShapeLegendDivListElement =this.utility.createDivElementFor(this.META_NODE_IMG_URL,Constants.META_NODE_COLOR_LABEL,isSingleElement);
                    nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                    break;
                }
                default: {
                    let nodeShapeLegendDivListElement =this.utility.createDivElementFor(this.OTHERS_IMG_URL,Constants.NODE_COLOR_OTHERS_LABEL,isSingleElement);
                    nodeShapeLegendDiv.appendChild(nodeShapeLegendDivListElement);
                    break;
                }
            }
        });

        return nodeShapeLegendDiv;
    }
}
