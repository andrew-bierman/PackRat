import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

export const useScrollTop = () => {
  const [scrollTop, setScrollTop] = useState<number | boolean>(false);

  useEffect(() => {
    if (!window) return () => {};

    const onScroll = debounce(() => setScrollTop(window.pageYOffset), 300);

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return scrollTop;
};
