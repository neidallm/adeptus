import React ,{useState, useEffect}from 'react';
import Modal from '../Modal/Modal';
import Formulario from './FormVehicle';
import {Table, Button,ButtonGroup,Form} from 'react-bootstrap';
import Header from '../Header/Header';
import Aside from '../Aside/Aside';
import Footer from '../Footer/Footer';
import { useSend } from '../../hooks/HookList';

import "./Vehicle.css"

export const VehicleListCreate = ({crear=false}) => {
    
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
   
    
    //-----Create Modal
    const handleCreate = () => {
        setShowCreate(true);
    };
    
    //---Desactive Any Modal
    const handleCancelar = async () => {
        setShowEdit(false);
        setShowCreate(false);
        setError(null);
        cargarDatos();
          
    };

    const handleChangeSerch = e => {
        setBusqueda(e.target.value);
        filtrar(e.target.value);

    }

    const filtrar = (termBusqueda) => {
        var resultadosBusqueda = tablaVehiculos.filter((elemento) => {
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
        setTablaVehiculos(resultadosBusqueda);
    }

 
    return (
        <>
        {/* <Header></Header>
        <Aside></Aside> */}
        <div className="content-wrapper contenteSites-body" style={{minHeight: '100vh'}} >
            <div className="bodyItems">
                <div className="buttonSection">
                    {crear?(
                    <ButtonGroup className="buttonGroup">
                        <Button variant="success" className="button" onClick={() => handleCreate()} >Añadir +</Button>
                    </ButtonGroup>):(
                        <div></div>
                    )}
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
                            <th>Modelo</th>
                            <th>Color</th>
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
                                        
                                    </tr>
                            ))
                        )}
                    </tbody>
                </Table>
                    

                
                

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
