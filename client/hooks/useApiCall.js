import { useState } from 'react';

const useApiCall = (callFunc) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const handleApiCall = (params, callback = () => {}) => {
    setLoading(true);
    callFunc(params)
      .then((res) => {
        setLoading(false);
        setData(res || null);
        callback();
      })
      .catch((error) => {
        if (error?.response?.data?.message) {
          setData(error.response.data);
        }
        setLoading(false);
      });
  };

  const setDefaultValues = () => setData(null);

  return [handleApiCall, loading, data, setDefaultValues];
};

export default useApiCall;
