import { translateParams } from '@/utils/tools';
import { Paper } from './Paper';
import service from './request';

export namespace Topic {
  export interface ISetLikePrams {
    topicId: number;
    type: boolean;
  }
  export interface ISetLikeReturn {
    id: string;
    topicId: number;
    isFormal: boolean;
    term: string;
  }

  export interface IWrongParams {
    courseId: number;
    page: number;
    term: string;
    bookId: number;
    isExam: boolean;
  }
}

export const SetLike = (data: Topic.ISetLikePrams) => {
  return service.post<Topic.ISetLikeReturn>(`/api/Topic/SetLike?${translateParams(data)}`, data);
};

export const GetWrongTopicList = (params: Topic.IWrongParams) => {
  return service.get<Paper.ITopicItem[]>('api/Topic/GetWrongTopicList', params);
};
