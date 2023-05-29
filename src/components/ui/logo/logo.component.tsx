import { ButtonBase } from '@mui/material';
import { SxProps } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  isIcon?: boolean;
  sx?: SxProps;
}

const Logo: React.FC<Props> = ({ isIcon, sx }) => {
  return (
    <ButtonBase disableRipple component={Link} to="/" sx={sx}>
      <img src={`/logo/${isIcon ? 'icon' : 'text'}.svg`} alt="Lini Seller Center" height="33" />
    </ButtonBase>
  );
};

Logo.defaultProps = {
  isIcon: false,
  sx: {},
};

export default Logo;
