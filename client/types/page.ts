import type { GitPluginPageData } from '@vuepress/plugin-git';
import type { NavLink, SidebarConfig } from './nav';

export interface DefaultThemePageData extends GitPluginPageData {
  filePathRelative: string;
}

export interface DefaultThemePageFrontmatter {
  home?: boolean;
  navbar?: boolean;
  pageClass?: string;
}

export interface Author {
  avatar: string;
  name: string;
  introduction: string;
}
export interface Contact {
  github?: string;
  qq?: string;
  csdn?: string;
  wechat?: string;
  zhihu?: string;
  email?: string;
  juejin?: string;
  gitee?: string;
  weibo?: string;
  jianshu?: string;
}

export interface DefaultThemeHomePageFrontmatter
  extends DefaultThemePageFrontmatter {
  home: true;
  heroImage?: string;
  heroImageDark?: string;
  heroAlt?: string;
  heroText?: string | null;
  tagline?: string | null;
  actions?: {
    text: string;
    link: string;
    type?: 'primary' | 'secondary';
  }[];
  features?: {
    title: string;
    details: string;
  }[];
  footer?: string;
  footerHtml?: boolean;
  author?: Author;
  contact?: Contact;
  sidebar?: boolean;
}

export interface DefaultThemeNormalPageFrontmatter
  extends DefaultThemePageFrontmatter {
  home?: false;
  editLink?: boolean;
  editLinkPattern?: string;
  lastUpdated?: boolean;
  contributors?: boolean;
  sidebar?: 'auto' | false | SidebarConfig;
  sidebarDepth?: number;
  prev?: string | NavLink;
  next?: string | NavLink;
}
