import { Comparison } from './enums/qwery-enums';

export class Filter {
  property: string;
  comparison: Comparison;
  value: string;
  mode: string | null;
}
