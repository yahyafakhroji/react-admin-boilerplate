import { HEADER_HEIGHT, THEME_CONFIGS } from '@config';
import { getWindowScheme } from '@helper/utils.helper';
import ComponentsOverrides from '@themes/overrides';
import Palette from '@themes/palette';
import CustomShadows, { CustomShadowProps } from '@themes/shadow';
import Typography from '@themes/typography';
import React, { ReactNode, useMemo } from 'react';

// material-ui
import { CssBaseline, StyledEngineProvider, PaletteMode } from '@mui/material';
import { createTheme, ThemeOptions, ThemeProvider, Theme, TypographyVariantsOptions } from '@mui/material/styles';

// types
type ThemeCustomizationProps = {
  children: ReactNode;
};

// ==============================|| DEFAULT THEME - MAIN  ||============================== //

export const ThemeCustomProvider: React.FC<ThemeCustomizationProps> = ({ children }) => {
  const { themeDirection, mode, presetColor, fontFamily, themeContrast } = THEME_CONFIGS;

  let themeMode = mode;
  if (themeMode === 'auto') {
    const autoMode = getWindowScheme();
    if (autoMode) {
      themeMode = 'dark';
    } else {
      themeMode = 'light';
    }
  }

  const theme: Theme = useMemo<Theme>(
    () => Palette(themeMode as PaletteMode, themeContrast),
    [themeMode, presetColor, themeContrast]
  );

  const themeTypography: TypographyVariantsOptions = useMemo<TypographyVariantsOptions>(
    () => Typography(themeMode, fontFamily),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [themeMode, fontFamily]
  );
  const themeCustomShadows: CustomShadowProps = useMemo<CustomShadowProps>(() => CustomShadows(theme), [theme]);

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      breakpoints: {
        values: {
          xs: 0,
          sm: 768,
          md: 1024,
          lg: 1266,
          xl: 1440,
        },
      },
      direction: themeDirection,
      mixins: {
        toolbar: {
          minHeight: HEADER_HEIGHT,
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
      palette: theme.palette,
      shape: {
        borderRadius: 8,
      },
      customShadows: themeCustomShadows,
      typography: themeTypography,
    }),
    [themeDirection, theme, themeTypography, themeCustomShadows]
  );

  const themes: Theme = createTheme(themeOptions);

  themes.components = ComponentsOverrides(themes);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
