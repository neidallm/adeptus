import React ,{useState, useEffect}from 'react';
import Modal from '../Modal/Modal';
import Formulario from './FormTarifa';
import {Table, Button,ButtonGroup,Form, Image} from 'react-bootstrap';
import Header from '../Header/Header';
import Aside from '../Aside/Aside';
import Footer from '../Footer/Footer';
import { useSend } from '../../hooks/HookList';

import "./Tarifa.css"

export const TarifaListCreate = ({crear=false}) => {
    
    
    const [busqueda, setBusqueda] = useState("");
    const [tarifas,setTarifas] = useState([]);
    const [tablaTarifas, setTablaTarifas] = useState([]);
    const [error,setError] =  useState(null);
    const [tipo,setTipo] =  useState(1);
    
    const{data,fetchData} = useSend();
    
    //----------------------ShowModal-------------------------------
    const [showCreate, setShowCreate] = useState(false);
    
    
    useEffect(() => {
        if (tipo==1) {
            fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiRate/apiRate.php/listRateActive');
        }else{
            fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiRate/apiRate.php/listRateInactive');
        }
        console.log(data);
    }, [tipo]);
    
    
    useEffect(()=>{
        cargarDatos();
    },[]);

    const cargarDatos = async ()=>{
        if (tipo==1) {
            await fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiRate/apiRate.php/listRateActive');
        }else{
            await fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiRate/apiRate.php/listRateInactive');
        }
    }

    useEffect(() => {
        if (data.desError) {
            setError(data.desError);
        }else{
            setError(null);
            setTarifas(data);
            setTablaTarifas(data);
        }

    }, [data]);

    
    
    //-----Create Modal
    const handleCreate = () => {
        setShowCreate(true);
    };
    
    //---Desactive Any Modal
    const handleCancelar = async () => {
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
        console.log(e.target.value);
        setTipo(e.target.value);
        console.log(tipo);
    }

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
        <div className="h-100 w-100 content-wrapper contenteSites-body" style={{minHeight: '100vh'}} >
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
                    <Form.Select style={{ width: '200px' }} placeholder='Seleccione..' onChange={handleOption}>
                        {/* <option>Lista por:</option> */}
                        <option value="1">Habilitadas</option>
                        <option value="2">Inhabilitadas</option>
                    </Form.Select>
                </div>
                <Table striped bordered   size="sm" >
                    <thead>
                        <tr className="columnTittle">
                            <th>Id</th>
                            <th>Detalle</th>
                            <th>Qr</th>
                        </tr>
                    </thead>
                    <tbody>
                        {error!=null ? (
                            <tr>
                                <td colSpan={"3"} >{error}</td>
                            </tr>
                        ): (
                            tarifas.map((tarifa) => (
                                    <tr className="columnContent" key={tarifa.tarifa_id}>
                                        <td>{tarifa.tarifa_id}</td>
                                        <td >
                                            <div className="col d-flex justify-content-center align-items-center">
                                            <ul>

                                                <li><strong>Plazo:</strong>{tarifa.tarifa_nombre}</li>
                                                <li><strong>Fecha de activación de tarifa:</strong>{obtenerFecha(tarifa.tarifa_activacion)}</li>
                                                <li><strong>Fecha de expiración de tarifa:</strong>{obtenerFecha(tarifa.tarifa_expiracion)}</li>
                                                <li><strong>Estado:{tarifa.estadotarifa}</strong></li>
                                                <li><strong>Bs:</strong>{tarifa.tarifa_valor}</li>
                                            </ul>
                                            </div>
                                        </td>
                                        <td>
                                                <Image src={tarifa.tarifa_ruta} alt="imagen qr" fluid className="custom-image" ></Image>

                                        </td>
                                        
                                    </tr>
                            ))
                        )}
                    </tbody>
                </Table>
                <Modal
	            tamaño ="md"
                mostrarModal={showCreate}
                title = 'Crear Tarifa'
                contend = {
                <Formulario
                asunto = "Guardar Tarifa"
                cancelar={handleCancelar}
                listaT={tablaTarifas}
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