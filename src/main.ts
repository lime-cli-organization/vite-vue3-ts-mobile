import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App);
// goloba css
import '@/styles/reset.less';
import '@/styles/common.less';
// rem
import 'lib-flexible/flexible'
// svg-icon
import 'virtual:svg-icons-register';
import LSvgIcon from "@/components/system/LSvgIcon.vue";
app.component('LSvgIcon', LSvgIcon);
// vant-ui
import { Button } from 'vant';
app.use(Button);
// 路由
import { router } from '@/route/index.ts';
app.use(router);


app.mount('#app');
