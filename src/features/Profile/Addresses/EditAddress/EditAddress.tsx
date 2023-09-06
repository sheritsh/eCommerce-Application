import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Modal from 'reactjs-popup';
import './EditAddress.scss';
import { useSelector } from 'react-redux';
import Input from '../../../../components/UI/input/Input';
import Form from '../../../../components/UI/forms/form/Form';
import Button from '../../../../components/UI/button/Button';
import { ErrorMessages } from '../../../../components/UI/forms/form/type';
import ErrorMessage from '../../../../components/UI/ErrorMessage/ErrorMessage';
import { fetchCustomer } from '../../customer-slice';
import { IRootState, useAppDispatch } from '../../../../store';
import Popup from '../../../../components/UI/popup/Popup';
import ENV from '../../../../api/env';
import { IAction, IAddressInfo } from '../../types';

interface IProp {
  addressId: string;
}

const EditAddress: React.FC<IProp> = ({ addressId }) => {
  // const setDefaultShippingAddress = {
  //   action: 'setDefaultShippingAddress',
  //   addressId,
  // };
  // const setDefaultBillingAddress = {
  //   action: 'setDefaultBillingAddress',
  //   addressId,
  // };
  const [open, setOpen] = useState(false);
  const closeModal = (): void => setOpen(false);
  const token = useSelector((state: IRootState) => state.auth.authData.accessToken);
  const customer = useSelector((state: IRootState) => state.customer.customerData).result;
  const dispatch = useAppDispatch();

  const [country, setCountry] = useState('US');
  const [city, setCity] = useState('');
  const [streetName, setStreetName] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const [cityVisited, setCityVisited] = useState(false);
  const [streetNameVisited, setStreetNameVisited] = useState(false);
  const [postalCodeVisited, setPostalCodeVisited] = useState(false);

  const [cityError, setCityError] = useState(ErrorMessages.EmptyCity);
  const [streetNameError, setStreetNameError] = useState(ErrorMessages.EmptyStreetName);
  const [postalCodeError, setPostalCodeError] = useState(ErrorMessages.EmptyPostalCode);

  const [isSuccessPopupActive, setSuccessPopupActive] = useState(false);
  const [isErrorPopupActive, setErrorPopupActive] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const [typeAddress, setTypeAddress] = useState('none');

  const [formValid, setFormValid] = useState(false);

  function changeType(e: { target: { value: React.SetStateAction<string> } }): void {
    setTypeAddress(e.target.value);
  }

  let action: IAction;

  const changeAddress = async (id: string, version: number, data: IAddressInfo): Promise<void> => {
    const response = await fetch(`${ENV.Host}/${ENV.ProjectKey}/customers/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        version,
        actions: [
          {
            action: 'changeAddress',
            addressId,
            address: {
              streetName: data.streetName,
              postalCode: data.postalCode,
              city: data.city,
              country: data.country,
            },
          },
        ],
      }),
    });

    const addBillingAddressId = {
      action: 'addBillingAddressId',
      addressId,
    };
    const addShippingAddressId = {
      action: 'addShippingAddressId',
      addressId,
    };
    const removeBillingAddressId = {
      action: 'removeBillingAddressId',
      addressId,
    };
    const removeShippingAddressId = {
      action: 'removeShippingAddressId',
      addressId,
    };

    if (typeAddress === 'none') {
      action = {
        version: version + 1,
        actions: [removeBillingAddressId, removeShippingAddressId],
      };
    } else if (typeAddress === 'billing') {
      action = {
        version: version + 1,
        actions: [addBillingAddressId],
      };
    } else if (typeAddress === 'shipping') {
      action = {
        version: version + 1,
        actions: [addShippingAddressId],
      };
    } else if (typeAddress === 'shipping and billing') {
      action = {
        version: version + 1,
        actions: [addBillingAddressId, addShippingAddressId],
      };
    }

    await fetch(`${ENV.Host}/${ENV.ProjectKey}/customers/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(action),
    });

    if (response.ok) {
      setSuccessPopupActive(true);
      setPopupMessage('Data successfully updated');
      await dispatch(fetchCustomer(token));
      setTimeout(() => closeModal(), 1500);
      setTimeout(() => setSuccessPopupActive(false), 1500);
    } else {
      const errorData = await response.json();
      setPopupMessage(`Oops! Error ${response.status}: ${errorData.message}`);
      setErrorPopupActive(true);
      console.error(response.statusText);
    }
  };

  useEffect(() => {
    if (cityError || streetNameError || postalCodeError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [cityError, streetNameError, postalCodeError]);

  const countryHandler = (e: React.ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
    setCountry(target.value);
  };

  const cityHandler = (e: React.ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
    setCity(target.value);
    const criterion = /^[a-zA-Z]+$/;
    if (!criterion.test(String(target.value))) {
      setCityError(ErrorMessages.NotValidCity);
    } else {
      setCityError(ErrorMessages.NoErrors);
    }
  };

  const streetNameHandler = (e: React.ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
    setStreetName(target.value);
    const criterion = /^.+$/;
    if (!criterion.test(String(target.value))) {
      setStreetNameError(ErrorMessages.NotValidStreetName);
    } else {
      setStreetNameError(ErrorMessages.NoErrors);
    }
  };

  const postalCodeHandler = (e: React.ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
    setPostalCode(target.value);

    let criterion = /^/;
    if (country === 'US') {
      criterion = /^[0-9]{5}(?:-[0-9]{4})?$/;
    } else if (country === 'DE') {
      criterion = /^\d{5}$/;
    }

    if (!criterion.test(String(target.value))) {
      setPostalCodeError(ErrorMessages.NotValidPostalCode);
    } else {
      setPostalCodeError(ErrorMessages.NoErrors);
    }
  };

  const blurHandler = (e: React.FocusEvent): void => {
    switch ((e.target as HTMLInputElement).name) {
      case 'city':
        setCityVisited(true);
        break;
      case 'streetName':
        setStreetNameVisited(true);
        break;
      case 'postalCode':
        setPostalCodeVisited(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="container">
      <button className="addressButton_edit" onClick={(): void => setOpen((e) => !e)}>
        edit
      </button>
      <Modal open={open} closeOnDocumentClick onClose={closeModal}>
        <div>
          <a className="close" onClick={closeModal}>
            &times;
          </a>
          <h1>Edit address information</h1>
          <Form>
            <select onChange={(e): void => countryHandler(e)} name="country" defaultValue="US">
              <option value="US">United States</option>
              <option value="DE">Germany</option>
            </select>
            <Input
              value={city}
              onBlur={(e): void => blurHandler(e)}
              onChange={(e): void => cityHandler(e)}
              name="city"
              type="text"
              placeholder="City"
            />
            {cityVisited && cityError && <ErrorMessage>{cityError}</ErrorMessage>}
            <Input
              value={streetName}
              onBlur={(e): void => blurHandler(e)}
              onChange={(e): void => streetNameHandler(e)}
              name="streetName"
              type="text"
              placeholder="Street"
            />
            {streetNameVisited && streetNameError && <ErrorMessage>{streetNameError}</ErrorMessage>}
            <Input
              value={postalCode}
              onBlur={(e): void => blurHandler(e)}
              onChange={(e): void => postalCodeHandler(e)}
              name="postalCode"
              type="text"
              placeholder="Post code"
            />
            {postalCodeVisited && postalCodeError && <ErrorMessage>{postalCodeError}</ErrorMessage>}
            <p>Select type address:</p>
            <div className="radio__container">
              <label>
                <input
                  type="radio"
                  name="typeAddress"
                  value="none"
                  checked={typeAddress === 'none'}
                  onChange={changeType}
                />
                None
              </label>
              <label>
                <input
                  type="radio"
                  name="typeAddress"
                  value="billing"
                  // checked={value == 'billing' ? true : false}
                  onChange={changeType}
                />
                Billing
              </label>
              <label>
                <input
                  type="radio"
                  name="typeAddress"
                  value="shipping"
                  // checked={value === 'shipping' ? true : false}
                  onChange={changeType}
                />
                Shipping
              </label>
              <label>
                <input
                  type="radio"
                  name="typeAddress"
                  value="shipping and billing"
                  // checked={value === 'shipping and billing' ? true : false}
                  onChange={changeType}
                />
                Shipping and billing
              </label>
            </div>
            <Button
              disabled={!formValid}
              onClick={(): void => {
                changeAddress(customer.id, customer.version, {
                  country,
                  city,
                  streetName,
                  postalCode,
                });
              }}
              text="update"
            />
          </Form>
          <Popup
            active={isSuccessPopupActive}
            setActive={setSuccessPopupActive}
            popupType="success"
            message={popupMessage}
          />
          <Popup active={isErrorPopupActive} setActive={setErrorPopupActive} popupType="error" message={popupMessage} />
        </div>
      </Modal>
    </div>
  );
};

export default EditAddress;
