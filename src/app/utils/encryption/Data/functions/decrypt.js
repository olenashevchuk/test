/**
 * It takes a data array and a private key and returns the decrypted data
 * @param data - The data to be decrypted.
 * @param privateKey - The private key to use for decryption.
 * @returns An array of bytes.
 */
const decrypt = async (data, privateKey) => new Uint8Array(
  await window.crypto.subtle.decrypt(
    {
      name: 'RSA-OAEP',
      // label: Uint8Array([...]) //optional
    },
    privateKey, // from generateKey or importKey above
    data, // ArrayBuffer of the data
  ),
);

export default decrypt;
