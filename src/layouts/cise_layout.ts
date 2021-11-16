import { ElementDefinition } from 'cytoscape';
import { Node } from '../constants/node';
import { Global } from '../global';
import { Constants } from './constants';

export class CiseLayout {
  private _options: any = Constants.CISE_LAYOUT_OPTIONS;

  public execute(): void {
    const localOptions = this._options; // don't know why but we have to do this, can't access class variable directly
    localOptions.clusters = CiseLayout.getClustersFromCytoscape();
    const layout = Global.graphcy.layout(localOptions);
    layout.run();
  }

  public static getClustersFromData(data: ElementDefinition[]): string[][] {
    const speciesToCluster = new Map<string, string[]>();
    data
      .filter(value => value.group === 'nodes')
      .forEach(node => {
        const species = node.data.species;
        if (speciesToCluster.has(species)) {
          speciesToCluster.get(species).push(node.data.id);
        } else {
          speciesToCluster.set(species, [node.data.id]);
        }
      });

    return Array.from(speciesToCluster.values());
  }

  public static getClustersFromCytoscape(): string[][] {
    const speciesToCluster = new Map<string, string[]>();

    Global.graphcy.nodes().forEach(node => {
      const species = node.data(Node.SPECIES);
      if (speciesToCluster.has(species)) {
        speciesToCluster.get(species).push(node.id());
      } else {
        speciesToCluster.set(species, [node.id()]);
      }
    });

    return Array.from(speciesToCluster.values());
  }
}
