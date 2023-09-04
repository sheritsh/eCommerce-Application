import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { IBrand } from './types';

const BrandCheckbox: React.FC<IBrand> = ({ brand }: IBrand) => {
  const { title } = brand;
  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox />} label={title} />
    </FormGroup>
  );
};

export default BrandCheckbox;
