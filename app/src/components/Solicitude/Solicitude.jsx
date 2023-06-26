import React ,{useState, useEffect}from 'react';
import Modal from '../Modal/Modal';
import Formulario from './FormSolicitude';
import {Table, Button,ButtonGroup,Image} from 'react-bootstrap';
import Header from '../Header/Header';
import Aside from '../Aside/Aside';
import Footer from '../Footer/Footer';
import { useSend } from '../../hooks/HookList';
import "./Solicitude.css"
import { useContext } from "react"
import { DataUser } from '../context/UserContext.jsx';

export const Solicitude = () => {
   
    const {userglobal} = useContext(DataUser);
    
    const [suscripcion,setSuscripcion] = useState(null);
    const [error,setError] =  useState(null);
    
    //solictar api : listSubscriptionUser FetchSendData()con el id del solicitante
    const{data,fetchData} = useSend();
    
    //----------------------ShowModal-------------------------------
    
    const [showMod, setShowMod] = useState(false);
    const [showModPDF, setShowModPDF] = useState(false);
     
    //----------------------Cliente para:-------------------------------
    //------Editar :
    const [suscripcionSeleccionado, setSuscripcionSeleccionado] = useState(null);
    
    useEffect(() => {
        fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiSubscription/apiSubscription.php/listSubscription');
    }, []);

    useEffect(() => {
        if (data.desError) {
            setError("No existe una solicitud");
        }else{
             let mysus = data.filter(suscripcion => suscripcion.persona_id == userglobal.persona_id);
             let rech = mysus.filter(sus => sus.referencia_valor!=="rechazada")
             if (rech.length!==0) {
                mysus = rech
             }
            ;
            setSuscripcion(mysus[0])
        }
    }, [data]);

    //-----------------------Activate-------------------------------------------
    //------Edit Modal
    const handleMod= () => {
        setShowMod(true);
    };
    

    
    //---Desactive Any Modal
    const handleCancelar = async () => {
        setShowMod(false);
        setError(null);
        cargarDatos();
    };


    const  obtenerFecha = (stringFechaHora) =>{
        const fechaHora = new Date(stringFechaHora);
        const fecha = fechaHora.toISOString().split('T')[0];
        return fecha;
    }

    useEffect(()=>{
        cargarDatos();
    },[]);

    const cargarDatos = async () =>{
        await fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiSubscription/apiSubscription.php/listSubscription');
    }
 
    return (
        <>
        {/* <Header></Header>
        <Aside></Aside> */}
        <div className="content-wrapper contenteSites-body" style={{minHeight: '100vh'}} >
            <div className="bodyItems">
                { suscripcion!=null?(
                    <div className=" content-wrapper contenteSites-body ">
                        <Table striped bordered hover className="table">
                            <thead>
                                <tr key={suscripcion.suscripcion_id}>
                                <th>Solicitud </th>
                                </tr>
                            </thead>
                            {suscripcion.referencia_valor==="rechazada"? <tbody>
                                
                                <tr key="2">
                                <th>Estado: </th>
                                <th>Su anterior solicitud fue rechazada, realice una nueva solicitud o consulte con el administrador</th>
                                    
                                </tr>
                            </tbody>:<>
                            <tbody>
                                
                                <tr key="2">
                                <th>Estado: </th>
                                <th>{suscripcion.referencia_valor ==="en proceso"? "Su solicitud se esta procesando":suscripcion.referencia_valor ==="habilitada"? "Se encuentra Habilitada":suscripcion.referencia_valor ==="inhabilitada"?"Se encuentra Inabilitada, consulte con el Administrador":suscripcion.referencia_valor ==="mora"?"Su suscripcion se en encuentra en un estado de Mora":"Su Solicitud fue rechazada, consulte con el Administrador"}</th>
                                    
                                </tr>
                            </tbody>
                            <tbody>
                            </tbody>
                            <tbody>
                            <tr key="5">
                                <th>Sitio de Parqueo: </th>
                                <th>{suscripcion.suscripcion_numero_parqueo}</th>
                                    
                                </tr>
                            </tbody>

                            <tbody>
                            <tr key="6">
                                <th>Tiempo: </th>
                                <th>{suscripcion.tarifa_nombre}</th>
                                    
                                </tr>
                            </tbody>

                            <tbody>
                            <tr key="6">
                                <th>Fecha de activación: </th>
                                <th>{obtenerFecha(suscripcion.suscripcion_activacion)}</th>
                                    
                                </tr>
                            </tbody>

                            <tbody>
                            <tr key="6">
                                <th>Fecha de expiración: </th>
                                <th>{obtenerFecha(suscripcion.suscripcion_expiracion)}</th>
                                    
                                </tr>
                            </tbody>
                            <tbody>
                            <tr key="7">
                                <th>Costo Bs: </th>
                                <th>{suscripcion.tarifa_valor}</th>
                                    
                                </tr>
                            </tbody>
                            <tbody>
                            <tr key="8">
                                <th>QR: </th>
                                <th><Image src={suscripcion.tarifa_ruta} alt="imagen qr" fluid className="custom-image" ></Image></th>
                                    
                                </tr>
                            </tbody>
                            </>
                            }
                           
                        </Table>
                        {suscripcion.referencia_valor==="rechazada" && <div className="buttonSection">
                    <ButtonGroup className="buttonGroup">
                        <Button variant="success" className="button" onClick={() => handleMod()} >Enviar una solicitud de parqueo</Button>
                    </ButtonGroup>
                    
                    </div>}
                    </div>
                ):(
                    <div className="buttonSection">
                    <ButtonGroup className="buttonGroup">
                        <Button variant="success" className="button" onClick={() => handleMod()} >Enviar una solicitud de parqueo</Button>
                    </ButtonGroup>
                    
                    </div>
                )}
                
                <Modal
	            tamaño ="md"
                mostrarModal={showMod}
                title = 'Solicitud'
                contend = {
                <Formulario
                cancelar={handleCancelar}
                ></Formulario>}
                hide = {handleCancelar}
                >
                </Modal>

               
            </div>
        </div>

        {/* <Footer></Footer> */}
        </>

    )
}
