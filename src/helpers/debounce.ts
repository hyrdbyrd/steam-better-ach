export function debounce<A>(cb: (a: A) => void, time?: number): typeof cb;
export function debounce<A1, A2>(cb: (a1: A1, a2: A2) => void, time?: number): typeof cb;
export function debounce<A1, A2, A3>(cb: (a1: A1, a2: A2, a3: A3) => void, time?: number): typeof cb;

export function debounce(cb: (...args: any[]) => void, time: number = 500): typeof cb {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => cb(...args), time);
    };
};
