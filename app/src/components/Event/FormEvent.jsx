
import React, { useEffect ,useState} from "react";
import { Form, Button,Modal } from "react-bootstrap";
import {Formik, ErrorMessage } from 'formik';
import { useFetchSendData } from "../../hooks/HookFetchSendData";
import ComboboxPersonaEvento from "./ComboboxPersonaEvento";
import ComboboxPlacas from "./ComboboxPlacas";
import ComboboxTipoEvento from "./ComboboxTipoEvento";
import "./Event.css";

const FormEvent = ({asunto,cancelar, evento,cargar}) => {

  const [textareaEnabled, setTextareaEnabled] = useState(false);
  const [checked, setChecked] = useState(false);
  const handleCheckboxChange = () => {
    setTextareaEnabled(!textareaEnabled);
    setChecked(!checked);
    
  };

  const {data,fetchData} = useFetchSendData();
  
  //añadidas new


  const [selectedVehicleId, setSelectedVehicleId] = useState(
    evento ? evento.vehiculo_id : null
  );

  const [selectedRefTypeEventId, setSelectedTypeEventId] = useState(
    evento ? evento.evento.referencia_valor : null
  );


  const handleVehicleIdChange = (vehicleId) => {
    setSelectedVehicleId(vehicleId);
  };

  const handleTypeEventIdChange = (referenciaId) => {
    setSelectedTypeEventId(referenciaId);
  
  };
  //------------
  
  useEffect(() => {
  

  }, [data]);

  return (
    <Formik
    initialValues={
      evento? {
        idPerson : evento.vehiculo_persona_id,
        idVehicle :  evento.vehiculo_id,
        typeEvent :  evento.evento_tipo,
        alarmEvent : evento.evento_alarma,
        descriptionEvent : evento.evento_descripcion,
        registerUser : evento.propietario
      }:{
        idPerson : '',
        idVehicle :  '',
        typeEvent :  '',
        alarmEvent : `${!checked}`,
        descriptionEvent : '',
        registerUser : 'harex'
      }}
    
    validate={values => {
      const errors = {};

        if(!selectedVehicleId){
            errors.idVehicle ='Seleccione una placa porfavor';
        }

        if(!selectedRefTypeEventId){
            errors.typeEvent ='Seleccione el tipo de evento porfavor';
        }

        if(textareaEnabled){
            if(!values.descriptionEvent){
              errors.descriptionEvent ='El campo es requerido';
            }
        }
      return errors;
    }}
    

    onSubmit={async (values) => {
        values.idPerson = selectedVehicleId.vhP;
        values.idVehicle = selectedVehicleId.vhV;
        values.typeEvent = selectedRefTypeEventId;
         await fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiEvent/apiEvent.php/insertEvent',values);
        
      
        cargar()
        cancelar()
        

    }
    }

    >

      {({values,errors,handleBlur,handleChange,handleSubmit})=>(
        <Form  className="container">
            
            <Form.Group className="inputGroup" controlId="idVehicle">
                <Form.Label className="text-left">Placas Asociadas</Form.Label>
                <ComboboxPlacas
                    name="idVehicle"
                    onVehicleIdChange={handleVehicleIdChange}
                    onBlur={handleBlur}
                />
            </Form.Group>
            <ErrorMessage name="idVehicle" component={()=>(<div className="text-danger">{errors.idVehicle}</div>)}></ErrorMessage>
            
            <Form.Group className="inputGroup" controlId="typeEvent">
                <Form.Label className="text-left">Tipo de evento</Form.Label>
                <ComboboxTipoEvento
                    referenciaObjeto = {{tableNameReference:"evento",nameSpaceReference:"evento_tipo"}}
                    // defaultValor={evento? {value:evento.vehiculo_estado,label:evento.vehiculoestado}:null}
                    onReferenciaIdChange={handleTypeEventIdChange}
                />
            </Form.Group>
            <ErrorMessage name="typeEvent" component={()=>(<div className="text-danger">{errors.typeEvent}</div>)}></ErrorMessage>
              
            <Form.Check
                    className="text-left checkAlert"
                    inline
                    type="checkbox"
                    label="Alerta"
                    checked={textareaEnabled}
                    onChange={handleCheckboxChange}
                    id={"inline-checkbox"}
                />

            <Form.Group className="inputGroup" controlId="descriptionEvent">
                <Form.Label className="text-left">Descripción del Evento</Form.Label>
                <Form.Control type="descriptionEvent"
                    rows={3}
                    as="textarea"
                    name="descriptionEvent"
                    onChange={handleChange}
                    onBlur={handleBlur} 
                    value={values.descriptionEvent} 
                    disabled={!textareaEnabled}
                />
            </Form.Group>
            <ErrorMessage name="descriptionEvent" component={()=>(<div className="text-danger">{errors.descriptionEvent}</div>)}></ErrorMessage>
            
            <br/>
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

export default FormEvent;
