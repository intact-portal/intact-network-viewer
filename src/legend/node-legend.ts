import { NodeShape } from '../styles/constants/node-shape';
import { BooleanLegend } from './boolean-legend';

export class NodeLegend {
  public shape: { [p: string]: NodeShape } = {};
  public species_color: any = {};
  public kingdom_color: any = {};
  public border_color: { true: BooleanLegend<string>; false: BooleanLegend<string> } = {
    false: {
      label: 'Not mutated',
      value: '#000000',
    },
    true: {
      label: 'Mutated',
      value: '#ff0000',
    },
  };
  public border_width: { true: BooleanLegend<number>; false: BooleanLegend<number> } = {
    false: {
      label: 'Not mutated',
      value: 0
    },
    true: {
      label: 'Mutated',
      value: 4
    },
  };
}
