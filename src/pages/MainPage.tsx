import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/UI/container/Container';

const MainPage: React.FC = () => {
  return (
    <div className="content">
      <Container>
        <div className="main">
          <h1>Main Page</h1>
          <h2>All pages of Sprint #2:</h2>
          <ul>
            <li>
              <Link to="/catalog">Catalog Page</Link>
            </li>
            <li>
              <Link to="/test">Test Page</Link>
            </li>
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
            <li>
              <Link to="/product_page/test">Detailed Product Page</Link>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default MainPage;
