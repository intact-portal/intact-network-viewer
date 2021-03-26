import { EdgeShape } from '../styles/constants/edge-shape';
import { BooleanLegend } from './boolean-legend';

export class EdgeLegend {
  summary_color: any = {};
  summary_width: { minValue: number; maxValue: number; minWidth: number; maxWidth: number } = {
    minValue: 0, minWidth: 0, maxValue: 1, maxWidth: 1,
  };
  evidence_color: any = {};
  mutation_color: { true: BooleanLegend<string>; false: BooleanLegend<string> } = {
    false: {
      label: 'No participant mutated',
      value: '#000000',
    },
    true: {
      label: 'Participant(s) mutated',
      value: '#ff0000',
    },
  };
  mutation_width: { true: BooleanLegend<number>; false: BooleanLegend<number> } = {
    false: {
      label: 'No participant mutated',
      value: 1,
    },
    true: {
      label: 'Participant(s) mutated',
      value: 4,
    }
  };
  expansion: { true: BooleanLegend<EdgeShape>; false: BooleanLegend<EdgeShape> } = {
    false: {
      label: 'Not expanded',
      value: EdgeShape.SOLID_LINE,
    },
    true: {
      label: 'Expanded',
      value: EdgeShape.DASHED_LINE,
    }
  }
}
