import service from './request';

export namespace Cache {
  export interface ICourseResult {
    id: number;
    name: string;
  }

  export interface IBookQuery {
    courseId: number;
    bookId: number;
  }
  export interface IBookItem {
    isCheck?: boolean;
    id: number;
    name: string;
    parentId: number;
    subBooks: IBookItem[];
  }
  export interface IBookResult {
    id: number;
    name: string;
    parentId: number;
    subBooks: IBookItem[];
  }
}

export const GetCourse = () => {
  return service.get<Cache.ICourseResult>(`/api/Cache/GetCourse`);
};

export const GetBook = (params: Cache.IBookQuery) => {
  return service.get<Cache.IBookResult>(`/api/Cache/GetBook`, params);
};
