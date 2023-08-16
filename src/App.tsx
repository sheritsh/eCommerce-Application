import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import Footer from './components/Footer/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/dist" element={<MainPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/shopping-cart" element={<CartPage />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
