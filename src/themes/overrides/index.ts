// material-ui
import { Theme } from '@mui/material/styles';
import Body from '@themes/overrides/Body';
import Button from '@themes/overrides/Button';
import ButtonBase from '@themes/overrides/ButtonBase';
import Drawer from '@themes/overrides/Drawer';
import IconButton from '@themes/overrides/IconButton';
import Typography from '@themes/overrides/Typography';

// third-party
import { merge } from 'lodash-es';

export default function ComponentsOverrides(theme: Theme) {
  return merge(Body(), Button(theme), ButtonBase(), Drawer(), IconButton(theme), Typography);
}
