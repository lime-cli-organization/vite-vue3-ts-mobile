import LSearch from './src/LSearch.vue';

declare module 'vue' {
  export interface GlobalComponents {
    // 接口可以自动合并
    ZTree: typeof LSearch;
  }
}

export default LSearch; // 通过import方式单独使用
