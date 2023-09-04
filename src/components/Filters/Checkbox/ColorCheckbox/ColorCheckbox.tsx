import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { IColor } from './types';

const ColorCheckbox: React.FC<IColor> = ({ color }: IColor) => {
  const { name } = color;
  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox />} label={name} />
    </FormGroup>
  );
};

export default ColorCheckbox;
