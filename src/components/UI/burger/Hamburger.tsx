import classes from './Hamburger.module.scss';

interface IPropsBurger {
  open: boolean;
}

const Hamburger = ({ open }: IPropsBurger): JSX.Element => {
  return (
    <div>
      <div className={open ? `${classes.burger} ${classes.burger_active}` : classes.burger}>
        <span className={classes.burgerLine}></span>
      </div>
    </div>
  );
};

export default Hamburger;
