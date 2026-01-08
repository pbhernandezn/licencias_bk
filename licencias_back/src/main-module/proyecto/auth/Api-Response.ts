export interface ApiResponse<T> {
  code: string | number;
  internalCode: string;
  message: string;
  data: T;
}
