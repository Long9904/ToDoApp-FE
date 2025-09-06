export type ApiResult<T> = {
  isSuccess: boolean;
  value?: T;
  errors?: any;
  statusCode?: number;
};
