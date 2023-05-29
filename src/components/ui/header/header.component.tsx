import AppBarStyled from '@components/ui/app-bar/app-bar-styled.component';
import IconButton from '@components/ui/icon-button/icon-button.component';
import { MINI_DRAWER_WIDTH } from '@config';
import { alpha, AppBar, AppBarProps, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { HambergerMenu } from 'iconsax-react';
import React from 'react';

interface Props {
  open: boolean;
  handleDrawerToggle?: () => void;
}

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
      width: { xs: '100%', lg: `calc(100% - ${MINI_DRAWER_WIDTH}px)` },
    },
  };

  const iconBackColorOpen = theme.palette.mode === 'dark' ? 'secondary.200' : 'secondary.200';
  const iconBackColor = theme.palette.mode === 'dark' ? 'background.default' : 'secondary.100';

  const mainHeader: React.ReactNode = (
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
      {/* {headerContent} */}
    </Toolbar>
  );

  return (
    <>
      {!downLG ? (
        <AppBarStyled open={open} {...appBar}>
          {mainHeader}
        </AppBarStyled>
      ) : (
        <AppBar {...appBar}>{mainHeader}</AppBar>
      )}
    </>
  );
};

Header.defaultProps = {
  handleDrawerToggle: () => undefined,
};

export default Header;
