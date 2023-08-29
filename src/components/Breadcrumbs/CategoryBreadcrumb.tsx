import { useSelector } from 'react-redux';
import { IRootState } from '../../features/types';
import { Languages } from '../../api/types';
import { IMatch, MatchingObject } from './types';

const CategoryBreadcrumb: React.FC<IMatch> = ({ match }) => {
  const categories = useSelector((state: IRootState) => state.categories.categoriesData);
  const categoriesNamesById: MatchingObject = categories.results.reduce((acc: MatchingObject, curr) => {
    acc[curr.id] = curr.name[Languages.English];
    return acc;
  }, {});

  return <li>{categoriesNamesById[match.params.categoryId]}</li>;
};

export default CategoryBreadcrumb;
