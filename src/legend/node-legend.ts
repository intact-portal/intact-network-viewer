import { BooleanLegend } from './boolean-legend';
import { Mapper } from './mapper';
import { NodeShape } from '../styles/constants/node-shape';

export interface NodeLegend {
  shape: Mapper<NodeShape>;
  species_color: Mapper<string>;
  kingdom_color: Mapper<string>;
  border_color: BooleanLegend<string>;
  border_width: BooleanLegend<number>;
}
