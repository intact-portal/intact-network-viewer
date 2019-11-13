import { Global } from "./../global";

export class Listener {

    constructor() {
        this.loadDocumentListeners();
        this.loadTableInteractorSelectedListener();
        this.loadTableInteractionSelectedListener();
    }

    private loadDocumentListeners():void{
        //TODO... remove following after testing is done
        document.addEventListener("graph-interaction-selected", function(e) {
            console.log((e as any).detail.interactionIds().toString()); // Prints "Example of an event"
            console.log((e as any).detail.interactorIds().toString()); // Prints "Example of an event"
        });

        //TODO... remove following after testing is done
        document.addEventListener("graph-interactor-selected", function(e) {
            alert(Global.graphcy);
            console.log((e as any).detail.interactionIds().toString()); // Prints "Example of an event"
            console.log((e as any).detail.interactorId().toString()); // Prints "Example of an event"
        });
    }

    private loadTableInteractorSelectedListener():void{
        //TODO... remove following after testing is done
        document.addEventListener("table-interactor-selected", function(e) {
            console.log((e as any).detail.interactorId); // Prints "Example of an event"
        });
    }

    private loadTableInteractionSelectedListener():void{
        //TODO... remove following after testing is done
        document.addEventListener("table-interaction-selected", function(e) {
            console.log((e as any).detail.interactionId); // Prints "Example of an event"
        });

    }
}