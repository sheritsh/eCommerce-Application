import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux';
import { IRootState, useAppDispatch } from '../../store';
import { Settings } from '../../api/types';
import { setPage } from './pagination-slice';

const PaginationBlock: React.FC = () => {
  const dispatch = useAppDispatch();
  const productsCount = useSelector((state: IRootState) => state.products.productsData.allResults.length);
  const pagesCount = Math.ceil(productsCount / Settings.ProductsPerPage);

  const page = useSelector((state: IRootState) => state.pagination.page);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number): void => {
    dispatch(setPage(value));
  };

  return pagesCount > 1 ? (
    <Stack spacing={2}>
      <Pagination count={pagesCount} page={page} variant="outlined" size="large" onChange={handleChange} />
    </Stack>
  ) : null;
};

export default React.memo(PaginationBlock);
