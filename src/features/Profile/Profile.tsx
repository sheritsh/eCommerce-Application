import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import Addresses from './Addresses/Addresses';
import PersonalInfo from './PersonalInfo/PersonalInfo';
import classes from './Profile.module.scss';
import { fetchCustomer } from './customer-slice';
import { IRootState } from '../types';
import EditPersonalInfo from './PersonalInfo/EditPersonalInfo/EditPersonalInfo';
import ENV from '../../api/env';
import EditAddress from './Addresses/EditAddress/EditAddress';
import AddAddress from './Addresses/newAddress/AddAddress';
import ChangePassword from './PersonalInfo/ChangePassword/ChangePassword';

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

  const deleteAddress = async (addressId: string): Promise<void> => {
    const response = await fetch(`${ENV.Host}/${ENV.ProjectKey}/customers/${customer.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        version: customer.version,
        actions: [
          {
            action: 'removeAddress',
            addressId,
          },
        ],
      }),
    });
    if (response.ok) {
      dispatch(fetchCustomer(token));
    } else {
      console.error('error1');
    }
  };

  return (
    <div className={classes.profile}>
      <div className={classes.profile__title}>
        <p className={classes.profile__title__text}>Personal information</p>
        <EditPersonalInfo />
        <ChangePassword />
      </div>
      <PersonalInfo
        firstName={customer.firstName}
        lastName={customer.lastName}
        birthDate={customer.dateOfBirth}
        email={customer.email}
      />
      <div className={classes.profile__title}>
        <p className={classes.profile__title__text}>Addresses</p>
        <AddAddress />
      </div>
      {addresses
        ? addresses.map((address) => (
            <div>
              <EditAddress addressId={address.id} />
              <button className={classes.addressButton_delete} onClick={(): Promise<void> => deleteAddress(address.id)}>
                delete
              </button>
              <Addresses
                id={address.id}
                country={address.country}
                city={address.city}
                street={address.streetName}
                postCode={address.postalCode}
                customer={customer}
              />
            </div>
          ))
        : null}
    </div>
  );
};

export default Profile;
