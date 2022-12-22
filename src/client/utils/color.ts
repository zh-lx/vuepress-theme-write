import { colors } from '@/constants/colors';

// 获取随机颜色
export const getRandomColor = () => {
  const allColors = colors.flat();
  const index = Math.floor(Math.random() * allColors.length);
  return allColors[index];
};
