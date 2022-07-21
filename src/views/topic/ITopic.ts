interface ITopicArea {
  id: number,
  parentId: number,
  subArea?: ITopicArea[] | null,
  title: string,
  topics?: ITopicInfo[] | null,
}

interface ITopicInfo {
  areaId: number,
  bookTypeId: number,
  hasSub: boolean,
  hasVideo: boolean,
  isLike: boolean,
  option: string,
  parentId: number,
  question: string,
  topicId: string
  topucSub?: ITopicInfo[] | null
}