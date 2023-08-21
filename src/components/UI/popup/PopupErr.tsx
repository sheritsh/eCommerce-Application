import React from 'react';
import './PopupErr.css';

interface IPopupProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopupErr: React.FC<IPopupProps> = ({ active, setActive }) => {
  return (
    <div className={active ? 'popupErr-active popupErr' : 'popupErr'} onClick={(): void => setActive(false)}>
      <p>The user already exists!</p>
    </div>
  );
};

export default PopupErr;
