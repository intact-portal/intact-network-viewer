import { Global } from "./../global";
import {Utility as LayoutsUtility} from "../layouts/utility";
import {Utility} from "./utility";

export class Listener {
    private utility: Utility;
    private layoutsUtility:LayoutsUtility;

    constructor() {
        this.utility = new Utility();
        this.layoutsUtility= new LayoutsUtility();
        this.loadDocumentListeners();
        this.loadTableInteractorSelectedListener();
        this.loadTableInteractionSelectedListener();
    }

    //TODO... remove following method after testing is done
    private loadDocumentListeners():void{

        document.addEventListener("graph-interaction-selected", function(e) {
            console.log((e as any).detail.interactionIds().toString()); // Prints "Example of an event"
            console.log((e as any).detail.interactorIds().toString()); // Prints "Example of an event"
        });

        document.addEventListener("graph-interactor-selected", function(e) {
            console.log((e as any).detail.interactionIds().toString()); // Prints "Example of an event"
            console.log((e as any).detail.interactorId().toString()); // Prints "Example of an event"
        });

        document.addEventListener("graph-unselected", function(e) {
            console.log((e as any).type); // Prints "Example of an event"
        });
    }

    private loadTableInteractorSelectedListener():void{
        document.addEventListener("table-interactor-selected", (e)=> {
            console.log((e as any).detail.interactorId); // Prints "Example of an event"

            // remove any pre applied classes in graph
            this.utility.removePreAppliedClasses();

            let nodeToBeSelected = Global.graphcy.getElementById( (e as any).detail.interactorId );
            let directlyConnectedEdges = nodeToBeSelected.closedNeighbourhood();

            nodeToBeSelected.addClass('highlight');
            directlyConnectedEdges.addClass('neighbour-highlight');
            directlyConnectedEdges.nodes().addClass('neighbour-highlight');

            this.layoutsUtility.setHighlightAndFocusMaxZoomLevel();
            Global.graphcy.fit(directlyConnectedEdges);
            this.layoutsUtility.setUserMaxZoomLevel();
        });
    }

    private loadTableInteractionSelectedListener():void{
        document.addEventListener("table-interaction-selected", (e)=>{
            console.log((e as any).detail.interactionId); // Prints "Example of an event"

            // remove any pre applied classes in graph
            this.utility.removePreAppliedClasses();

            let edgeToBeSelected = Global.graphcy.getElementById( (e as any).detail.interactionId);

            edgeToBeSelected.connectedNodes().addClass('neighbour-highlight');
            if(edgeToBeSelected.hasClass('expand')){
                edgeToBeSelected.addClass('neighbour-highlight');
            }else{
                edgeToBeSelected.parallelEdges().addClass('neighbour-highlight');
            }

            this.layoutsUtility.setHighlightAndFocusMaxZoomLevel();
            Global.graphcy.fit(edgeToBeSelected.connectedNodes());
            this.layoutsUtility.setUserMaxZoomLevel();
        });

    }
}