import { Collapse } from '@components/ui/navigation/navigation.component';
import { NavItemType, Props, VirtualElement } from '@components/ui/navigation/navigation.types';
import { THEME_CONFIGS } from '@config';
import { useAtomicValue } from '@libraries/state';
import { useTheme, Typography, Box, List } from '@mui/material';
import { drawerAtom } from '@states/atoms/util.atom';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const NavigationGroup: React.FC<Props> = ({ item, setSelectedItems, selectedItems, setSelectedLevel, selectedLevel }) => {
  const theme = useTheme();
  const { pathname } = useLocation();

  const { menuCaption } = THEME_CONFIGS;

  const drawerOpen = useAtomicValue(drawerAtom);

  const [anchorEl, setAnchorEl] = useState<VirtualElement | (() => VirtualElement) | EventTarget | null | undefined>(null);
  const [selectedID, setSelectedID] = useState<string | undefined>(undefined);

  const openMini = Boolean(anchorEl);

  const checkOpenForParent = (child: NavItemType[], id: string | undefined) => {
    child.forEach((ele: NavItemType) => {
      if (ele.children?.length) {
        checkOpenForParent(ele.children, selectedID);
      }

      if (ele.url === pathname) {
        setSelectedID(id);
      }
    });
  };
  const checkSelectedOnload = (data: NavItemType) => {
    const children = data.children ? data.children : [];

    children.forEach((itemCheck: NavItemType) => {
      if (itemCheck.children?.length) {
        checkOpenForParent(itemCheck.children, selectedID);
      }

      if (itemCheck.url === pathname) {
        setSelectedID(itemCheck?.id);
      }
    });
  };

  useEffect(() => {
    checkSelectedOnload(item);

    if (openMini) setAnchorEl(null);
  }, [pathname, item]);

  return (
    <List
      subheader={
        item.title &&
        drawerOpen &&
        menuCaption && (
          <Box sx={{ pl: 3, mb: 1.5 }}>
            <Typography
              variant="h5"
              color={theme.palette.mode === 'dark' ? 'textSecondary' : 'secondary.dark'}
              sx={{ textTransform: 'uppercase', fontSize: '0.688rem' }}
            >
              {item.title}
            </Typography>
            {item.caption && (
              <Typography variant="caption" color="secondary">
                {item.caption}
              </Typography>
            )}
          </Box>
        )
      }
      sx={{ mt: drawerOpen && menuCaption && item.title ? 1.5 : 0, py: 0, zIndex: 0 }}
    >
      <Collapse
        items={item.children || []}
        setSelectedItems={setSelectedItems}
        setSelectedLevel={setSelectedLevel}
        selectedLevel={selectedLevel}
        selectedItems={selectedItems}
        level={1}
        parentId={item.id}
      />
    </List>
  );
};

export default NavigationGroup;
