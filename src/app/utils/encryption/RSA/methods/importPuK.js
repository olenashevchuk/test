import pem2ab from './pem2ab'

/**
 * It imports a public key from a PEM format into the Web Crypto API
 * @param publicKey - The public key in PEM format.
 * @returns A promise that resolves to a CryptoKey object.
 */
const importPuK = (publicKey) => {
  /* We use the `importKey` method to import the public key from the PEM format into the `subtle`
  object. */
  return window.crypto.subtle.importKey(
    'spki',
    pem2ab(publicKey),
    {
      name: 'RSA-OAEP',
      hash: 'SHA-256' // or SHA-512
    },
    true,
    ['encrypt']
  )
}

export default importPuK
