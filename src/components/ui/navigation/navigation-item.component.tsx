import Dot from '@components/ui/dot/dot.component';
import { LinkTarget, NavItemType } from '@components/ui/navigation/navigation.types';
import { useAtomic } from '@libraries/state';
import {
  Avatar,
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { drawerAtom } from '@states/atoms/util.atom';
import React, { forwardRef, ForwardRefExoticComponent, RefAttributes, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavigationItem: React.FC<{ item: NavItemType; level: number }> = ({ item, level }) => {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const { pathname } = useLocation();

  const [drawerOpen, setDrawerOpen] = useAtomic(drawerAtom);

  const [target, setTarget] = useState<LinkTarget>('_self');
  const [activeItem, setActiveItem] = useState<string | undefined>();

  useEffect(() => {
    if (item.target) {
      setTarget('_blank');
    }
  }, [item]);

  let listItemProps: {
    component: ForwardRefExoticComponent<RefAttributes<HTMLAnchorElement>> | string;
    href?: string;
    target?: LinkTarget;
    // eslint-disable-next-line react/no-unstable-nested-components
  } = { component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item?.url || '/'} target={target} />) };
  if (item?.external) {
    listItemProps = { component: 'a', href: item.url, target };
  }

  const isSelected = activeItem === item.id;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const Icon = item.icon!;
  const itemIcon = item.icon ? <Icon variant="Bulk" size={drawerOpen ? 20 : 22} /> : false;
  const textColor = theme.palette.mode === 'dark' ? 'secondary.400' : 'secondary.main';
  const iconSelectedColor = 'primary.main';

  useEffect(() => {
    if (pathname === item.url) {
      setActiveItem(item.id);
    }
  }, [pathname]);

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      selected={isSelected}
      sx={{
        zIndex: 1201,
        pl: drawerOpen ? `${level * 20}px` : 1.5,
        py: !drawerOpen && level === 1 ? 1.25 : 1,
        ...(drawerOpen && {
          '&:hover': {
            bgcolor: 'transparent',
          },
          '&.Mui-selected': {
            '&:hover': {
              bgcolor: 'transparent',
            },
            bgcolor: 'transparent',
          },
        }),
        ...(drawerOpen &&
          level === 1 && {
            mx: 1.25,
            my: 0.5,
            borderRadius: 1,
            '&:hover': {
              bgcolor: theme.palette.mode === 'dark' ? 'divider' : 'secondary.200',
            },
            '&.Mui-selected': {
              color: iconSelectedColor,
              '&:hover': {
                color: iconSelectedColor,
              },
            },
          }),
        ...(!drawerOpen && {
          px: 2.75,
          '&:hover': {
            bgcolor: 'transparent',
          },
          '&.Mui-selected': {
            '&:hover': {
              bgcolor: 'transparent',
            },
            bgcolor: 'transparent',
          },
        }),
      }}
      {...(downLG && {
        onClick: () => setDrawerOpen(false),
      })}
    >
      {itemIcon && (
        <ListItemIcon
          sx={{
            minWidth: 38,
            color: isSelected ? iconSelectedColor : textColor,
            ...(!drawerOpen &&
              level === 1 && {
                borderRadius: 1,
                width: 46,
                height: 46,
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                  bgcolor: theme.palette.mode === 'dark' ? 'secondary.light' : 'secondary.200',
                },
              }),
            ...(!drawerOpen &&
              isSelected && {
                bgcolor: theme.palette.mode === 'dark' ? 'secondary.100' : 'primary.lighter',
                '&:hover': {
                  bgcolor: theme.palette.mode === 'dark' ? 'secondary.200' : 'primary.lighter',
                },
              }),
          }}
        >
          <Tooltip title={item.title} arrow placement="right-start">
            {itemIcon}
          </Tooltip>
        </ListItemIcon>
      )}

      {!itemIcon && drawerOpen && (
        <ListItemIcon
          sx={{
            minWidth: 30,
          }}
        >
          <Dot size={isSelected ? 6 : 5} color={isSelected ? 'primary' : 'secondary'} />
        </ListItemIcon>
      )}

      {(drawerOpen || (!drawerOpen && level !== 1)) && (
        <ListItemText
          primary={
            <Typography
              variant="h6"
              sx={{ color: isSelected ? iconSelectedColor : textColor, fontWeight: isSelected ? 500 : 400 }}
            >
              {item.title}
            </Typography>
          }
        />
      )}
      {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

export default NavigationItem;
