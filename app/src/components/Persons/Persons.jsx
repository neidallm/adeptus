import React, {useContext, useEffect, useState} from "react";
import Header from "../Header/Header";
import Aside from "../Aside/Aside";
import Footer from "../Footer/Footer";
import { Button, ButtonGroup, Form, Table } from "react-bootstrap";
import Modal from "../Modal/Modal";
import FormularioPersona from './FormPersona';
import { useSend } from '../../hooks/HookList';
import "./Persons.css";
import { DataUser } from '../context/UserContext.jsx';



export default function Persons(){   
    
    const {userglobal} = useContext(DataUser);

    const [busqueda, setBusqueda] = useState("");
    const [clientes, setClientes] = useState([]);
    const [tablaClientes, setTablaClientes] = useState([])
    const [personas,setPersonas] =  useState([]);
    const [error,setError] =  useState(null);


    const{data,fetchData} = useSend();

   
    useEffect(() => {
        fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiPerson/apiPerson.php/listPerson')
    }, []);


    useEffect(() => {
        if (data.desError) {
            setError(data.desError);
        }
        else{

            let resultadosBusqueda = data.filter((elemento) => {
                if(elemento.persona_id!=userglobal.persona_id ){
                    return elemento;
                }
            });
          
            setError(null);
            setClientes(resultadosBusqueda);
            setTablaClientes(resultadosBusqueda);
            setPersonas(resultadosBusqueda);

        }
    }, [data]);
    
       

    useEffect(()=>{
        cargarDatos();
    },[]);

    const cargarDatos = async () =>{
        await fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiPerson/apiPerson.php/listPerson')
        
    }

    //----------------------ShowModal-------------------------------
    
    const [showCreate, setShowCreate] = useState(false);
    
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
                            <th>Nombre Completo</th>
                            <th>Teléfono</th>
                            <th> CI </th>
                            <th>Tipo Persona</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                         {error!=null ? (
                            <tr>
                                <td colSpan={"6"} >{error}</td>
                            </tr>
                        ): 
                            (
                                clientes.map((persona) => (
                                    <tr className="columnContent" key={persona.persona_id}>
                                        <td>{persona.persona_id}</td>
                                        <td>{persona.persona_nombre} {persona.persona_apellido}</td>
                                        <td>{persona.persona_telefono}</td>
                                        <td>{persona.persona_ci}</td>
                                        <td>{persona.personatipo}</td>
                                        <td>{persona.personaestado}</td>
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                </Table>

                <Modal
                mostrarModal={showCreate}
                title = 'Crear Nuevo Usuario'
                contend = {
                <FormularioPersona
                asunto = "Guardar Usuario"
                cancelar={handleCancelar}
                ></FormularioPersona>}
                hide = {handleCancelar}
                >
                </Modal>
            </div>
        </div>
        <br></br>
        
        {/* <Footer></Footer> */}
        </>
    )
}