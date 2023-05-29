import NavigationCollapse from '@components/ui/navigation/navigation-collapse.component';
import NavigationGroup from '@components/ui/navigation/navigation-group.component';
import NavigationItem from '@components/ui/navigation/navigation-item.component';
import { CollapseProps, NavItemType } from '@components/ui/navigation/navigation.types';
import { useAtomicValue } from '@libraries/state';
import { Typography, Box } from '@mui/material';
import { drawerAtom } from '@states/atoms/util.atom';
import { Calendar1, KyberNetwork, Messages2 } from 'iconsax-react';
import React, { useState } from 'react';

export const Collapse: React.FC<CollapseProps> = ({
  items,
  setSelectedItems,
  selectedItems,
  setSelectedLevel,
  selectedLevel,
  level,
  parentId,
}) => {
  return (
    <>
      {items.map((item) => {
        return item.type === 'collapse' ? (
          <NavigationCollapse
            key={item.id}
            menu={item}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedItems={selectedItems}
            level={level}
            parentId={parentId}
          />
        ) : item.type === 'item' ? (
          <NavigationItem key={item.id} item={item} level={level} />
        ) : (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Group Collapse or Items
          </Typography>
        );
      })}
    </>
  );
};

const Navigation: React.FC = () => {
  const drawerOpen = useAtomicValue(drawerAtom);

  const [selectedItems, setSelectedItems] = useState<string | undefined>('');
  const [selectedLevel, setSelectedLevel] = useState<number>(0);

  const menus: NavItemType[] = [
    {
      id: 'portal',
      title: 'Portal',
      type: 'group',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          url: '/',
          icon: KyberNetwork,
          type: 'item',
        },
        {
          id: 'chat',
          title: 'Chat',
          icon: KyberNetwork,
          type: 'item',
        },
        {
          id: 'live',
          title: 'Live',
          icon: KyberNetwork,
          type: 'item',
        },
      ],
    },
    {
      id: 'order',
      title: 'Pesanan',
      icon: KyberNetwork,
      type: 'group',
      children: [
        {
          id: 'order-retail',
          title: 'Retail',
          type: 'item',
          icon: Messages2,
          breadcrumbs: false,
        },
        {
          id: 'order-resale',
          title: 'Resale',
          type: 'item',
          icon: Calendar1,
          breadcrumbs: false,
        },
      ],
    },
    {
      id: 'product',
      title: 'Produk',
      icon: KyberNetwork,
      type: 'group',
      children: [
        {
          id: 'product-list',
          title: 'Daftar Produk',
          type: 'item',
          icon: Messages2,
          breadcrumbs: false,
        },
        {
          id: 'product-add',
          title: 'Tambah Produk',
          type: 'item',
          icon: Calendar1,
          breadcrumbs: false,
        },
        {
          id: 'product-inventory',
          title: 'Inventory',
          type: 'item',
          icon: Calendar1,
          breadcrumbs: false,
        },
      ],
    },
  ];

  return (
    <Box
      sx={{
        pt: drawerOpen ? 2 : 0,
        '& > ul:first-of-type': { mt: 0 },
        display: 'block',
      }}
    >
      {menus.map((menu) => {
        switch (menu.type) {
          case 'group':
            return (
              <NavigationGroup
                key={menu.id}
                setSelectedItems={setSelectedItems}
                setSelectedLevel={setSelectedLevel}
                selectedLevel={selectedLevel}
                selectedItems={selectedItems}
                item={menu}
              />
            );
          default:
            return (
              <Typography key={menu.id} variant="h6" color="error" align="center">
                Fix - Navigation Group
              </Typography>
            );
        }
      })}
    </Box>
  );
};

export default Navigation;
