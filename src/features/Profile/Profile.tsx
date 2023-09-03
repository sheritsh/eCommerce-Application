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
  const customerData = useSelector((state: IRootState) => state.customer.customerData);
  const newToken = useSelector((state: IRootState) => state.auth.authData.accessToken);
  // eslint-disable-next-line no-console
  console.log(customerData.result);

  useEffect(() => {
    dispatch(fetchCustomer(newToken));
  }, [dispatch]);

  return (
    <div className={classes.profile}>
      <div className={classes.profile__title}>
        <h3>Personal information</h3>
        <Button text="edit" />
      </div>
      <PersonalInfo firstName="Andrey" lastName="Nezhdanov" birthDate="11.11.1997" />
      <div className={classes.profile__title}>
        <h3>Addresses</h3>
        <Button text="edit" />
      </div>
      <Addresses type="Shipping" country="US" city="Moscow" street="Glagoleva" postCode="12312" />
      <span></span>
    </div>
  );
};

export default Profile;
