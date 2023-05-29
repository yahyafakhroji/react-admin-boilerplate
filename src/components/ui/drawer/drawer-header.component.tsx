import Logo from '@components/ui/logo/logo.component';
import { HEADER_HEIGHT } from '@config';
import { useTheme, Box } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';

interface Props {
  theme: Theme;
  open: boolean;
}

const DrawerHeaderStyled = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }: Props) => ({
  ...theme.mixins.toolbar,
  display: 'flex',
  alignItems: 'center',
  justifyContent: open ? 'flex-start' : 'center',
  paddingLeft: theme.spacing(open ? 3 : 0),
}));

const DrawerHeader: React.FC<{ open: boolean }> = ({ open }) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <DrawerHeaderStyled
      theme={theme}
      open={isOpen}
      sx={{
        minHeight: HEADER_HEIGHT,
        width: 'inherit',
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingLeft: open ? '24px' : 0,
      }}
    >
      <Logo isIcon={!open} sx={{ width: open ? 'auto' : 52, height: 'auto' }} />
    </DrawerHeaderStyled>
  );
};

export default DrawerHeader;
