import 'vue-router';
declare module 'vue-router' {
  export interface IRouteRecordRaw extends RouteRecordRaw {
    children?: IRouteRecordRaw[];
    meta?: RouteMeta;
  }
  export interface RouteMeta {
    title: string;
    hideTab: boolean;
    keepAlive: boolean;
  }
}
