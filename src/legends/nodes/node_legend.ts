import { Constants } from './../constants';
import { NodeColorLegend } from './node_color_legend';
import { NodeShapeLegend } from './node_shape_legend';
import { NodeBorderColorLegend } from './node_border_color_legend';
import { Utility } from './../utility';
import { CompoundNodeColorLegend } from './compound_node_color_legend';

export class NodeLegend {
  private shapes!: Array<string>;
  private colors!: Array<string>;
  private borderColors!: Array<string>;
  private compoundNodeColors!: Array<string>;

  private nodeShapeLegend: NodeShapeLegend;
  private nodeColorLegend: NodeColorLegend;
  private nodeBorderColorLegend: NodeBorderColorLegend;
  private compoundNodeColorLegend: CompoundNodeColorLegend;

  constructor(nodes: any, utility: Utility) {
    this.initializeNodeShapesColorsAndBorders(nodes);
    this.nodeShapeLegend = new NodeShapeLegend(this.shapes, utility);
    this.nodeColorLegend = new NodeColorLegend(this.colors, utility);
    this.nodeBorderColorLegend = new NodeBorderColorLegend(this.borderColors, utility);
    this.compoundNodeColorLegend = new CompoundNodeColorLegend(this.compoundNodeColors, utility);
  }
  private initializeNodeShapesColorsAndBorders(nodes: any): void {
    let shapesSet = new Set<string>();
    let colorsSet = new Set<string>();
    let borderColorSet = new Set<string>();
    let compoundNodeColorSet = new Set<string>();

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
    this.shapes.sort(function(a, b) {
      if (a == 'tag') {
        return 1;
      }
      if (b == 'tag') {
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

    this.colors = Array.from(colorsSet.values());
    this.colors.sort(function(a, b) {
      let colorA = a.replace(/\s/g, '');
      let colorB = b.replace(/\s/g, '');
      if (colorA == 'rgb(173,188,148)') {
        return 1;
      } else if (colorA == 'rgb(220,220,220)') {
        return -1;
      }

      if (colorB == 'rgb(173,188,148)') {
        return -1;
      } else if (colorB == 'rgb(220,220,220)') {
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
    this.borderColors.sort(function(a, b) {
      if (a > b) {
        return 1;
      }
      if (b > a) {
        return -1;
      }
      return 0;
    });

    this.compoundNodeColors = Array.from(compoundNodeColorSet.values());
    this.compoundNodeColors.sort(function(a, b) {
      if (a > b) {
        return 1;
      }
      if (b > a) {
        return -1;
      }
      return 0;
    });
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
}
