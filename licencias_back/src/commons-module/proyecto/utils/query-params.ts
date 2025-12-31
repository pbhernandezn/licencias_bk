import { Comparison, Order } from '../utils/enums/qwery-enums';
import { Filter } from './filters';

export class QueryParams {
  public page: number;
  public take: number;
  public order: Order;
  public orderColumn: string;
  public filters: Filter[];

  constructor() {
    this.filters = [];
    this.take = -1;
  }

  get skip(): number {
    return (this.page - 1) * this.take;
  }

  create(order: Order, page: number, take: number, filters: Filter[] = null) {
    this.page = page;
    this.take = take;
    this.order = order;
    this.filters = filters;
    return this;
  }

  injectarObjeto(obj: any) {
    this.page = obj.page;
    this.filters = obj.filters;
    this.order = obj.order;
    this.orderColumn = obj.orderColumn;
    this.take = obj.take;
  }

  agregarFiltro(
    property: string,
    comparison: Comparison,
    value: string,
    mode: string | null,
  ) {
    const newFilter = new Filter();
    newFilter.comparison = comparison;
    newFilter.mode = mode;
    newFilter.property = property;
    newFilter.value = value;
    if (!this.filters) {
      this.filters = [];
    }
    this.filters.push(newFilter);
  }
}
