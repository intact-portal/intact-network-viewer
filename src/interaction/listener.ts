import { Utility as LayoutsUtility } from '../layouts/utility';
import { Global } from './../global';
import { Utility } from './utility';

export class Listener {
  private utility: Utility;
  private layoutsUtility: LayoutsUtility;

  constructor() {
    this.utility = new Utility();
    this.layoutsUtility = new LayoutsUtility();
    this.loadTableInteractorSelectedListener();
    this.loadTableInteractionSelectedListener();
    this.loadTableUnSelectedListener();
  }

  private loadTableInteractorSelectedListener(): void {
    document.addEventListener('tableInteractorSelected', e => {
      console.log((e as any).detail.interactorId); // TODO... remove log after testing is done

      // remove any pre applied classes in graph
      this.utility.removePreAppliedClasses();

      const nodeToBeSelected = Global.graphcy.getElementById((e as any).detail.interactorId);
      const directlyConnectedEdges = nodeToBeSelected.closedNeighbourhood();

      directlyConnectedEdges.addClass('neighbour-highlight');
      directlyConnectedEdges.nodes().addClass('neighbour-highlight');
      nodeToBeSelected.removeClass('neighbour-highlight');
      nodeToBeSelected.addClass('highlight');

      this.layoutsUtility.setHighlightAndFocusMaxZoomLevel();
      Global.graphcy.fit(directlyConnectedEdges);
      this.layoutsUtility.setUserMaxZoomLevel();
    });
  }

  private loadTableInteractionSelectedListener(): void {
    document.addEventListener('tableInteractionSelected', e => {
      console.log((e as any).detail.interactionId); // TODO... remove log after testing is done

      // remove any pre applied classes in graph
      this.utility.removePreAppliedClasses();

      const edgeToBeSelected = Global.graphcy.getElementById((e as any).detail.interactionId);

      edgeToBeSelected.connectedNodes().addClass('neighbour-highlight');
      if (edgeToBeSelected.hasClass('expand')) {
        edgeToBeSelected.addClass('neighbour-highlight');
      } else {
        edgeToBeSelected.parallelEdges().addClass('neighbour-highlight');
      }

      this.layoutsUtility.setHighlightAndFocusMaxZoomLevel();
      Global.graphcy.fit(edgeToBeSelected.connectedNodes());
      this.layoutsUtility.setUserMaxZoomLevel();
    });
  }

  private loadTableUnSelectedListener(): void {
    document.addEventListener('tableUnselected', e => {
      // remove any pre applied classes in graph
      this.utility.removePreAppliedClasses();

      this.layoutsUtility.fit();
    });
  }
}
