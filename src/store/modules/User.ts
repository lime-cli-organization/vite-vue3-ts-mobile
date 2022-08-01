import { defineStore } from 'pinia';
import { removeCookie, setCookie } from '@/utils/storage';
import { GetBindInfo, User } from '@/apis/User';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    userInfo: <User.IBindResult>{},
  }),
  getters: {
    parseToken(state) {
      let strings = state.token.split('.');
      return (
        strings[0] &&
        JSON.parse(
          decodeURIComponent(escape(window.atob(strings[1].replace(/-/g, '+').replace(/_/g, '/')))),
        )
      );
    },
  },
  actions: {
    setToken(payload: string) {
      this.token = payload;
      setCookie('token', payload);
    },
    async setBindInfo() {
      const { data } = await GetBindInfo();
      this.userInfo = { ...data, ...this.userInfo };
    },
    logOut() {
      removeCookie('token');
      localStorage.clear();
    },
  },
});
