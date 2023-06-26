import React, { useEffect, useState } from "react";
import { Form, Button,Modal,Image ,Spinner, Alert} from "react-bootstrap";
import {Formik, ErrorMessage } from 'formik';
import { useFetchSendData } from "../../hooks/HookFetchSendData";
import "./Tarifa.css"
import ComboboxReferences from "../ComboboxReferences/ComboboxReferences";

const Formulario = ({asunto,cancelar, tarifa = null,listaT=null}) => {
console.log(tarifa);

  const {data,fetchData} = useFetchSendData();



  useEffect(() => {
   
  }, [data]);

  
  
  
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loadin, setLoadin] = useState(false);
  const [loadingImage, setloadingImage] = useState(false);
  const [estadoRef, setestadoRef] = useState(
    tarifa? tarifa.tarifa_estado :null
    );
    const [mensaje, setMensaje] = useState(null);
    const [caso, setCaso] = useState(null);
    const [show, setShow] = useState(false);
    const [showA, setShowA] = useState(false);

  


    
  useEffect(() => {
    if (tarifa) {
      if (tarifa.tarifa_estado == 19 && estadoRef.value == 20) {
        if (obtenerFecha(tarifa.tarifa_expiracion) < obtenerFechaFormateada()) {
          
           setMensaje('La tarifa actualmente se encuentra expirada,puede proceder sin problema');
           setCaso(2);
           setShow(false);
  
         }else {
           setMensaje('La tarifa actualmente se encuantra vigente, esta seguro de deshabilitarla');
           setCaso(1);
          }
      }else if(tarifa.tarifa_estado == 19 && estadoRef.value == 19){
        setCaso(null);
        setMensaje(null);
        setShow(false);
      }
    }
  }, [estadoRef])



  const handleReferenciaIdChange =(estado)=>{
    setestadoRef(estado);
  }


  const  obtenerFecha = (stringFechaHora) =>{
    const fechaHora = new Date(stringFechaHora);
    const fecha = fechaHora.toISOString().split('T')[0];
    return fecha;
  }

  function obtenerFechaFormateada() {
    var fecha = new Date();
    var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    var fechaFormateada = fecha.toLocaleDateString(undefined, options).split('/').reverse().join('-');
    return fechaFormateada;
  }
  
  
  //-------------------------imagenes------------------
  
  const handleCargarImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
      setImage(reader.result);
      setImageFile(file);
    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);

  };

  return (
    <>
    <Formik
    initialValues={
      tarifa? {
      idRate:             tarifa.tarifa_id   ,
      statusRate:         tarifa.tarifa_estado ,
      nameRate:           tarifa.tarifa_nombre ,
      valueRate:          tarifa.tarifa_valor ,
      routeRate:          tarifa.tarifa_ruta ,
      dateExpirationRate: tarifa.tarifa_expiracion
      }:{
        statusRate:19,
        nameRate:  '' ,
        valueRate: '' ,
        routeRate: '' ,
        dateExpirationRate:'',
      }}
    
    validate={values => {
      const errors = {};


      if (!tarifa) {
        if(!values.nameRate ){
          errors.nameRate ='El campo es requerido';
        }else if(values.nameRate.startsWith(" ") ){
          errors.nameRate ='El campo no puede empezar con espacios';
        }else if(!/^[A-Za-z]+$/i.test(values.nameRate) ){
          errors.nameRate ='Solo se admite una palabra';
        }
  
        if (!values.dateExpirationRate ) {
          errors.dateExpirationRate ='El campo es requerido';
        }
  
        if(!values.valueRate ){
          errors.valueRate ='El campo es requerido';
        }else if(values.valueRate.startsWith(" ") ){
          errors.valueRate ='El campo no puede empezar con espacios';
        }else if(!/^[0-9]+$/i.test(values.valueRate) ){
          errors.valueRate ='El campo solo admite números';
        }
  
        if(tarifa==null && !image){
          errors.routeRate ='El campo es requerido';
        }
        if(listaT!==null || listaT.length!==0){
          let elementos = listaT.filter((e)=>e.tarifa_nombre==values.nameRate);
          console.log(elementos.length!=0,'pasa');
          if (elementos.length!=0) {
            setShowA(true);
            let resp = elementos.find((e)=>obtenerFecha(e.tarifa_expiracion)===values.dateExpirationRate);
            if (resp) {
              errors.dateExpirationRate = `Ya existe plazo: ${values.nameRate} con la misma fecha de expiración`;
            }
          }else{

            setShowA(false);
          }
        }
      }


   
      return errors;
    }}
    

    onSubmit={async (values) => {
      
      if (tarifa) {
        // if (imageFile!=null) {
        //     const dataImage = new FormData();
        //     dataImage.append("file", imageFile);
        //     dataImage.append("upload_preset", "images");
        //     setLoadin(true);
        //     const res = await fetch("https://api.cloudinary.com/v1_1/dxqlkqb68/image/upload",{
        //       method: 'POST',
        //       body: dataImage,
        //     });

        //     const file =await res.json();
        //     values.routeRate = file.secure_url;

        //   }
        if (caso!=null) {
          values.statusRate = estadoRef.value;
          const changeStatus = {
            idRate:     values.idRate,
            statusRate: values.statusRate
          }
          setLoadin(true);
          await  fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiRate/apiRate.php/changeStateRate',changeStatus);
          setLoadin(false);
          cancelar();
        }
        
      } else {
        const dataImage = new FormData();
          dataImage.append("file", imageFile);
          dataImage.append("upload_preset", "images");

          setLoadin(true);
          const res = await fetch("https://api.cloudinary.com/v1_1/dxqlkqb68/image/upload",{
            method: 'POST',
            body: dataImage,
          });
          const file =await res.json();

          values.routeRate = file.secure_url;
          
       
          await fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiRate/apiRate.php/insertRate',values);
          setLoadin(false);
          cancelar();
        
      }

    }
    }

    >

      {({values,errors,handleBlur,handleChange,handleSubmit})=>(
        <Form  className="container">
          {tarifa?(
            <>

            <Form.Group className="inputGroup" controlId="idPerson">
                <Form.Label className="text-left">Estado</Form.Label>
                <ComboboxReferences
                referenciaObjeto = {{tableNameReference:"tarifa",nameSpaceReference:"tarifa_estado"}}
                defaultValor={tarifa? {value:tarifa.tarifa_estado,label:tarifa.estadotarifa}:null}
                onReferenciaIdChange={handleReferenciaIdChange}
                />
              </Form.Group>
            <ErrorMessage name="idPerson" component={()=>(<div className="text-danger">{errors.idPerson}</div>)}></ErrorMessage>
               
            </>
          ):(

          <>
          <Form.Group className="inputGroup" controlId="nameRate text-left">
            <Form.Label className="text-left">Plazo</Form.Label>
            <Form.Control 
            type="text" 
            name="nameRate"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.nameRate}
            />
          </Form.Group>
          <ErrorMessage name="nameRate" component={()=>(<div className="text-danger">{errors.nameRate}</div>)}></ErrorMessage>
          
          <Form.Group className="inputGroup" controlId="nameRate text-left">
            <Form.Label className="text-left">Fecha expiración de tarifa</Form.Label>
            <Form.Control 
            type="date" 
            name="dateExpirationRate"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.dateExpirationRate}
            />
          </Form.Group>
          <ErrorMessage name="dateExpirationRate" component={()=>(<div className="text-danger">{errors.dateExpirationRate}</div>)}></ErrorMessage>
          
          <Form.Group className="inputGroup" controlId="valueRate">
            <Form.Label className="text-left">Costo Bs</Form.Label>
            <Form.Control 
            type="text"
            name="valueRate"
            onChange={handleChange}
            onBlur={handleBlur} 
            value={values.valueRate} 
            />
          </Form.Group>
          <ErrorMessage name="valueRate" component={()=>(<div className="text-danger">{errors.valueRate}</div>)}></ErrorMessage>

          <Form.Group className="inputGroup" controlId="routeRate">
            <Form.Label className="text-left">Imágen QR</Form.Label>
            <Form.Control 
            type="file" 
            accept="image/*"
            name="routeRate"
            onChange={handleCargarImage}
            onBlur={handleBlur}
            />
            <br />
            <div className="text-center">
            {image && <Image src={image} alt="imagen qr" fluid className="custom-image"/> || tarifa && <Image src={tarifa.tarifa_ruta} alt="imagen qr" fluid className="custom-image"/> }
            </div>
          </Form.Group>
          <ErrorMessage name="routeRate" component={()=>(<div className="text-danger">{errors.routeRate}</div>)}></ErrorMessage>
          
          </>
          )}
          <br />
          {loadin?<Spinner animation="border" />:
          <Modal.Footer >
            
            { mensaje && caso == 1? (
            <>
            <Alert variant="danger" >
              <Alert.Heading>Alerta</Alert.Heading>
              <p>
                {mensaje}
              </p>
              <hr />
              <div className="d-flex justify-content-end">
                {
                  !show?(<Button onClick={() => setShow(true)} variant="success">
                  Aceptar
                </Button>):(<></>)
                }
              </div>
            </Alert>
            
            </>
            ):mensaje && caso == 2?(
              <>
              <div>
              <Alert variant="success">
              <Alert.Heading>Alerta</Alert.Heading>
                <p>
                  {mensaje}
                </p>
              </Alert>
               </div>
              <Button variant="secondary" onClick={cancelar}>
                Cancelar  
              </Button>
              <Button variant="success" className="button" onClick={handleSubmit}  >
              {asunto}
              </Button>
              </>
            ):(<></>)
            }
            {
              show?(
              <>
              <Button variant="secondary" onClick={cancelar}>
                Cancelar
              </Button>
              <Button variant="success"  className="button" onClick={handleSubmit}  >
              {asunto}
              </Button>
              </>):(
                <></>
              )
            }
            {
              caso==null && tarifa?(<Button variant="secondary" onClick={cancelar}>
              Cancelar
            </Button>):(<></>)
            }

            {tarifa==null && showA?(
              <Alert variant="danger" >
              <Alert.Heading>Alerta</Alert.Heading>
              <p>
                Ya existe una tarifa con el mismo plazo ¿desea continuar?
              </p>
              <hr />
              <div className="d-flex justify-content-end">
                <div className="mr-2">
                  <Button variant="outline-secondary" onClick={cancelar}>
                    Cancelar
                  </Button>
                </div>
                <div>
                  <Button onClick={() => setShowA(false)} variant="outline-success">
                    Aceptar
                  </Button>
                </div>
              </div>
            </Alert>
            ): tarifa==null && !showA? (
            <>
            <Button variant="secondary" onClick={cancelar}>
                Cancelar
              </Button>
              <Button variant="success"  className="button" onClick={handleSubmit}  >
              {asunto}
              </Button>
            </>
              ):(<></>)}
            
          </Modal.Footer>
          
          }
         

        </Form>

      )}
    </Formik>
    </>
  );
          
};

export default Formulario;