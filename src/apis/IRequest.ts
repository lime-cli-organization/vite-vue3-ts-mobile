interface IResult {
  code: number;
  msg: string;
}

interface IResultData<T = any> extends IResult {
  data: T;
}
