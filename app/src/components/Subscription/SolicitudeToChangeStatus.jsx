import React ,{useState, useEffect}from 'react';
import Modal from '../Modal/Modal';
import {Table,Form} from 'react-bootstrap';
import Header from '../Header/Header';
import Aside from '../Aside/Aside';
import Footer from '../Footer/Footer';
// import { useFetch } from '../../hooks/HookFetchListData';
import "./Subscription.css";
import FormularioStatus from './FormChangeStatus';
import { useSend } from '../../hooks/HookList';


export const SolicitudeToChangeStatus = () => {
    
    const [busqueda, setBusqueda] = useState("");
    const [suscripciones,setSuscripciones] = useState([]);
    const [tablaSuscripciones, setTablaSuscripciones] = useState([]);
    const [error,setError] =  useState(null);
    const [tipo,setTipo] =  useState(1);
    //------FetchData
    const{data,fetchData} = useSend();
    //listSuscriptionInProcess
    
    //----------------------ShowModal-------------------------------
    
    const [showEdit, setShowEdit] = useState(false);
    
    //----------------------Cliente para:-------------------------------
    //------Editar :
    const [suscripcionSeleccionado, setSuscripcionSeleccionado] = useState(null);
 
    useEffect(() => {
  
        if (tipo==1) {
             fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiSubscription/apiSubscription.php/listSubscriptionInProgress');
         }else if(tipo==2){
             fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiSubscription/apiSubscription.php/listSubscriptionDenied');
         }
      
    }, [tipo]);
    
    useEffect(() => {
       
        if (data.desError) {
            setError(data.desError);
        }
        else{
            setError(null);
            setSuscripciones(data);
            setTablaSuscripciones(data);
        
        }
      
    }, [data]);

    useEffect(()=>{
        cargarDatos();
    },[]);

    const cargarDatos = async ()=>{
        if (tipo==1) {
            await fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiSubscription/apiSubscription.php/listSubscriptionInProgress');
        }else if(tipo==2){
            await fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiSubscription/apiSubscription.php/listSubscriptionDenied');
        } 
    }
    //-----------------------Activate-------------------------------------------
    //------Edit Modal
    const handleEditar = (suscripcion) => {
        setShowEdit(true);
        setSuscripcionSeleccionado(suscripcion);
    };
    
    //---Desactive Any Modal
    const handleCancelar = () => {
        setShowEdit(false);
        setError(null);
        cargarDatos();
    };
 

    const  obtenerFecha = (stringFechaHora) =>{
        const fechaHora = new Date(stringFechaHora);
        const fecha = fechaHora.toISOString().split('T')[0];
        return fecha;
      }

    const handleOption = e => {
      
        setTipo(e.target.value);
    
    }
    
    
      /*--------------------- Barra Busqueda------------------------- */
    const handleChangeSerch = e => {
        setBusqueda(e.target.value);
        filtrar(e.target.value);

    }

    const filtrar = (termBusqueda) => {
        var resultadosBusqueda = tablaSuscripciones.filter((elemento) => {
            if(
                    elemento.suscripcion_id.toString().toLowerCase().includes(termBusqueda.toLowerCase())
                ||  elemento.cliente.toString().toLowerCase().includes(termBusqueda.toLowerCase())
                ||  elemento.suscripcion_numero_parqueo.toString().toLowerCase().includes(termBusqueda.toLowerCase())
            ){
                return elemento;
            }else{
                return null;
            }
        });
        setSuscripciones(resultadosBusqueda);
    }

    return (
        <>
        {/* <Header></Header>
        <Aside></Aside> */}
        <div className="content-wrapper contenteSites-body" style={{minHeight: '100vh'}} >
            <div className="bodyItems">
                <div className="buttonSection">
                    <Form.Control 
                        className="searchBar"
                        type="text"
                        placeholder="Buscar..."
                        value={busqueda}
                        onChange={handleChangeSerch}
                    />
                    <Form.Select style={{ width: '200px' }} placeholder='Seleccione..' onChange={handleOption}>
                        {/* <option>Lista por:</option> */}
                        <option value="1">En proceso</option>
                        <option value="2">Rechazados</option>
                    </Form.Select>
                </div>
                <Table striped bordered hover className="table">
                    <thead>
                        <tr className="columnTittle">
                            <th>Id</th>
                            <th>Nro de Parqueo</th>
                            <th>Cliente</th>
                            <th>Fecha Activación</th>
                            <th>Fecha Expiración</th>
                            <th>Tarifa</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {error!=null ? (
                            <tr>
                                <td colSpan={"8"} >{error}</td>
                            </tr>
                        ): (
                            suscripciones.map((suscripcion) => (
                                    <tr className="columnContent" key={suscripcion.suscripcion_id}>
                                        <td>{suscripcion.suscripcion_id}</td>
                                        <td>{suscripcion.suscripcion_numero_parqueo}</td>
                                        <td>{suscripcion.cliente}</td>
                                        <td>{obtenerFecha(suscripcion.suscripcion_activacion)}</td>
                                        <td>{obtenerFecha(suscripcion.suscripcion_expiracion)}</td>
                                        <td>
                                            <ul>
                                                <li><strong>Tiempo de suscripción:</strong> {suscripcion.tarifa_nombre}</li>
                                                <li><strong>Bs:</strong>    {suscripcion.tarifa_valor}</li>
                                            </ul>
                                        </td>
                                        <td>{suscripcion.referencia_valor.charAt(0).toUpperCase()+suscripcion.referencia_valor.slice(1)}</td>
                                        <td className="actionsButtons">
                                            <button className='btn btn-success btn-md mr-1 ' onClick={() => handleEditar(suscripcion)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                            ))
                        )}
                    </tbody>
                </Table>
                <br />
                <br />
                <Modal
	            tamaño ="md"
                mostrarModal={showEdit}
                title = 'Cambiar Estado'
                contend = {
                <>
                <div>
                
                  {suscripcionSeleccionado?(<div className='text-left'>
                  <Form.Group className="inputGroup" controlId="activationSubscription text-left">
                        <div className="row align-items-center">
                        <Form.Label className="text-left col-sm-4">Nro de Parqueo:</Form.Label>
                        <div className="col-sm-8">
                            {suscripcionSeleccionado?.suscripcion_numero_parqueo}
                        </div>
                        </div>
                    </Form.Group>
                    <Form.Group className="inputGroup" controlId="activationSubscription text-left">
                        <div className="row align-items-center">
                        <Form.Label className="text-left col-sm-4">Cliente:</Form.Label>
                        <div className="col-sm-8">
                            {suscripcionSeleccionado?.cliente}
                        </div>
                        </div>
                    </Form.Group>
                    <Form.Group className="inputGroup" controlId="activationSubscription text-left">
                        <div className="row align-items-center">
                        <Form.Label className="text-left col-sm-4">Fecha de Activación:</Form.Label>
                        <div className="col-sm-8">
                            {obtenerFecha(suscripcionSeleccionado?.suscripcion_activacion)}
                        </div>
                        </div>
                    </Form.Group>
                    <Form.Group className="inputGroup" controlId="activationSubscription text-left">
                        <div className="row align-items-center">
                        <Form.Label className="text-left col-sm-4">Fecha de Expiración:</Form.Label>
                        <div className="col-sm-8">
                            {obtenerFecha(suscripcionSeleccionado?.suscripcion_expiracion)}
                        </div>
                        </div>
                    </Form.Group>
                    <Form.Group className="inputGroup" controlId="activationSubscription text-left">
                        <div className="row align-items-center">
                        <Form.Label className="text-left col-sm-4">Bs:</Form.Label>
                        <div className="col-sm-8">
                            {suscripcionSeleccionado?.tarifa_valor}
                        </div>
                        </div>
                    </Form.Group>
                </div>):("")}
                </div>
                <FormularioStatus
                asunto ='Guardar Cambios'
                suscripcion= {suscripcionSeleccionado}
                cancelar={handleCancelar}
                reftipo={1}
                ></FormularioStatus>
                </>    
                }
                hide = {handleCancelar}
                >
                </Modal>
            </div>
        </div>
        {/* <Footer></Footer> */}
        </>

    )
}

