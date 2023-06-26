import React from "react";
import Select from "react-select";
import { useState } from "react";
import "./ComboboxReferences.css";
//import { useFetchSendData } from "../../hooks/HookFetchSendData";

import { sendAndReceiveJson } from "../../hooks/HookFetchSendAndGetData";
import { useEffect } from "react";

export default function ComboboxReferences({ defaultValue,onChange, id}) {
  
  const [tar, setTar] = useState([])
  const [loading, setLoading] = useState(true)
  
useEffect(() => {
  sendAndReceiveJson("http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiReference/apiReference.php/listReferences", {
    tableNameReference: "persona",
    nameSpaceReference: "persona_tipo"
  }).then((responseData) => {
    setTar(responseData);
    setLoading(false);
  });
}, []);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    onChange(option);
  };


  if (!loading) {
    //const defaultValue = tar && tar.find((defVal) => defVal.referencia_id === id); // Agrega una verificación de tar
    
    const ref = tar.map((opcion) => ({
      value: opcion.referencia_id,
      label: opcion.referencia_valor,
    }));
    const defaultValue = ref.find((def) => def.value === id )

    return (
      <div className="comboBoxGroup">
        <Select
          className="selectRef"
          placeholder="Seleccione el Tipo Persona" 
          options={ref}
          defaultValue={defaultValue && { value: defaultValue.value, label: defaultValue.label}}
          value={ref.find(option => option.value === selectedOption)}
          onChange={handleOptionChange}
        />
      </div>
    );
  }
}