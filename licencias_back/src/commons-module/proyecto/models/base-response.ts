export class BaseResponse<T> {
  code: string;
  internalCode: string;
  message: string;
  correlationId: string;
  data: T | null;
}