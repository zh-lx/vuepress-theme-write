import * as path from 'path';
import * as fs from 'fs';
const absolutePath = path.resolve(__dirname, '../docs');

const getCatalog = (dir) => {
  const children = [];
  const res = fs.readdirSync(dir);
  res.forEach((filename) => {
    const path = `${dir}/${filename}`;
    const stat = fs.statSync(path);
    if (stat && stat.isDirectory()) {
      const obj = {
        text: filename,
        isGroup: true,
        children: getCatalog(path),
      };
      children.unshift(obj);
    } else {
      const completePath = dir;
      children.push(
        `${completePath.slice(absolutePath.length)}/${filename}`.replace(
          '\\',
          '/'
        )
      );
    }
  });
  return children;
};

const generateCategories = () => {
  const docsDir = path.resolve(__dirname, '../docs');
  let sidebars = {};
  const isNotBlogs = ['.vuepress', '@pages'];
  const res = fs.readdirSync(docsDir);
  res.forEach((dirname) => {
    const categoryPath = `${docsDir}/${dirname}`;
    const stat = fs.statSync(categoryPath);
    if (stat && stat.isDirectory() && !isNotBlogs.includes(dirname)) {
      sidebars[`/${encodeURI(dirname)}`] = getCatalog(categoryPath);
    }
  });
  return sidebars;
};

module.exports = generateCategories();
