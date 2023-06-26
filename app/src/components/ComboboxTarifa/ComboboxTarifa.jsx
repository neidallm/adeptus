import Select from 'react-select'; 
import { useFetch } from '../../hooks/HookFetchListData';
import { useEffect, useState } from 'react';

export default function ComboboxTarifa({ onTarifaIdChange,id}) {

  const { data, loading } = useFetch(
    "http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiRate/apiRate.php/listRateActive"
  )
  const [selectedTarifa, setSelectedTarifa] = useState(null); 

  useEffect(() => {
    
    if (data.desError) {
      
    }else{
      setSelectedTarifa(id? data.find(tarifa => tarifa.tarifa_id === id):null);
    }
  }, [data]);
  
  const handleTarifaChange = (selectedOption) => {
    setSelectedTarifa(selectedOption.value);
    onTarifaIdChange(selectedOption.value);
    
  };

  if (!loading && data.desError) {
      return(
        <p>{data.desError}</p>
        )
  }else{
    

    const      defaultValue = data.find(tarifa => tarifa.tarifa_id === id);
    const options = data.map((tarifa) => ({ value: tarifa, label: `${tarifa.tarifa_nombre}` }));

    return (
      <Select
        placeholder="Seleccione una opción"
        options={options}
        defaultValue={defaultValue && { value: defaultValue, label: `${defaultValue.tarifa_nombre}` }}
        value={options.find(option => option.value === selectedTarifa)}         
        onChange={handleTarifaChange}
      />
    );

  }
}
