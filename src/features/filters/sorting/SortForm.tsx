import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import SortIcon from '@mui/icons-material/Sort';

const SortForm: React.FC<{ onSort: (sortQuery: string) => void }> = ({ onSort }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleSortOptionClick = (sortOption: string): void => {
    onSort(sortOption);
    handleClose();
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{ color: 'black', border: '1px solid black', margin: '0 0 0 15px', padding: '20px' }}
      >
        Sort
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
    </div>
  );
};

export default SortForm;
