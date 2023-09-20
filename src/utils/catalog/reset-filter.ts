import { IFilterItem } from '../../components/Filters/types';

const resetFilter = <T extends IFilterItem>(array: T[]): T[] =>
  array.map((item) => {
    return { ...item, checked: false };
  });

export default resetFilter;
