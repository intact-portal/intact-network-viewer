import cytoscape from 'cytoscape';
import fcose from 'cytoscape-fcose';
import {FcoseLayout} from "./layouts/fcose_layout";
cytoscape.use( fcose );
import $ from "jquery";

export class InitializeGraph {
    //field
    graph_container_div_id:string;
    cy: any;
    data:JSON;

    //constructor
    constructor(graph_container_div_id:string,data) {
        this.graph_container_div_id = graph_container_div_id;
        this.data=data;
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
            , // container to render in

            elements: this.data,

            style: [ // the stylesheet for the graph
            {
                selector: 'node',
                style: {
                    'background-color': 'data(color)'

                }
            },

            {
                selector: 'edge',
                style: {
                    'width': 3,
                    'line-color': '#ccc',
                    'target-arrow-color': '#ccc',
                    'target-arrow-shape': 'triangle'
                }
            }
        ],

            /*layout: {
            name: 'grid',
                rows: 1
        }*/
        });

        var fcoseLayout:FcoseLayout=new FcoseLayout(this.cy);
        fcoseLayout.execute();

        console.log("cy is"+this.cy);

    }


}
