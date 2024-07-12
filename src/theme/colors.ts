const colors = {
  white: '#FFFFFF',
  dark50: '#18181b',
  dark100: '#27272a',
  dark200: '#3f3f46',
  dark300: '#52525b',
  dark400: '#71717a',
  dark500: '#a1a1aa',
  dark600: '#d4d4d8',
  dark700: '#e4e4e7',
  dark800: '#f4f4f5',
  dark900: '#fafafa',
  blue50: '#eff6ff',
  blue100: '#dbeafe',
  blue500: '#3b82f6',
  likesRed: '#FF0000',
  error: '#cc0000',
};

export default colors;

export const getThemeColors = (
  colormode: string,
): {
  iconColor: string;
  textColor: string;
  backgroundColor: string;
  buttonColor: string;
} => {
  if (colormode === 'light') {
    return {
      iconColor: colors.dark300,
      textColor: colors.dark50,
      buttonColor: colors.dark800,
    };
  }
  return {
    iconColor: colors.dark600,
    textColor: colors.white,
    buttonColor: colors.dark200,
  };
};
