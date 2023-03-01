import { useEffect, useState } from 'react';

import { PROD_API_URL } from '../../../../constants/apiURLs';

type promiseToArr = [any[], boolean, string]

const useGetTreatments = ():promiseToArr => {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);

    const fetchTreatments = async () => {
      try {
        const { data } = await (await fetch(`${PROD_API_URL}/treatments`)).json();
        setTreatments(data.treatments);
        setLoading(false);
      } catch (err: any) {
        setError(JSON.stringify(err));
        setLoading(false);
      }
    };

    fetchTreatments();
  }, []);

  return [treatments, loading, error];
};

export default useGetTreatments;
