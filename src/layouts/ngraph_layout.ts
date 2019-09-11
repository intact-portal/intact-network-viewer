import { Constants } from './constants';

export class NgraphLayout {
  // field
  private cy: any;
  private options: any = Constants.NGRAPH_LAYOUT_OPTIONS;

  // constructor
  constructor(cy: any) {
    this.cy = cy;
  }

  // function
  public execute(): void {
    const localOptions = this.options; // don't know why but we have to do this, can't access class variable directly
    const layout = this.cy.layout({ name: 'cyforcelayout', localOptions });
    /* const layout = this.cy.layout({ name: 'cise' });*/
    layout.run();
  }
}
