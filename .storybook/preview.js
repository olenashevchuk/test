import 'antd/dist/antd.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  darkMode: {
    // Override the default dark theme
    dark: { ...themes.dark, appBg: 'black' },
    // Override the default light theme
    light: { ...themes.normal, appBg: 'red' },
    current: 'dark'
  }

}