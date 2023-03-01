const generateKeys = async () => {
  /* Generate a key pair using the RSA-OAEP algorithm, with a 4096-bit modulus and SHA-256 hash. */
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      // Consider using a 4096-bit key for systems that require long-term security
      modulusLength: 4096,
      /* Creating a public exponent of 65537. */
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256'
    },
    false,
    ['encrypt', 'decrypt']
  )

  return keyPair
}

export default generateKeys
