// material-ui
import { Theme } from '@mui/material/styles';
import { ButtonProps, ChipProps, IconButtonProps, SliderProps } from '@mui/material';
import { LoadingButtonProps } from '@mui/lab';
import { ReactNode } from 'react';

export type KeyedObject = {
  [key: string]: string | number | KeyedObject | any;
};

// ==============================|| TYPES - EXTENDED COMPONENT  ||============================== //

export type ThemeMode = 'light' | 'dark' | 'auto';

export type FontFamily = `Inter var`;

export type ButtonVariantProps = 'contained' | 'light' | 'outlined' | 'dashed' | 'text' | 'shadow';

export type IconButtonShapeProps = 'rounded' | 'square';

type TooltipColor = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'default';

export type ColorProps =
  | ChipProps['color']
  | ButtonProps['color']
  | LoadingButtonProps['color']
  | IconButtonProps['color']
  | SliderProps['color']
  | TooltipColor;

export type AvatarTypeProps = 'filled' | 'outlined' | 'combined';

export type SizeProps = 'badge' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ExtendedStyleProps = {
  color: ColorProps;
  theme: Theme;
};

export interface TabPanelProps {
  children?: ReactNode;
  dir?: string;
  index: number;
  value: number;
}
