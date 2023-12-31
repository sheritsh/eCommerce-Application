import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import AuthRoute from './components/Routing/AuthRoute';
import { store } from './store';
import ProductPage from './pages/ProductPage';
import AboutUsPage from './pages/AboutUsPage';

const Header = lazy(() => import('./components/Header/Header'));
const MainPage = lazy(() => import('./pages/MainPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const Footer = lazy(() => import('./components/Footer/Footer'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const CatalogPage = lazy(() => import('./pages/CatalogPage'));

const App: React.FC = () => {
  const persistor = persistStore(store);
  return (
    <Router>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Header />
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/about_us" element={<AboutUsPage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/catalog/:productId" element={<ProductPage />} />
              <Route path="/categories" element={<CatalogPage />} />
              <Route path="/categories/:categoryId" element={<CatalogPage />} />
              <Route path="/categories/:categoryId/:productId" element={<ProductPage />} />
              <Route path="/product_page/test" element={<ProductPage />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route
                path="/login"
                element={
                  <AuthRoute isGuest>
                    <LoginPage />
                  </AuthRoute>
                }
              />
              <Route
                path="/registration"
                element={
                  <AuthRoute isGuest>
                    <RegistrationPage />
                  </AuthRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <AuthRoute isPrivate>
                    <ProfilePage />
                  </AuthRoute>
                }
              />
              <Route
                path="/shopping-cart"
                element={
                  <AuthRoute>
                    <CartPage />
                  </AuthRoute>
                }
              />
            </Routes>
          </Suspense>
          <Footer />
        </PersistGate>
      </Provider>
    </Router>
  );
};

export default App;
