import Select from 'react-select'; 
import { useFetch } from '../../hooks/HookFetchListData';
import { useEffect, useState } from 'react';

export default function ComboboxPerson({ onPersonaIdChange ,id,suscri=false}) { // actualiza la firma para recibir el id y la función onPersonaIdChange
  
  
  const { data, loading } = useFetch( suscri? "http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiPerson/apiPerson.php/listPersonClient":
    "http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiPerson/apiPerson.php/listPersonClientActive"
  )
  const [selectedPersonaId, setSelectedPersonaId] = useState(null); 
  
  useEffect(() => {
    if (data.desError) {
      
    }else{
      setSelectedPersonaId(id? data.find(person => person.persona_id === id):null);
    }
  }, [data]);
    
  const handlePersonaChange = (selectedOption) => {
    setSelectedPersonaId(selectedOption.value);
    onPersonaIdChange(selectedOption.value);
    
  };

  if (!loading && data.desError){
    return(
      <p>{data.desError}</p>
      )
  }else if(id){
    const defaultValue = data.find(person => person.persona_id === id);
   
    const options = data.map((person) => ({ value: person.persona_id, label: `${person.persona_ci}-${person.persona_nombre} ${person.persona_apellido}` }));

    return (
      <Select
        placeholder="Seleccione un usuario"
        options={options}
        defaultValue={defaultValue && { value: defaultValue.persona_id, label: `${defaultValue.persona_ci}-${defaultValue.persona_nombre} ${defaultValue.persona_apellido}` }}
        value={options.find(option => option.value === defaultValue.persona_id)}         
        onChange={handlePersonaChange}
      />
    );
  }else{
    const options = data.map((person) => ({ value: person.persona_id, label: `${person.persona_ci}-${person.persona_nombre} ${person.persona_apellido}` }));

    return (
      <Select
        placeholder="Seleccione un usuario"
        options={options}
        onChange={handlePersonaChange}
      />
    );
  }
}
