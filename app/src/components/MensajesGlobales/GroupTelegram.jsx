import { useFetchSendData } from "../../hooks/HookFetchSendData";
import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, Table, Form } from "react-bootstrap";

import Aside from "../Aside/Aside";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Modalmensaje from "./MensageGlobalCrearoEditar";
import { Enviar, PlublicarNoti } from "./enviarMensajeTelegram";

export default function Mensaje() {
  const [show, setShow] = useState(false);
  const [accion, setaccion] = useState("");
  const [id, setid] = useState("");
  const [stado, setstado] = useState("");
  const [mensaje, setmensaje] = useState("");
  const [titulo, setTitulo] = useState("");
  const [noticias, setnoticias] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [ser, setser] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("todos");

  useEffect(() => {
    fetchConfiguraciones();
  }, []);

  const fetchConfiguraciones = async () => {
    
    try {
      const response = await fetch(
        "http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiNews/apiNews.php/listNews"
      );
      const data = await response.json();
      setnoticias(data);
      setBusqueda(data);
      setser(data);
    } catch (error) {}
  };

  const { fetchData } = useFetchSendData();
  const handleClose = () => {
    setShow(false);
    fetchConfiguraciones();
  };

  const handleSearch = (valor) => {
    // Filtrar las noticias en función de los términos de búsqueda

    if (valor === "") {
      setser(busqueda);
    } else {
      const noticiasFiltradas = busqueda.filter(
        (noticia) =>
          noticia.noticia_titulo.toLowerCase().includes(valor.toLowerCase()) ||
          noticia.noticia_texto.toLowerCase().includes(valor.toLowerCase()) ||
          noticia.autor.toLowerCase().includes(valor.toLowerCase()) ||
          noticia.autormodificacion.toLowerCase().includes(valor.toLowerCase())
      );
      setser(noticiasFiltradas);
    }
  };
  useEffect(() => {
    handleEstadoFilter(filtroEstado);
  }, [ser, filtroEstado]);

  const handleEstadoFilter = (estado) => {
    setFiltroEstado(estado);
    if (estado === "todos") {
      setnoticias(ser);
    } else {
      const noticiasFiltradas = ser.filter(
        (noticia) =>
          noticia.estadonoticia.toLowerCase() === estado.toLowerCase()
      );
      setnoticias(noticiasFiltradas);
    }
  };
  if (!noticias.desError) {
    noticias.sort((a, b) => parseInt(a.noticia_id) - parseInt(b.noticia_id));
  }

  return (
    <div>
      {/* <Header />
      <Aside /> */}

      <div
        className="content-wrapper contenteSites-body"
        style={{ minHeight: "100vh" }}
      >
        <label style={{ fontSize: "30px" }}>
          Administración de Mensajes Globales
        </label>
        <div className="buttonSection">
          <Button
            variant="success"
            onClick={() => {
              setShow(true);
              setaccion("Crear");
            }}
          >
            Crear Noticia +
          </Button>
          {!noticias.desError && (
            <>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Buscar por título o texto de la noticia"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  as="select"
                  value={filtroEstado}
                  onChange={(e) => handleEstadoFilter(e.target.value)}
                >
                  <option value="todos">Todos</option>
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                </Form.Control>
              </Form.Group>
            </>
          )}
        </div>
        {noticias.desError ? (
          <label>No existen Mensajes Globales</label>
        ) : (
          <>
           
            <Table striped bordered hover className="table">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Noticia</th>
                  <th>Noticia fecha</th>
                  <th>Última modificación</th>
                  <th>Estado</th>
                  <th>Autor</th>
                  <th>Autor modificación</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {noticias.map((noticia) => (
                  <tr key={noticia.noticia_id}>
                    <td>{noticia.noticia_titulo}</td>
                    <td>{noticia.noticia_texto}</td>
                    <td>{noticia.noticia_fecha}</td>
                    <td>{noticia.noticia_ultima_modificacion}</td>
                    <td>{noticia.estadonoticia}</td>
                    <td>{noticia.autor}</td>
                    <td>{noticia.autormodificacion}</td>
                    <td>
                    <div style={{ marginBottom: '10px' }}>
  <Button
    variant="success"
    style={{ width: '200px' }}
    onClick={() => {
      setShow(true);
      setaccion("Editar");
      setid(noticia.noticia_id);
      setstado(noticia.noticia_estado);
      setTitulo(noticia.noticia_titulo);
      setmensaje(noticia.noticia_texto);
    }}
  >
    Editar Noticia
  </Button>
</div>

<div style={{ marginBottom: '10px' }}>
  <Button
    variant="success"
    style={{ width: '200px' }}
    onClick={() => {
      setShow(true);
      setaccion("Enviar");
      setid(noticia.noticia_id);
      setTitulo(noticia.noticia_titulo);
      setmensaje(noticia.noticia_texto);
    }}
  >
    Enviar a Telegram
  </Button>
</div>

<div style={{ marginBottom: '10px' }}>
  <Button
    variant="success"
    style={{ width: '200px' }}
    onClick={() => {
      setShow(true);
      setaccion("Publicar");
      setid(noticia.noticia_id);
      setTitulo(noticia.noticia_titulo);
      setmensaje(noticia.noticia_texto);
    }}
  >
    Publicar Noticia
  </Button>
</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </div>

      {/* <Footer /> */}

      <Modal show={show} onHide={handleClose} centered>
        <ModalBody className="modal-body">
          <h1 className="forgot-password-modal">{accion} Noticia</h1>

          {(() => {
            switch (accion) {
              case "Editar":
                return (
                  <div>
                    <Modalmensaje
                      Titul={titulo}
                      Mensaje={mensaje}
                      id={id}
                      estado={stado}
                      fetchData={fetchData}
                      handleClose={handleClose}
                      fetchConfiguraciones={fetchConfiguraciones}
                    />
                  </div>
                );
              case "Crear":
                return (
                  <div>
                    <Modalmensaje
                      Titul={""}
                      Mensaje={""}
                      id={""}
                      estado={""}
                      fetchData={fetchData}
                      handleClose={handleClose}
                      fetchConfiguraciones={fetchConfiguraciones}
                    />
                  </div>
                );
              case "Enviar":
                return (
                  <div>
                    <Form className="container">
                      <Form.Group>
                        <Form.Label className="text-left">Titulo</Form.Label>
                      </Form.Group>
                      <Form.Group>{titulo}</Form.Group>
                      <Form.Group>
                        <Form.Label className="text-left">Mensaje</Form.Label>
                      </Form.Group>
                      <Form.Group>{mensaje}</Form.Group>
                    </Form>
                    <Button
                      variant="success"
                      onClick={() =>
                        Enviar(
                          titulo,
                          mensaje,                          
                          fetchConfiguraciones,
                          handleClose
                        )
                      }
                      type="submit"
                      className="btn btn-primary"
                    >
                      Confirmar Envio
                      {"->"}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-telegram"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z" />
                      </svg>
                    </Button>
                  </div>
                );
                case "Publicar":
                  return(<div>
                    <Form className="container">
                      <Form.Group>
                        <Form.Label className="text-left">Titulo</Form.Label>
                      </Form.Group>
                      <Form.Group>{titulo}</Form.Group>
                      <Form.Group>
                        <Form.Label className="text-left">Mensaje</Form.Label>
                      </Form.Group>
                      <Form.Group>{mensaje}</Form.Group>
                    </Form>
                    <Button
                      variant="success"
                      onClick={() =>
                        PlublicarNoti(                          
                          id,
                          fetchData,
                          fetchConfiguraciones,
                          handleClose
                        )
                      }
                      type="submit"
                      className="btn btn-primary"
                    >
                      Confirmar Publicacion en Página
                      
                    </Button>
                  </div>)
              default:
                return null;
            }
          })()}
        </ModalBody>
      </Modal>
      <br />
      <br />
    </div>
  );
}
