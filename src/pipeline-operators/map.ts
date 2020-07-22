export function map<T>(cb: (v: T) => any) {
    return (v: T) => {
        return cb(v);
    };
}
