import React from 'react';
import Button from './components/UI/button/Button';
import Input from './components/UI/input/Input';

const App: React.FC = () => {
  return (
    <>
      <Input name="email" type="text" placeholder="Enter your email" />
      <Input name="password" type="password" placeholder="Enter your password" />
      <Button
        onClick={() => {console.log('Click')}}
        text="Register"
      />
    </>
  );
};

export default App;
