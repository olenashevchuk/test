import { useEffect, useState } from 'react';
import { PROD_API_URL } from '../../../../constants/apiURLs';

type promiseToArr = [any[], boolean, string]

const useGetClinics = (): promiseToArr => {
  // const { currentTreatment } = useWidget();

  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);

    const fetchClinics = async () => {
      try {
        const { data } = await (await fetch(`${PROD_API_URL}/clinics`)).json();
        setClinics(data.clinics);
        setLoading(false);
      } catch (err: any) {
        setError(JSON.stringify(err));
        setLoading(false);
      }
    };

    fetchClinics();
  }, []);

  return [clinics, loading, error];
};

export default useGetClinics;
