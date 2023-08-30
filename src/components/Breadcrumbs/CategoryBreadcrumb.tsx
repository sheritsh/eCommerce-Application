import { useSelector } from 'react-redux';
import { IRootState } from '../../features/types';
import { IMatch } from './types';
import categoriesNamesById from '../../utils/catalog/category-name-by-id';

const CategoryBreadcrumb: React.FC<IMatch> = ({ match }) => {
  const categories = useSelector((state: IRootState) => state.categories.categoriesData);
  const matching = categoriesNamesById(categories);

  return <li>{matching[match.params.categoryId]}</li>;
};

export default CategoryBreadcrumb;
