import classes from './Addresses.module.scss';

interface AddressesProps {
  type: string;
  country: string;
  city: string;
  street: string;
  postCode: string;
}

const Addresses: React.FC<AddressesProps> = ({ type, country, city, street, postCode }) => {
  return (
    <div>
      <form className={classes.profile__addresses}>
        <label className={classes.profile__item}>
          <p className={classes.profile__item__title}>TYPE</p>
          <p className={classes.profile__item__value}>
            {type}
            <span className={classes.default}>default</span>
          </p>
        </label>
        <label className={classes.profile__item}>
          <p className={classes.profile__item__title}>COUNTRY</p>
          <p className={classes.profile__item__value}>{country}</p>
        </label>
        <label className={classes.profile__item}>
          <p className={classes.profile__item__title}>CITY</p>
          <p className={classes.profile__item__value}>{city}</p>
        </label>
        <label className={classes.profile__item}>
          <p className={classes.profile__item__title}>STREET</p>
          <p className={classes.profile__item__value}>{street}</p>
        </label>
        <label className={classes.profile__item}>
          <p className={classes.profile__item__title}>POSTAL CODE</p>
          <p className={classes.profile__item__value}>{postCode}</p>
        </label>
      </form>
    </div>
  );
};

export default Addresses;
