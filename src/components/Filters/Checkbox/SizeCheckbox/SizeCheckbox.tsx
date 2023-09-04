import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { ISize } from './types';

const SizeCheckbox: React.FC<ISize> = ({ size }: ISize) => {
  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox />} label={size} />
    </FormGroup>
  );
};

export default SizeCheckbox;
