const addProtocolToUrl = (url:string) => {
  // Remove any spaces in the URL and add https:// if ulr doesn't have it
  if (url?.replace(/\s/g, '')?.length) {
    const protocolRegex = /^(?!https?:\/\/)/i
    return (protocolRegex.test(url) ? 'https://' + url : url).replace(/\s/g, '')
  }
  return null
}
export default addProtocolToUrl
