import * as cytoscape from 'cytoscape';
import { EdgeSingular, NodeCollection } from 'cytoscape';
import popper from 'cytoscape-popper';
import tippy, { followCursor, Instance } from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // optional for styling
import { Global } from '../global';
import { Utility as LayoutsUtility } from '../layouts/utility';
import { EdgeDetails } from './edge_details';
import { NodeDetails } from './node_details';
import { Utility } from './utility';

cytoscape.use(popper);

let toolTip: Instance;

export class Interaction {
  private utility: Utility;
  private layoutsUtility: LayoutsUtility;
  private graphContainer: JQuery;

  constructor(graphContainerId: string) {
    this.graphContainer = $('#' + graphContainerId);
    this.utility = new Utility();
    this.layoutsUtility = new LayoutsUtility();
    this.loadOnEdgeTapMethod();
    this.loadOnSelectBoxMethod();
    this.loadUnSelectNodeMethod();
    this.loadOnNodeTapMethod(this.utility);
    this.loadOnNodeAndEdgeHoverMethods(this.utility);
    this.loadOnEmptySpaceClick();
    this.loadOnLeaveGraph();
    this.loadMultipleSelectionDisableMethod();
  }

  private loadOnLeaveGraph() {
    this.graphContainer.on('mouseout', this.hideTooltip);
  }

  hideTooltip() {
    if (toolTip) {
      toolTip.hide();
      toolTip.destroy();
    }
  }

  public resetAppliedClasses(): void {
    let areClassesApplied: boolean = false;
    Global.graphcy.edges().forEach(edge => {
      if (edge.hasClass('neighbour-highlight')) {
        areClassesApplied = true;
      }
    });
    Global.graphcy.nodes().forEach(node => {
      if (node.hasClass('neighbour-highlight')) {
        areClassesApplied = true;
      }
    });
    this.utility.removePreAppliedClasses();
    if (areClassesApplied) {
      this.utility.createUnTappedEvent();
    }
    areClassesApplied = false; // reset the variable
  }

  private loadOnEmptySpaceClick(): void {
    const utility = this.utility;
    let clickedOnEmptySpace: boolean = false;
    Global.graphcy.on('tap', event => {
      const evtTarget = event.target;
      if (evtTarget === Global.graphcy) {
        // remove any previous classes on previous tap
        this.utility.removePreAppliedClasses();
        clickedOnEmptySpace = true;
      } else {
        clickedOnEmptySpace = false;
      }
    });

    // when node or edge is unselected by tapping white space
    Global.graphcy.on('tapunselect', untapEvent => {
      const evtTarget = untapEvent.target;
      if (evtTarget.isEdge() || !evtTarget.isParent()) {
        if (clickedOnEmptySpace) {
          utility.createUnTappedEvent();
        }
      }
    });
  }

  private loadOnNodeAndEdgeHoverMethods(utility: Utility): void {
    // utility.insertCSSClassesInDOMForToolTip(); // Enable it, if needed in future

    this.loadEdgeOnHoverInAndOutMethod(utility);
    this.loadNodeOnHoverInAndOutMethod(utility);
  }

  private loadEdgeOnHoverInAndOutMethod(utility: Utility): void {
    Global.graphcy.edges().on('mouseover', e => {
      const hoveredEdge: EdgeSingular = e.target;

      const makeTippy = (edge: EdgeSingular, utils: Utility) => {
        let ref = edge.popperRef();
        let dummyDomEle = document.createElement('div');
        return tippy(dummyDomEle, {
          getReferenceClientRect: ref.getBoundingClientRect,
          arrow: true,
          content: new EdgeDetails(edge, utils).createDetails(),
          hideOnClick: true,
          maxWidth: 'none',
          placement: 'top',
          theme: 'intact',
          trigger: 'manual',
          followCursor: true,
          plugins: [followCursor],
          appendTo: document.body,
        });
      };
      toolTip = makeTippy(hoveredEdge, utility);
      toolTip.show();
    });

    Global.graphcy.edges().on('mouseout', this.hideTooltip);

    Global.graphcy.edges().on('mousedown', this.hideTooltip);
  }

  private loadNodeOnHoverInAndOutMethod(utility: Utility): void {
    let nodes: NodeCollection;

    nodes = Global.graphcy.nodes().children().size() === 0 ?
      Global.graphcy.nodes() :
      Global.graphcy.nodes().children(); // Nested graph

    nodes.on('mouseover', e => {
      const hoveredNode = e.target;
      const makeTippy = (node, utils) => {
        let ref = node.popperRef();
        let dummyDomEle = document.createElement('div');
        return tippy(dummyDomEle, {
          getReferenceClientRect: ref.getBoundingClientRect,
          arrow: true,
          content: new NodeDetails(node, utils).createDetails(),
          hideOnClick: true,
          maxWidth: 'none',
          placement: 'top',
          theme: 'intact',
          trigger: 'manual',
          followCursor: true,
          plugins: [followCursor],
          appendTo: document.body,
        });
      };
      toolTip = makeTippy(hoveredNode, utility);
      toolTip.show();
    });

    nodes.on('mouseout', this.hideTooltip);
    nodes.on('mousedown', this.hideTooltip);
  }

  private loadOnEdgeTapMethod(): void {
    Global.graphcy.edges().on('tap', e => {
      // remove any previous classes on previous tap
      this.utility.removePreAppliedClasses();

      const tappedEdge = e.target;

      tappedEdge.connectedNodes().addClass('neighbour-highlight');
      if (tappedEdge.hasClass('expand')) {
        tappedEdge.addClass('neighbour-highlight');
      } else {
        tappedEdge.parallelEdges().addClass('neighbour-highlight');
      }
      this.layoutsUtility.setHighlightAndFocusMaxZoomLevel();
      //Global.graphcy.fit(tappedEdge.connectedNodes());
      this.layoutsUtility.setUserMaxZoomLevel();

      this.utility.createEdgeTappedEvent(tappedEdge);
    });
  }

  // if you need in future
  /* private loadOnTapUnselectEdgeMethod(): void {
        var localCy = this.cy; // need to do this as you cannot have this inside function
        let utility = this.utility;
        this.cy.edges().on('tapunselect', function(e) {
            var tappedEdge = e.target;
            if(tappedEdge.hasClass('expand')){
                tappedEdge.removeClass('neighbour-highlight');
            //    tappedEdge.connectedNodes().removeClass('neighbour-highlight');
            }else{
                tappedEdge.parallelEdges().removeClass('neighbour-highlight');
            //    tappedEdge.parallelEdges().connectedNodes().removeClass('neighbour-highlight');
            }
        });
    }*/

  private loadOnSelectBoxMethod(): void {
    Global.graphcy.nodes().on('boxselect', e => {
      const boxNode = e.target;
      boxNode.addClass('highlight');
    });
  }

  private loadUnSelectNodeMethod(): void {
    Global.graphcy.nodes().on('unselect', e => {
      const boxNode = e.target;
      boxNode.removeClass('highlight');
    });
  }

  private loadOnNodeTapMethod(utility: Utility): void {
    let nodes: NodeCollection;

    if (
      Global.graphcy
        .nodes()
        .children()
        .size() === 0
    ) {
      nodes = Global.graphcy.nodes(); // non compound graph
    } else {
      nodes = Global.graphcy.nodes().children(); // compound graph
    }

    nodes.on('tap', e => {
      // logic for node tapped now
      const tappedNode = e.target;
      if (!tappedNode.isParent()) {
        const directlyConnectedEdges = tappedNode.closedNeighbourhood();

        // if (!e.originalEvent.shiftKey) {
        // remove any previous classes on previous tap
        this.utility.removePreAppliedClasses();

        directlyConnectedEdges.addClass('neighbour-highlight');
        directlyConnectedEdges.nodes().addClass('neighbour-highlight');
        tappedNode.removeClass('neighbour-highlight');
        tappedNode.addClass('highlight');
        this.layoutsUtility.setHighlightAndFocusMaxZoomLevel();
        // Global.graphcy.fit(directlyConnectedEdges);
        this.layoutsUtility.setUserMaxZoomLevel();
        utility.createNodeTappedEvent(tappedNode);
        // }
      }
    });
  }

  // if you need in future
  /*private loadOnTapUnselectMethod(): void {
        var localCy = this.cy; // need to do this as you cannot have this inside function
        let utility = this.utility;
        this.cy.nodes().on('tapunselect', function(e) {
            var tappedNode = e.target;
            var directlyConnectedEdges = tappedNode.closedNeighbourhood();
            tappedNode.removeClass('highlight');
            directlyConnectedEdges.removeClass('neighbour-highlight');
            directlyConnectedEdges.nodes().removeClass('neighbour-highlight');
            localCy.fit();
        });
    }*/

  private loadMultipleSelectionDisableMethod(): void {
    Global.graphcy.on('select', 'node, edge', e =>
      Global.graphcy
        .elements()
        .not(e.target)
        .unselect(),
    );
  }
}
