export function tap<T>(cb: (v: T) => void) {
    return (v: any) => {
        cb(v);
        return v;
    };
}