import type { GitPluginPageData } from '@vuepress/plugin-git';
import type { NavLink, SidebarConfig } from './nav';

export interface DefaultThemePageData extends GitPluginPageData {
  filePathRelative: string;
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

export interface DefaultThemeHomePageFrontmatter {
  home: true;
  heroImage?: string;
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
  home?: boolean;
  navbar?: boolean;
  pageClass?: string;
}

export interface DefaultThemePageFrontmatter {
  home?: boolean;
  editLink?: boolean;
  lastUpdated?: boolean;
  contributors?: boolean;
  prev?: string | NavLink;
  next?: string | NavLink;
  sidebar?: 'auto' | false | SidebarConfig;
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
