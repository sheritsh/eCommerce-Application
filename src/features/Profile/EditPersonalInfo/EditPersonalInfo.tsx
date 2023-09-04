import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Popup from 'reactjs-popup';
import './EditPersonalInfo.scss';
import Input from '../../../components/UI/input/Input';
import Form from '../../../components/UI/forms/form/Form';
import Button from '../../../components/UI/button/Button';

const EditPersonalInfo: React.FC = () => {
  const [open, setOpen] = useState(false);
  const closeModal = (): void => setOpen(false);

  return (
    <div>
      <Button text="Edit" onClick={(): void => setOpen((e) => !e)} />
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div>
          <a className="close" onClick={closeModal}>
            &times;
          </a>
          <Form>
            <Input
              // value={firstName}
              // onBlur={(e): void => blurHandler(e)}
              // onChange={(e): void => firstNameHandler(e)}
              name="firstName"
              type="text"
              placeholder="First name"
            />
            {/* {firstNameVisited && firstNameError && <ErrorMessage>{firstNameError}</ErrorMessage>} */}
            <Input
              // value={lastName}
              // onBlur={(e): void => blurHandler(e)}
              // onChange={(e): void => lastNameHandler(e)}
              name="lastName"
              type="text"
              placeholder="Last name"
            />
            {/* {lastNameVisited && lastNameError && <ErrorMessage>{lastNameError}</ErrorMessage>} */}
            <h3>Date of birth:</h3>
            <Input
              // value={dateOfBirth}
              // onBlur={(e): void => blurHandler(e)}
              // onChange={(e): void => dateOfBirthHandler(e)}
              name="dateOfBirth"
              type="date"
            />
            {/* {dateOfBirthVisited && dateOfBirthError && <ErrorMessage>{dateOfBirthError}</ErrorMessage>} */}
            <Button disabled={true} text="Update" />
          </Form>
        </div>
      </Popup>
    </div>
  );
};

export default EditPersonalInfo;
