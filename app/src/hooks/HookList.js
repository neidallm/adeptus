import { useState, useEffect } from 'react';

export function useSend() {
 
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchData(url) {
    try {
      if ( url != null ) {
        const response = await fetch(url);
        
        const data = await response.json();
        
        setData(data);
        setLoading(false); 
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

//   useEffect(() => {
//     fetchData(null,null);
//   }, []);
  
  return { data, fetchData, error, setLoading };
}