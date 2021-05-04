/// <reference types="cytoscape"/>
/// <reference types="popper.js"/>

declare namespace cytoscape {
  export interface Core {
    graphml(): string;
  }
  export interface Singular {
    popperRef(): Element;
    popper(): Element;
  }
}
