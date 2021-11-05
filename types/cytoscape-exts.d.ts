/// <reference types="cytoscape"/>
/// <reference types="popper.js"/>

declare namespace cytoscape {
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