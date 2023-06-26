
import React, { useEffect ,useState} from "react";
import { Form, Button,Modal , Image} from "react-bootstrap";
import {Formik, ErrorMessage } from 'formik';
import { useFetchSendData } from "../../hooks/HookFetchSendData";
import ComboboxPerson from "../ComboboxPerson/ComboboxPerson";
import "./Subscription.css"
import ComboboxReferences from "../ComboboxReferences/ComboboxReferences";
import ComboboxAvaliableSites from "../ComboboxAvaliableSites/ComboboxAvaliableSites";
import ComboboxTarifa from "../ComboboxTarifa/ComboboxTarifa";
const Formulario = ({asunto,cancelar, suscripcion}) => {

  const {data,fetchData} = useFetchSendData();
  useEffect(() => {
   
  }, [data]);


  const [selectedPersonaId, setSelectedPersonaId] = useState(
    suscripcion ? suscripcion.persona_id : null
  );



  const [selectedSiteId, setSelectedSiteId] = useState(
    suscripcion ? suscripcion.suscripcion_numero_parqueo : null
  );

  const [selectedTarifa, setSelectedTarifa] = useState(
    suscripcion ? suscripcion.tarifa_id: null);

  //------------HandlePersona
  const handlePersonaIdChange = (personaId) => {
    setSelectedPersonaId(personaId);
  };

 
  
  //------------HandleSitio

  const handleSiteIdChange = (siteId) => {
    setSelectedSiteId(siteId);
  };

  const handleTarifaChange = (tarifa) => {
  
    setSelectedTarifa(tarifa.tarifa_id);
  };


  return (
    <Formik
    initialValues={
      suscripcion? {
      idSubscription:         suscripcion.suscripcion_id   ,
      idTarifa:               suscripcion.tarifa_id ,
      idPerson:               suscripcion.persona_id,
      statusSubscription:     suscripcion.suscripcion_estado ,
      activationSubscription: suscripcion.suscripcion_activacion ,
      expirationSubscription: suscripcion.suscripcion_expiracion ,
      numParkSubscription:    suscripcion.suscripcion_numero_parqueo ,
      }:{
      idTarifa: '',
      idPerson: '',
      statusSubscription: '',
      activationSubscription: '',
      expirationSubscription:'',
      numParkSubscription:''
      }}
    
    validate={values => {
      const errors = {};

      if(!selectedPersonaId){
        errors.idPerson ='Seleccione un elemento porfavor';
      }

      if(!selectedSiteId){
        errors.numParkSubscription ='Seleccione un elemento porfavor';
      }

      if (!selectedTarifa) {
        errors.idTarifa = "Seleccione un elemento porfavor"
      }

      
    
      return errors;
    }}
    

    onSubmit={async (values) => {
  
      if (suscripcion) {
        values.idPerson = selectedPersonaId;
        values.numParkSubscription = selectedSiteId;
        values.idTarifa = selectedTarifa;
      
        fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiSubscription/apiSubscription.php/editSubscription',values);
        cancelar();
        
      } else {
        values.idPerson = selectedPersonaId;
        values.numParkSubscription = selectedSiteId;
        values.idTarifa = selectedTarifa;
       
        fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiSubscription/apiSubscription.php/insertSubscription',values);
        cancelar();
      }

    }
    }

    >

      {({values,errors,handleBlur,handleChange,handleSubmit})=>(
        <Form  className="container">
          <br/>
          <Form.Group className="inputGroup" controlId="idPerson">
          <div className="row align-items-center">
          <Form.Label className="text-left col-sm-4">Cliente</Form.Label>
            <div className="col-sm-8">
              <ComboboxPerson 
                id={suscripcion ? suscripcion.persona_id : null}
                onPersonaIdChange={handlePersonaIdChange}
                suscri={true}
              />
              <ErrorMessage name="idPerson" component={()=>(<div className="text-danger">{errors.idPerson}</div>)}></ErrorMessage>
            </div>
          </div>
          </Form.Group>
          <br/>
          <Form.Group className="inputGroup" controlId="numParkSubscription">
          <div className="row align-items-center">
          <Form.Label className="text-left col-sm-4">Número de Parqueo</Form.Label>
            <div className="col-sm-8">
            <ComboboxAvaliableSites
              nro = {suscripcion? suscripcion.suscripcion_numero_parqueo:null}
              onSiteIdChange = {handleSiteIdChange}
            />
            <ErrorMessage name="numParkSubscription" component={()=>(<div className="text-danger">{errors.numParkSubscription}</div>)}></ErrorMessage>
            </div>
          </div>
          </Form.Group>

          <br/>
          <Form.Group className="inputGroup" controlId="idTarifa">
            <div className="row align-items-center">
            <Form.Label className="text-left col-sm-4">Tarifa</Form.Label>
                <div className="col-sm-8">
                <ComboboxTarifa 
                    id={suscripcion ? suscripcion.tarifa_id : null}
                    onTarifaIdChange={handleTarifaChange}
                />
                </div>
            </div>
          </Form.Group>
          <ErrorMessage name="idTarifa" component={()=>(<div className="text-danger">{errors.idTarifa}</div>)}></ErrorMessage>

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

export default Formulario;
