import { i18nStoreFactory } from '@/store/lang';

export const i18n = i18nStoreFactory({
    'no-sort': {
        ru: 'Без сортировки',
        en: 'No sort',
    },
    'by-name': {
        ru: 'По имени',
        en: 'By name',
    },
    'most-ach': {
        ru: 'Самые выполненые',
        en: 'Most achieved',
    },
    'less-ach': {
        ru: 'Меньше всего выполненые',
        en: 'Less achieved',
    },
    'most-ach-count': {
        ru: 'Самое большое кол-во ачивок',
        en: 'Most achievements count',
    },
    'less-ach-count': {
        ru: 'Самое меньшее кол-во ачивок',
        en: 'Less achievements count',
    },
    'placeholder-search': {
        ru: 'Название игры',
        en: 'Game name',
    },
});
