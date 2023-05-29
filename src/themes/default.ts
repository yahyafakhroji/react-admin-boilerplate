// types
import { PaletteThemeProps } from '@themes/palette';
import { ThemeMode } from '@themes/types';

// ==============================|| PRESET THEME - DEFAULT ||============================== //

const Default = (mode: ThemeMode): PaletteThemeProps => {
  const contrastText = '#fff';

  let primaryColors = [
    '#e9f0ff',
    '#c8d9ff',
    '#a3c0ff',
    '#7ea6ff',
    '#6293ff',
    '#4680ff',
    '#3f78ff',
    '#376dff',
    '#2f63ff',
    '#2050ff',
  ];
  let secondaryColors = [
    '#f8f9fa',
    '#f8f9fa',
    '#f3f5f7',
    '#dbe0e5',
    '#bec8d0',
    '#8996a4',
    '#5b6b79',
    '#3e4853',
    '#1d2630',
    '#131920',
  ];
  let errorColors = ['#f5bebe', '#e76767', '#dc2626', '#d31c1c', '#c50d0d'];
  let warningColors = ['#f7dcb3', '#edad4d', '#e58a00', '#de7700', '#d35a00'];
  let infoColors = ['#c5eff3', '#78d9e2', '#3ec9d6', '#30bccc', '#1ba9bc'];
  let successColors = ['#c0e5d9', '#6bc2a5', '#2ca87f', '#21976c', '#107d4f'];

  if (mode === 'dark') {
    primaryColors = [
      '#2050ff',
      '#2f63ff',
      '#376dff',
      '#3f78ff',
      '#4680ff',
      '#6293ff',
      '#7ea6ff',
      '#a3c0ff',
      '#c8d9ff',
      '#e9f0ff',
    ];
    secondaryColors = [
      '#131920',
      '#1d2630',
      '#3e4853',
      '#5b6b79',
      '#8996a4',
      '#bec8d0',
      '#dbe0e5',
      '#f3f5f7',
      '#f8f9fa',
      '#f8f9fa',
    ];
    errorColors = ['#c50d0d', '#d31c1c', '#dc2626', '#e76767', '#f5bebe'];
    warningColors = ['#d35a00', '#de7700', '#e58a00', '#edad4d', '#f7dcb3'];
    infoColors = ['#1ba9bc', '#30bccc', '#3ec9d6', '#78d9e2', '#c5eff3'];
    successColors = ['#107d4f', '#21976c', '#2ca87f', '#6bc2a5', '#c0e5d9'];
  }

  return {
    primary: {
      lighter: primaryColors[0],
      100: primaryColors[1],
      200: primaryColors[2],
      light: primaryColors[3],
      400: primaryColors[4],
      main: primaryColors[5],
      dark: primaryColors[6],
      700: primaryColors[7],
      darker: primaryColors[8],
      900: primaryColors[9],
      contrastText,
    },
    secondary: {
      lighter: secondaryColors[0],
      100: secondaryColors[1],
      200: secondaryColors[2],
      light: secondaryColors[3],
      400: secondaryColors[4],
      500: secondaryColors[5],
      main: secondaryColors[6],
      dark: secondaryColors[7],
      800: secondaryColors[8],
      darker: secondaryColors[9],
      contrastText,
    },
    error: {
      lighter: errorColors[0],
      light: errorColors[1],
      main: errorColors[2],
      dark: errorColors[3],
      darker: errorColors[4],
      contrastText,
    },
    warning: {
      lighter: warningColors[0],
      light: warningColors[1],
      main: warningColors[2],
      dark: warningColors[3],
      darker: warningColors[4],
      contrastText,
    },
    info: {
      lighter: infoColors[0],
      light: infoColors[1],
      main: infoColors[2],
      dark: infoColors[3],
      darker: infoColors[4],
      contrastText,
    },
    success: {
      lighter: successColors[0],
      light: successColors[1],
      main: successColors[2],
      dark: successColors[3],
      darker: successColors[4],
      contrastText,
    },
  };
};

export default Default;
