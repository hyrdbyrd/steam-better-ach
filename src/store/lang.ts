import { derived, writable } from 'svelte/store';

import { browser } from '$app/environment';

import { i18nFactory, type LangType } from '@/lib/i18n';

export const LANGS: Record<string, LangType> = { ru: 'ru', en: 'en' };

const defaultValue: LangType = 'en';
const initialValue: LangType = browser
    ? LANGS[localStorage.getItem('lang') ?? defaultValue]
    : (defaultValue as LangType);

export const lang = writable<LangType>(initialValue);
lang.subscribe((value) => {
    if (browser) localStorage.setItem('lang', value);
});

export const i18nStoreFactory = (keyset: Parameters<typeof i18nFactory>[0]) => {
    const i18n = i18nFactory(keyset);
    return derived(
        lang,
        (lang, set) => {
            set(i18n(lang));
        },
        i18n(defaultValue)
    );
};
