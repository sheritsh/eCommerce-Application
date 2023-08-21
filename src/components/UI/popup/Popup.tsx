import React from 'react';
import './Popup.css';

interface IPopupProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Popup: React.FC<IPopupProps> = ({ active, setActive }) => {
  return (
    <div className={active ? 'popup-active popup' : 'popup'} onClick={(): void => setActive(false)}>
      <p>Thank you for registering!</p>
    </div>
  );
};

export default Popup;
