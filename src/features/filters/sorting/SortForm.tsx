import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import SortIcon from '@mui/icons-material/Sort';
import { useParams } from 'react-router';
import { fetchProductsBySort } from './fetch-products-by-sort';
import { useAppDispatch } from '../../../store';

const SortForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { categoryId } = params;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [sortQuery, setSortQuery] = useState('');

  const handleSort = (sortOption: string): void => {
    setSortQuery(sortOption);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleSortOptionClick = (sortOption: string): void => {
    handleSort(sortOption);
    handleClose();
  };

  useEffect(() => {
    let endpoint = '';
    if (sortQuery) {
      if (sortQuery === 'sort=name.en-US') {
        endpoint = `?${sortQuery}`;
      } else {
        endpoint = `search?${sortQuery}`;
      }
      if (endpoint) dispatch(fetchProductsBySort(endpoint, categoryId));
    }
  }, [sortQuery]);

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{
          color: 'black',
          border: 'none',
          marginLeft: 'auto',
          padding: '1em 3em',
          background: '#E5E5E5',
        }}
      >
        Sort by:
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={(): void => handleSortOptionClick('sort=name.en-US')}>
          <SortByAlphaIcon fontSize="small" />
          &nbsp;Alphabetically
        </MenuItem>
        <MenuItem onClick={(): void => handleSortOptionClick('sort=price asc')}>
          <SortIcon style={{ rotate: '180deg' }} fontSize="small" />
          &nbsp;By price ASC
        </MenuItem>
        <MenuItem onClick={(): void => handleSortOptionClick('sort=price desc')}>
          <SortIcon fontSize="small" />
          &nbsp;By price DESC
        </MenuItem>
      </Menu>
    </>
  );
};

export default React.memo(SortForm);
