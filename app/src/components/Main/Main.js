import React, { useState } from 'react';
import Aside from '../Aside/Aside';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import DatosUser from '../DatosUser/DatosUser';
import { useFetch } from '../../hooks/HookFetchListData';
import { useFetchSendData } from '../../hooks/HookFetchSendData';

export const Main = () => {
  const [isFetched, setIsFetched] = useState(false); // Nuevo estado para controlar si la llamada ya se ha realizado

  const { fetchData } = useFetchSendData();
  const { data, loading, error } = useFetch(
    "http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiSubscription/apiSubscription.php/listSubscriptionActiveExpired"
  );

  if (!loading && !isFetched) {
    if (data.length !== 0 && !data.desError) {
     
      data.map((person) =>
        fetchData(
          "http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiSubscription/apiSubscription.php/changeStateSubscription",
          {
            idSubscription: person.suscripcion_id,
            statusSubscription: 27,
          }
        )
      );
      setIsFetched(true); // Actualiza el estado para evitar futuras llamadas
    } 
  }

  return (
    <div>
      {/* <Header></Header>
      <Aside></Aside> */}
      <DatosUser />
      
      

      
      {/* <Footer></Footer> */}
    </div>
  );
};