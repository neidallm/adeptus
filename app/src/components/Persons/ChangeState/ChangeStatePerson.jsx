import React from "react";
import Header from "../../Header/Header";
import Aside from "../../Aside/Aside";
import Footer from "../../Footer/Footer";
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
//import { useFetch } from "../../../hooks/HookFetchListData";
import PersonTable from './TableRow'

export default function DeletePerson(){

    const [busqueda, setBusqueda] = useState("");
    const [clientes, setClientes] = useState([]);
    const [tablaClientes, setTablaClientes] = useState([])

    // const {data} = useFetch(
    //     'http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiPerson/apiPerson.php/listPerson'
    // )

    const getClients = async () => {
        await fetch('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiPerson/apiPerson.php/listPersonClientActive')
            .then(response => response.json())
            .then( response => {
                setClientes(response);
                setTablaClientes(response);
            })
            .catch( error => {
                
            })
    }

    useEffect(() => {
        getClients();
    }, []);

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
            {clientes.desError ? <label>No existen Clientes</label>
                :(<>
                <div className="buttonSection">
                    <Form.Control 
                        className="searchBar2"
                        type="text"
                        placeholder="Buscar..."
                        value={busqueda}
                        onChange={handleChangeSerch}
                    />
                </div>
                    <PersonTable data={clientes} getclient={getClients} ></PersonTable>
                    </>)}
                </div>
                
            </div>

            {/* <Footer></Footer> */}
        </>
    )
}