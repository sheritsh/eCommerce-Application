import React from 'react';
import Button from './components/UI/Button';

const App: React.FC = () => {
  return (
    <Button
      onClick={() => {console.log('Click')}}
      text="Register"
    />
  );
};

export default App;
