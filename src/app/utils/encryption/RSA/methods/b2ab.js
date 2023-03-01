/**
 * It takes a base64 string and converts it to an ArrayBuffer
 * @param b64 - The base64 string to decode.
 * @returns An array of bytes.
 */
function base64ToArrayBuffer(b64) {
  /* The below code is converting a base64 string to a byte string. */
  var byteString = window.atob(b64)

  /* Creating a new array of bytes from the string. */
  var byteArray = new Uint8Array(byteString.length)

  /* The below code is converting a string to an array of bytes. */
  for (var i = 0; i < byteString.length; i++) {
    byteArray[parseInt(i)] = byteString.charCodeAt(i)
  }

  return byteArray
}

export default base64ToArrayBuffer
