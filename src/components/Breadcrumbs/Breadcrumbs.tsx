import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { NavLink } from 'react-router-dom';
import classes from './Breadcrumbs.module.scss';
import customRoutes from '../Routing/custom-routes';

const Breadcrumbs: React.FC = () => {
  const breadcrumbs = useBreadcrumbs(customRoutes);

  return (
    <ul className={classes.list}>
      {breadcrumbs.map(({ match, breadcrumb }) => (
        <NavLink key={match.pathname} to={match.pathname}>
          <li>{breadcrumb}</li>
        </NavLink>
      ))}
    </ul>
  );
};

export default Breadcrumbs;
