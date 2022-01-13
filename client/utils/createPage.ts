const fs = require('fs');
const path = require('path');

// 生成分类页面和标签页面
export const createPages = (sourceDir) => {
  const dirPath = path.join(sourceDir, '@pages'); // 生成的文件夹路径

  // 文件夹不存在时
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath); // 创建文件夹
  }

  // 生成目录页面
  const CategoryPagePath = path.join(dirPath, `CategoriesPage.md`);
  const CategoryContent = `---
layout: 'CategoriesPage'
permalink: '/categories/'
---`;
  fs.writeFileSync(CategoryPagePath, CategoryContent);

  // 生成标签页面
  const TagPagePath = path.join(dirPath, `TagsPage.md`);
  const TagContent = `---
layout: 'TagsPage'
permalink: '/tags/'
---`;
  fs.writeFileSync(TagPagePath, TagContent);
};
