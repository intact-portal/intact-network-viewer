import cytoscape from 'cytoscape';
import fcose from 'cytoscape-fcose';
import {FcoseLayout} from "./layouts/fcose_layout";
cytoscape.use( fcose );
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
            , // container to render in

            elements: [ // list of graph elements to start with
            { // node a
                data: { id: 'a' }
            },
            { // node b
                data: { id: 'b' }
            },
            { // edge ab
                data: { id: 'ab', source: 'a', target: 'b' }
            }
        ],

            style: [ // the stylesheet for the graph
            {
                selector: 'node',
                style: {
                    'background-color': '#666',
                    'label': 'data(id)'
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
