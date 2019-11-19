import { Constants } from './constants';
import { Global } from "./../global";

export class NgraphLayout {

  private options: any = Constants.NGRAPH_LAYOUT_OPTIONS;

  constructor() {

  }

  public execute(): void {
    const localOptions = this.options; // don't know why but we have to do this, can't access class variable directly
    const layout = Global.graphcy.layout({ name: 'cyforcelayout', localOptions });
    /* const layout = this.cy.layout({ name: 'cise' });*/
    layout.run();
  }
}
