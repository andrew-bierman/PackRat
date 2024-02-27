import React from 'react';

import { CustomCardHeader } from '../CustomCardHeader';

export const TripCardHeader = ({ data, title, link }) => {
  return (
    <CustomCardHeader
      data={data}
      title={title}
      link={link}
      actionsComponent={undefined}
    />
  );
};
