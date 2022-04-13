/// <reference types="cytoscape"/>


declare namespace LayoutUtil {

  export interface Options {
    idealEdgeLength?: number,
    offset?: number,

    // Packing
    desiredAspectRatio?: number,
    polyominoGridSizeFactor?: number,
    utilityFunction?: 1 | 2  //1 maximize adjusted Fullness   2: maximizes weighted function of fullness and aspect ratio
    componentSpacing?: number // use to increase spacing between components in pixels
  }

  export interface API {
    setOption(name: string, value: any);

    placeHiddenNodes(nodesWithLayout: cytoscape.NodeCollection);

    placeNewNodes(nodesWithoutLayout: cytoscape.NodeCollection);

    packComponents(components: Component[], randomize: boolean): PackComponentResults;
  }

  interface Component {
    nodes: Node[],
    edges: Edge[],
  }

  interface Node {
    x: number;
    y: number;
    width: number;
    height: number;
  }

  interface Edge {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  }

  interface PackComponentResults {
    shifts: { dx: number, dy: number }[];
    aspectRatio: number;
    fullness: number;
    adjustedFullness: number;
  }
}