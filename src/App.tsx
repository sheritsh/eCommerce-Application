import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Grid } from 'react-loader-spinner';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import AuthRoute from './components/Routing/AuthRoute';
import { store } from './store';
import TestPage from './pages/TestPage';
import ProductPage from './pages/ProductPage';

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
          <Suspense
            fallback={
              <Grid
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="grid-loading"
                radius="12.5"
                wrapperStyle={{}}
                wrapperClass="spinner"
                visible={true}
              />
            }
          >
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/catalog/:productId" element={<ProductPage />} />
              <Route path="/categories" element={<CatalogPage />} />
              <Route path="/categories/:categoryId" element={<CatalogPage />} />
              <Route path="/categories/:categoryId/:productId" element={<ProductPage />} />
              <Route path="/product_page/test" element={<ProductPage />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/test" element={<TestPage />} />
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
                  <AuthRoute isPrivate>
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
