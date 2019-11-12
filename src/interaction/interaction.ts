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
        this.loadOnEdgeTapMethod();
        //this.loadOnTapUnselectEdgeMethod();
        this.loadOnSelectBoxMethod();
        this.loadUnSelectNodeMethod();
        this.loadOnNodeTapMethod(this.utility);
        //this.loadOnTapUnselectMethod();
        this.loadOnNodeAndEdgeHoverMethods(this.utility);
        this.loadOnEmptySpaceClick();

    }

    private loadOnEmptySpaceClick():void{
        let utility = this.utility;
        let clickedOnEmptySpace:boolean = false;
        this.cy.on('tap', (event)=>{
            var evtTarget = event.target;
            if( evtTarget === this.cy ){
               this.cy.nodes().removeClass('highlight');// when you want to unselect after searching a node
                clickedOnEmptySpace=true;
            }else{
                clickedOnEmptySpace=false;
            }
        });

        // when node or edge is unselected by tapping white space
        this.cy.on('tapunselect', (untapEvent)=>{
            var evtTarget = untapEvent.target;
            if(clickedOnEmptySpace) {
                // remove any previous classes on previous tap
                this.removePreAppliedClasses();

                utility.createUnTappedEvent();
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

    /*private loadOnEdgeClickMethod(): void {
        this.cy.edges().on('click', function(e) {
            var clickedEdge = e.target;
            if(clickedEdge.hasClass('expand')){
                clickedEdge.parallelEdges().removeClass('expand');
            }else{
                clickedEdge.parallelEdges().addClass('expand');
            }
        });
    }*/

    private loadOnEdgeTapMethod(): void {
        var localCy = this.cy;
        var utility = this.utility;
        this.cy.edges().on('tap', (e)=> {

            // remove any previous classes on previous tap
            this.removePreAppliedClasses();

            var tappedEdge = e.target;
            if(tappedEdge.hasClass('expand')){
               // tappedEdge.connectedNodes().addClass('neighbour-highlight');
                tappedEdge.parallelEdges().removeClass('neighbour-highlight');
                tappedEdge.addClass('neighbour-highlight');
            }else{
                tappedEdge.parallelEdges().addClass('neighbour-highlight');
               // tappedEdge.parallelEdges().connectedNodes().addClass('neighbour-highlight');
            }
            localCy.fit(tappedEdge.connectedNodes());

            utility.createEdgeTappedEvent(tappedEdge);
        });
    }

    //if you need in future
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

    public resetAppliedClasses(): void {
        let areClassesApplied:boolean=false;
        this.cy.edges().forEach((edge)=> {
            if (edge.hasClass('neighbour-highlight')) {
               areClassesApplied=true;
            }
        });
        this.cy.nodes().forEach((node)=> {
            if (node.hasClass('neighbour-highlight')) {
                areClassesApplied=true;
            }
        });
        this.removePreAppliedClasses();
        if(areClassesApplied){
            this.utility.createUnTappedEvent();
        }
         areClassesApplied = false;// reset the variable
    }

    private loadOnNodeTapMethod(utility:Utility): void {
        var localCy = this.cy; // need to do this as you cannot have this inside function
        this.cy.nodes().on('tap', (e)=> {

            // remove any previous classes on previous tap
            this.removePreAppliedClasses();

            //logic for node tapped now
            var tappedNode = e.target;
            var directlyConnectedEdges = tappedNode.closedNeighbourhood();
            tappedNode.addClass('highlight');
            if(!e.originalEvent.shiftKey){
                directlyConnectedEdges.addClass('neighbour-highlight');
                directlyConnectedEdges.nodes().addClass('neighbour-highlight');
                localCy.fit(directlyConnectedEdges);
                utility.createNodeTappedEvent(tappedNode);
            }
        });
    }

    //if you need in future
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

    private removePreAppliedClasses(): void{
        this.cy.nodes().removeClass('highlight');
        this.cy.edges().removeClass('neighbour-highlight');
        this.cy.nodes().removeClass('neighbour-highlight');
    }


}