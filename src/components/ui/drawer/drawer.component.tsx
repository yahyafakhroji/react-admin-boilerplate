import DrawerHeader from '@components/ui/drawer/drawer-header.component';
import DrawerMini from '@components/ui/drawer/drawer-mini.component';
import { DRAWER_WIDTH } from '@config';
import { Box, Drawer as MuiDrawer, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

interface Props {
  open: boolean;
  handleDrawerToggle?: () => void;
}

const Drawer: React.FC<Props> = ({ open, handleDrawerToggle }) => {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  // responsive drawer container
  const container = window.document.body;

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, zIndex: 1200 }} aria-label="mailbox folders">
      {!downLG ? (
        <DrawerMini variant="permanent" open={open}>
          <DrawerHeader open={open} />
          {drawerContent}
        </DrawerMini>
      ) : (
        <MuiDrawer
          container={container}
          variant="temporary"
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              borderRight: `1px solid ${theme.palette.divider}`,
              backgroundImage: 'none',
              boxShadow: 'inherit',
            },
          }}
        >
          <DrawerHeader open={open} />
          {drawerContent}
        </MuiDrawer>
      )}
    </Box>
  );
};

Drawer.defaultProps = {
  handleDrawerToggle: () => undefined,
};

export default Drawer;
