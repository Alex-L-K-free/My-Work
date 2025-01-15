// frontend/src/hooks/useFetchData.js
import { useState, useEffect } from 'react';

const useFetchData = (fetchFunction, token) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await fetchFunction(token);
        setData(response.data);
      } catch (err) {
        setError('Ошибка при загрузке данных');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [fetchFunction, token]);

  return { data, error, loading };
};

export default useFetchData;