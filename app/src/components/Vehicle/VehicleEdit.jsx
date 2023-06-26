import React ,{useState, useEffect}from 'react';
import Modal from '../Modal/Modal';
import Formulario from './FormVehicle';
import {Table,Form} from 'react-bootstrap';// aqui se estaba importando esto: Button,ButtonGroup,Form
import Header from '../Header/Header';
import Aside from '../Aside/Aside';
import Footer from '../Footer/Footer';
import { useSend } from '../../hooks/HookList';

import "./Vehicle.css"
import SearchBar from '../SearchBar/SearchBar';

export const VehicleEdit = () => {
    
    const [busqueda, setBusqueda] = useState("");
    const [vehiculos,setVehiculos] =  useState([]);
    const [tablaVehiculos, setTablaVehiculos] = useState([]);
    const [error,setError] =  useState(null);
    const{data,fetchData} = useSend();
    
    
    
    //----------------------ShowModal-------------------------------
    
    const [showEdit, setShowEdit] = useState(false);
     
    const [showCreate, setShowCreate] = useState(false);
    
    //----------------------Cliente para:-------------------------------
    //------Editar :
    const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);

    
    useEffect(() => {
        fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiVehicle/apiVehicle.php/listVehicle');

    }, []);
    
    useEffect(() => {
        if (data.desError) {
            setError(data.desError);
        }
        else{
            setVehiculos(data);
            setTablaVehiculos(data);
        
        
        }
    }, [data]);

    useEffect(()=>{
        cargarDatos();
    },[]);

    const cargarDatos = async () =>{
        await fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiVehicle/apiVehicle.php/listVehicle');
        
    }
   

    //-----------------------Activate-------------------------------------------
    //------Edit Modal
    const handleEditar = (vehiculo) => {
        setShowEdit(true);
        setVehiculoSeleccionado(vehiculo);
    };
    

    
    //---Desactive Any Modal
    const handleCancelar = async () => {
        setShowEdit(false);
        setShowCreate(false);
        setError(null);
        cargarDatos();
    };

    /*--------------------- Barra Busqueda------------------------- */
    const handleChangeSerch = e => {
        setBusqueda(e.target.value);
        filtrar(e.target.value);

    }

    const filtrar = (termBusqueda) => {
        var resultadosBusqueda = tablaVehiculos.filter((elemento) => {
            if(
                    elemento.vehiculo_id.toString().toLowerCase().includes(termBusqueda.toLowerCase())
                ||  elemento.vehiculo_placa.toString().toLowerCase().includes(termBusqueda.toLowerCase())
                ||  elemento.propietario.toString().toLowerCase().includes(termBusqueda.toLowerCase())
            ){
                return elemento;
            }else{
                return null;
            }
        });
        setVehiculos(resultadosBusqueda);
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
                </div>
                <Table striped bordered hover className="table">
                    <thead>
                        <tr className="columnTittle">
                            <th>Id</th>
                            <th>Placa</th>
                            <th>Propietario</th>
                            <th> Modelo</th>
                            <th>Color</th>
                            {/* <th>Estado</th> */}
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {error!=null ? (
                            <tr>
                                <td colSpan={"6"} >{error}</td>
                            </tr>
                        ): (
                            vehiculos.map((vehiculo) => (
                                    <tr className="columnContent" key={vehiculo.vehiculo_id}>
                                        <td>{vehiculo.vehiculo_id}</td>
                                        <td>{vehiculo.vehiculo_placa}</td>
                                        <td>{vehiculo.propietario}</td>
		                                <td>{vehiculo.vehiculo_modelo}</td>
                                        <td>{vehiculo.vehiculo_color}</td>
                                        {/* <td>{vehiculo.vehiculoestado}</td> */}
                                        <td className="actionsButtons">
                                            <button className='btn btn-success btn-md mr-1 ' onClick={() => handleEditar(vehiculo)}>
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
                    

                <Modal
	            tamaño ="md"
                mostrarModal={showEdit}
                title = 'Editar Vehiculo'
                contend = {
                <Formulario
                asunto ='Guardar Cambios'
                vehiculo= {vehiculoSeleccionado}
                cancelar={handleCancelar}
                ></Formulario>}
                hide = {handleCancelar}
                >
                </Modal>
                

                <Modal
	            tamaño ="md"
                mostrarModal={showCreate}
                title = 'Crear Nuevo Vehiculo'
                contend = {
                <Formulario
                asunto = "Guardar Vehiculo"
                cancelar={handleCancelar}
                ></Formulario>}
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
