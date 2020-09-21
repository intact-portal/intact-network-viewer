import { Utility } from './../utility';
import { EdgeColorLegend } from './edge_color_legend';
import { EdgeShapesLegend } from './edge_shape_legend';
import { EdgeThicknessLegend } from './edge_thickness_legend';

export class EdgeLegend {
  private shapes!: string[];
  private colors!: string[];
  private thickness!: string[];
  private edgeColorLegend: EdgeColorLegend;
  private edgeThicknessLegend: EdgeThicknessLegend;
  private edgeShapesLegend: EdgeShapesLegend;

  constructor(edges: any, private utility: Utility) {
    this.initializeEdgeShapesColorsAndThickness(edges);
    /*this.nodeShapeLegend = new NodeShapeLegend(this.shapes,utility);*/
    this.edgeColorLegend = new EdgeColorLegend(this.colors, utility);
    this.edgeThicknessLegend = new EdgeThicknessLegend(this.thickness, utility);
    this.edgeShapesLegend = new EdgeShapesLegend(this.shapes, utility);
  }

  public createColorLegend(graphState: string): HTMLDivElement {
    return this.edgeColorLegend.createLegend(graphState);
  }

  public createThicknessLegend(): HTMLDivElement {
    return this.edgeThicknessLegend.createLegend();
  }

  public createShapesLegend(): HTMLDivElement {
    if (this.shapes.length === 1) {
      return null as unknown as HTMLDivElement;
    }
    return this.edgeShapesLegend.createLegend();
  }

  private initializeEdgeShapesColorsAndThickness(edges: any): void {
    const shapesSet = new Set<string>();
    const colorsSet = new Set<string>();
    const thicknessSet = new Set<string>();

    edges.forEach(node => {
      shapesSet.add(node.style('line-style'));
      colorsSet.add(node.style('line-color'));
      thicknessSet.add(node.style('width'));
    });

    this.shapes = Array.from(shapesSet.values());
    this.shapes.sort(this.utility.shapeSorter);
    this.colors = Array.from(colorsSet.values());
    this.colors.sort((a, b) => {
      const colorA = a.replace(/\s/g, '');
      const colorB = b.replace(/\s/g, '');
      if (colorA === 'rgb(153,153,153)') {
        return 1;
      }

      if (colorB === 'rgb(153,153,153)') {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      if (b > a) {
        return -1;
      }
      return 0;
    });

    this.thickness = Array.from(thicknessSet.values());
    this.thickness.sort((a, b) => {
      if (a > b) {
        return 1;
      }
      if (b > a) {
        return -1;
      }
      return 0;
    });
  }
}
