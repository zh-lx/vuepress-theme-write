export const themeMode = {
  lightMode: {
    // 主题色
    '--blue-1': '#E8F7FF', // 白底悬浮
    '--blue-2': '#C3E7FE', // 文字禁用
    '--blue-3': '#9FD4FD', // 一般禁用
    '--blue-4': '#7BC0FC',
    '--blue-5': '#57A9FB', // hover
    '--blue-6': '#3491FA', // 常规
    '--blue-7': '#206CCF', // 点击
    '--blue-8': '#114BA3',
    '--blue-9': '#063078',
    '--blue-10': '#001A4D',
    // 文字颜色
    '--color-text-0': '#ffffff',
    '--color-text-1': '#f7f8fa',
    '--color-text-2': '#f2f3f5',
    '--color-text-3': '#e5e6eb',
    '--color-text-4': '#c9cdd4', // 占位/置灰
    '--color-text-5': '#a9aeb8',
    '--color-text-6': '#86909c', // 次要
    '--color-text-7': '#6b7785',
    '--color-text-8': '#4e5969', // 常规
    '--color-text-9': '#272e3b',
    '--color-text-10': '#1d2129', // 主文字
    // 边框颜色
    '--color-border-1': '1px solid var(--color-text-6)',
    '--color-border-2': '1px solid var(--color-text-4)',
    '--color-border-3': '1px solid var(--color-text-3)',
    '--color-border-4': '1px solid var(--color-text-2)',
    '--color-border-2-color': 'var(--color-text-4)',
    // shadow box
    '--shadow-1': '0 0 1px rgba(0, 0, 0, 0.3)',
    '--shadow-2': '0 0 10px rgba(0, 0, 0, 0.1)',
    '--shadow-3': '0 0 20px rgba(0, 0, 0, 0.1)',
    '--shadow-4': '0 0 20px rgba(0, 0, 0, 0.3)',
    // bgc color
    '--common-bgc': '#fff',
    '--hero-bg-color': '#f7f7f7',
    '--page-bgc': '#f3f3f3',
    '--selected-bgc': 'rgb(245, 248, 255)', // hover 的背景色
    '--sidebar-mask-bgc': 'rgba(0, 0, 0, 0.5)', // 遮罩层背景色
    '--default-tag-bgc': '#faecd8', // 默认标签背景色
    '--tooltip-bgc': 'rgba(0, 0, 0, 0.4)',
    '--common-arrow-bgc': '#cccccc',
    '--input-bgc': '#ffffff',
    '--code-bg': 'rgba(55, 55, 57, 0.1)',
    // others
    '--search-accent-color': '#409EFF', // 改变 doc-search 下拉项颜色
    '--search-input-width': '140px', //  改变 doc-search 搜索框宽度
    '--search-bg-color': '#ffffff',
    '--search-text-color': '#606266',
    '--search-border-color': '#909399',
    '--navbar-height': '50px',
  },
  darkMode: {
    // 主题色
    '--blue-1': '#001A4D', // 白底悬浮
    '--blue-2': '#052F78', // 文字禁用
    '--blue-3': '#134CA3', // 一般禁用
    '--blue-4': '#2971CF',
    '--blue-5': '#469AFA', // hover
    '--blue-6': '#5AAAFB', // 常规
    '--blue-7': '#7DC1FC', // 点击
    '--blue-8': '#A1D5FD',
    '--blue-9': '#C6E8FE',
    '--blue-10': '#EAF8FF',
    // 文字颜色
    '--color-text-0': '#ffffff', // 选中后翻转的文字颜色
    '--color-text-1': '#17171A',
    '--color-text-2': '#2E2E30',
    '--color-text-3': '#484849',
    '--color-text-4': '#5F5F60', // 占位/置灰
    '--color-text-5': '#78787A',
    '--color-text-6': '#929293', // 次要
    '--color-text-7': '#ABABAC',
    '--color-text-8': '#C5C5C5', // 常规
    '--color-text-9': '#DFDFDF',
    '--color-text-10': '#F6F6F6', // 主文字
    // 边框颜色
    '--color-border-1': '1px solid var(--color-text-6)',
    '--color-border-2': '1px solid var(--color-text-4)',
    '--color-border-3': '1px solid var(--color-text-3)',
    '--color-border-4': '1px solid var(--color-text-2)',
    '--color-border-2-color': 'var(--color-text-4)',
    // bgc color
    '--common-bgc': '#22272E', //----
    '--hero-bg-color': '#090909',
    '--page-bgc': '#0d0d0d',
    '--selected-bgc': '#162637', // hover 的背景色
    '--sidebar-mask-bgc': 'rgba(255, 255, 255, 0.5)', // 遮罩层背景色
    '--default-tag-bgc': '#4c1130', // 默认标签背景色
    '--tooltip-bgc': 'rgba(255, 255, 255, 0.4)',
    '--common-arrow-bgc': '#333333',
    '--input-bgc': '#333a3f',
    '--code-bg': 'rgba(246, 246, 246, 0.9)',
    // shadow box
    '--shadow-1': '0 0 1px rgba(255, 255, 255, 0.3)',
    '--shadow-2': '0 0 10px rgba(255, 255, 255, 0.1)',
    '--shadow-3': '0 0 20px rgba(255, 255, 255, 0.1)',
    '--shadow-4': '0 0 20px rgba(255, 255, 255, 0.3)',
    // others
    '--search-accent-color': '#409EFF', // 改变 doc-search 下拉项颜色
    '--search-input-width': '140px', //  改变 doc-search 搜索框宽度
    '--search-bg-color': '#333a3f',
    '--search-text-color': '#ADBAC7',
    '--search-border-color': '#909399',
    '--navbar-height': '50px',
  },
};
