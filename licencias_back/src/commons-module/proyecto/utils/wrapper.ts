export class Wrapper<T> {
  public result: T | T[];
  public page: number;
  public take: number;
  public itemsCount: number;
  public pageCount: number;
  public hasPreviousPage: boolean;
  public hasNextPage: boolean;
  public message: string;
  public innerExceptionMessage: string;
  public success?: boolean = false;
  constructor(
    queryParams,
    itemsCount,
    result,
    success,
    message,
    innerExceptionMessage,
  ) {
    this.page = queryParams.page ?? 1;
    this.pageCount = queryParams.take ?? 0;
    this.itemsCount = itemsCount ?? 0;
    this.pageCount =
      this.itemsCount > 0 ? Math.ceil(this.itemsCount / this.pageCount) : 0;
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
    this.result = result;
    this.success = success;
    this.message = message;
    this.innerExceptionMessage = innerExceptionMessage;
  }
}
