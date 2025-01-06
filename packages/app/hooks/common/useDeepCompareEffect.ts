import { useEffect, useRef } from 'react';
import isEqual from 'lodash/isEqual';

export function useDeepCompareEffect(effect, deps) {
  const ref = useRef(deps);

  useEffect(() => {
    console.log({
      prevDeps: ref.current,
      deps,
      isEqual: isEqual(ref.current, deps),
    });

    if (!isEqual(ref.current, deps)) {
      ref.current = deps;
      effect();
    }
  }, deps);
}
