import { browser } from '$app/environment';

export const getItem = <T extends string>(name: string, defaultValue: T): T => 
    (browser && (localStorage.getItem(name) as T | null)) || defaultValue;
