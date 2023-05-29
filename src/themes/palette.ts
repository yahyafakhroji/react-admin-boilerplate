// material-ui
import { alpha, createTheme, SimplePaletteColorOptions } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import Default from '@themes/default';

// project-imports

export type PaletteThemeProps = {
  primary: SimplePaletteColorOptions;
  secondary: SimplePaletteColorOptions;
  error: SimplePaletteColorOptions;
  warning: SimplePaletteColorOptions;
  info: SimplePaletteColorOptions;
  success: SimplePaletteColorOptions;
};

// ==============================|| DEFAULT THEME - PALETTE  ||============================== //

const Palette = (mode: PaletteMode, themeContrast: boolean) => {
  const paletteColor: PaletteThemeProps = Default(mode);

  return createTheme({
    palette: {
      mode,
      common: {
        black: '#000',
        white: '#fff',
      },
      ...paletteColor,
      text: {
        primary:
          mode === 'dark' && paletteColor.secondary.darker
            ? alpha(paletteColor.secondary.darker, 0.87)
            : paletteColor.secondary[800],
        secondary:
          mode === 'dark' && paletteColor.secondary.darker
            ? alpha(paletteColor.secondary.darker, 0.45)
            : paletteColor.secondary.main,
        disabled:
          mode === 'dark' && paletteColor.secondary.darker
            ? alpha(paletteColor.secondary.darker, 0.1)
            : paletteColor.secondary[400],
      },
      action: {
        disabled: paletteColor.secondary.light,
      },
      divider:
        mode === 'dark' && paletteColor.secondary.darker
          ? alpha(paletteColor.secondary.darker, 0.05)
          : alpha(paletteColor.secondary.main, 0.65),
      background: {
        paper: mode === 'dark' ? paletteColor.secondary[100] : '#fff',
        default: themeContrast && mode !== 'dark' ? '#fff' : paletteColor.secondary.lighter,
      },
    },
  });
};

export default Palette;
