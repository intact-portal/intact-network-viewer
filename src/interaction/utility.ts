import {Style} from "./style";
import {Node} from "../constants/node";
import {Edge} from "../constants/edge";
export class Utility {

    public createDetailsDivFor(detailDivId:string):HTMLDivElement {
        var legendDiv = <HTMLDivElement>document.createElement('div');
        legendDiv.setAttribute('id', detailDivId);
       // legendDiv.setAttribute('style', Style.DETAILS_DIV);
        return legendDiv;
    }

    public createDivElementFor(detailLabel:string,detailValue:any):HTMLDivElement {
        let divListElement = <HTMLDivElement>document.createElement('div');

        let detailElement = <HTMLParagraphElement>document.createElement('p');
        detailElement.setAttribute('style',Style.TOOL_TIP_TEXT);
        let detailLabelElement = <HTMLElement>document.createElement('strong');
        detailLabelElement.innerHTML=detailLabel+": ";
        detailElement.appendChild(detailLabelElement)
        detailElement.append(detailValue);
        divListElement.appendChild(detailElement);

        return divListElement;
    }

    public insertCSSClassesInDOMForToolTip():void{
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = Style.TOOL_TIP_CSS_CLASS;
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    public createNodeTappedEvent(node:any):void{
        let interactorSelectedEvent = new CustomEvent('graph-interactor-selected', {
            bubbles: true,
            detail: { interactorId: () => node.data(Node.INTERACTOR_AC) }
        });

        document.dispatchEvent(interactorSelectedEvent);
        console.log("'"+interactorSelectedEvent.type+"'"+ " Event Fired");
    }

    public createNodeUnTappedEvent(node:any):void{
        document.addEventListener("graph-interactor-unselected", function(e) {
            console.log((e as any).detail.interactorId()); // Prints "Example of an event"
        });

        let interactorUnSelectedEvent = new CustomEvent('graph-interactor-unselected', {
            bubbles: true,
            detail: { interactorId: () => node.data(Node.INTERACTOR_AC) }
        });

        document.dispatchEvent(interactorUnSelectedEvent);
        console.log("'"+interactorUnSelectedEvent.type+"'"+ " Event Fired");
    }

    public createEdgeTappedEvent(edge:any):void{

        document.addEventListener("graph-interaction-selected", function(e) {
            console.log((e as any).detail.interactionIds().toString()); // Prints "Example of an event"
        });

        let selectedInteractionIds=new Array<number>();

        if(edge.hasClass('expand')){
            selectedInteractionIds.push(edge.data(Edge.ID));
        }else{
            edge.parallelEdges().forEach(edge => {
                selectedInteractionIds.push(edge.data(Edge.ID));
            });
        }
        let interactionSelectedEvent = new CustomEvent('graph-interaction-selected', {
            bubbles: true,
            detail: { interactionIds: () => selectedInteractionIds }
        });

        document.dispatchEvent(interactionSelectedEvent);
        console.log("'"+interactionSelectedEvent.type+"'"+ " Event Fired");
    }

    public createEdgeUnTappedEvent(edge:any):void{

        document.addEventListener("graph-interaction-unselected", function(e) {
            console.log((e as any).detail.interactionIds().toString()); // Prints "Example of an event"
        });

        let selectedInteractionIds=new Array<number>();

        if(edge.hasClass('expand')){
            selectedInteractionIds.push(edge.data(Edge.ID));
        }else{
            edge.parallelEdges().forEach(edge => {
                selectedInteractionIds.push(edge.data(Edge.ID));
            });
        }
        let interactionSelectedEvent = new CustomEvent('graph-interaction-unselected', {
            bubbles: true,
            detail: { interactionIds: () => selectedInteractionIds }
        });

        document.dispatchEvent(interactionSelectedEvent);
        console.log("'"+interactionSelectedEvent.type+"'"+ " Event Fired");
    }

}