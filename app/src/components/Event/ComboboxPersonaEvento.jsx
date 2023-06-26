import Select from 'react-select'; 
import { useFetch } from '../../hooks/HookFetchListData';
import { useState } from 'react';

export default function ComboboxPersonaEvento({ onPersonaIdChange ,id}) { // actualiza la firma para recibir el id y la función onPersonaIdChange

  const { data, loading } = useFetch(
    "http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiVehicle/apiVehicle.php/listVehicle"
  )
    const [selectedPersonaId, setSelectedPersonaId] = useState(null); 
    
  const handlePersonaChange = (selectedOption) => {
    setSelectedPersonaId(selectedOption.value);
    onPersonaIdChange(selectedOption.value);

  };

  if (!loading && data.desError ){
   return( <p>{data.desError}</p>);
  }else {
    const defaultValue = data.find(person => person.persona_id === id);
    const options = data.map((person) => ({ value: person.persona_id, label: person.propietario }));
    return (
      <div className="propietario">
        <Select
            placeholder="Seleccione al Cliente"
            options={options}
            defaultValue={defaultValue && { value: defaultValue.persona_id, label: `${defaultValue.propietario}` }}
            value={options.find(option => option.value === selectedPersonaId)}         
            onChange={handlePersonaChange}
        />
      </div>
    );
  }
}
