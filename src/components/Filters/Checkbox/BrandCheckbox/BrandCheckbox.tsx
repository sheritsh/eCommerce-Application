import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { IBrand } from './types';

const BrandCheckbox: React.FC<IBrand> = ({ handleChangeCheckedBrand, brand }) => {
  const { checked, label, id } = brand;
  return (
    <FormGroup>
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={(): void => handleChangeCheckedBrand(id)} />}
        label={label}
      />
    </FormGroup>
  );
};

export default BrandCheckbox;
