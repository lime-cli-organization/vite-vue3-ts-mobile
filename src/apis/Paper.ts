import service from './request';

export namespace Paper {
  export interface ITreeItem {
    id: number;
    name: string;
    list: ITreeItem[];
  }

  export interface IPaperCourseResult {
    checkGrade: string;
    checkTerm: string;
    list?: ITreeItem[];
  }

  export interface IPaperParams {
    levelId: number;
    paperTypeId: number;
    grade: string;
    page: number;
    term: string;
  }

  export interface IPaperInfo {
    id: number;
    isExam: boolean;
    isPay: boolean;
    name: string;
  }

  export interface IPaperItem {
    addPaperId?: string;
    id: string;
    inputTime: number;
    isPayed: boolean;
    name: string;
    paperType: string;
    score: number;
    total: number;
  }

  export interface IPaperArea {
    areaId?: number;
  }

  export interface ITopicItem extends IPaperArea {
    bookType: number;
    hasSub: boolean;
    hasVideo: boolean;
    isLike: boolean;
    analysis: string;
    answer: string;
    option: string;
    parentId: number;
    question: string;
    topicId: number;
    topicSub?: ITopicItem[];
    isRight?: boolean;
  }

  interface IPaperAreaTopicItem {
    id: number;
    parentId: number;
    subArea: ITopicItem[];
  }

  export interface IAreaItem extends IPaperAreaTopicItem {
    title: string;
    topics: ITopicItem[];
  }

  export interface ITopicResult {
    paperInfo: Paper.IPaperInfo;
    topicAnswerInfo: Paper.IAreaItem[];
  }
}

export const GetCourse = () => {
  return service.get<Paper.IPaperCourseResult>('/api/Paper/GetCourse');
};

export const GetPubicList = (params: Paper.IPaperParams) => {
  return service.get<Paper.IPaperItem[]>('/api/Paper/GetPubicList', params);
};

export const GetTopicList = (params: object) => {
  return service.get<Paper.ITopicResult>('/api/Paper/GetTopicList', params);
};
