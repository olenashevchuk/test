/**
 * Remove all newline characters from a string
 * @param str - The string to be modified.
 * @returns The string without the newline characters.
 */
function removeLines(str) {
  return str.replace('\n', '')
}

export default removeLines
