import { Languages } from '../../api/types';
import { MatchingObject } from '../../components/Breadcrumbs/types';
import { ICategoriesData } from '../../features/Categories/types';

const categoriesNamesById = (categories: ICategoriesData): MatchingObject => {
  return categories.results.reduce((acc: MatchingObject, curr) => {
    acc[curr.id] = curr.name[Languages.English];
    return acc;
  }, {});
};

export default categoriesNamesById;
