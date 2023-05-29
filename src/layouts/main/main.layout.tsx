import Drawer from '@components/ui/drawer/drawer.component';
import Header from '@components/ui/header/header.component';
import { DRAWER_WIDTH, THEME_CONFIGS } from '@config';
import { useAtomic } from '@libraries/state';
import { Box, Toolbar, Container, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { drawerAtom } from '@states/atoms/util.atom';
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import style from './style.module.scss';

const MainLayout: React.FC = () => {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down('xl'));

  const { container, miniDrawer } = THEME_CONFIGS;

  const [drawerOpen, setDrawerOpen] = useAtomic(drawerAtom);

  const [open, setOpen] = useState(!miniDrawer || drawerOpen);

  const handleDrawerToggle = () => {
    setOpen(!open);
    setDrawerOpen(!open);
  };

  // set media wise responsive drawer
  useEffect(() => {
    if (!miniDrawer) {
      setOpen(!matchDownLG);
      setDrawerOpen(!matchDownLG);
    }
  }, [matchDownLG]);

  useEffect(() => {
    if (open !== drawerOpen) setOpen(drawerOpen);
  }, [drawerOpen]);

  return (
    <Box className={style.main}>
      <Header open={open} handleDrawerToggle={handleDrawerToggle} />
      <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />

      <Box component="main" sx={{ width: `calc(100% - ${DRAWER_WIDTH}px)`, flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Toolbar sx={{ mt: 'inherit' }} />

        <Container
          maxWidth={container ? 'xl' : false}
          sx={{
            ...(container && { px: { xs: 0, sm: 2 } }),
            position: 'relative',
            minHeight: 'calc(100vh - 110px)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
