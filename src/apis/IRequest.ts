export interface IResult {
  code: number;
  msg: string;
  total?: number;
}

export interface IResultData<T = any> extends IResult {
  data: T;
}
