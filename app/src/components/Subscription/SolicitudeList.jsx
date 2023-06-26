import React ,{useState, useEffect}from 'react';
import {Table,Form} from 'react-bootstrap';
import Header from '../Header/Header';
import Aside from '../Aside/Aside';
import Footer from '../Footer/Footer';
import { useSend } from '../../hooks/HookList';
import "./Subscription.css";


export const SolicitudeList = () => {
    
    const [busqueda, setBusqueda] = useState("");
    const [suscripciones,setSuscripciones] = useState([]);
    const [tablaSuscripciones, setTablaSuscripciones] = useState([]);
    const [error,setError] =  useState(null);
    const [tipo,setTipo] =  useState(1);
    //------FetchData
    const{data,fetchData} = useSend();
    
    useEffect(() => {
        
        if (tipo==1) {
             fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiSubscription/apiSubscription.php/listSubscriptionInProgress');
         }else if(tipo==2){
            
             fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiSubscription/apiSubscription.php/listSubscriptionDenied');
         }
      
    }, [tipo]);
    
    useEffect(() => {
     
        if (data.desError) {
            setError(data.desError);
        }
        else{
            setError(null);
            setSuscripciones(data);
            setTablaSuscripciones(data);
        
        }
      
    }, [data]);
 

    const  obtenerFecha = (stringFechaHora) =>{
   
        const fechaHora = new Date(stringFechaHora);
        const fecha = fechaHora.toISOString().split('T')[0];
       
        return fecha;
      }

      const handleOption = e => {
     
        setTipo(e.target.value);
     
    }
    
      /*--------------------- Barra Busqueda------------------------- */
    const handleChangeSerch = e => {
        setBusqueda(e.target.value);
        filtrar(e.target.value);

    }

    const filtrar = (termBusqueda) => {
        var resultadosBusqueda = tablaSuscripciones.filter((elemento) => {
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
        setSuscripciones(resultadosBusqueda);
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
                        <option value="1">En Proceso</option>
                        <option value="2">Rechazadas</option>
                    </Form.Select>
                </div>
                <Table striped bordered hover className="table">
                    <thead>
                        <tr className="columnTittle">
                            <th>Id</th>
                            <th>Nro de Parqueo</th>
                            <th>Cliente</th>
                            <th>Fecha Activación</th>
                            <th>Fecha Expiración</th>
                            <th>Tarifa</th>
                            <th>Estado</th>
                            {/* <th>Acciones</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {error!=null ? (
                            <tr>
                                <td colSpan={"7"} >{error}</td>
                            </tr>
                        ): (
                            suscripciones.map((suscripcion) => (
                                    <tr className="columnContent" key={suscripcion.suscripcion_id}>
                                        <td>{suscripcion.suscripcion_id}</td>
                                        <td>{suscripcion.suscripcion_numero_parqueo}</td>
                                        <td>{suscripcion.cliente}</td>
                                        <td>{obtenerFecha(suscripcion.suscripcion_activacion)}</td>
                                        <td>{obtenerFecha(suscripcion.suscripcion_expiracion)}</td>
                                        <td>
                                            <ul>
                                                <li><strong>Tiempo de suscripción:</strong> {suscripcion.tarifa_nombre}</li>
                                                <li><strong>Bs:</strong>    {suscripcion.tarifa_valor}</li>
                                            </ul>
                                        </td>
                                        <td>{suscripcion.referencia_valor.charAt(0).toUpperCase()+suscripcion.referencia_valor.slice(1)}</td>
                                    </tr>
                            ))
                        )}
                    </tbody>
                </Table>
                <br />
                <br />
            </div>
        </div>
        {/* <Footer></Footer> */}
        </>

    )
}
