import { useSelector } from 'react-redux';
import { IRootState } from '../../features/types';
import { IMatch } from './types';

const ProductPageBreadcrumb: React.FC<IMatch> = () => {
  const productName = useSelector(
    (state: IRootState) => state.detailedProduct.detailedProductData.result?.masterData?.current?.name,
  );

  return productName ? productName['en-US'] : null;
};

export default ProductPageBreadcrumb;
