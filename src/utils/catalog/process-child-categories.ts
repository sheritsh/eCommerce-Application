import { ICategory } from '../../features/Categories/types';

interface ICategoriesMap {
  [key: string]: string[];
}

const processChildCategories = (categories: ICategory[]): ICategoriesMap => {
  const categoriesMap: ICategoriesMap = {};

  const helper = (): void => {
    categories.forEach((category) => {
      if (!category.parent) {
        categoriesMap[category.id] = [];
      } else {
        const parentId = category.parent.id;
        if (!categoriesMap[parentId]) {
          categoriesMap[parentId] = [];
        }
        categoriesMap[parentId].push(category.id);
      }
    });
  };

  helper();
  return categoriesMap;
};
export default processChildCategories;
