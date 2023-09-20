import { useSelector } from 'react-redux';
import { IRootState } from '../../features/types';
import { IMatch } from './types';
import categoriesNamesById from '../../utils/catalog/category-name-by-id';

const CategoryBreadcrumb: React.FC<IMatch> = ({ match }: IMatch) => {
  const categories = useSelector((state: IRootState) => state.categories.categoriesData);
  const matching = categoriesNamesById(categories);

  return matching[match.params.categoryId];
};

export default CategoryBreadcrumb;
