import { Edge } from '../constants/edge';
import { Node } from '../constants/node';
import { Global } from './../global';
import { Style } from './style';

export class Utility {
  public createDetailsDivFor(detailDivId: string): HTMLDivElement {
    const legendDiv = document.createElement('div') as HTMLDivElement;
    legendDiv.setAttribute('id', detailDivId);
    // legendDiv.setAttribute('style', Style.DETAILS_DIV);
    return legendDiv;
  }

  public createDivElementFor(detailLabel: string, detailValue: any): HTMLDivElement {
    const divListElement = document.createElement('div') as HTMLDivElement;

    const detailElement = document.createElement('p') as HTMLParagraphElement;
    detailElement.setAttribute('style', Style.TOOL_TIP_TEXT);
    const detailLabelElement = document.createElement('strong') as HTMLElement;
    detailLabelElement.innerHTML = detailLabel + ': ';
    detailElement.appendChild(detailLabelElement);
    const spanElement = document.createElement('span');
    spanElement.innerHTML = detailValue;
    detailElement.appendChild(spanElement);
    divListElement.appendChild(detailElement);

    return divListElement;
  }

  public insertCSSClassesInDOMForToolTip(): void {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = Style.TOOL_TIP_CSS_CLASS;
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  public createNodeTappedEvent(node: any): void {
    const selectedInteractionIds = new Array<number>();

    const directlyConnectedEdges = node.closedNeighbourhood();

    directlyConnectedEdges.edges().forEach(edge => {
      selectedInteractionIds.push(edge.data(Edge.ID));
    });

    const interactorSelectedEvent = new CustomEvent('graph-interactor-selected', {
      bubbles: true,
      detail: {
        interactionIds: () => selectedInteractionIds,
        interactorId: () => node.data(Node.INTERACTOR_AC),

      },
    });

    document.dispatchEvent(interactorSelectedEvent);
  }

  public createEdgeTappedEvent(edge: any): void {
    const selectedInteractionIds = new Array<number>();
    const selectedInteractorIds = new Array<string>();

    if (edge.hasClass('expand')) {
      selectedInteractionIds.push(edge.data(Edge.ID));
    } else {
      edge.parallelEdges().forEach(iteratedEdge => {
        selectedInteractionIds.push(iteratedEdge.data(Edge.ID));
      });
    }

    edge.connectedNodes().forEach(node => {
      selectedInteractorIds.push(node.data(Node.INTERACTOR_AC));
    });

    const interactionSelectedEvent = new CustomEvent('graph-interaction-selected', {
      bubbles: true,
      detail: {
        interactionIds: () => selectedInteractionIds,
        interactorIds: () => selectedInteractorIds,
      },
    });

    document.dispatchEvent(interactionSelectedEvent);
    console.log('\'' + interactionSelectedEvent.type + '\'' + ' Event Fired'); // TODO... remove log after testing is done
  }

  public createUnTappedEvent(): void {
    const interactionSelectedEvent = new CustomEvent('graph-unselected', {
      bubbles: true,
    });

    document.dispatchEvent(interactionSelectedEvent);
    console.log('\'' + interactionSelectedEvent.type + '\'' + ' Event Fired'); // TODO... remove log after testing is done
  }

  public removePreAppliedClasses(): void {
    Global.graphcy.nodes().removeClass('highlight');
    Global.graphcy.edges().removeClass('neighbour-highlight');
    Global.graphcy.nodes().removeClass('neighbour-highlight');
  }
}
