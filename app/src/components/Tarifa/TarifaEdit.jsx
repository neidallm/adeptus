import React ,{useState, useEffect}from 'react';
import Modal from '../Modal/Modal';
import Formulario from './FormTarifa';
import {Table, Button,ButtonGroup,Form, Image} from 'react-bootstrap';
import Header from '../Header/Header';
import Aside from '../Aside/Aside';
import Footer from '../Footer/Footer';
import { useSend } from '../../hooks/HookList';

import "./Tarifa.css"

export const TarifaEdit = () => {

    const [busqueda, setBusqueda] = useState("");
    const [tarifas,setTarifas] = useState([]);
    const [tablaTarifas, setTablaTarifas] = useState([]);
    const [error,setError] =  useState(null);
    const [tipo,setTipo] =  useState(1);
    
    const{data,fetchData} = useSend();
    
    //----------------------ShowModal-------------------------------
    
    const [showEdit, setShowEdit] = useState(false);
     
    //------Editar :
    const [tarifaSeleccionado, setTarifaSeleccionado] = useState(null);

    useEffect(() => {
        if (tipo==1) {
            fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiRate/apiRate.php/listRateActive');
        }else{
            fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiRate/apiRate.php/listRateInactive');
        }

    }, [tipo]);
    
    useEffect(() => {
        if (data.desError) {
            setError(data.desError);
        }else{
            setError(null);
            setTarifas(data);
            setTablaTarifas(data);
        }
       
    }, [data]);

 
    
    useEffect(()=>{
        cargarDatos();
    },[]);

    const cargarDatos = async()=>{
        if (tipo==1) {
            await fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiRate/apiRate.php/listRateActive');
        }else{
            await fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiRate/apiRate.php/listRateInactive');
        }
    }


    //-----------------------Activate-------------------------------------------
    //------Edit Modal
    const handleEditar = (tarifa) => {
        setShowEdit(true);
        setTarifaSeleccionado(tarifa);

    };
    const  obtenerFecha = (stringFechaHora) =>{
        const fechaHora = new Date(stringFechaHora);
        const fecha = fechaHora.toISOString().split('T')[0];
        return fecha;
      }

    const handleOption = e => {
        setTipo(e.target.value);
    }
    
    //---Desactive Any Modal
    const handleCancelar = async () => {
        setShowEdit(false);
        setError(null);
        cargarDatos();
    };

    /*--------------------- Barra Busqueda------------------------- */
    const handleChangeSerch = e => {
        setBusqueda(e.target.value);
        filtrar(e.target.value);

    }

    const filtrar = (termBusqueda) => {
        var resultadosBusqueda = tablaTarifas.filter((elemento) => {
            if(
                    elemento.tarifa_nombre.toString().toLowerCase().includes(termBusqueda.toLowerCase())
                ||  elemento.tarifa_valor.toString().toLowerCase().includes(termBusqueda.toLowerCase())
                ||  elemento.tarifa_estado.toString().toLowerCase().includes(termBusqueda.toLowerCase())
            ){
                return elemento;
            }else{
                return null;
            }
        });
        setTarifas(resultadosBusqueda);
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
                        <option value="1">Habilitadas</option>
                        <option value="2">Inhabilitadas</option>
                    </Form.Select>
                </div>
                <Table striped bordered hover className="table">
                    <thead>
                        <tr className="columnTittle">
                            <th>Id</th>
                            <th>Detalle</th>
                            <th>Qr</th>
                            {
                                tipo==1?(<th>Acciones</th>):(<></>)
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {error!=null ? (
                            <tr>
                                <td colSpan={"4"} >{error}</td>
                            </tr>
                        ): (
                            tarifas.map((tarifa) => (
                                    <tr className="columnContent" key={tarifa.tarifa_id}>
                                        <td>{tarifa.tarifa_id}</td>
                                        <td>
                                            <ul>
                                                <li><strong>Plazo:</strong>{tarifa.tarifa_nombre}</li>
                                                <li><strong>Fecha de activación de tarifa:</strong>{obtenerFecha(tarifa.tarifa_activacion)}</li>
                                                <li><strong>Fecha de expiración de tarifa:</strong>{obtenerFecha(tarifa.tarifa_expiracion)}</li>
                                                <li><strong>Estado: {tarifa.estadotarifa}</strong></li>
                                                <li><strong>Bs:</strong>{tarifa.tarifa_valor}</li>
                                            </ul>
                                            </td>
                                            <td>
                                                <Image src={tarifa.tarifa_ruta} alt="imagen qr" fluid className="custom-image" ></Image>

                                            </td>
                                            {
                                                tipo==1?(<td className="actionsButtons">
                                                <button className='btn btn-success btn-md mr-1 ' onClick={() => handleEditar(tarifa)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                    </svg>
                                                </button>
                                            </td>):(<></>)
                                            }
                                        
                                    </tr>
                            ))
                        )}
                    </tbody>
                </Table>
                    

                <Modal
	            tamaño ="lg"
                mostrarModal={showEdit}
                title = 'Modificar Estado de Tarifa'
                contend = {
                    <>
                    {tarifaSeleccionado?(<div className='text-left'>
                    <Form.Group className="inputGroup" controlId="activationSubscription text-left">
                        <div className="row align-items-center">
                        <Form.Label className="text-left col-sm-4">Plazo:</Form.Label>
                        <div className="col-sm-8">
                            {tarifaSeleccionado?.tarifa_nombre}
                        </div>
                        </div>
                    </Form.Group>
                    <Form.Group className="inputGroup" controlId="activationSubscription text-left">
                        <div className="row align-items-center">
                        <Form.Label className="text-left col-sm-4">Bs:</Form.Label>
                        <div className="col-sm-8">
                            {tarifaSeleccionado?.tarifa_valor}
                        </div>
                        </div>
                    </Form.Group>
                    <hr />
                    <Form.Group className="inputGroup" controlId="activationSubscription text-left">
                        <div className="row align-items-center">
                        <Form.Label className="text-left col-sm-4">Fecha de Activación:</Form.Label>
                        <div className="col-sm-8">
                            {obtenerFecha(tarifaSeleccionado?.tarifa_activacion)}
                        </div>
                        </div>
                    </Form.Group>
                    <Form.Group className="inputGroup" controlId="activationSubscription text-left">
                        <div className="row align-items-center">
                        <Form.Label className="text-left col-sm-4">Fecha de Expiración:</Form.Label>
                        <div className="col-sm-8">
                            {obtenerFecha(tarifaSeleccionado?.tarifa_expiracion)}
                        </div>
                        </div>
                    </Form.Group>
                    
                    <Form.Group className="inputGroup" controlId="activationSubscription text-left">
                        <div className="row align-items-center">
                        <Form.Label className="text-left col-sm-4">QR:</Form.Label>
                        <div className="col-sm-8">
                        <Image src={tarifaSeleccionado.tarifa_ruta} alt="imagen qr" fluid className="custom-image" ></Image>
                        </div>
                        </div>
                    </Form.Group>
                    <hr />
                </div>):("")}
                <Formulario
                asunto ='Guardar Cambios'
                tarifa= {tarifaSeleccionado}
                cancelar={handleCancelar}
                ></Formulario>
                </>
                }
                hide = {handleCancelar}
                >
                </Modal>
                

            </div>
        </div>
        <br />
        <br />
        {/* <Footer></Footer> */}
        </>

    )
}
