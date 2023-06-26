import React from "react";
import { useState, useEffect } from "react";
import FormAddRol from "./FormAddRol";
import Modal from "../Modal/Modal";
import { Form, Button, ButtonGroup, Table } from "react-bootstrap";
import { useSend } from "../../hooks/HookList";
import Header from "../Header/Header";
import Aside from "../Aside/Aside";
import Footer from "../Footer/Footer";
import "./Options.css"


export default function AddRolSection(){
    const [bandera, setBandera] = useState("");

    const [busqueda, setBusqueda] = useState("");
    const [roles, setroles] = useState([]);
    const [tablaroles, setTablaroles] = useState([])

    const{data,fetchData} = useSend();
    const [error,setError] =  useState(null);

    useEffect(() => {
        fetchData("http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiRol/apiRol.php/listRol");
    }, []);

    useEffect(() => {
        if(data.desError){
            setError(data.desError);
        }else{
            setroles(data);
            setTablaroles(data);
        }
    }, [data]);

    useEffect(() => {
        setBandera("")
        cargarDatos();
        handleCancelar();
    }, [bandera]);

    const cargarDatos = async () => {
        await fetchData("http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiRol/apiRol.php/listRol");
    }
        setTimeout(() => {
            localStorage.removeItem("Error")
           }, 3000)
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
        var resultadosBusqueda = tablaroles.filter((elemento) => {
            if(
                    elemento.rol_nombre.toString().toLowerCase().includes(termBusqueda.toLowerCase())
                ||  elemento.estadorol.toString().toLowerCase().includes(termBusqueda.toLowerCase())
            ){
                return elemento;
            }else{
                return null;
            }
        });
        setroles(resultadosBusqueda);
    }

    return(
        <>
            {/* <Header></Header>
            <Aside></Aside> */}
            <div className="content-wrapper addrolsection" style={{minHeight: '100vh'}} >
        
                {/* {localStorage.getItem("Error") ?
                <div className="text-danger">{localStorage.getItem("Error")}</div>
                
                :<span></span>} */}
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
                            <th>Nombre del Rol</th>
                            <th>Descripción</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                            {error != null ? (
                                <tr>
                                    <td colSpan={"6"} >{error}</td>
                                </tr>
                            ): (
                                roles.map((rol) => (
                                    <tr className="columnContent" key={rol.rol_id}>
                                        <td>{rol.rol_id}</td>
                                        <td>{rol.rol_nombre}</td>
                                        <td>{rol.rol_descripcion}</td>
                                        <td>{rol.estadorol}</td>
                                    </tr>
                                ))
                            )
                                
                            }

                    </tbody>
                </Table>
                

                <Modal
                tamaño={"md"}
                mostrarModal={showCreate}
                title = 'Crear Nuevo Rol'
                contend = 
                {
                    <FormAddRol 
                    cancelar={handleCancelar}
                    asunto = "Guardar Rol"
                    bandera = {setBandera}
                    >
                        
                    </FormAddRol>
                    // <FormAddRolServer
                    //     asunto="Guardar Rol"
                    //     cancelar={handleCancelar}
                    // ></FormAddRolServer>
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