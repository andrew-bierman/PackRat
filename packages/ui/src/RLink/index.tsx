import { Link as OriginalLink } from '@packrat/crosspath';
import React from 'react';

const Link: React.FC<any> = ({ children, linkStyle, ...props }) => {
  return (
    <OriginalLink {...props} style={{ textDecoration: 'none' }}>
      {children}
    </OriginalLink>
  );
};

export default Link;
