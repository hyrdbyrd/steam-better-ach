import { writable } from 'svelte/store';

import { getItem } from '@/lib/storage/getItem';
import { setItem } from '@/lib/storage/setItems';

export type ThemeType = 'dark' | 'light';

export const THEMES: Record<string, ThemeType> = { dark: 'dark', light: 'light' };
export const THEME_SWITCHER: Record<string, ThemeType> = { dark: THEMES.light, light: THEMES.dark };

const defaultValue: ThemeType = THEMES.dark;

export const theme = writable<ThemeType>(THEMES[getItem<ThemeType>('theme', defaultValue)] || defaultValue);
theme.subscribe(setItem.bind(null, 'theme'));
