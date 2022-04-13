/// <reference types="cytoscape"/>
/// <reference types="popper.js"/>

declare namespace cytoscape {
  type Box = { x1: number, x2: number, y1: number, y2: number } | { x1: number, y1: number, w: number, h: number };

  export namespace Css {
    export interface Overlay {
      /**
       * The colour of the overlay.
       */
      'underlay-color': PropertyValueEdge<Colour>;
      /**
       * The area outside of the element within which the overlay is shown.
       */
      'underlay-padding': PropertyValueEdge<number | string>;
      /**
       * The opacity of the overlay.
       */
      'underlay-opacity': PropertyValueEdge<number>;
    }
  }

  export interface BaseLayoutOptions {
    transform(el: NodeSingular): { x: number, y: number };
  }

  export interface Core {
    graphml(): string;

    layoutUtilities(options: LayoutUtil.Options): LayoutUtil.API;
  }

  export interface Singular {
    popperRef(): Element;

    popper(): Element;
  }

  export interface CytoscapeOptions {
    ready?(): void;
  }
}