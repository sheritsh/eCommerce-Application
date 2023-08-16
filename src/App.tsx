import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import Footer from './components/Footer/Footer';
// import LoginForm from './components/UI/forms/loginForm/LoginForm';
// import { RegistrationForm } from './components/UI/forms/registrationForm/RegistrationForm';

const App: React.FC = () => {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainPage />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
