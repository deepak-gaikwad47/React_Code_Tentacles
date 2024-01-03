import { useState, useEffect } from 'react';

const useApiCall = () => {
  const baseUrl = 'http://codetentacles-006-site36.htempurl.com/api/api/';
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const callApi = async (endpoint, method = 'GET', requestBody = null, token = null) => {
    setLoading(true);
    setError(null);

    const url = `${baseUrl}${endpoint}`;

    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (token) {
        options.headers['token'] = token;
      }

      if (method !== 'GET' && requestBody) {
        options.body = JSON.stringify(requestBody);
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      setError(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, callApi };
};

export default useApiCall;
