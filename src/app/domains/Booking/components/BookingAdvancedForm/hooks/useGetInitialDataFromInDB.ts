import Data from '../../../../../utils/encryption/Data';
import InDB from '../../../../../utils/encryption/InDB';
import RSA from '../../../../../utils/encryption/RSA';
import { useEffect } from 'react';

const useGetInitialDataFromInDB = ({
  setClientFirstName,
  setClientLastName,
  setClientEmail,
  setClientPhone,
  setClientPostalCode,
  setClientPersonalNumber,
}:any) => {
  const generateKeyPairAndSaveIntoInDB = async () => {
    const indexedDB = new InDB('id');
    const keyPair = await indexedDB.findById('1');
    if (keyPair) return true;
    const generatedKeyPair = await RSA.keys.generate();
    indexedDB.save({ id: '1', keyPair: generatedKeyPair });
    return true;
  };
  const useGetDecryptedDataFromInDB = async (fieldName:string) => {
    const indexedDB = new InDB('id');
    const keyPair = await indexedDB.findById('1');
    const encryptedData = await indexedDB.findById(fieldName);
    const decryptedData = await Data.decrypt(
      encryptedData.encryptedData,
      keyPair.keyPair.privateKey,
    );
    const decoder = new TextDecoder();
    return decoder.decode(decryptedData);
  };
  useEffect(() => {
    const fieldsWithSetterArray = [
      { fieldName: 'firstName', setter: setClientFirstName },
      { fieldName: 'lastName', setter: setClientLastName },
      { fieldName: 'email', setter: setClientEmail },
      { fieldName: 'phone', setter: setClientPhone },
      { fieldName: 'postalCode', setter: setClientPostalCode },
      { fieldName: 'num', setter: setClientPersonalNumber },
    ];

    const fetchDataFromInDB = async () => {
      const isKeysGenerated = await generateKeyPairAndSaveIntoInDB();
      if (isKeysGenerated) {
        const decodingFieldsPromises = await Promise.allSettled(
          fieldsWithSetterArray.map(({ fieldName }) => useGetDecryptedDataFromInDB(fieldName)),
        );
        decodingFieldsPromises.forEach(({ value }:any, index) => {
          if (value) fieldsWithSetterArray[index].setter(value);
        });
      }
    };

    fetchDataFromInDB();
  }, []);
};
export default useGetInitialDataFromInDB;
