import cytoscape from 'cytoscape';
import popper from 'cytoscape-popper';
import PopperJs from 'popper.js';
import tippy from 'tippy.js';
import 'tippy.js/index.css';
import { Utility as LayoutsUtility } from '../layouts/utility';
import { Global } from './../global';
import { EdgeDetails } from './edge_details';
import { NodeDetails } from './node_details';
import { Utility } from './utility';


cytoscape.use(popper);

export class Interaction {
  private utility: Utility;
  private layoutsUtility: LayoutsUtility;

  constructor() {
    this.utility = new Utility();
    this.layoutsUtility = new LayoutsUtility();
    this.loadOnEdgeTapMethod();
    // this.loadOnTapUnselectEdgeMethod();
    this.loadOnSelectBoxMethod();
    this.loadUnSelectNodeMethod();
    this.loadOnNodeTapMethod(this.utility);
    // this.loadOnTapUnselectMethod();
    this.loadOnNodeAndEdgeHoverMethods(this.utility);
    this.loadOnEmptySpaceClick();
    this.loadMultipleSelectionDisableMethod();
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
    let tippyToolTip: any;
    Global.graphcy.edges().on('mouseover', (e)=> {
      const hoveredEdge = e.target;

      const makeTippy = (edge, text, utils)=> {
        return tippy(edge.popperRef(), {
          arrow: true,
          content: (new EdgeDetails(edge, utils).createDetails()),
          hideOnClick: true,
          maxWidth: 'none',
          multiple: true,
          placement: 'bottom',
          sticky: true,
          theme: 'intact',
          trigger: 'manual'
        });
      };
      tippyToolTip = makeTippy(hoveredEdge, 'foo', utility);
      tippyToolTip.show();
    });

    Global.graphcy.edges().on('mouseout', (e)=> {
      tippyToolTip.hide();
      tippyToolTip.destroy();
    });

    Global.graphcy.edges().on('mousedown', (e)=> {
      tippyToolTip.hide();
      tippyToolTip.destroy();
    });
  }

  private loadNodeOnHoverInAndOutMethod(utility: Utility): void {
    let tippyToolTip: any;

    let nodes: any;

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

    nodes.on('mouseover', (e)=> {
      const hoveredNode = e.target;

      const makeTippy = (node, text, utils)=> {
        return tippy(node.popperRef(), {
          arrow: true,
          content: (new NodeDetails(node, utils).createDetails()),
          hideOnClick: true,
          maxWidth: 'none',
          multiple: true,
          placement: 'bottom',
          sticky: true,
          theme: 'intact',
          trigger: 'manual'
        });
      };
      tippyToolTip = makeTippy(hoveredNode, 'foo', utility);
      tippyToolTip.show();
    });

    nodes.on('mouseout', (e)=> {
      tippyToolTip.hide();
      tippyToolTip.destroy();
    });

    nodes.on('mousedown', (e)=> {
      tippyToolTip.hide();
      tippyToolTip.destroy();
    });
  }

  /*private loadOnEdgeClickMethod(): void {
        Global.graphcy.edges().on('click', function(e) {
            var clickedEdge = e.target;
            if(clickedEdge.hasClass('expand')){
                clickedEdge.parallelEdges().removeClass('expand');
            }else{
                clickedEdge.parallelEdges().addClass('expand');
            }
        });
    }*/

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
      Global.graphcy.fit(tappedEdge.connectedNodes());
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
    Global.graphcy.nodes().on('boxselect', (e)=> {
      const boxNode = e.target;
      boxNode.addClass('highlight');
    });
  }

  private loadUnSelectNodeMethod(): void {
    Global.graphcy.nodes().on('unselect', (e)=> {
      const boxNode = e.target;
      boxNode.removeClass('highlight');
    });
  }

  private loadOnNodeTapMethod(utility: Utility): void {
    let nodes: any;

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
        Global.graphcy.fit(directlyConnectedEdges);
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
        .unselect()
    );
  }
}
