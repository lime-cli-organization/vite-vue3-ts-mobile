export interface IResult {
  code: number;
  msg: string;
  total?: number;
}

export interface IResultData<T> extends IResult {
  data: T;
}
