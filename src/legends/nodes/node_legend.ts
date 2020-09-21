import { Constants } from './../constants';
import { Utility } from './../utility';
import { CompoundNodeColorLegend } from './compound_node_color_legend';
import { NodeBorderColorLegend } from './node_border_color_legend';
import { NodeColorLegend } from './node_color_legend';
import { NodeShapeLegend } from './node_shape_legend';

export class NodeLegend {
  private shapes!: string[];
  private colors!: string[];
  private borderColors!: string[];
  private compoundNodeColors!: string[];

  private nodeShapeLegend: NodeShapeLegend;
  private nodeColorLegend: NodeColorLegend;
  private nodeBorderColorLegend: NodeBorderColorLegend;
  private compoundNodeColorLegend: CompoundNodeColorLegend;

  constructor(nodes: any, private utility: Utility) {
    this.initializeNodeShapesColorsAndBorders(nodes);
    this.nodeShapeLegend = new NodeShapeLegend(this.shapes, utility);
    this.nodeColorLegend = new NodeColorLegend(this.colors, utility);
    this.nodeBorderColorLegend = new NodeBorderColorLegend(this.borderColors, utility);
    this.compoundNodeColorLegend = new CompoundNodeColorLegend(this.compoundNodeColors, utility);
  }

  public createShapeLegend(): HTMLDivElement {
    return this.nodeShapeLegend.createLegend();
  }

  public createColorLegend(): HTMLDivElement {
    return this.nodeColorLegend.createLegend();
  }

  public createBorderLegend(): HTMLDivElement {
    return this.nodeBorderColorLegend.createLegend();
  }

  public createCompoundNodeColorLegend(): HTMLDivElement {
    return this.compoundNodeColorLegend.createLegend();
  }

  private initializeNodeShapesColorsAndBorders(nodes: any): void {
    const shapesSet = new Set<string>();
    const colorsSet = new Set<string>();
    const borderColorSet = new Set<string>();
    const compoundNodeColorSet = new Set<string>();

    nodes.forEach(node => {
      shapesSet.add(node.style('shape'));
      if (node.isParent()) {
        compoundNodeColorSet.add(node.style('background-color'));
      } else {
        colorsSet.add(node.style('background-color'));
      }
      borderColorSet.add(node.style('border-color'));
    });

    this.shapes = Array.from(shapesSet.values());
    this.shapes.sort(this.utility.shapeSorter);
    this.colors = Array.from(colorsSet.values());
    this.colors.sort((a, b) => {
      const colorA = a.replace(/\s/g, '');
      const colorB = b.replace(/\s/g, '');
      if (colorA === 'rgb(173,188,148)') {
        return 1;
      } else if (colorA === 'rgb(220,220,220)') {
        return -1;
      }

      if (colorB === 'rgb(173,188,148)') {
        return -1;
      } else if (colorB === 'rgb(220,220,220)') {
        return 1;
      }
      if (a > b) {
        return 1;
      }
      if (b > a) {
        return -1;
      }
      return 0;
    });

    this.borderColors = Array.from(borderColorSet.values());
    this.borderColors.sort((a, b) => {
      if (a > b) {
        return 1;
      }
      if (b > a) {
        return -1;
      }
      return 0;
    });

    this.compoundNodeColors = Array.from(compoundNodeColorSet.values());
    this.compoundNodeColors.sort((a, b) => {
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
