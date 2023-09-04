import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { IColor } from './types';

const ColorCheckbox: React.FC<IColor> = ({ handleChangeCheckedColor, color }) => {
  const { checked, label, id } = color;
  return (
    <FormGroup>
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={(): void => handleChangeCheckedColor(id)} />}
        label={label}
      />
    </FormGroup>
  );
};

export default ColorCheckbox;
