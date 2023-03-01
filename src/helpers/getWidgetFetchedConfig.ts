const getWidgetFetchedConfig = async (webTippsConfigurationId: string) => {
  const response = await fetch(
    `https://us-central1-tipps-dev-27fdb.cloudfunctions.net/getWidgetConfig`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ webTippsConfigurationId }),
    }
  );
  const responseData = await response.json();
  const { data } = responseData || {};
  return data;
};
export default getWidgetFetchedConfig