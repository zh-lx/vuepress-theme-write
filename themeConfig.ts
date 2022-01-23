module.exports = {
  logo: '/images/logo.png',
  darkMode: true,
  sidebarDepth: 6,
  sidebar: {
    '/代码仓库/git/': [
      {
        children: [
          '/代码仓库/git/实用总结.md',
          '/代码仓库/git/Git操作指令大全.md',
          {
            text: 'test',
            children: [
              '/代码仓库/git/实用总结.md',
              '/代码仓库/git/Git操作指令大全.md',
            ],
          },
        ],
      },
    ],
  },
};
