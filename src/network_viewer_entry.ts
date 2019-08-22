import cytoscape from 'cytoscape';
import fcose from 'cytoscape-fcose';
import $ from "jquery";

export class InitializeGraph {
    //field
    graph_container_div_id:string;
    cy: any;

    //constructor
    constructor(graph_container_div_id:string) {
        this.graph_container_div_id = graph_container_div_id;
        this.initializeCytoscape();
    }

    //function
    disp():void {
        console.log("Engine is  :   "+this.graph_container_div_id)
    }

    //function
    initializeCytoscape():void {
        this.cy = cytoscape({
            container: $('#'+this.graph_container_div_id)
        });
        console.log("cy is"+this.cy);

    }


}
