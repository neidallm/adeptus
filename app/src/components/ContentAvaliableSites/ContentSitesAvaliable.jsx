import React from "react";
import { Table } from "react-bootstrap";
import "./ContentSites.css";
import Header from "../Header/Header";
import Aside from "../Aside/Aside";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/HookFetchListData";
import { sendAndReceiveJson } from "../../hooks/HookFetchSendAndGetData";

export default function ContentSitesAvalible(){
   
    const [datos, setData] = useState([]);
    const { data, loading, error }= useFetch("http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiConfiguracion/apiConfiguracion.php/listConfigurationNumSitios")


    

    
    
    useEffect(() => {
        if (!loading && data && data.length > 0) {
          sendAndReceiveJson(
            "http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiSubscription/apiSubscription.php/listDisponibles",
            {
              numberSities: data[0].configuracion_valor1,
            }
          ).then((responseData) => {
            setData(responseData);
            // Trabaja con la respuesta JSON recibida
          });
        }
      }, [loading, data]);
    
      if (!loading) {
        
    
    
    
    return(
        <>
            {/* <Header></Header>
            <Aside></Aside> */}
            <div className="content-wrapper contenteSites-body" style={{minHeight: '100vh'}} >
            <Table striped bordered hover className="table">
                <thead>
                    <tr>
                    <th>Sitio</th>
                    <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                        {datos.map((dato) => (
                            <tr key={dato.numeros}>
                                <td>{dato.numeros}</td>
                                <td>Libre</td>
                            </tr>
                        ) )}
                </tbody>
            </Table>
            <br/><br/>
        </div>
        {/* <Footer></Footer> */}
        </>
    )
}
}