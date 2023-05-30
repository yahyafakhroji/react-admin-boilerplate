// material-ui
import { Theme } from '@mui/material/styles';
import Backdrop from '@themes/overrides/Backdrop';
import Badge from '@themes/overrides/Badge';
import Body from '@themes/overrides/Body';
import Button from '@themes/overrides/Button';
import ButtonBase from '@themes/overrides/ButtonBase';
import CardContent from '@themes/overrides/CardContent';
import Chip from '@themes/overrides/Chip';
import Drawer from '@themes/overrides/Drawer';
import FormHelperText from '@themes/overrides/FormHelperText';
import IconButton from '@themes/overrides/IconButton';
import InputBase from '@themes/overrides/InputBase';
import InputLabel from '@themes/overrides/InputLabel';
import LinearProgress from '@themes/overrides/LinearProgress';
import Link from '@themes/overrides/Link';
import ListItemButton from '@themes/overrides/ListItemButton';
import ListItemIcon from '@themes/overrides/ListItemIcon';
import LoadingButton from '@themes/overrides/LoadingButton';
import OutlinedInput from '@themes/overrides/OutlinedInput';
import Tab from '@themes/overrides/Tab';
import Tabs from '@themes/overrides/Tabs';
import Tooltip from '@themes/overrides/Tooltip';
import Typography from '@themes/overrides/Typography';

// third-party
import { merge } from 'lodash';

export default function ComponentsOverrides(theme: Theme) {
  return merge(
    Badge(theme),
    Backdrop(),
    Body(),
    Button(theme),
    ButtonBase(),
    CardContent(),
    Chip(theme),
    Drawer(),
    FormHelperText(),
    IconButton(theme),
    InputBase(),
    InputLabel(theme),
    Link(),
    ListItemButton(theme),
    ListItemIcon(theme),
    LinearProgress(),
    LoadingButton(),
    OutlinedInput(theme),
    Typography,
    Tab(theme),
    Tabs(),
    Tooltip(theme)
  );
}
