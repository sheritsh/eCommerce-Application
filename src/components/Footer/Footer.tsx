import React from 'react';
import classes from './Footer.module.css';
import Container from '../UI/container/Container';

const Footer: React.FC = () => {
  const authorText = 'created by:';
  return (
    <footer>
      <Container>
        <div className={classes.footer}>
          <div className={classes.authors}>
            {authorText} <br />
            <ul>
              <li>
                <a href="https://github.com/ekatrif">ekatrif</a>
              </li>
              <li>
                <a href="https://github.com/sheritsh">sheritsh</a>
              </li>
              <li>
                <a href="https://github.com/montek1o">montek1o</a>
              </li>
            </ul>
          </div>
          <div className={classes.copyright}>Tourist Tracks Store ©2023</div>
          <div className={classes.rs_school}>
            <a href="https://rs.school/js/">
              <img src="../../src/assets/svg/rs_school_js.svg" alt="RS_School_logo" width="100%"></img>
            </a>
          </div>
        </div>
        <div className={classes.page_up}>
          <a href="#">
            <img src="../../src/assets/svg/arrow_up.svg" alt="page_up" width="100%"></img>
          </a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
