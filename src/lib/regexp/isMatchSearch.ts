import { filterBySearch } from './filterBySearch';

export const isMatchSearch = (value: string, searching = '') => new RegExp(filterBySearch(searching), 'i').test(value);
