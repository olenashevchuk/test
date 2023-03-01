/**
 * It takes a data array and a public key, and returns an encrypted array
 * @param data - The data to be encrypted.
 * @param keys - The public key to encrypt with.
 * @returns An arrayBuffer of the encrypted data.
 */
const encrypt = (data, publicKey) => window.crypto.subtle.encrypt(
  {
    name: 'RSA-OAEP',
    // label: Uint8Array([...]) //optional
  },
  publicKey, // from generateKey or importKey above
  data, // ArrayBuffer of data you want to encrypt
);

export default encrypt;
