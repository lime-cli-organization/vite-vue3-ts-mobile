import { ExtractPropTypes, PropType } from "vue";

export type Key = string | number;
export interface ITreeOption {
  label?: Key,
  key?: Key,
  children?: ITreeOption[],
  [key: string]: unknown
}
export interface ITreeNode extends Required<ITreeOption>  {
  level: number,
  rawNode: ITreeOption,
  children: ITreeNode[]
}

export const LSearchProps = {
  data: {
    type: Array as PropType<ITreeOption[]>,
    default:[]
  },
  labelFieled: {
    type: String,
    default: 'label'
  },
  keyField: {
    type: String,
    default: 'key'
  },
  childrenField: {
    type: String,
    default: 'children'
  },
  value: {
    type: Array as PropType<Key[]>,
    default: []
  },
} as const

export type ISearchProps = Partial<ExtractPropTypes<typeof LSearchProps>>;