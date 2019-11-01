import cytoscape from 'cytoscape';
import popper from 'cytoscape-popper';
import tippy from 'tippy.js';
import PopperJs from 'popper.js';
import {EdgeDetails} from "./edge_details";
import {Utility} from "./utility";

cytoscape.use(popper);

export class Interaction {

    private cy: any;
    private utility: Utility;

    constructor(cy: any) {
        this.cy = cy;
        this.utility = new Utility();
        this.loadEdgeOnclickMethod();
        this.loadOnSelectBoxMethod();
        this.loadUnSelectNodeMethod();
        this.loadOnNodeTapMethod();
        this.loadOnTapUnselectMethod();
        this.loadEdgeOnHoverInAndOutMethod();
    }

    private loadEdgeOnHoverInAndOutMethod(): void {

        var tippyToolTip : any;
        this.cy.edges().on('mouseover', function(e) {
            var hoveredNode = e.target;

            var makeTippy = function (node, text) {
                return tippy(node.popperRef(), {
                    content: function () {
                        return new EdgeDetails(node,this.utility);
                    },
                    trigger: 'manual',
                    arrow: true,
                    placement: 'bottom',
                    hideOnClick: false,
                    multiple: true,
                    sticky: true
                });
            };
            tippyToolTip = makeTippy(hoveredNode, 'foo');
            tippyToolTip.show();
        });

        this.cy.edges().on('mouseout', function(e) {
            tippyToolTip.hide();
            tippyToolTip.destroy();
        });
    }

    private loadEdgeOnclickMethod(): void {
        this.cy.edges().on('click', function(e) {
            var clickedNode = e.target.data('interaction_ac');
            /*e.target.parallelEdges().forEach( function(ele, i, eles){
             alert (ele.data('interaction_type'));
             } );*/
        });
    }

    private loadOnSelectBoxMethod(): void {
        this.cy.nodes().on('boxselect', function(e) {
            var boxNode = e.target;
            boxNode.addClass('highlight');
        });
    }

    private loadUnSelectNodeMethod(): void {
        this.cy.nodes().on('unselect', function(e) {
            var boxNode = e.target;
            boxNode.removeClass('highlight');
        });
    }

    private loadOnNodeTapMethod(): void {
        var localCy = this.cy; // need to do this as you cannot have this inside function
        this.cy.nodes().on('tap', function(e) {
            var tappedNode = e.target;
            var directlyConnectedEdges = tappedNode.closedNeighbourhood();
            tappedNode.addClass('highlight');
            if(!e.originalEvent.shiftKey){
                directlyConnectedEdges.addClass('neighbour-highlight');
                directlyConnectedEdges.nodes().addClass('neighbour-highlight');
                localCy.fit(directlyConnectedEdges);
            }
        });
    }

    private loadOnTapUnselectMethod(): void {
        var localCy = this.cy; // need to do this as you cannot have this inside function
        this.cy.nodes().on('tapunselect', function(e) {
            var tappedNode = e.target;
            var directlyConnectedEdges = tappedNode.closedNeighbourhood();
            tappedNode.removeClass('highlight');
            directlyConnectedEdges.removeClass('neighbour-highlight');
            directlyConnectedEdges.nodes().removeClass('neighbour-highlight');
            localCy.fit();
        });
    }
}