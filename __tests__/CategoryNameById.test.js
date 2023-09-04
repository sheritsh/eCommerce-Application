import { Languages } from '../src/api/types';
import categoriesNamesById from '../src/utils/catalog/category-name-by-id'

describe('categoriesNamesById', () => {
  it('should return an object with categories names by id', () => {
    const categories = {
      results: [
        { id: '1', name: { [Languages.English]: 'Category 1', es: 'Categoría 1' } },
        { id: '2', name: { [Languages.English]: 'Category 2', es: 'Categoría 2' } },
        { id: '3', name: { [Languages.English]: 'Category 3', es: 'Categoría 3' } },
      ],
    };
    const expectedOutput = {
      '1': 'Category 1',
      '2': 'Category 2',
      '3': 'Category 3',
    };
    expect(categoriesNamesById(categories)).toEqual(expectedOutput);
  });
});
