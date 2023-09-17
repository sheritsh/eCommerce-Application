import { Link } from 'react-router-dom';
import classes from './Header.module.scss';
import Container from '../UI/container/Container';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Menu from './Menu';

const Header: React.FC = () => {
  return (
    <header>
      <Container>
        <div className={classes.header}>
          <div className={classes.header__title} id="title">
            <Link to="/">Tourist Tracks Store</Link>
          </div>
          <Menu />
        </div>
        <Breadcrumbs />
      </Container>
    </header>
  );
};

export default Header;
