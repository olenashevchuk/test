import ab2str from './ab2str'

const exportPK = async (key) => {
  /* The below code is exporting a public key from the browser's crypto API. */
  const exported = await window.crypto.subtle.exportKey('spki', key)

  /* USE FOR PRIVATE KEY */
  // const exported = await window.crypto.subtle.exportKey('pkcs8', key)

  /* Converting the exported object into a string. */
  const exportedAsString = ab2str(exported)

  /* Converting the string to base64. */
  const exportedAsBase64 = window.btoa(exportedAsString)

  /* Converting the exported key into a string. */
  const pemExported = `-----BEGIN PUBLIC KEY-----\n${exportedAsBase64}\n-----END PUBLIC KEY-----`

  return pemExported
}

export default exportPK
