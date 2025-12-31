import { Repository, SelectQueryBuilder } from 'typeorm';
import { QueryParams } from './query-params';
import { Wrapper } from './wrapper';
import { Comparison, CRUDMessages, Order } from './enums/qwery-enums';

import { Filter } from './filters';
import { ManejadorErrores } from './manejador-errores';

/**
 * Class: query-finder.ts
 * Description:
 *
 * Realizar busqueda de acuerdo al query params
 *
 * @author Ángel Oswaldo Jiménez Pérez.
 * @email aojimenezp@desarrollo-ultrasist.com.mx
 *
 * @created 13/02/2024
 * @version 1.0
 * @category Utils
 */
export class QueryFinder<T> {
  objectQueryBuilder: SelectQueryBuilder<T>;
  queryParams: QueryParams;

  constructor(payload: SelectQueryBuilder<T>) {
    this.objectQueryBuilder = payload;
  }

  /**
   * Entrega resultados de busqueda
   *
   * @param repository Repositorio
   * @param queryParams Query de filtrado
   * @returns Entrega resultados de busqueda
   */
  public config(
    repository: Repository<T>,
    queryParams: QueryParams,
    properties: Array<{ campo: string; alias: string }> | null,
  ): void {
    this.queryParams = queryParams;
    try {
      if (!queryParams.page || queryParams.page <= 0) queryParams.page = 1;
      if (
        (!queryParams.take || queryParams.take <= 0) &&
        queryParams.take !== -1
      )
        queryParams.take = 10;
      if (queryParams.take > 100) queryParams.take = 100;
      if (queryParams.take === -1) delete queryParams.take;

      if (!this.objectQueryBuilder) {
        this.objectQueryBuilder = repository.createQueryBuilder();
      }

      if (properties && properties.length > 0) {
        for (const [index, property] of properties.entries()) {
          if (index === 0)
            this.objectQueryBuilder.select(property.campo, property.alias);
          else
            this.objectQueryBuilder.addSelect(property.campo, property.alias);
        }
      }
      let skip: number;
      if (queryParams.take !== undefined) {
        skip = (queryParams.page - 1) * queryParams.take;
      }
      if (queryParams.filters) {
        for (let index = 0; index < queryParams.filters.length; index++) {
          const filter = queryParams.filters[index];
          const selectString = this.filterToSelect(filter);
          if (index === 0) {
            this.objectQueryBuilder.where(selectString);
          } else {
            this.objectQueryBuilder.andWhere(selectString);
          }
        }
      }
      if (
        queryParams.orderColumn &&
        queryParams.order &&
        (queryParams.order === Order.ASC || queryParams.order === Order.DESC)
      ) {
        this.objectQueryBuilder.orderBy(
          queryParams.orderColumn,
          queryParams.order,
        );
      }
      if (skip !== undefined) {
        this.objectQueryBuilder.skip(skip).take(queryParams.take);
      }
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'f941c639-9109-4f98-a3ff-aca2b7c7db2e',
      );
    }
  }

  public getQueryBuilder() {
    return this.objectQueryBuilder;
  }

  public async execute() {
    const itemsCount = await this.objectQueryBuilder.getCount();
    const response = await this.objectQueryBuilder.getRawMany();

    //generar clase de salida
    const wrapper = new Wrapper<Array<any>>(
      this.queryParams,
      itemsCount,
      response,
      true,
      CRUDMessages.GetSuccess,
      null,
    );
    return wrapper;
  }

  /**
   * Convierte filtro de busqueda a filtros SQL
   *
   * @param filter Filtro de busqueda
   * @returns Entrega conversion a filtros SQL
   */
  private filterToSelect(filter: any): string {
    const newFilter: Filter = this.filterMapping(filter);
    let compare: string;
    let betweenSymbol = `'`;
    switch (newFilter.comparison) {
      case Comparison.LIKE:
        compare = 'like';
        betweenSymbol = `'%`;
        break;
      case Comparison.ILIKE:
        compare = 'ilike';
        betweenSymbol = `'%`;
        break;
      case Comparison.IN:
        compare = 'in';
        newFilter.value = `(${newFilter.value})`;
        betweenSymbol = '';
        break;
      case Comparison.LESS_THAN:
        compare = '<';
        break;
      case Comparison.MORE_THAN:
        compare = '>';
        break;
      case Comparison.LESS_EQUAL_THAN:
        compare = '<=';
        break;
      case Comparison.MORE_EQUAL_THAN:
        compare = '>=';
        break;
      case Comparison.NOT:
        compare = '<>';
        break;
      default:
        compare = '=';
        break;
    }

    let selectString: string;
    if (newFilter.mode === '26.1952-input') {
      selectString = `"${newFilter.property}" ${compare} '%"input":{"address":"${newFilter.value}"%'`;
    }
    if (newFilter.mode === '26.1952-outputs') {
      selectString = `("${newFilter.property}" ${compare} '%"outputs":[{"address":"${newFilter.value}"%' 
                     OR "${newFilter.property}" ${compare} '%{"address":"${newFilter.value}"%')`;
    }
    if (
      newFilter.mode === '94.4855' &&
      [
        Comparison.EQUAL,
        Comparison.NOT,
        Comparison.LESS_THAN,
        Comparison.MORE_THAN,
        Comparison.LESS_EQUAL_THAN,
        Comparison.MORE_EQUAL_THAN,
      ].includes(newFilter.comparison)
    ) {
      selectString = `DATE(${newFilter.property}) ${compare} DATE('${newFilter.value}')`;
    }
    if (
      newFilter.mode === '20.1561' &&
      newFilter.comparison !== Comparison.IN &&
      newFilter.comparison !== Comparison.LIKE &&
      newFilter.comparison !== Comparison.ILIKE
    ) {
      // Modo comparación Fecha (YYYY-MM-DD) de postgres
      selectString = `DATE_TRUNC('day', "${newFilter.property}") ${compare} TO_DATE('${newFilter.value}', 'YYYY-MM-DD')`;
    }
    if (
      newFilter.mode === '51.8294' &&
      newFilter.comparison !== Comparison.IN &&
      newFilter.comparison !== Comparison.LIKE &&
      newFilter.comparison !== Comparison.ILIKE
    ) {
      // Modo comparación Fecha (YYYY-MM-DD) de Sql Server, en este caso el tipo de fecha en el campo no se considera
      selectString = `TRY_CONVERT(DATE, ${newFilter.property}) ${compare} '${newFilter.value}'`;
    } else if (newFilter.mode === '32.1237') {
      // Aceptación de nulos

      if (
        newFilter.value === null ||
        (newFilter.value === 'null' && newFilter.comparison !== Comparison.NOT)
      ) {
        compare = 'is';
      } else if (
        newFilter.value === 'null' &&
        newFilter.comparison === Comparison.NOT
      ) {
        compare = 'is not';
      }

      if (newFilter.value === null || newFilter.value === 'null') {
        selectString = `"${newFilter.property}" ${compare} null`;
      } else {
        selectString = `"${newFilter.property}" ${compare} ${betweenSymbol}${
          newFilter.value
        }${betweenSymbol.split('').reverse().join('')}`;
      }
    } else {
      selectString = `"${newFilter.property}" ${compare} ${betweenSymbol}${
        newFilter.value
      }${betweenSymbol.split('').reverse().join('')}`;
    }
    return selectString;
  }

  /**
   * Mapeo de filtro de busqueda
   *
   * @param filter Filtro de busqueda
   * @returns Entrega instancia de filtro de busqueda
   */
  private filterMapping(filter: any): Filter {
    let unit: any;
    if (typeof filter === 'string') {
      unit = JSON.parse(filter);
    } else {
      unit = filter;
    }
    const mapeo = new Filter();
    mapeo.comparison = unit.comparison;
    mapeo.property = unit.property;
    mapeo.value = unit.value;
    mapeo.mode = unit.mode;
    return mapeo;
  }
}
