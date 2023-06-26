import React, {useEffect, useState} from "react";
import Header from "../Header/Header";
import Aside from "../Aside/Aside";
import Footer from "../Footer/Footer";
import { Button, ButtonGroup, Form, Table } from "react-bootstrap";
import { useSend } from '../../hooks/HookList';
import Modal from "../Modal/Modal";
import FormularioEmpleado from "./FormEmployee";
import "./Employee.css";

export default function Employee(){   
   
    const [busqueda, setBusqueda] = useState("");
    const [clientes, setClientes] = useState([]);
    const [tablaClientes, setTablaClientes] = useState([])
    const [error,setError] =  useState(null);

    const{data,fetchData} = useSend();

   
    
    
    useEffect(() => {
        fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiPerson/apiPerson.php/listPersonEmployee');
    }, []);

    useEffect(() => {
        if (data.desError) {
            setError(data.desError);
        }
        else{
            setError(null);
            setClientes(data);
            setTablaClientes(data);
        }
    }, [data]);

    useEffect(()=>{
        cargarDatos();
    },[]);

    const cargarDatos = async () =>{
        await fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiPerson/apiPerson.php/listPersonEmployee');
    }
    
    //----------------------ShowModal-------------------------------
    
    const [showCreate, setShowCreate] = useState(false);
    
    
    
    //-----------------------Activate-------------------------------------------
    
    //-----Create Modal
    const handleCreate = () => {
        setShowCreate(true);
    };
    
    //---Desactive Any Modal
    const handleCancelar = () => {
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
        var resultadosBusqueda = tablaClientes.filter((elemento) => {
            if(
                    elemento.persona_id.toString().toLowerCase().includes(termBusqueda.toLowerCase())
                ||  elemento.persona_apellido.toString().toLowerCase().includes(termBusqueda.toLowerCase())
                ||  elemento.persona_nombre.toString().toLowerCase().includes(termBusqueda.toLowerCase())
                ||  elemento.persona_ci.toString().toLowerCase().includes(termBusqueda.toLowerCase())
            ){
                return elemento;
            }else{
                return null;
            }
        });
        setClientes(resultadosBusqueda);
    }

    return(
        <>
        {/* <Header></Header>
        <Aside></Aside> */}

        <div className="content-wrapper contenteSites-body" style={{minHeight: '100vh'}} >
            <div className="bodyItems">
                <div className="buttonSection">
                    <ButtonGroup className="buttonGroup">
                        <Button variant="success" className="button" onClick={() => handleCreate()} >Añadir +</Button>
                        {/* <Button variant="success" className="button"> 
                            <CSVLink data={data} filename="Usuarios Unipark" className="csv"> Excel </CSVLink>
                        </Button> */}
                    </ButtonGroup>
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
                            <th>Nombre</th>
                            <th>Teléfono</th>
                            <th> CI </th>
                            <th>Hora Ingreso</th>
                            <th>Hora Salida</th>
                            <th>Tipo Persona</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {error!=null ? (
                            <tr>
                                <td colSpan={"8"} >{error}</td>
                            </tr>
                        ): (
                            clientes.map((persona) => (
                                    <tr className="columnContent" key={persona.persona_id}>
                                        <td>{persona.persona_id}</td>
                                        <td>{persona.persona_nombre} {persona.persona_apellido}</td>
                                        <td>{persona.persona_telefono}</td>
                                        <td>{persona.persona_ci}</td>
                                        <td>{persona.horario_entrada}</td>
                                        <td>{persona.horario_salida}</td>
                                        <td>{persona.personatipo}</td>
                                        <td>{persona.personaestado}</td>
                                    </tr>
                            ))
                        )}
                    </tbody>
                </Table>

                <Modal
                mostrarModal={showCreate}
                title = 'Crear Nuevo Empleado'
                contend = {
                <FormularioEmpleado
                asunto = "Guardar Empleado"
                cancelar={handleCancelar}
                ></FormularioEmpleado>}
                hide = {handleCancelar}
                >
                </Modal>
            </div>
        </div>
        
        {/* <Footer></Footer> */}
        </>
    )
}