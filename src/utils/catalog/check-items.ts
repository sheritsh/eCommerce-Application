import { IFilterItem } from '../../components/Filters/types';

const checkItem = <T extends IFilterItem>(array: T[], id: number): T[] =>
  array.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item));

export default checkItem;
