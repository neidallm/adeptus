export async function sendAndReceiveJson(url, requestData) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        
        body: JSON.stringify(requestData)
      });
  
      if (!response.ok) {
        throw new Error('Error al enviar la solicitud');
      }
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }
