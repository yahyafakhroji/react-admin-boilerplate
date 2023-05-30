import MainCard from '@components/ui/card/main-card.component';
import { Typography } from '@mui/material';
import React from 'react';

const TestPage: React.FC = () => {
  return (
    <MainCard title="Sample Card">
      <Typography variant="body1">
        Do you Know? Able is used by more than 2.4K+ Customers worldwide. This new v9 version is the major release of Able
        Pro Dashboard Template with having brand new modern User Interface.
      </Typography>
    </MainCard>
  );
};

export default TestPage;
