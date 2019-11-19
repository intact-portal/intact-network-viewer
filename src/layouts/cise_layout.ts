import { Global } from './../global';
import { Constants } from './constants';

export class CiseLayout {
  private options: any = Constants.CISE_LAYOUT_OPTIONS;

  public execute(): void {
    const localOptions = this.options; // don't know why but we have to do this, can't access class variable directly
    const layout = Global.graphcy.layout(localOptions);
    /* const layout = this.cy.layout({ name: 'cise' });*/
    layout.run();
  }
}
