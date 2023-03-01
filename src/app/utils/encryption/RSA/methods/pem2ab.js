import b2ab from './b2ab'
import removeLines from './removeLines'

/**
 * Convert a PEM format public key to an array of bytes
 * @param pem - The PEM-encoded public key.
 * @returns The public key in the form of a byte array.
 */
function pem2ab(pem) {
  /* Removing the lines from the PEM file. */
  var b64Lines = removeLines(pem)

  /* Removing the prefix from the base64 string. */
  var b64Prefix = b64Lines.replace('-----BEGIN PUBLIC KEY-----', '')

  /* Removing the last line of the base64 encoded public key. */
  var b64Final = b64Prefix.replace('-----END PUBLIC KEY-----', '')

  return b2ab(b64Final)
}

export default pem2ab
