import { useSelector } from 'react-redux';
import { IRootState } from '../../features/types';
import { IMatch } from './types';
import categoriesNamesById from '../../utils/catalog/category-name-by-id';

const ProductPageBreadcrumb: React.FC<IMatch> = ({ match }) => {
  const categories = useSelector((state: IRootState) => state.categories.categoriesData);
  const matching = categoriesNamesById(categories);

  return <li>Item name</li>;
};

export default ProductPageBreadcrumb;
