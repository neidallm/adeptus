import React from "react";
import Header from "../Header/Header";
import Aside from "../Aside/Aside";
import Footer from "../Footer/Footer";
import { Table, Form, ButtonGroup, Button } from "react-bootstrap";
import { useState,  useEffect } from "react";
//import { CSVLink } from "react-csv";
import Modal from "../Modal/Modal";
import FormEvent from "./FormEvent";
import { useSend } from "../../hooks/HookList";

export default function Event(){

    

    const [busqueda, setBusqueda] = useState("");
    const [eventos, setEventos] = useState([]);
    const [tablaEventos, setTablaEventos] = useState([]);

    const{data,fetchData} = useSend();
    const [error,setError] =  useState(null);

    const [newEvent,setEvent] =  useState([]);

    useEffect(() => {
        fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiEvent/apiEvent.php/listEvent');

    }, []);

    useEffect(() => {
        
        if (data.desError) {
            setError(data.desError)
        } else {
            
            setEventos(data)
            setTablaEventos(data)
        }
        
    }, [data]);


    useEffect(() => {
        cargarDatos();
    }, [])
    

    const cargarDatos = async () =>{

        try {
            const response = await fetch('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiEvent/apiEvent.php/listEvent');
            const data = await response.json();
            if (!data.desError) {
                setError(null);
            }
            
            setEventos(data)
            setTablaEventos(data)
            
          } catch (error) {
            
          } 
    }

    /*--------------------- Barra Busqueda------------------------- */
    const handleChangeSerch = e => {
        setBusqueda(e.target.value);
        filtrar(e.target.value);
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
       
        cargarDatos();
    };

    //-----------------------Crud-------------------------------------------
    //-------Crear
    const handleGuardarNuevo = (eventoNuevo) => {
        eventoNuevo.id = newEvent.lengthb;
            newEvent.push(eventoNuevo);
            const nuevoEvento = newEvent;
        setEvent(nuevoEvento);
    };

    const filtrar = (termBusqueda) => {
        var resultadosBusqueda = tablaEventos.filter((elemento) => {
            if(
                    elemento.propietario.toString().toLowerCase().includes(termBusqueda.toLowerCase())
                ||  elemento.vehiculo_placa.toString().toLowerCase().includes(termBusqueda.toLowerCase())
                ||  elemento.evento_fecha.toString().toLowerCase().includes(termBusqueda.toLowerCase())
                ||  elemento.referencia_valor.toString().toLowerCase().includes(termBusqueda.toLowerCase())
            ){
                return elemento;
            }else{
                return null;
            }
        });
        setEventos(resultadosBusqueda);
    }

    return(
        <>
            {/* <Header></Header>
            <Aside></Aside> */}
            <div className="content-wrapper" style={{minHeight: '100vh'}}>
            <br />
                <div className="bodyItems">
                    <div className="buttonSection">
                        <ButtonGroup className="buttonGroup">
                            <Button variant="success" className="button" onClick={() => handleCreate()} >Añadir +</Button>
                            {/* <Button variant="success" className="button"> 
                                <CSVLink data={eventos} filename="Usuarios Unipark" className="csv"> Excel </CSVLink>
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
                                <th>Propietario</th>
                                <th>Placa Vehiculo</th>
                                <th>Fecha Evento</th>
                                <th>Descripción</th>
                                <th>Tipo de Evento</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            { error!=null ? (
                                <tr>
                                <td colSpan={"6"} >{error}</td>
                                </tr>
                            ):(eventos.map((evento) => (
                                <tr className="columnContent" key={evento.evento_id}>
                                    <td>{ evento.vehiculo_persona_id }</td>
                                    <td>{ evento.propietario }</td>
                                    <td>{ evento.vehiculo_placa}</td>
                                    <td>{ evento.evento_fecha }</td>
                                    <td>{ evento.evento_descripcion }</td>
                                    <td>{ evento.referencia_valor }</td>
                                </tr>
                                )
                            ))}
                        </tbody>
                    </Table>

                    <Modal
                        mostrarModal={showCreate}
                        title = 'Crear Nueva Evento'
                        contend = {
                        <FormEvent
                        asunto = "Guardar Evento"
                        cancelar={handleCancelar}
                        añadirNuevo = {handleGuardarNuevo}
                        cargar={cargarDatos}
                        /* cliente = {getClients} */
                        ></FormEvent>}
                        hide = {handleCancelar}
                        >
                    </Modal>
                </div>
            </div>

            {/* <Footer></Footer> */}
        </>
    )

}