export const pipe = (...functions) => {
    return (initialValue) => {
        return functions.reduce((value, fn) => fn(value), initialValue);
    };
};
