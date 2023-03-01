/**
 * It takes a method name and returns a function that wraps the method with a Promise
 * @param methodName - The name of the method to wrap.
 * @returns A promise.
 */
function wrap(methodName) {
  return function () {
    /* The below code is creating a variable called objectStore and assigning it to the first argument
    in the arguments array. */
    const [objectStore, ...etc] = arguments

    /* "return a Promise that resolves to the result of the objectStore[methodName](...etc) request".
    The above code is a bit long, but it's a very common pattern. */

    return new Promise((resolve, reject) => {
      /* Creating a request object that will be used to access the object store. */
      const request = objectStore[methodName.toString()](...etc)

      /* The above code is requesting the data from the database and then resolving the promise with
      the data. */
      request.onsuccess = () => resolve(request.result)

      /* This code is adding an error handler to the request object. */
      request.onerror = reject
    })
  }
}

export default wrap
