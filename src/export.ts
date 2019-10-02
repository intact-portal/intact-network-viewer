export class Export {

    private cy: any;

    constructor(cy: any) {
        this.cy = cy;
    }

    public exportAsGraphml(): void {
        alert(this.cy);
        this.cy.graphml();
    }
}