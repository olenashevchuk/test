import wrap from './wrap'

/* Wrapping the put method of the database object with a function that returns a promise. */
const putPromise = wrap('put')

export default putPromise
