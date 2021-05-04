import { LayoutOptions } from 'cytoscape';
import { Global } from '../global';
import { Constants } from './constants';

export class NgraphLayout {
  private options: LayoutOptions = Constants.NGRAPH_LAYOUT_OPTIONS;

  public execute(): void {
    const layout = Global.graphcy.layout({ name: 'cyforcelayout', ...this.options });
    layout.run();
  }
}
