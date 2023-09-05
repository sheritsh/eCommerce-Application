import formatPrice from '../src/utils/catalog/format-price'

describe('formatPrice', () => {
  it('should divide the number by 100', () => {
    expect(formatPrice(100)).toEqual(1);
    expect(formatPrice(50)).toEqual(0.5);
    expect(formatPrice(250)).toEqual(2.5);
  });
});