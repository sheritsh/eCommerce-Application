import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import Addresses from './Addresses/Addresses';
import PersonalInfo from './PersonalInfo/PersonalInfo';
import classes from './Profile.module.scss';
import { fetchCustomer } from './customer-slice';
import { IRootState } from '../types';
import Button from '../../components/UI/button/Button';
import EditPersonalInfo from './EditPersonalInfo/EditPersonalInfo';

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const customer = useSelector((state: IRootState) => state.customer.customerData).result;
  const token = useSelector((state: IRootState) => state.auth.authData.accessToken);
  const { addresses } = customer;
  // eslint-disable-next-line no-console
  console.log(customer.id, customer, customer.version);

  useEffect(() => {
    dispatch(fetchCustomer(token));
  }, [dispatch]);

  return (
    <div className={classes.profile}>
      <div className={classes.profile__title}>
        <h3>Personal information</h3>
        <EditPersonalInfo />
      </div>
      <PersonalInfo
        firstName={customer.firstName}
        lastName={customer.lastName}
        birthDate={customer.dateOfBirth}
        email={customer.email}
      />
      <div className={classes.profile__title}>
        <h3>Addresses</h3>
        <Button text="Add new address" />
      </div>
      {addresses.map((address) => (
        <div>
          <Addresses
            id={address.id}
            country={address.country}
            city={address.city}
            street={address.streetName}
            postCode={address.postalCode}
            customer={customer}
          />
          <button>edit</button>
          <button>delete</button>
        </div>
      ))}
      <span></span>
    </div>
  );
};

export default Profile;
