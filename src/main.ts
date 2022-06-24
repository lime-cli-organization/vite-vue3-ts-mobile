import { createApp } from 'vue'
import App from './App.vue'

import '@/styles/reset.less';
import '@/styles/common.less';

import 'lib-flexible/flexible'

import 'virtual:svg-icons-register';
import LSvgIcon from "@/components/system/LSvgIcon.vue";

import { Button } from 'vant';

createApp(App).component('LSvgIcon', LSvgIcon).use(Button).mount('#app')
