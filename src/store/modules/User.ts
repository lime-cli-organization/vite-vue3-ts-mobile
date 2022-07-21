import { defineStore } from 'pinia';
import { removeCookie, setCookie } from '@/utils/storage';

export const useUser = defineStore('user', {
  state: () => ({
    token: '',
  }),
  getters: {
    parseToken(state) {
      var strings = state.token.split('.');
      return JSON.parse(
        decodeURIComponent(escape(window.atob(strings[1].replace(/-/g, '+').replace(/_/g, '/')))),
      );
    },
  },
  actions: {
    setUserInfo(payload: string) {
      this.token = payload;
      setCookie('token', payload);
    },
    logOut() {
      removeCookie('token');
    },
  },
  // 状态数据持久化
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
      },
    ],
  },
});
