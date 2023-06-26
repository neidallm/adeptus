import Select from 'react-select'; 
import { useFetch } from '../../hooks/HookFetchListData';
import { useState } from 'react';

export default function ComboboxPlacas({ onVehicleIdChange ,id}) { // actualiza la firma para recibir el id y la función onPersonaIdChange

  const { data, loading } = useFetch(
    "http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiVehicle/apiVehicle.php/listVehicle"
  )
    const [selectedVehicleId, setSelectedVehicleId] = useState(null);

    const handleVehicleChange = (vehSelectedOption) => {
        setSelectedVehicleId(vehSelectedOption.value);
        onVehicleIdChange(vehSelectedOption.value);

    };

  if (!loading && data.desError) {
    return(<p>{data.desError}</p>);
  }else{
    const defaultValue = data.find(veh => veh.vehiculo_id === id);
    const optionsVehicle = data.map((veh) => ({value:{ vhV:veh.vehiculo_id, vhP:veh.persona_id}, label: `${veh.vehiculo_placa} - ${veh.propietario}`}));
    return (
      <div className="propietario">
        <Select 
            options={optionsVehicle}
            value={optionsVehicle.find(option => option.value === selectedVehicleId)}  
            defaultValue={defaultValue && { value: defaultValue.vehiculo_id, label: defaultValue.vehiculo_placa }}
            onChange={handleVehicleChange}
        />
      </div>
    );
  }
}
