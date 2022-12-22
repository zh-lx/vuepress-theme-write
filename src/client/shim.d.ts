declare module '*.vue' {
  import type { ComponentOptions } from 'vue';
  const comp: ComponentOptions;
  export default comp;
}

declare module '*.svg';
declare module '*.jpg';
declare var __VUEPRESS_DEV__: boolean;
declare module 'HomeFooter';
declare module 'NavbarExtra';

declare const $Site: {
  backgroundImage: string;
  backgroundImageDark: string;
  title: string;
  description: string;
  type: 'blog' | 'docs';
  start: string;
  startPath: string;
  homeImg: string;
  hidePageMeta: boolean;
};

declare const $Author: {
  name: string;
  avatar: string;
  introduction: string;
};

declare const $Contact: {
  juejin: string;
  github: string;
  qq: string;
  wechat: string;
  email: string;
  csdn: string;
  zhihu: string;
};

declare const $HomeItems: {
  title: string;
  text: string;
  img: string;
}[];
