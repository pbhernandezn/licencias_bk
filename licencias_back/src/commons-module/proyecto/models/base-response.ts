export class BaseResponse<T> {
  code: string;
  internalCode: string;
  message: string;
  correlationId: string;
  WasSuccess: boolean;
  data: T | null;
}
