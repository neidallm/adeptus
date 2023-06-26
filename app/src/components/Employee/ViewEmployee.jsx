import React from "react";
import Header from "../Header/Header";
import Aside from "../Aside/Aside";
import Footer from "../Footer/Footer";
import Modal from "../Modal/Modal";
import { Form, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/HookFetchListData";
import FormularioEditarEmpleado from "./FormEditEmployee";
import { useSend } from '../../hooks/HookList';


export default function ViewEmployee(){
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
    
    const [showView, setShowView] = useState(false);
    
     
    //----------------------Cliente para:-------------------------------
    //------Editar :
    const [personaSeleccionado, setPersonaSeleccionado] = useState(null);
   
    
    //-----View Modal
    const handleView = (cliente) => {
        setShowView(true);
        setPersonaSeleccionado(cliente);
    };
    //---Desactive Any Modal
    const handleCancelar = () => {
        //setShowEdit(false);
        setShowView(false);
        setError(null);
        cargarDatos();

    };
    
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
                            <th>Télefono</th>
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
                                        <td>
                                            <button className='btn btn-success btn-md mr-1 ' onClick={() => handleView(persona)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                            ))
                        )}
                    </tbody>
                </Table>
                <Modal
                    mostrarModal={showView}
                    title = 'Detalle Empleado'
                    contend = {
                    <FormularioEditarEmpleado
                    asunto ='Guardar Cambios'
                    persona= {personaSeleccionado}
                    cancelar={handleCancelar}
                    soloLectura = {true}
                    ></FormularioEditarEmpleado>}
                    hide = {handleCancelar}
                    >
                    </Modal>
            </div>
            </div>

            {/* <Footer></Footer> */}
        </>
    )
}