import React ,{useState, useEffect}from 'react';
import Modal from '../Modal/Modal';
import Formulario from './FormSubscription';
import {Table, Button,ButtonGroup,Form} from 'react-bootstrap';
import Header from '../Header/Header';
import Aside from '../Aside/Aside';
import Footer from '../Footer/Footer';
import { useSend } from '../../hooks/HookList';
import "./Subscription.css";


export const SubscriptionEdit = () => {
    
    const [busqueda, setBusqueda] = useState("");
    const [suscripciones,setSuscripciones] = useState([]);
    const [tablaSuscripciones, setTablaSuscripciones] = useState([]);
    const [error,setError] =  useState(null);
    const [tipo,setTipo] =  useState(1);
    
    //------FetchData
    const{data,fetchData} = useSend();
    //----------------------ShowModal-------------------------------
    
    const [showEdit, setShowEdit] = useState(false);
     
    const [showCreate, setShowCreate] = useState(false);
    
    //----------------------Cliente para:-------------------------------
    //------Editar :
    const [suscripcionSeleccionado, setSuscripcionSeleccionado] = useState(null);
    
    
    
    useEffect(() => {
   
        if (tipo==1) {
             fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiSubscription/apiSubscription.php/listSubscriptionActive');
         }else if(tipo==2){
            
             fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiSubscription/apiSubscription.php/listSubscriptionInactive');
         }else if(tipo==3){
            fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiSubscription/apiSubscription.php/listSubscriptionMora');
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

    //-----------------------Activate-------------------------------------------
    //------Edit Modal
    const handleEditar = (suscripcion) => {
        setShowEdit(true);
        setSuscripcionSeleccionado(suscripcion);
    };
    
    //-----Create Modal
    const handleCreate = () => {
        setShowCreate(true);
    };
    
    //---Desactive Any Modal
    const handleCancelar = () => {
        setShowEdit(false);
        setShowCreate(false);
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
    

    useEffect(()=>{
        cargarDatos();
    },[]);

    const cargarDatos = async ()=>{
        if (tipo==1) {
           await fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiSubscription/apiSubscription.php/listSubscriptionActive');
        }else if(tipo==2){
            await fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiSubscription/apiSubscription.php/listSubscriptionInactive');
        }else if(tipo==3){
            await fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiSubscription/apiSubscription.php/listSubscriptionMora');
        }
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
                        <option value="1">Habilitadas</option>
                        <option value="2">Inhabilitadas</option>
                        <option value="3">En Mora</option>
                    </Form.Select>
                </div>
                <Table striped bordered hover className="table">
                    <thead>
                        <tr className="columnTittle">
                            <th>Id</th>
                            <th>Número de Parqueo</th>
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
                                        <td>{suscripcion.referencia_valor}</td>
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
                title = 'Editar Suscripción'
                contend = {
                <Formulario
                asunto ='Guardar Cambios'
                suscripcion= {suscripcionSeleccionado}
                cancelar={handleCancelar}
                ></Formulario>}
                hide = {handleCancelar}
                >
                </Modal>
                

                <Modal
	            tamaño ="md"
                mostrarModal={showCreate}
                title = 'Crear Nueva Suscripción'
                contend = {
                <Formulario
                asunto = "Guardar Suscripción"
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
