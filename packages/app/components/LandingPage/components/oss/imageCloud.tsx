import React from 'react';
import { contributors } from '../../constants';
import { ContributorsDetail } from './ContributorsDetail';

function ImageCloud() {
  return (
    <div className="grid grid-cols-6 gap-4 mb-10">
      {contributors.map((contributor, index) => (
        <ContributorsDetail
          key={index}
          contributor={contributor}
          index={index}
        />
      ))}
    </div>
  );
}

export default ImageCloud;
