/// <reference types="cytoscape"/>
/// <reference types="popper.js"/>

declare namespace cytoscape {
  export interface Core {
    graphml(): string;

    layoutUtilities(options: {
      idealEdgeLength?: number,
      offset?: number,

      // Packing
      desiredAspectRatio?: number,
      polyominoGridSizeFactor?: number,
      utilityFunction?: number  // maximize adjusted Fullness   2: maximizes weighted function of fullness and aspect ratio
      componentSpacing?: number // use to increase spacing between components in pixels
    })
  }

  export interface Singular {
    popperRef(): Element;

    popper(): Element;
  }

  export interface CytoscapeOptions {
    ready?(): void
  }
}
