export const pipe = <T>(
  ...functions: Array<(value: T) => T>
): ((initialValue: T) => T) => {
  return (initialValue: T): T => {
    return functions.reduce((value, fn) => fn(value), initialValue);
  };
};
