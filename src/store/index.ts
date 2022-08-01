import { setLocalStorage, getLocalStorage } from '@/utils/storage';
import { createPinia, PiniaPluginContext } from 'pinia';
import { toRaw } from 'vue';
const store = createPinia();

type Options = {
  key?: string;
};

const _piniaKey: string = 'hey';
const piniaPlugin = (options: Options) => {
  return (context: PiniaPluginContext) => {
    const { store } = context;
    const data = getLocalStorage(`${options.key ?? _piniaKey}-${store.$id}`);
    store.$subscribe(
      () => {
        setLocalStorage(`${options.key ?? _piniaKey}-${store.$id}`, toRaw(store.$state));
      },
      { detached: true },
    );
    return {
      ...data,
    };
  };
};

store.use(
  piniaPlugin({
    key: 'pinia',
  }),
);

export default store;
