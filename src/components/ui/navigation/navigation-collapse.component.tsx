import Dot from '@components/ui/dot/dot.component';
import { Collapse } from '@components/ui/navigation/navigation.component';
import { NavItemType, VirtualElement } from '@components/ui/navigation/navigation.types';
import Transitions from '@components/ui/transitions/transitions.component';
import { useAtomicValue } from '@libraries/state';
import {
  Box,
  ClickAwayListener,
  Collapse as MuiCollapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Typography,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { drawerAtom } from '@states/atoms/util.atom';
import { ArrowDown2, ArrowRight2, ArrowUp2, Copy } from 'iconsax-react';
import React, { Dispatch, SetStateAction, useEffect, useMemo, useState, MouseEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// mini-menu - wrapper
const PopperStyled = styled(Popper)(({ theme }) => ({
  overflow: 'visible',
  zIndex: 1202,
  minWidth: 180,
  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 38,
    left: -5,
    width: 10,
    height: 10,
    backgroundColor: theme.palette.background.paper,
    transform: 'translateY(-50%) rotate(45deg)',
    zIndex: 120,
    borderLeft: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

interface Props {
  menu: NavItemType;
  level: number;
  parentId: string | undefined;
  setSelectedItems: Dispatch<SetStateAction<string | undefined>>;
  selectedItems: string | undefined;
  setSelectedLevel: Dispatch<SetStateAction<number>>;
  selectedLevel: number;
}

const NavigationCollapse: React.FC<Props> = ({
  menu,
  level,
  parentId,
  setSelectedItems,
  selectedItems,
  setSelectedLevel,
  selectedLevel,
}) => {
  const theme = useTheme();
  const navigation = useNavigate();

  const { pathname } = useLocation();

  const drawerOpen = useAtomicValue(drawerAtom);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null | undefined>(null);
  const [anchorEl, setAnchorEl] = useState<VirtualElement | (() => VirtualElement) | null | undefined>(null);

  const handleClick = (event: MouseEvent<HTMLElement> | undefined) => {
    setAnchorEl(null);
    setSelectedLevel(level);

    if (drawerOpen) {
      setOpen(!open);
      setSelected(!selected ? menu.id : null);
      setSelectedItems(!selected ? menu.id : '');

      if (menu.url) navigation(`${menu.url}`);
    } else {
      setAnchorEl(event?.currentTarget);
    }
  };

  const handlerIconLink = () => {
    if (!drawerOpen) {
      if (menu.url) navigation(`${menu.url}`);

      setSelected(menu.id);
    }
  };

  const miniMenuOpened = Boolean(anchorEl);

  const handleClose = () => {
    setOpen(false);

    if (!miniMenuOpened && !menu.url) {
      setSelected(null);
    }

    setAnchorEl(null);
  };

  useMemo(() => {
    if (selected === selectedItems) {
      if (level === 1) {
        setOpen(true);
      }
    } else if (level === selectedLevel) {
      setOpen(false);

      if ((!miniMenuOpened && !drawerOpen && !selected) || drawerOpen) {
        setSelected(null);
      }
    }
  }, [selectedItems, level, selected, miniMenuOpened, drawerOpen, selectedLevel]);

  useEffect(() => {
    if (pathname === menu.url) {
      setSelected(menu.id);
    }
  }, [pathname]);

  const checkOpenForParent = (child: NavItemType[], id: string | undefined) => {
    child.forEach((item: NavItemType) => {
      if (item.url === pathname) {
        setOpen(true);
        setSelected(id);
      }
    });
  };

  // menu collapse for sub-levels
  useEffect(() => {
    setOpen(false);

    if (!miniMenuOpened) {
      setSelected(null);
    }

    if (miniMenuOpened) setAnchorEl(null);

    if (menu.children) {
      menu.children.forEach((item: NavItemType) => {
        if (item.children?.length) {
          checkOpenForParent(item.children, menu.id);
        }

        if (item.url === pathname) {
          setSelected(menu.id);
          setOpen(true);
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, menu.children]);

  useEffect(() => {
    if (menu.url === pathname) {
      setSelected(menu.id);
      setAnchorEl(null);
      setOpen(true);
    }
  }, [pathname, menu]);

  const isSelected = selected === menu.id;
  const iconSelectedColor =
    theme.palette.mode === 'dark' && drawerOpen ? theme.palette.text.primary : theme.palette.primary.main;
  const textColor = theme.palette.mode === 'dark' ? theme.palette.secondary[400] : theme.palette.secondary.main;

  const borderIcon = level === 1 ? <Copy variant="Bulk" size={drawerOpen ? 22 : 24} /> : false;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const Icon = menu.icon!;
  const menuIcon = menu.icon ? <Icon variant="Bulk" size={drawerOpen ? 22 : 24} /> : borderIcon;

  return (
    <>
      <ListItemButton
        disableRipple
        selected={isSelected}
        {...(!drawerOpen && { onMouseEnter: handleClick, onMouseLeave: handleClose })}
        onClick={handleClick}
        sx={{
          pl: drawerOpen ? `${level === 1 ? 20 : level * 20 - 10}px` : 1.5,
          py: !drawerOpen && level === 1 ? 1.25 : 1,
          ...(drawerOpen && {
            mx: 1.25,
            my: 0.5,
            borderRadius: 1,
            '&:hover': {
              bgcolor: theme.palette.mode === 'dark' ? 'divider' : 'secondary.200',
            },
            '&.Mui-selected': {
              // bgcolor: 'transparent',
              color: iconSelectedColor,
              // '&:hover': { color: iconSelectedColor, bgcolor: theme.palette.mode === 'dark' ? 'divider' : 'transparent' }
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
      >
        {menuIcon && (
          <ListItemIcon
            onClick={handlerIconLink}
            sx={{
              minWidth: 38,
              color: isSelected ? 'primary.main' : textColor,
              ...(!drawerOpen && {
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
            {menuIcon}
          </ListItemIcon>
        )}

        {!menuIcon && drawerOpen && (
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
                color={isSelected ? 'primary' : textColor}
                sx={{ fontWeight: isSelected ? 500 : 400 }}
              >
                {menu.title}
              </Typography>
            }
            secondary={
              menu.caption && (
                <Typography variant="caption" color="secondary">
                  {menu.caption}
                </Typography>
              )
            }
          />
        )}
        {(drawerOpen || (!drawerOpen && level !== 1)) &&
          (miniMenuOpened || open ? (
            <>
              {miniMenuOpened ? (
                <ArrowRight2 size={12} color={textColor} style={{ marginLeft: 1 }} />
              ) : (
                <ArrowUp2 size={12} color={textColor} style={{ marginLeft: 1 }} />
              )}
            </>
          ) : (
            <ArrowDown2 size={12} color={textColor} style={{ marginLeft: 1 }} />
          ))}

        {!drawerOpen && (
          <PopperStyled
            open={miniMenuOpened}
            anchorEl={anchorEl}
            placement="right-start"
            style={{
              zIndex: 2001,
            }}
            popperOptions={{
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [-12, 1],
                  },
                },
              ],
            }}
          >
            {({ TransitionProps }) => (
              <Transitions in={miniMenuOpened} {...TransitionProps}>
                <Paper
                  sx={{
                    overflow: 'hidden',
                    mt: 1.5,
                    boxShadow: theme.customShadows.z1,
                    backgroundImage: 'none',
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <ClickAwayListener onClickAway={handleClose}>
                    <Box>
                      <Collapse
                        items={menu.children || []}
                        setSelectedItems={setSelectedItems}
                        selectedItems={selectedItems}
                        setSelectedLevel={setSelectedLevel}
                        selectedLevel={selectedLevel}
                        level={level + 1}
                        parentId={parentId}
                      />
                    </Box>
                  </ClickAwayListener>
                </Paper>
              </Transitions>
            )}
          </PopperStyled>
        )}
      </ListItemButton>
      {drawerOpen && (
        <MuiCollapse in={open} timeout="auto" unmountOnExit>
          <List sx={{ p: 0 }}>
            <Collapse
              items={menu.children || []}
              setSelectedItems={setSelectedItems}
              selectedItems={selectedItems}
              setSelectedLevel={setSelectedLevel}
              selectedLevel={selectedLevel}
              level={level + 1}
              parentId={parentId}
            />
          </List>
        </MuiCollapse>
      )}
    </>
  );
};

export default NavigationCollapse;
