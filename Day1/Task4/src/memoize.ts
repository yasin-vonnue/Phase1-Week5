export function memoize<T, R>(fn: (arg: T) => R): (arg: T) => R {
  const cache = new Map<T, R>();

  return function (arg: T): R {
    if (cache.has(arg)) {
      return cache.get(arg) as R;
    }

    const result = fn(arg);

    cache.set(arg, result);

    return result;
  };
}
