import { ICustomer } from '../types';
import classes from './Addresses.module.scss';

interface AddressesProps {
  id: string;
  country: string;
  city: string;
  street: string;
  postCode: string;
  customer: ICustomer;
}

function addressCheckType(id: string, customer: ICustomer): string {
  const billing = customer.billingAddressIds.find((e) => {
    return e === id;
  });
  const shipping = customer.shippingAddressIds.find((e) => {
    return e === id;
  });

  if (billing && shipping) {
    return 'billing shipping';
  }
  if (shipping) {
    return 'shipping';
  }
  if (billing) {
    return 'billing';
  }
  return '-';
}

function addressCheckDefault(id: string, customer: ICustomer): JSX.Element | null {
  if (id === customer.defaultBillingAddressId && id === customer.defaultShippingAddressId) {
    return (
      <div>
        <p className={classes.default}>default billing</p>
        <p className={classes.default}>default shipping</p>
      </div>
    );
  }
  if (id === customer.defaultShippingAddressId) {
    return <p className={classes.default}>default shipping</p>;
  }
  if (id === customer.defaultBillingAddressId) {
    return <p className={classes.default}>default billing</p>;
  }
  return null;
}

const Addresses: React.FC<AddressesProps> = ({ id, country, city, street, postCode, customer }) => {
  return (
    <div>
      <div className={classes.profile__addresses}>
        <div className={`${classes.profile__item} ${classes.type}`}>
          <p className={classes.profile__item__title}>TYPE</p>
          <div className={classes.profile__item__value}>
            <p>{addressCheckType(id, customer)}</p>
            {addressCheckDefault(id, customer)}
          </div>
        </div>
        <div className={classes.profile__item}>
          <p className={classes.profile__item__title}>COUNTRY</p>
          <p className={classes.profile__item__value}>{country}</p>
        </div>
        <div className={classes.profile__item}>
          <p className={classes.profile__item__title}>CITY</p>
          <p className={classes.profile__item__value}>{city}</p>
        </div>
        <div className={classes.profile__item}>
          <p className={classes.profile__item__title}>STREET</p>
          <p className={classes.profile__item__value}>{street}</p>
        </div>
        <div className={`${classes.profile__item} ${classes.postalCode}`}>
          <p className={classes.profile__item__title}>POSTAL CODE</p>
          <p className={classes.profile__item__value}>{postCode}</p>
        </div>
      </div>
    </div>
  );
};

export default Addresses;
