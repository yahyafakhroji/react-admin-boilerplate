// material-ui
import { Theme } from '@mui/material/styles';
import Body from '@themes/overrides/Body';
import Button from '@themes/overrides/Button';
import ButtonBase from '@themes/overrides/ButtonBase';
import CardContent from '@themes/overrides/CardContent';
import Chip from '@themes/overrides/Chip';
import Drawer from '@themes/overrides/Drawer';
import IconButton from '@themes/overrides/IconButton';
import ListItemButton from '@themes/overrides/ListItemButton';
import ListItemIcon from '@themes/overrides/ListItemIcon';
import Tooltip from '@themes/overrides/Tooltip';
import Typography from '@themes/overrides/Typography';

// third-party
import { merge } from 'lodash';

export default function ComponentsOverrides(theme: Theme) {
  return merge(
    Body(),
    Button(theme),
    ButtonBase(),
    CardContent(),
    Chip(theme),
    Drawer(),
    IconButton(theme),
    ListItemButton(theme),
    ListItemIcon(theme),
    Typography,
    Tooltip(theme)
  );
}
