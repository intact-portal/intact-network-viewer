import { Global } from './../global';
import { Constants } from './constants';

export class ColaLayout {
  private options: any = Constants.COLA_LAYOUT_OPTIONS;

  public execute(): void {
    const localOptions = this.options; // don't know why but we have to do this, can't access class variable directly
    const layout = Global.graphcy.layout(localOptions);
    layout.run();
  }
}
