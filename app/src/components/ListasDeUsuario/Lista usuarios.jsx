
import { Button, Table, Modal, ModalBody, Form } from "react-bootstrap";
import { useFetch } from "../../hooks/HookFetchListData";
import Aside from "../Aside/Aside";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
let dat ;
export default function ListCli() {
  return (
    <div>
      {/* <Header></Header>
      <Aside></Aside> */}

      <ListaC></ListaC>
    
      {/* <Footer></Footer> */}
    </div>
  );
}

function ListaC() {
  const [datitos, setdatitos] = useState([]);
  const [show, setShow] = useState(false);
  const [usuario, setusuario] = useState([]);
  const [mensa, setmensa] = useState("");

  const handleClose = () => setShow(false);

  const { data, loading, error } = useFetch(
    "http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiPerson/apiPerson.php/listPerson"
  );

  function Whats(cliente) {
    setusuario(cliente);
    setShow(true);
 
    
  }
  const mensaje = () => {
    let men = mensa.replace(/ /g, "%20");
  
    let link = "https://api.whatsapp.com/send?phone=591" + usuario.persona_telefono + "&text=" + men;
  
    window.open(link, '_blank')
    handleClose()
  };

  if (!loading) {
    if (datitos.length === 0) {
      setdatitos(data);
    }

   

    

    const handleSearch = (searchTerm) => {
       
     
          
      if (searchTerm.length===0) {
        if (data!==datitos) {
            setdatitos(data)
        }
      } else {
        
        if (dat!==searchTerm) {
             
            setdatitos(data.filter(
                (filtro) => 
                filtro.persona_nombre.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
              ||filtro.persona_apellido.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 )
           );
        }
        
      }
      dat=searchTerm
     
    };

    return (
      <div className="content-wrapper contenteSites-body" style={{minHeight: '100vh'}} >
        <div style={{ color: "red" }}>
          {error !== "" ? <span>{error}</span> : <span></span>}
        </div>
        <div>
          <SearchBar onSearch={handleSearch} />
        </div>
        Lista de usuarios
        <Table striped bordered hover className="table">
          <thead>
            <tr>
            <th>ID </th>
              <th>Nombre </th>
              <th>Apellido</th>
              <th>Télefono</th>
              <th> Tipo </th>
              <th> Whatapp </th>
            </tr>
          </thead>
          <tbody>
            {datitos.map((cliente) => (
              <tr key={cliente.persona_id}>
                <td>{cliente.persona_id}</td>
                <td>{cliente.persona_nombre}</td>
                <td>{cliente.persona_apellido}</td>
                <td>{cliente.persona_telefono}</td>
                <td>{cliente.personatipo}</td>

                <td>
                  <Button
                    variant="success"
                    onClick={() => Whats(cliente)}
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
                  </Button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal show={show} onHide={handleClose} centered>
          <ModalBody className="modal-body">
            <h1 className="forgot-password-modal"> Enviar Mensaje</h1>
            <Form className="container">
              <Form.Label
                className="text-left"
                style={{ display: "flex", justifyContent: "flex-start" }}
              >
                Nombre: {usuario.persona_nombre}
              </Form.Label>
              <Form.Label
                className="text-left"
                style={{ display: "flex", justifyContent: "flex-start" }}
              >
                Apellido: {usuario.persona_apellido}
              </Form.Label>
              <Form.Label
                className="text-left"
                style={{ display: "flex", justifyContent: "flex-start" }}
              >
                Teléfono: {usuario.persona_telefono}
              </Form.Label>

              <div></div>
              <Form.Label
                className="text-left"
                style={{ display: "flex", justifyContent: "flex-start" }}
              >
                Mensaje:{" "}
              </Form.Label>
              <div></div>
              <textarea
                rows="3"
                cols="45"
                placeholder="escriba el mensaje aqui"
                onChange={(e) => setmensa(e.target.value)}
              ></textarea>
            </Form>

            <div>
              <Button
                variant="success"
                className="modal-button"
                onClick={mensaje}
              >
                Enviar
              </Button>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
