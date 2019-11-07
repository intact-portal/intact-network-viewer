import cytoscape from 'cytoscape';
import popper from 'cytoscape-popper';
import tippy from 'tippy.js';
import PopperJs from 'popper.js';
import {EdgeDetails} from "./edge_details";
import {Utility} from "./utility";
import 'tippy.js/index.css';
import {NodeDetails} from "./node_details";

cytoscape.use(popper);

export class Interaction {

    private cy: any;
    private utility: Utility;

    constructor(cy: any) {
        this.cy = cy;
        this.utility = new Utility();
        this.loadOnEdgeClickMethod();
        this.loadOnSelectBoxMethod();
        this.loadUnSelectNodeMethod();
        this.loadOnNodeTapMethod();
        this.loadOnTapUnselectMethod();
        this.loadOnNodeAndEdgeHoverMethods(this.utility);
        this.loadOnEmptySpaceClick();

    }

    private loadOnEmptySpaceClick():void{
        this.cy.on('tap', (event)=>{
            var evtTarget = event.target;
            if( evtTarget === this.cy ){
               this.cy.nodes().removeClass('highlight');// when you want to unselect after searching a node
            }
        });
    }

    private loadOnNodeAndEdgeHoverMethods(utility:Utility): void {
        //utility.insertCSSClassesInDOMForToolTip(); // Enable it, if needed in future

        this.loadEdgeOnHoverInAndOutMethod(utility);
        this.loadNodeOnHoverInAndOutMethod(utility);
    }

    private loadEdgeOnHoverInAndOutMethod(utility:Utility): void {

        var tippyToolTip : any;
        this.cy.edges().on('mouseover', function(e) {
            var hoveredEdge = e.target;

            var makeTippy = function (edge, text,utility) {
                return tippy(edge.popperRef(), {
                    content: function () {
                        return new EdgeDetails(edge,utility).createDetails();
                    },
                    trigger: 'manual',
                    arrow: true,
                    placement: 'bottom',
                    hideOnClick: false,
                    multiple: true,
                    sticky: true,
                    theme: 'intact',
                    maxWidth:'none'
                });
            };
            tippyToolTip = makeTippy(hoveredEdge, 'foo',utility);
            tippyToolTip.show();
        });

        this.cy.edges().on('mouseout', function(e) {
            tippyToolTip.hide();
            tippyToolTip.destroy();
        });

        this.cy.edges().on('click', function(e) {
            tippyToolTip.hide();
            tippyToolTip.destroy();
        });
    }

    private loadNodeOnHoverInAndOutMethod(utility:Utility): void {

        let tippyToolTip : any;

        let nodes:any;

        if(this.cy.nodes().children().size()==0){
            nodes = this.cy.nodes(); // non compound graph
        }else{
            nodes = this.cy.nodes().children(); // compound graph
        }

        nodes.on('mouseover', function(e) {

            var hoveredNode = e.target;

            var makeTippy = function (node, text, utility) {
                return tippy(node.popperRef(), {
                    content: function () {
                        return new NodeDetails(node, utility).createDetails();
                    },
                    trigger: 'manual',
                    arrow: true,
                    placement: 'bottom',
                    hideOnClick: false,
                    multiple: true,
                    sticky: true,
                    theme: 'intact',
                    maxWidth: 'none'
                });
            };
            tippyToolTip = makeTippy(hoveredNode, 'foo', utility);
            tippyToolTip.show();
        });

        nodes.on('mouseout', function(e) {
                tippyToolTip.hide();
                tippyToolTip.destroy();
        });
    }

    private loadOnEdgeClickMethod(): void {
        this.cy.edges().on('click', function(e) {
            var clickedEdge = e.target;
            if(clickedEdge.hasClass('expand')){
                clickedEdge.parallelEdges().removeClass('expand');
            }else{
                clickedEdge.parallelEdges().addClass('expand');
            }
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