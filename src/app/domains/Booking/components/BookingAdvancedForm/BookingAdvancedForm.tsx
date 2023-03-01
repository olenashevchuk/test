import { Button, Input } from '../../../../components';

import Data from '../../../../utils/encryption/Data';
import IBookingAdvancedForm from './IBookingAdvancedForm';
import InDB from '../../../../utils/encryption/InDB';
import PhoneInput from 'react-phone-input-2';
import React from 'react';
import { useBookingAdvancedFormActions } from './hooks';

const BookingAdvancedForm: React.FC<IBookingAdvancedForm> = ({
  dispatchBookingLoading, onSuccessFinishBooking, onBookingFailure,
}) => {
  const {
    isBookingAvailable,
    clientPhone,
    clientFirstName,
    clientLastName,
    clientPostalCode,
    clientEmail,
    clientPersonalNumber,
    handlePhoneChange,
    handleFirstNameChange,
    handleLastNameChange,
    handlePostalCodeChange,
    handleEmailChange,
    handlePersonalNumberChange,
    handleCreateBooking,
  } = useBookingAdvancedFormActions(
    dispatchBookingLoading,
    onSuccessFinishBooking,
    onBookingFailure,
  );
  const inputStyle:any = {
    border: 0,
    height: '48px',
    width: '100%',
    display: 'flex',
    flex: '1',
    padding: 'var(--phoneInputCustomPaddings)',
    background: 'var(--input-background)',
    color: 'var(--grey-default)',
    fontSize: 'var(--input-font-size)',
    lineHeight: 'var(--input-line-height)',
    fontWeight: 'var(--input-font-weight)',
    fontFamily: 'var(--input-font-family)',
    fontStyle: 'var(--input-font-style)',
    letterSpacing: 'var(--input-letter-spacing)',
    borderRadius: 'var(--input-border-radius)',
    boxSizing: 'border-box',
  };

  const handleBlur = async (e:any, fieldName:string) => {
    let fieldValue = e.target.value;
    if (fieldName === 'phone') {
      // replace Spaces and plus symbol With empty string
      fieldValue = e.target.value.replace(/\s+/g, '').replace(/\+/g, '');
    }
    const indexDB = new InDB('id');
    const keyPair = await indexDB.findById('1');
    const encoder = new TextEncoder();
    const encryptedData = await Data.encrypt(
      encoder.encode(fieldValue),
      keyPair.keyPair.publicKey,
    );
    indexDB.save({ id: fieldName, encryptedData });
  };

  return (
    <div className="card card-transparent flex column w100 gap-medium">
      {/* FIRST NAME */}
      <Input
        onBlur={(e:any) => handleBlur(e, 'firstName')}
        value={clientFirstName}
        onChange={handleFirstNameChange}
        placeholder="Fornavn"
      />
      {/* LAST NAME */}
      <Input
        onBlur={(e:any) => handleBlur(e, 'lastName')}
        value={clientLastName}
        onChange={handleLastNameChange}
        placeholder="Etternavn"
      />
      {/* EMAIL */}
      <Input
        onBlur={(e:any) => handleBlur(e, 'email')}
        value={clientEmail}
        onChange={handleEmailChange}
        placeholder="Epostadresse"
      />
      {/* PHONE */}
      <PhoneInput
        onBlur={(e:any) => {
          handleBlur(e, 'phone');
        }}
        disableDropdown
        country="no"
        placeholder="Telefonnummer"
        inputStyle={{ ...inputStyle }}
        value={clientPhone}
        onChange={handlePhoneChange}
      />
      {/* POSTAL CODE */}
      <Input
        onBlur={(e:any) => handleBlur(e, 'postalCode')}
        value={clientPostalCode}
        onChange={handlePostalCodeChange}
        placeholder="Postnummer"
      />
      {/* PERSONAL NUMBER */}
      <Input
        onBlur={(e:any) => handleBlur(e, 'num')}
        value={clientPersonalNumber}
        onChange={handlePersonalNumberChange}
        placeholder="Personlige nummer"
      />
      <div className="mt-lg">
        <Button
          block
          onClick={handleCreateBooking}
          disabled={!isBookingAvailable}
        >
          Bestill timet
        </Button>
      </div>
    </div>
  );
};

export default BookingAdvancedForm;
