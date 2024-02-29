import React from 'react';
import { Desktop, Mobile, Tablet } from '../../media';
import AboutContent from './AboutContent';

export const useAboutContent = (styles, isMobile) => {
  return (
    <>
      <Desktop>
        <AboutContent
          desktopContainer={styles.webLogoContainer}
          isMobile={false}
        />
      </Desktop>
      <Tablet>
        <AboutContent
          desktopContainer={styles.mobileContainer}
          isMobile={isMobile}
        />
      </Tablet>
      <Mobile>
        <AboutContent
          desktopContainer={styles.mobileContainer}
          isMobile={isMobile}
        />
      </Mobile>
    </>
  );
};
