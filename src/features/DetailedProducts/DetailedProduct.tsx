import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Grid } from 'react-loader-spinner';
import { useAppDispatch } from '../../store';
import { IRootState } from '../types';
import { fetchProductDetails } from './detailed-products-slice';
import processProductData from '../../utils/details/process-product-data';
import classes from './DetailedProduct.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface IProductsProps {
  categoryId?: string;
}

const DetailedProduct: React.FC<IProductsProps> = () => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const productData = useSelector((state: IRootState) => state.detailedProduct.detailedProductData);

  useEffect(() => {
    dispatch(fetchProductDetails(productId));
  }, [productId, dispatch]);

  const processedProductData = processProductData(productData.result);

  return (
    <>
      {productData.isLoading && (
        <Grid
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass="spinner"
          visible={true}
        />
      )}
      {!productData.isLoading && productData.error ? <div>{productData.error}</div> : null}
      {!productData.isLoading && productData.result.id ? (
        <>
          <div className={classes.detailed__main}>
            <div className={classes.main_slider}>
              <Swiper
                modules={[Navigation, Pagination, Mousewheel]}
                style={{
                  '--swiper-navigation-color': '#1D1E24',
                  '--swiper-pagination-color': '#FEBE70',
                }}
                spaceBetween={40}
                height={50}
                mousewheel={true}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
              >
                {processedProductData.images.map(({ url }, index) => {
                  return (
                    <SwiperSlide>
                      <img src={url} width="100%" alt={`Goods image ${index + 1}`}></img>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <div className={classes.main__main_info}>
              <h3>{processedProductData.name}</h3>
              <div className={classes.main_info__price}>Price: ${processedProductData.price}</div>
              {processedProductData.discountedPrice ? processedProductData.discountedPrice / 100 : null}
            </div>
          </div>
          <div className={classes.description}>
            <h3>Description</h3>
            <div className={classes.description__text}>{processedProductData.description}</div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default DetailedProduct;
