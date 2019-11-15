export class Export {
  private cy: any;

  constructor(cy: any) {
    this.cy = cy;
  }

  public exportAsGraphml(): void {
    console.log(this.cy.graphml());
    let element = document.createElement('a');
    let filename="network.graphml";
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.cy.graphml()));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
}
