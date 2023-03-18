import { browser } from '$app/environment';

export const setItem = (name: string, value: string) => browser && localStorage.setItem(name, value);
