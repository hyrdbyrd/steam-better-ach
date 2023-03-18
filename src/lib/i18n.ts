export type LangType = 'ru' | 'en';

export const i18nFactory =
    <T extends string>(keyset: Record<T, Record<LangType, string>>) =>
    (lang: LangType) =>
    (key: T) =>
        keyset[key][lang] || key;
