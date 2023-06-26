
import React, { useEffect ,useState} from "react";
import { Form, Button,Modal } from "react-bootstrap";
import {Formik, ErrorMessage } from 'formik';
import { useFetchSendData } from "../../hooks/HookFetchSendData";
import ComboboxPerson from "../ComboboxPerson/ComboboxPerson";
import "./Vehicle.css"
//import ComboboxReferences from "../ComboboxReferences/ComboboxReferences";

const Formulario = ({asunto,cancelar, vehiculo}) => {

  const {data,fetchData} = useFetchSendData();
  
  //añadidas new

  const [errorDuply, seterrorDuply] = useState(null);

  const [selectedPersonaId, setSelectedPersonaId] = useState(
    vehiculo ? vehiculo.persona_id : null
  );


  const handlePersonaIdChange = (personaId) => {
    setSelectedPersonaId(personaId);
  };

  
  //------------
  
  useEffect(() => {
  
    if (data.desError === "Inserción fallida, ya existe la placa") {
     
      seterrorDuply(data.desError);
    }else if (data.desError === "Cambios realizados con exito" || data.desError === "Inserción exitosa"){
      cancelar();
    }
  }, [data, cancelar]);

  return (
    <Formik
    initialValues={
      vehiculo? {
      idVehicle: vehiculo.vehiculo_id   ,
      idPerson: vehiculo.persona_id,
      statusVehicle: vehiculo.vehiculo_estado ,
      plateVehicle: vehiculo.vehiculo_placa ,
      modelVehicle: vehiculo.vehiculo_modelo ,
      colorVehicle: vehiculo.vehiculo_color ,
      }:{
      idPerson: '',
      statusVehicle: 6,
      plateVehicle: '',
      modelVehicle: '',
      colorVehicle: '',
      }}
    
    validate={values => {
      const errors = {};

      if(!values.plateVehicle){
        errors.plateVehicle ='El campo es requerido';
      }else if(values.plateVehicle.startsWith(" ")){
        errors.plateVehicle ='El campo no puede empezar con espacios';
      }else if(!/^(\d{3,4}-[A-Z]{3})$/i.test(values.plateVehicle)){
        errors.plateVehicle ='El formato debe ser XXX-AAA o XXXX-AAA ejemplo: 123-GHJ';
      }
      
      if(!values.modelVehicle){
        errors.modelVehicle ='El campo es requerido';
      }else if(values.modelVehicle.startsWith(" ")){
        errors.modelVehicle ='El campo no puede empezar con espacios'
      }
      else if(!/^[a-zA-ZñÑ]+$/i.test(values.modelVehicle)){
        errors.modelVehicle ='Solo se admite letras'
      }

      if(!values.colorVehicle){
        errors.colorVehicle ='El campo es requerido';
      }else if(values.colorVehicle.startsWith(" ")){
        errors.colorVehicle ='El campo no puede empezar con espacios'
      }
      else if(!/^[a-zA-ZñÑ]+$/i.test(values.colorVehicle)){
        errors.colorVehicle ='Solo se admite letras'
      }

      if(!selectedPersonaId){
        errors.idPerson ='Seleccione un elemento por favor';
      }
      return errors;
    }}
    

    onSubmit={async (values) => {

  
      if (vehiculo) {
        values.idPerson = selectedPersonaId;
        values.plateVehicle = values.plateVehicle.toUpperCase();
        await fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiVehicle/apiVehicle.php/editVehicle',values);
        await fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiVehicle/apiVehicle.php/editVehicle',values);
        await fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiVehicle/apiVehicle.php/editVehicle',values);
        await fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiVehicle/apiVehicle.php/editVehicle',values);
        

      } else {
        values.idPerson = selectedPersonaId;
        values.plateVehicle = values.plateVehicle.toUpperCase();
        await fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiVehicle/apiVehicle.php/insertVehicle',values);
        await fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiVehicle/apiVehicle.php/insertVehicle',values);
        

      }

    }
    }

    >

      {({values,errors,handleBlur,handleChange,handleSubmit})=>(
        <Form  className="container">

              <Form.Group className="inputGroup" controlId="plateVehicle text-left">
                <Form.Label className="text-left">Placa</Form.Label>
                <Form.Control 
                type="text" 
                name="plateVehicle"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.plateVehicle.toUpperCase()}
                />
              </Form.Group>
              <ErrorMessage name="plateVehicle" component={()=>(<div className="text-danger">{errors.plateVehicle}</div>)}></ErrorMessage>
              
              <Form.Group className="inputGroup" controlId="modelVehicle">
                <Form.Label className="text-left">Modelo</Form.Label>
                <Form.Control type="modelVehicle"
                name="modelVehicle"
                onChange={handleChange}
                onBlur={handleBlur} 
                value={values.modelVehicle.charAt(0).toUpperCase()+values.modelVehicle.slice(1)} 
                />
              </Form.Group>
              <ErrorMessage name="modelVehicle" component={()=>(<div className="text-danger">{errors.modelVehicle}</div>)}></ErrorMessage>
              
              <Form.Group className="inputGroup" controlId="colorVehicle">
                <Form.Label className="text-left">Color</Form.Label>
                <Form.Control type="text" 
                name="colorVehicle"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.colorVehicle.charAt(0).toUpperCase()+values.colorVehicle.slice(1)}
                />
              </Form.Group>
              <ErrorMessage name="colorVehicle" component={()=>(<div className="text-danger">{errors.colorVehicle}</div>)}></ErrorMessage>
              
              <Form.Group className="inputGroup" controlId="idPerson">
                <Form.Label className="text-left">Propietario</Form.Label>
                <ComboboxPerson 
                name="idPerson"
                id={vehiculo? vehiculo.persona_id:null}
                onPersonaIdChange={handlePersonaIdChange}
                onBlur={handleBlur}
                />
              </Form.Group>
              <ErrorMessage name="idPerson" component={()=>(<div className="text-danger">{errors.idPerson}</div>)}></ErrorMessage>
              
              {/* <Form.Group className="inputGroup" controlId="idPerson">
                <Form.Label className="text-left">Estado</Form.Label>
                <ComboboxReferences 
                referenciaObjeto = {{tableNameReference:"vehiculo",nameSpaceReference:"vehiculo_estado"}}
                defaultValor={vehiculo? {value:vehiculo.vehiculo_estado,label:vehiculo.vehiculoestado}:null}
                onReferenciaIdChange={handleReferenciaIdChange}
                />
              </Form.Group>
              <ErrorMessage name="idPerson" component={()=>(<div className="text-danger">{errors.idPerson}</div>)}></ErrorMessage>
               */}
      <br/>
      <div className="text-danger">{errorDuply? errorDuply :''}</div>
        <Modal.Footer >
          <Button variant="secondary" onClick={cancelar}>
            Cancelar
          </Button>
          <Button variant="success" className="button" onClick={handleSubmit}  >
            {asunto}
          </Button>
        </Modal.Footer>
    </Form>
      )}
    </Formik>
  );
};

export default Formulario;
