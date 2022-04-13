import { BooleanLegend } from './boolean-legend';
import { Mapper } from './mapper';
import { EdgeShape } from '../styles/constants/edge-shape';


export interface EdgeLegend {
  summary_color: Mapper<string>,
  summary_width: { minValue: number; maxValue: number; minWidth: number; maxWidth: number },
  evidence_color: Mapper<string>,
  mutation_color: BooleanLegend<string>,
  mutation_width: BooleanLegend<number>,
  expansion: BooleanLegend<EdgeShape>,
  negative?: BooleanLegend<string>
}