const getErrorMessage = (error: any) => {
  let message;
  if (error instanceof Error) message = error.message;
  else message = String(error);

  return message;
};

export default getErrorMessage;
