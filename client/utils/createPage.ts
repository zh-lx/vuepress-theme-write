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
  const CategoryPagePath = path.join(dirPath, `category-page.md`);
  const CategoryContent = `---
layout: 'category-page'
permalink: '/page-category/'
---`;
  fs.writeFileSync(CategoryPagePath, CategoryContent);

  // 生成标签页面
  const TagPagePath = path.join(dirPath, `tag-page.md`);
  const TagContent = `---
layout: 'tag-page'
permalink: '/page-tag/'
---`;
  fs.writeFileSync(TagPagePath, TagContent);
};
