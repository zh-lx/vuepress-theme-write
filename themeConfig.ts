module.exports = {
  logo: '/images/logo.png',
  darkMode: true,
  sidebarDepth: 6,
  sidebar: {
    '/代码仓库/git/': [
      {
        text: 'git',
        children: [
          '/代码仓库/git/实用总结.md',
          '/代码仓库/git/Git操作指令大全.md',
        ],
      },
    ],
  },

  markdown: {
    extractHeaders: {
      level: [1, 2, 3, 4, 5, 6],
      slugify: (string) => {
        console.log(string);
        return string;
      },
    },
  },
};
