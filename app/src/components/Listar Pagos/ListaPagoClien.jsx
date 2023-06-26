import React, { useState, useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import Header from "../Header/Header";
import Aside from "../Aside/Aside";
import Footer from "../Footer/Footer";
import { sendAndReceiveJson } from "../../hooks/HookFetchSendAndGetData";
import { DataUser } from "../context/UserContext";

export default function Listapagoclien() {
  return (
    <div>
      {/* <Header />
      <Aside /> */}
      <ListaPa />
      {/* <Footer /> */}
    </div>
  );
}

function ListaPa() {
  const { userglobal } = useContext(DataUser);
  const [listau, setlistau] = useState([]);
  const [montopagado, setmontopagado] = useState(0);

  useEffect(() => {
    sendAndReceiveJson(
      "http://localhostUniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiHistoryPay/apiHistoryPay.php/listHistoryPayClient",
      {
        idPerson: userglobal.persona_id,
      }
    ).then((dato) => setlistau(filtrar(dato)));
  }, []); // Dependencia vacía para que se ejecute solo una vez al montar el componente
  function filtrar(dato) {
    if (dato.desError) {
      return(dato)
    } else {
      return dato.filter(obj => obj.historial_pago_id !== null)
    }
      
  }
  useEffect(() => {
    if (listau.length > 0) {
      let totalMonto = listau.reduce(
        (acumulado, reclamoPersona) =>
          acumulado + parseInt(reclamoPersona.historial_pago_monto),
        0
      );
      setmontopagado(totalMonto);
    }
  }, [listau]);

  return (
    <div
      className="content-wrapper contenteSites-body"
      style={{ minHeight: "100vh" }}
    >
      <label>Lista de Mis Pagos </label>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Monto</th>
            <th>Parqueo</th>
          </tr>
        </thead>

        {!listau.desError ? (
          <tbody>
            {listau.map((reclamoPersona) => (
              <tr key={reclamoPersona.historial_pago_id}>
                <td>{reclamoPersona.cliente}</td>
                <td>{reclamoPersona.historial_pago_fecha}</td>
                <td>{reclamoPersona.historial_pago_monto} Bs.</td>
                <td>{reclamoPersona.suscripcion_numero_parqueo}</td>
              </tr>
            ))}

            <tr className="totalRow">
              <td colSpan="3">El Monto Pagado es:</td>
              <td>{montopagado} Bs.</td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            <tr className="totalRow">
              <td colSpan="4">No existen pagos de usted</td>
            </tr>
          </tbody>
        )}
      </Table>
      <br />
      <br />
    </div>
  );
}
