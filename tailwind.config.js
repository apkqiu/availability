// tailwind.config.js
module.exports = {
    preflight:false,
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // 确保包含你的文件路径
  ],
  corePlugins: {
    preflight: false, // 关键：禁用preflight避免冲突
  },
  darkMode: 'class', // 如果你使用了暗黑模式
}