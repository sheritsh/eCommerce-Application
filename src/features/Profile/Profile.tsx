import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import Addresses from './Addresses/Addresses';
import PersonalInfo from './PersonalInfo/PersonalInfo';
import classes from './Profile.module.scss';
import { fetchCustomer } from './customer-slice';
import { IRootState } from '../types';
import Button from '../../components/UI/button/Button';

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const customer = useSelector((state: IRootState) => state.customer.customerData).result;
  const token = useSelector((state: IRootState) => state.auth.authData.accessToken);
  const { addresses } = customer;
  // eslint-disable-next-line no-console
  console.log(customer, addresses);

  useEffect(() => {
    dispatch(fetchCustomer(token));
  }, [dispatch]);

  return (
    <div className={classes.profile}>
      <div className={classes.profile__title}>
        <h3>Personal information</h3>
        <Button text="edit" />
      </div>
      <PersonalInfo firstName={customer.firstName} lastName={customer.lastName} birthDate={customer.dateOfBirth} />
      <div className={classes.profile__title}>
        <h3>Addresses</h3>
        <Button text="edit" />
      </div>
      {addresses.map((address) => (
        <Addresses
          id={address.id}
          country={address.country}
          city={address.city}
          street={address.streetName}
          postCode={address.postalCode}
          customer={customer}
        />
      ))}
      <span></span>
    </div>
  );
};

export default Profile;
