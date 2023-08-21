import React from 'react';
import renderer from 'react-test-renderer';
import LoginForm from '../src/components/UI/forms/loginForm/LoginForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

test('LoginForm renders correctly', () => {
  const tree = renderer
    .create(<Router><Routes><Route
      path="/login"
      element={<LoginForm />}
    /></Routes></Router>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

