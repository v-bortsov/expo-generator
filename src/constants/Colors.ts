const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';


export const theme = {
  colors: {
    primary: '#a5f3fc',
    secondary: '#0891b2',
    bg: '#40403f',
    dart: '#000',
    light: '#fff'
  }
}

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#40403f',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
