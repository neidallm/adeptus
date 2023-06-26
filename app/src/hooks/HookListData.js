import { useState, useEffect } from 'react';

export function useFetch(url1=null) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  async function fetchData(url) {
      try {
          if (url!=null) {
            const response = await fetch(url);
            const data = await response.json();
            
            setData(data);
            setLoading(false);  
          }else if(url1 != null){
            const response = await fetch(url1);
            const data = await response.json();
            
            setData(data);
            setLoading(false);
          }
        
    } catch (error) {
        setError(error);
        setLoading(false);
        
    } 
}

useEffect(() => {
    fetchData(null);
  }, []);

  
  

  return { data,fetchData ,loading, error };
}

