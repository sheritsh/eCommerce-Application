import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/UI/Container/Container';
import H1 from '../components/UI/titles/H1/H1';

const MainPage: React.FC = () => {
  return (
    <div className="content">
      <Container>
        <div className="main">
          <H1 text="Main page" />
          <h2>All pages of Sprint #2:</h2>
          <ul>
            <li>
              <Link to="/login">Login Page</Link>
            </li>
            <li>
              <Link to="/registration">Registration Page</Link>
            </li>
            <li>
              <Link to="/profile">Profile Page</Link>
            </li>
            <li>
              <Link to="/shopping-cart">Cart Page</Link>
            </li>
            <li>
              <Link to="/kakayato-eres">404 Not Found Page</Link>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default MainPage;
