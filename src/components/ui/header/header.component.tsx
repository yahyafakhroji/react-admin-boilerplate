import AppBarStyled from '@components/ui/app-bar/app-bar-styled.component';
import IconButton from '@components/ui/icon-button/icon-button.component';
import UserDropdown from '@components/ui/user-dropdown/user-dropdown.component';
import { DRAWER_WIDTH, MINI_DRAWER_WIDTH } from '@config';
import { alpha, AppBar, AppBarProps, Box, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { HambergerMenu } from 'iconsax-react';
import React from 'react';

interface Props {
  open: boolean;
  handleDrawerToggle: () => void;
}

const MainHeader: React.FC<Props> = ({ open, handleDrawerToggle }) => {
  const theme = useTheme();
  const iconBackColorOpen = theme.palette.mode === 'dark' ? 'secondary.200' : 'secondary.200';
  const iconBackColor = theme.palette.mode === 'dark' ? 'background.default' : 'secondary.100';

  const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  return (
    <Toolbar sx={{ px: { xs: 2, sm: 4.5, lg: 8 } }}>
      <IconButton
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        edge="start"
        color="secondary"
        variant="light"
        size="large"
        sx={{ color: 'secondary.main', bgcolor: open ? iconBackColorOpen : iconBackColor, ml: { xs: 0, lg: -2 }, p: 1 }}
      >
        <HambergerMenu />
      </IconButton>
      {!downLG && <Box sx={{ width: '100%', ml: { xs: 0, md: 2 } }} />}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}
      {!downLG && <UserDropdown />}
    </Toolbar>
  );
};

const Header: React.FC<Props> = ({ open, handleDrawerToggle }) => {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const appBar: AppBarProps = {
    position: 'fixed',
    elevation: 0,
    sx: {
      bgcolor: alpha(theme.palette.background.default, 0.8),
      backdropFilter: 'blur(8px)',
      zIndex: 1200,
      width: open ? `calc(100% - ${DRAWER_WIDTH}px)` : { xs: '100%', lg: `calc(100% - ${MINI_DRAWER_WIDTH}px)` },
    },
  };

  return (
    <>
      {!downLG ? (
        <AppBarStyled open={open} {...appBar}>
          <MainHeader open={open} handleDrawerToggle={handleDrawerToggle} />
        </AppBarStyled>
      ) : (
        <AppBar {...appBar}>
          <MainHeader open={open} handleDrawerToggle={handleDrawerToggle} />
        </AppBar>
      )}
    </>
  );
};

export default Header;
