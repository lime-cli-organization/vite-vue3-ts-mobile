import service from './request';

export namespace Exam {
  export interface IExamChartResult {
    name: string;
    score: number;
  }
  export interface IExamChartQuery {
    course: string;
  }
  export interface IExamWeakBookResult {
    id: number;
    levelId: number;
    name: string;
    total: number;
    wrongNum: number;
    wrongRate: number;
  }
  export interface IExamWeakBookQuery {
    course: string;
    count: number;
  }
}

export const GetExamChart = (params: Exam.IExamChartQuery) => {
  return service.get<Exam.IExamChartResult>(`/api/Exam/GetExamChart`, params);
};

export const GetExamWeakBook = (params: Exam.IExamWeakBookQuery) => {
  return service.get<Exam.IExamWeakBookResult>(`/api/Exam/GetExamWeakBook`, params);
};
