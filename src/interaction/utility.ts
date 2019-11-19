import { Style } from './style';
import { Node } from '../constants/node';
import { Edge } from '../constants/edge';
import { Global } from './../global';

export class Utility {
  public createDetailsDivFor(detailDivId: string): HTMLDivElement {
    var legendDiv = <HTMLDivElement>document.createElement('div');
    legendDiv.setAttribute('id', detailDivId);
    // legendDiv.setAttribute('style', Style.DETAILS_DIV);
    return legendDiv;
  }

  public createDivElementFor(detailLabel: string, detailValue: any): HTMLDivElement {
    let divListElement = <HTMLDivElement>document.createElement('div');

    let detailElement = <HTMLParagraphElement>document.createElement('p');
    detailElement.setAttribute('style', Style.TOOL_TIP_TEXT);
    let detailLabelElement = <HTMLElement>document.createElement('strong');
    detailLabelElement.innerHTML = detailLabel + ': ';
    detailElement.appendChild(detailLabelElement);
    detailElement.append(detailValue);
    divListElement.appendChild(detailElement);

    return divListElement;
  }

  public insertCSSClassesInDOMForToolTip(): void {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = Style.TOOL_TIP_CSS_CLASS;
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  public createNodeTappedEvent(node: any): void {
    let selectedInteractionIds = new Array<number>();

    let directlyConnectedEdges = node.closedNeighbourhood();

    directlyConnectedEdges.edges().forEach(edge => {
      selectedInteractionIds.push(edge.data(Edge.ID));
    });

    let interactorSelectedEvent = new CustomEvent('graph-interactor-selected', {
      bubbles: true,
      detail: {
        interactorId: () => node.data(Node.INTERACTOR_AC),
        interactionIds: () => selectedInteractionIds,
      },
    });

    document.dispatchEvent(interactorSelectedEvent);
    console.log("'" + interactorSelectedEvent.type + "'" + ' Event Fired');
  }

  public createEdgeTappedEvent(edge: any): void {
    let selectedInteractionIds = new Array<number>();
    let selectedInteractorIds = new Array<string>();

    if (edge.hasClass('expand')) {
      selectedInteractionIds.push(edge.data(Edge.ID));
    } else {
      edge.parallelEdges().forEach(edge => {
        selectedInteractionIds.push(edge.data(Edge.ID));
      });
    }

    edge.connectedNodes().forEach(node => {
      selectedInteractorIds.push(node.data(Node.INTERACTOR_AC));
    });

    let interactionSelectedEvent = new CustomEvent('graph-interaction-selected', {
      bubbles: true,
      detail: {
        interactionIds: () => selectedInteractionIds,
        interactorIds: () => selectedInteractorIds,
      },
    });

    document.dispatchEvent(interactionSelectedEvent);
    console.log("'" + interactionSelectedEvent.type + "'" + ' Event Fired');
  }

  public createUnTappedEvent(): void {
    let interactionSelectedEvent = new CustomEvent('graph-unselected', {
      bubbles: true,
    });

    document.dispatchEvent(interactionSelectedEvent);
    console.log("'" + interactionSelectedEvent.type + "'" + ' Event Fired');
  }

  public removePreAppliedClasses(): void {
    Global.graphcy.nodes().removeClass('highlight');
    Global.graphcy.edges().removeClass('neighbour-highlight');
    Global.graphcy.nodes().removeClass('neighbour-highlight');
  }
}
