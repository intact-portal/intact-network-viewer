
import {Constants} from "./constants";

export class FcoseLayout {

    //field
    cy: any;
    options :any =Constants.FCOSE_LAYOUT_OPTIONS;

    //constructor
    constructor(cy:any) {
        this.cy = cy;
    }

    //function
    execute():void {
        var localOptions=this.options;// don't know why but we have to do this, can't access class variable directly
        var layout =this.cy.layout({ name: 'fcose', localOptions }).run();
    }
}