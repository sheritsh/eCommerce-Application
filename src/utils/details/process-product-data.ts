import { IProcessedProductData } from '../../features/DetailedProducts/types';
import { IResult } from '../../features/Products/types';

const processProductData = (rawData: IResult): IProcessedProductData => {
  const { masterVariant } = rawData.masterData.current;
  const { prices } = masterVariant;

  return {
    name: rawData.masterData.current.name['en-US'],
    price: prices.length > 0 ? prices[0].value.centAmount / 100 : 0,
    discountedPrice: masterVariant.prices[0]?.discounted?.value?.centAmount ?? null,
    description: rawData.masterData.current.description['en-US'],
    images: rawData.masterData.current.masterVariant.images,
  };
};

export default processProductData;
