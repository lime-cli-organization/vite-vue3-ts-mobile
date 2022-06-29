import { translateParams } from '@/utils/tools';
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
}

export const SetLike = (data: Topic.ISetLikePrams) => {
  return service.post<Topic.ISetLikeReturn>(`/api/Topic/SetLike?${translateParams(data)}`, data);
};
