import { Constants } from './constants';

export class AvsdfLayout {
  // field
  private cy: any;
  private options: any = Constants.AVSDF_LAYOUT_OPTIONS;

  // constructor
  constructor(cy: any) {
    this.cy = cy;
  }

  // function
  public execute(): void {
    const localOptions = this.options; // don't know why but we have to do this, can't access class variable directly
    const layout = this.cy.layout(localOptions);
    layout.run();
  }
}
