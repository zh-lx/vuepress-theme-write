declare module '*.vue' {
  import type { ComponentOptions } from 'vue';
  const comp: ComponentOptions;
  export default comp;
}
declare module '*.svg';
declare var __VUEPRESS_DEV__: boolean;
declare const HOME_INFO: {
  containerId: string;
  backgroundImage: string;
  title: string;
  description: string;
};
