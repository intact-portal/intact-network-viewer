import { Constants } from './constants';
import { Global } from './../global';

export class AvsdfLayout {
  private options: any = Constants.AVSDF_LAYOUT_OPTIONS;

  constructor() {}

  public execute(): void {
    const localOptions = this.options; // don't know why but we have to do this, can't access class variable directly
    const layout = Global.graphcy.layout(localOptions);
    layout.run();
  }
}
