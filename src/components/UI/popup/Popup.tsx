import React from 'react';
import { Alert, AlertTitle } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import './Popup.css';

interface IPopupProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  popupType: 'error' | 'warning' | 'info' | 'success';
  message: string;
}

const Popup: React.FC<IPopupProps> = ({ active, setActive, popupType, message }) => {
  const handleClose = (): void => {
    setActive(false);
  };

  return (
    <div>
      <Snackbar
        open={active}
        autoHideDuration={5000}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        onClose={handleClose}
      >
        <div>
          <Alert severity={popupType} onClose={handleClose}>
            <AlertTitle>{popupType ? popupType.charAt(0).toUpperCase() + popupType.slice(1) : ''}</AlertTitle>
            {message}
          </Alert>
        </div>
      </Snackbar>
    </div>
  );
};

export default Popup;
