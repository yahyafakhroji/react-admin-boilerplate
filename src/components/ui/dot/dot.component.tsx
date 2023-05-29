import { getColors } from '@helper/utils.helper';
import { Box, CSSObject, useTheme } from '@mui/material';
import { ColorProps } from '@themes/types';
import React from 'react';

interface Props {
  color?: ColorProps;
  size?: number;
  variant?: string;
  sx?: CSSObject;
  componentDiv?: boolean;
}

const Dot: React.FC<Props> = ({ color, size, variant, sx, componentDiv }) => {
  const theme = useTheme();
  const colors = getColors(theme, color);
  const { main } = colors;

  return (
    <Box
      component={componentDiv ? 'div' : 'span'}
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        bgcolor: variant === 'outlined' ? '' : main,
        ...(variant === 'outlined' && {
          border: `1px solid ${main}`,
        }),
        ...sx,
      }}
    />
  );
};

Dot.defaultProps = {
  color: 'primary',
  size: 8,
  variant: 'outlined',
  sx: {},
  componentDiv: false,
};

export default Dot;
