import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { ISize } from './types';

const SizeCheckbox: React.FC<ISize> = ({ handleChangeCheckedSize, size }) => {
  const { checked, label, id } = size;
  return (
    <FormGroup>
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={(): void => handleChangeCheckedSize(id)} />}
        label={label}
      />
    </FormGroup>
  );
};

export default SizeCheckbox;
