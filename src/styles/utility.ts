export class Utility {
  private edgeWidthParams!: { minValue: number; maxValue: number; minWidth: number; maxWidth: number };

  constructor(edgeWidthLinearParams: { minValue: number; maxValue: number; minWidth: number; maxWidth: number }) {
    this.edgeWidthParams = edgeWidthLinearParams;
  }

  public edgeWidth(edge: any): string {
    let x = edge.parallelEdges().size();
    if (x <= this.edgeWidthParams.minValue) return this.edgeWidthParams.minWidth + 'px';
    if (x >= this.edgeWidthParams.maxValue) return this.edgeWidthParams.maxWidth + 'px';
    let a =
      (this.edgeWidthParams.maxWidth - this.edgeWidthParams.minWidth) /
      (this.edgeWidthParams.maxValue - this.edgeWidthParams.minValue);
    let b = this.edgeWidthParams.minWidth;
    let s = a * x + b + 'px';
    return s;
  }

  public parentNodeLabelSize(node: any): number {
    if (node.style('font-size') > 20) {
      return 20;
    } else {
      return node.style('font-size');
    }
  }
}
