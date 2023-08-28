import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import Footer from './components/Footer/Footer';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/Routing/PrivateRoute';
import GuestRoute from './components/Routing/GuestRoute';
import CatalogPage from './pages/CatalogPage';
import CategoryPage from './pages/CategoryPage';

const App: React.FC = () => {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/categories/:categoryId" element={<CategoryPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path="/registration"
          element={
            <GuestRoute>
              <RegistrationPage />
            </GuestRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/shopping-cart"
          element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          }
        />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
