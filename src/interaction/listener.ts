import { Global } from "./../global";

export class Listener {

    constructor() {
        this.loadDocumentListeners();
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
}