import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { IRootState, useAppDispatch } from '../../store';
import { Settings } from '../../api/types';
import { fetchProductsByParams } from '../../features/filters/ProductsByParams/fetch-products-by-params';

const PaginationBlock: React.FC = () => {
  const dispatch = useAppDispatch();
  const routerParams = useParams();
  const { categoryId } = routerParams;
  const params = `&filter=variants.price.centAmount:range (3600 to 13000)`;
  const productsCount = useSelector((state: IRootState) => state.filters.productsForFiltersData.results.length);
  const pagesCount = Math.ceil(productsCount / Settings.ProductsPerPage);

  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number): void => {
    setPage(value);
    const offset = value;
    dispatch(fetchProductsByParams({ params, offset, categoryId }));
  };

  return (
    <Stack spacing={2}>
      <Pagination count={pagesCount} variant="outlined" color="primary" onChange={handleChange} />
    </Stack>
  );
};

export default PaginationBlock;
