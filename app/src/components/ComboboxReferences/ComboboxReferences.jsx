import React, { useEffect , useState} from "react";
import Select from "react-select";
import "./ComboboxReferences.css";
import { useFetchSendData } from "../../hooks/HookFetchSendData";

export default function ComboboxReferences({onReferenciaIdChange,defaultValor,referenciaObjeto,tipo=0, isReadOnly }){ 
    const {data, fetchData} = useFetchSendData();
    const [ref,setRef]=useState([]);
    useEffect(() => {
        if (tipo==1) {
            fetchData("http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiReference/apiReference.php/listReferencesRequest",referenciaObjeto);

        }else if(tipo==2){
            fetchData("http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiReference/apiReference.php/listReferencesSubscription",referenciaObjeto);

        }else{
            fetchData("http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiReference/apiReference.php/listReferences",referenciaObjeto);
        }
    }, []);
    
    useEffect(()=>{
        setRef(data);
        if (data && Array.isArray(data)) { 
            setRef(data.map((dato) => ({ value: dato.referencia_id, label: `${dato.referencia_valor} ` })));
        }
    },[data]);
    
    const handleReferenciaChange = (selectedOption) => {
        setSelectedReferenciaId(selectedOption);
        onReferenciaIdChange(selectedOption);
    };
    
    const [selectedReferenciaId, setSelectedReferenciaId] = useState(null); 

    return(
            <Select
                placeholder="Seleccione un estado"
                options={ref}
                defaultValue={defaultValor}
                value={ref && Array.isArray(ref)?ref.find(option => option.value === selectedReferenciaId):''}
                onChange={handleReferenciaChange}
                isDisabled={isReadOnly }
            />
            
          
    )
    
}