
import React, { useEffect ,useState} from "react";
import { Form, Button,Modal , Image} from "react-bootstrap";
import {Formik, ErrorMessage } from 'formik';
import { useFetchSendData } from "../../hooks/HookFetchSendData";
import ComboboxPerson from "../ComboboxPerson/ComboboxPerson";
import "./Subscription.css"
import ComboboxReferences from "../ComboboxReferences/ComboboxReferences";
import ComboboxAvaliableSites from "../ComboboxAvaliableSites/ComboboxAvaliableSites";
import ComboboxTarifa from "../ComboboxTarifa/ComboboxTarifa";
const FormularioStatus = ({asunto,cancelar, suscripcion,reftipo}) => {

  const {data,fetchData} = useFetchSendData();

  
  const [selectedReferenciaId, setSelectedReferenciaId] = useState(
    suscripcion ? suscripcion.suscripcion_estado : null
  );

  
  //------------HandlePersona
  
  const handleReferenciaIdChange = (referenciaId) => {
    console.log(referenciaId);
    setSelectedReferenciaId(referenciaId.value);
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
      idTarifa: '1',
      idPerson: '',
      statusSubscription: '',
      activationSubscription: '',
      expirationSubscription:'',
      numParkSubscription:''
      }}
    
    validate={values => {
      const errors = {};

      if(!selectedReferenciaId){
        errors.statusSubscription ='Seleccione un elemento porfavor';
      }
      
   
      return errors;
    }}
    

    onSubmit={async (values) => {
      console.log(values);
      if (suscripcion) {
        console.log("hola");
        console.log(values.statusSubscription);
        console.log(selectedReferenciaId);
        if (values.statusSubscription!=8 && selectedReferenciaId==8) {
          console.log("hola");
          await fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiHistoryPay/apiHistoryPay.php/insertHistoryPay',
          { idSubscription :  values.idSubscription,
            amountHistoryPay : suscripcion.tarifa_valor,
            totalHistoryPay : suscripcion.tarifa_valor,
            siteHistoryPay : suscripcion.suscripcion_numero_parqueo});
         
          }
          values.statusSubscription = selectedReferenciaId;
       //await fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiSubscription/apiSubscription.php/editSubscription',values);
       await fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiSubscription/apiSubscription.php/changeStateSubscription',{
        "idSubscription" : values.idSubscription,
        "statusSubscription" :  values.statusSubscription
      });
        cancelar();
    
      } 
    }}
    >

      {({values,errors,handleSubmit})=>(
        <Form  className="container">
          <br/>
          <Form.Group className="inputGroup" controlId="statusSubscription">
          <div className="row align-items-center">
          <Form.Label className="text-left col-sm-4">Estado</Form.Label>
            <div className="col-sm-8">
            <ComboboxReferences 
              referenciaObjeto = {{tableNameReference:"suscripcion",nameSpaceReference:"suscripcion_estado"}}
              defaultValor={suscripcion? {value:suscripcion.suscripcion_estado,label:suscripcion.referencia_valor}:null}
              onReferenciaIdChange={handleReferenciaIdChange}
              tipo={reftipo}

            />
            <ErrorMessage name="statusSubscription" component={()=>(<div className="text-danger">{errors.statusSubscription}</div>)}></ErrorMessage>
            </div>
          </div>
          </Form.Group>
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

export default FormularioStatus;
