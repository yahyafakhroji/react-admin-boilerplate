import Drawer from '@components/ui/drawer/drawer.component';
import Header from '@components/ui/header/header.component';
import { DRAWER_WIDTH, THEME_CONFIGS } from '@config';
import { Box, Toolbar, Container } from '@mui/material';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import style from './style.module.scss';

const MainLayout: React.FC = () => {
  const [open, setOpen] = useState(true);
  const { container } = THEME_CONFIGS;

  const handleDrawerToggle = () => {
    setOpen(!open)
  };

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
