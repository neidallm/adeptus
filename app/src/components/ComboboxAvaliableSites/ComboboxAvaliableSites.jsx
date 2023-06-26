import Select from 'react-select'; 
import { useFetch } from '../../hooks/HookFetchListData';
import { useSend } from '../../hooks/HookList';
import { useEffect, useState } from 'react';
import { sendAndReceiveJson } from "../../hooks/HookFetchSendAndGetData";

export default function ComboboxAvaliableSites({ onSiteIdChange ,nro}) { 


  const [selectedSiteId, setSelectedSiteId] = useState(null); 
  const [sitos, setSitos] = useState([]); 
  
  const handleSiteChange = (selectedOption) => {
    setSelectedSiteId(selectedOption.value);
    onSiteIdChange(selectedOption.value);
    
  };

  const { data, loading, error }= useFetch("http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiConfiguracion/apiConfiguracion.php/listConfigurationNumSitios")

    useEffect(() => {
        if (!loading && data && data.length > 0) {
          sendAndReceiveJson(
            "http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiSubscription/apiSubscription.php/listDisponibles",
            {
              numberSities: data[0].configuracion_valor1,
            }
          ).then((responseData) => {
            setSitos(responseData);
          });
        }
      }, [loading, data]);


  if (!loading && data) {
    if (sitos.length==0) {
        return(
          <p>No existen sitios Disponibles,mil disculpas</p>
        );
    }else{

      
      const options = sitos.map((site) => ({ value: site.numeros, label: site.numeros }));
  
      return (
        <Select
          placeholder="Seleccione un número de parqueo"
          options={options}
          // defaultValue={defaultValue && { value: defaultValue.numeros, label: `${defaultValue.numeros}` }}
          defaultValue={nro && { value:nro, label: nro }}
          value={options.find(option => option.value === selectedSiteId)}         
          onChange={handleSiteChange}
        />
      );
    }
  }
}
