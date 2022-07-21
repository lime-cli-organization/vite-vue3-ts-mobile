import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);
// goloba css
import '@/styles/reset.less';
import '@/styles/common.less';
// rem
import 'lib-flexible/flexible';
// svg-icon
import 'virtual:svg-icons-register';
import LSvgIcon from '@/components/system/LSvgIcon.vue';
app.component('LSvgIcon', LSvgIcon);
// 路由
import { router } from '@/route/index';
app.use(router);
// pinia 全局状态管理
import store from '@/store/index';
app.use(store);
// 动画库
import 'animate.css';
// vant-ui
import {
  Button,
  Image,
  DropdownMenu,
  DropdownItem,
  RadioGroup,
  Radio,
  Notify,
  Checkbox,
  CheckboxGroup,
  Form,
  Field,
  Picker,
  Calendar,
  PullRefresh,
  List,
} from 'vant';
// ant 中有个别组件是以函数的形式提供的，包括 Toast，Dialog，Notify 和 ImagePreview 组件。
// 在使用函数组件时，unplugin-vue-components 无法自动引入对应的样式，因此需要手动引入样式。
import 'vant/es/notify/style';
app
  .use(Button)
  .use(Image)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(RadioGroup)
  .use(Radio)
  .use(CheckboxGroup)
  .use(Checkbox)
  .use(Form)
  .use(Field)
  .use(Picker)
  .use(Calendar)
  .use(PullRefresh)
  .use(List)
  .use(Notify);

// 挂载全局自定义变量
// app.config.globalProperties

// dayjs
import dayjs from 'dayjs';
import { Vue } from 'vue-demi';
// 全局过滤器
app.config.globalProperties.$filter = {
  format(value: number, format: string = 'YYYY-MM-DD HH:mm:ss') {
    return value && dayjs(value * 1000).format(format);
  },
};

app.mount('#app');
