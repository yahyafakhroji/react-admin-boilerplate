import { THEME_CONFIGS } from '@config';
import {
  Card,
  CardContent,
  CardContentProps,
  CardHeader,
  CardHeaderProps,
  CardProps,
  Divider,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { KeyedObject } from '@themes/types';
import React, { CSSProperties, forwardRef, ReactNode, Ref } from 'react';

export interface MainCardProps extends KeyedObject {
  border?: boolean;
  boxShadow?: boolean;
  children: ReactNode | string;
  subheader?: ReactNode | string;
  style?: CSSProperties;
  content?: boolean;
  contentSX?: CardContentProps['sx'];
  darkTitle?: boolean;
  divider?: boolean;
  sx?: CardProps['sx'];
  secondary?: CardHeaderProps['action'];
  shadow?: string;
  elevation?: number;
  title?: ReactNode | string;
  codeHighlight?: boolean;
  modal?: boolean;
}

const headerSX = {
  p: 2.5,
  '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' },
};

const MainCard = forwardRef(
  (
    {
      border,
      boxShadow,
      children,
      subheader,
      content,
      contentSX,
      darkTitle,
      divider,
      elevation,
      secondary,
      shadow,
      sx = {},
      title,
      codeHighlight,
      modal,
      ...others
    }: MainCardProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const theme = useTheme();
    const { themeContrast } = THEME_CONFIGS;

    return (
      <Card
        elevation={elevation}
        ref={ref}
        {...others}
        sx={{
          position: 'relative',
          border: border ? '1px solid' : 'none',
          borderRadius: 1.5,
          borderColor: theme.palette.divider,
          ...(((themeContrast && boxShadow) || shadow) && {
            boxShadow: shadow || theme.customShadows.z1,
          }),
          ...(codeHighlight && {
            '& pre': {
              m: 0,
              p: '12px !important',
              fontFamily: theme.typography.fontFamily,
              fontSize: '0.75rem',
            },
          }),
          ...(modal && {
            position: 'absolute' as const,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: `calc( 100% - 50px)`, sm: 'auto' },
            '& .MuiCardContent-root': {
              overflowY: 'auto',
              minHeight: 'auto',
              maxHeight: `calc(100vh - 200px)`,
            },
          }),
          ...sx,
        }}
      >
        {/* card header and action */}
        {!darkTitle && title && (
          <CardHeader
            sx={headerSX}
            titleTypographyProps={{ variant: 'subtitle1' }}
            title={title}
            action={secondary}
            subheader={subheader}
          />
        )}
        {darkTitle && title && (
          <CardHeader sx={headerSX} title={<Typography variant="h4">{title}</Typography>} action={secondary} />
        )}

        {/* content & header divider */}
        {title && divider && <Divider />}

        {/* card content */}
        {content && <CardContent sx={contentSX}>{children}</CardContent>}
        {!content && children}
      </Card>
    );
  }
);

MainCard.defaultProps = {
  border: true,
  boxShadow: true,
  subheader: '',
  style: {},
  content: true,
  contentSX: {},
  darkTitle: false,
  divider: true,
  sx: {},
  secondary: undefined,
  shadow: '',
  elevation: 0,
  title: null,
  codeHighlight: false,
  modal: false,
};

export default MainCard;
