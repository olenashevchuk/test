/**
 * Convert a buffer to a string
 * @param buf - the buffer to be converted
 * @returns The string representation of the buffer.
 */
function ab2str(buf) {
  /* Converting the binary data into a string. */
  return String.fromCharCode.apply(null, new Uint8Array(buf))
}

export default ab2str
