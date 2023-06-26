import React, { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import { Table, Form, Button } from "react-bootstrap";
import Header from "../Header/Header";
import Aside from "../Aside/Aside";
import Footer from "../Footer/Footer";
// import { useFetch } from '../../hooks/HookFetchListData';
import "./Subscription.css";
import FormularioStatus from "./FormChangeStatus";
import { useSend } from "../../hooks/HookList";
import Whats from "../MenWat/Menwat";

export const SubscriptionInMora = () => {
  const [busqueda, setBusqueda] = useState("");
  const [suscripciones, setSuscripciones] = useState([]);
  const [tablaSuscripciones, setTablaSuscripciones] = useState([]);
  const [error, setError] = useState(null);

  //------FetchData
  const { data, fetchData } = useSend();
  //listSuscriptionInProcess

  //----------------------ShowModal-------------------------------

  const [showEdit, setShowEdit] = useState(false);

  //----------------------Cliente para:-------------------------------
  //------Editar :
  const [suscripcionSeleccionado, setSuscripcionSeleccionado] = useState(null);
    const [wats, setwats] = useState(false)
    const [subs, setsubs] = useState({})
    const cerrar = () =>{
        setwats(false)
    }
  useEffect(() => {
   
      fetchData(
        "http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiSubscription/apiSubscription.php/listSubscriptionMora"
      );
    
    
  }, []);

  useEffect(() => {
    if (data.desError) {
      setError(data.desError);
    } else {
      setSuscripciones(data);
      setTablaSuscripciones(data);

    }
  }, [data]);
  //-----------------------Activate-------------------------------------------
  //------Edit Modal
  

  //---Desactive Any Modal
  const handleCancelar = () => {
    setShowEdit(false);
  };

  const obtenerFecha = (stringFechaHora) => {
    const fechaHora = new Date(stringFechaHora);
    const fecha = fechaHora.toISOString().split("T")[0];
    return fecha;
  };

  /*--------------------- Barra Busqueda------------------------- */
  const handleChangeSerch = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (termBusqueda) => {
    var resultadosBusqueda = tablaSuscripciones.filter((elemento) => {
      if (
        elemento.suscripcion_id
          .toString()
          .toLowerCase()
          .includes(termBusqueda.toLowerCase()) ||
        elemento.cliente
          .toString()
          .toLowerCase()
          .includes(termBusqueda.toLowerCase()) ||
        elemento.suscripcion_numero_parqueo
          .toString()
          .toLowerCase()
          .includes(termBusqueda.toLowerCase())
      ) {
        return elemento;
      } else {
        return null;
      }
    });
    setSuscripciones(resultadosBusqueda);
  };

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
          </div>
          <Table striped bordered hover className="table">
            <thead>
              <tr className="columnTittle">
                <th>Id</th>
                <th>Nro de Parqueo</th>
                <th>Cliente</th>
                <th>Fecha Activación</th>
                <th>Fecha Expiración</th>
                <th>Estado</th>
                <th>Tarifa</th>
                <th>WhatsApp</th>
                {/* <th>Acciones</th> */}
              </tr>
            </thead>
            <tbody>
              {error != null ? (
                <tr>
                  <td colSpan={"8"}>{error}</td>
                </tr>
              ) : (
                suscripciones.map((suscripcion) => (
                  <tr
                    className="columnContent"
                    key={suscripcion.suscripcion_id}
                  >
                    <td>{suscripcion.suscripcion_id}</td>
                    <td>{suscripcion.suscripcion_numero_parqueo}</td>
                    <td>{suscripcion.cliente}</td>
                    <td>{obtenerFecha(suscripcion.suscripcion_activacion)}</td>
                    <td>{obtenerFecha(suscripcion.suscripcion_expiracion)}</td>
                    <td>
                      {suscripcion.referencia_valor.charAt(0).toUpperCase() +
                        suscripcion.referencia_valor.slice(1)}
                    </td>
                    <td>
                      <ul>
                        <li>
                          <strong>Tiempo de suscripción:</strong> {suscripcion.tarifa_nombre}
                        </li>
                        <li>
                          <strong>Bs:</strong> {suscripcion.tarifa_valor}
                        </li>
                      </ul>
                    </td>
                    <td className="actionsButtons">
                      
                      
                      <Button
                        variant="success"
                        onClick={() =>  {setwats(true)
                        setsubs(suscripcion)} }
                        type="submit"
                        className="btn btn-primary btn-block  "
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-whatsapp"
                          viewBox="0 0 16 16"
                        >
                          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                        </svg>
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
          <br />
          <br />
          <Modal
            tamaño="md"
            mostrarModal={showEdit}
            title="Cambiar Estado"
            contend={
              <>
                <div>
                  {suscripcionSeleccionado ? (
                    <div className="text-left">
                      <h5>
                        <strong>Nro de Parqueo:</strong>
                        {suscripcionSeleccionado?.suscripcion_numero_parqueo}
                      </h5>
                      <h5>
                        <strong>Cliente:</strong>
                        {suscripcionSeleccionado?.cliente}
                      </h5>
                      <h5>
                        <strong>Fecha de Activación:</strong>
                        {obtenerFecha(
                          suscripcionSeleccionado?.suscripcion_activacion
                        )}
                      </h5>
                      <h5>
                        <strong>Fecha de Expiración:</strong>
                        {obtenerFecha(
                          suscripcionSeleccionado?.suscripcion_expiracion
                        )}
                      </h5>
                      <h5>
                        <strong>Bs:</strong>
                        {suscripcionSeleccionado?.tarifa_valor}
                      </h5>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <FormularioStatus
                  asunto="Guardar Cambios"
                  suscripcion={suscripcionSeleccionado}
                  cancelar={handleCancelar}
                ></FormularioStatus>
              </>
            }
            hide={handleCancelar}
          ></Modal>
          {wats? <Whats subs={subs} cerrar={cerrar} show={wats}/>:null}
        </div>
      </div>
      {/* <Footer></Footer> */}
    </>
  );
};
