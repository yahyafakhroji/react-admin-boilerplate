import Navigation from '@components/ui/navigation/navigation.component';
import SimpleBarScroll from '@components/ui/simple-bar/simple-bar.component';
import React from 'react';

const DrawerContent: React.FC = () => {
  return (
    <SimpleBarScroll
      sx={{
        '& .simplebar-content': {
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <>
        <Navigation />
      </>
    </SimpleBarScroll>
  );
};

export default DrawerContent;
