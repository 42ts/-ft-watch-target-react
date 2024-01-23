import { usePersist } from '@-ft/use-persist';
import { watchTarget, WatchTarget } from '@-ft/watch-target';
import { useEffect, useLayoutEffect, useState } from 'react';

function getFromWatch<T>(watch: WatchTarget<T>['watch']): T {
  let result: T;
  watch((value) => {
    result = value;
  })();
  return result!;
}

export function useWatchValue<T>(watch: WatchTarget<T>['watch']): T {
  const [result, setResult] = useState(() => getFromWatch(watch));
  useEffect(() => watch(setResult), [watch]);
  return result;
}

export function useWatchTarget<T>(value: T): WatchTarget<T> {
  const resultPersist = usePersist(() => watchTarget(value));
  useEffect(() => resultPersist.current.set(value), [value]);
  return resultPersist.current;
}

export function useLayoutWatchTarget<T>(value: T): WatchTarget<T> {
  const resultPersist = usePersist(() => watchTarget(value));
  useLayoutEffect(() => resultPersist.current.set(value), [value]);
  return resultPersist.current;
}
