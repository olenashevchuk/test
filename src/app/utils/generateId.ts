// generate 3 random numbers, convert to string (using 36 numeral system)
// and return concatenated string
const generateId = () => (Math.random() + 1).toString(36)
 + (Math.random() + 7).toString(36) + (Math.random() + 4).toString(36);

export default generateId;
