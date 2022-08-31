
// 主题 
// 白天|黑夜 字体 & 图标颜色改变
// export const Light = {

// }

// export const Dark = {

// }

// export const theme = {
//   'light': Light,
//   'dark': Dark
// }

// 不同颜色图片色彩配置
// 主题色 橙色|蓝色 不同主题下切的图片|banner色彩搭配
export const Orange = {
  homeGrid1: '',
  homeGrid5: '/src/assets/link5.png',
  homeGrid6: '/src/assets/link6.png',

}
export const Blue = {
  
}

const themes = {
  'orange': Orange,
  'blue': Blue
} as Record<string, any>

export const setTheme = (theme: string) => {
  return themes[theme]
}