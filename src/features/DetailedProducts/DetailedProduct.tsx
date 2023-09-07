import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Grid } from 'react-loader-spinner';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Zoom, Keyboard, Navigation, Pagination } from 'swiper/modules';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import classes from './DetailedProduct.module.scss';
import processProductData from '../../utils/details/process-product-data';
import { fetchProductDetails } from './detailed-products-slice';
import { IRootState } from '../types';
import { useAppDispatch } from '../../store';
import Button from '../../components/UI/button/Button';
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface IProductsProps {
  categoryId?: string;
}

const modalWindowStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'min(50vw, 1200px)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const DetailedProduct: React.FC<IProductsProps> = () => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const productData = useSelector((state: IRootState) => state.detailedProduct.detailedProductData);

  useEffect(() => {
    dispatch(fetchProductDetails(productId || ''));
  }, [productId, dispatch]);

  const processedProductData = processProductData(productData.result);
  const [open, setOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const discountAmout =
    processedProductData.price !== null && processedProductData.discountedPrice
      ? (
          ((processedProductData.price - processedProductData.discountedPrice / 100) / processedProductData.price) *
          100
        ).toFixed(0)
      : null;

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);
  const handleImageClick = (index: number): void => {
    setSelectedImageIndex(index);
    handleOpen();
  };

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
                modules={[Navigation, Pagination]}
                style={
                  {
                    '--swiper-navigation-color': '#1D1E24',
                    '--swiper-pagination-color': '#FEBE70',
                  } as React.CSSProperties
                }
                spaceBetween={40}
                height={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
              >
                {processedProductData.images.map(({ url }, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <img
                        src={url}
                        width="100%"
                        alt={`Goods image ${index + 1}`}
                        onClick={(): void => handleImageClick(index)}
                      ></img>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={modalWindowStyle}>
                          <IconButton
                            edge="end"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="Закрыть"
                            style={{ position: 'absolute', top: 0, right: 10 }}
                          >
                            <CloseIcon />
                          </IconButton>
                          <Swiper
                            modules={[Zoom, Keyboard, Navigation, Pagination]}
                            style={
                              {
                                '--swiper-navigation-color': '#1D1E24',
                                '--swiper-pagination-color': '#FEBE70',
                              } as React.CSSProperties
                            }
                            keyboard={{
                              enabled: true,
                            }}
                            initialSlide={selectedImageIndex || 0}
                            spaceBetween={40}
                            height={50}
                            slidesPerView={1}
                            navigation
                            zoom={true}
                            pagination={{ clickable: true }}
                          >
                            {processedProductData.images.map(({ urlSlide }, idx) => {
                              return (
                                <SwiperSlide key={idx}>
                                  <div className="swiper-zoom-container">
                                    <img
                                      src={urlSlide}
                                      width="100%"
                                      alt={`Goods image ${idx + 1}`}
                                      onClick={(): void => handleImageClick(idx)}
                                    ></img>
                                  </div>
                                </SwiperSlide>
                              );
                            })}
                          </Swiper>
                        </Box>
                      </Modal>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <div className={classes.main__main_info}>
              <h3>{processedProductData.name}</h3>
              <div className={classes.main_info__price}>
                Price:{' '}
                <div
                  className={`${classes.main_info__price_reg} ${
                    processedProductData.discountedPrice ? classes.old_price : null
                  }`}
                >
                  ${processedProductData.price}
                </div>
                {processedProductData.discountedPrice && (
                  <div className={classes.main_info__disc}>
                    <div className={classes.disc_amount}>-{discountAmout}%</div>
                    <div className={classes.main_info__price_disc}>${processedProductData.discountedPrice / 100}</div>
                  </div>
                )}
              </div>
              <form className={classes.buy_form}>
                <input type="number" min="1" max="99" defaultValue="1"></input>
                <Button type="button" text="Add to cart" />
              </form>
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
