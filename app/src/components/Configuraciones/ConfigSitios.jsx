import React, { useState, useEffect } from "react";
import { Table, Button, Modal, ModalBody, Form } from "react-bootstrap";

export default function NumeroSitios({ fetchData }) {
  const [editingId, setEditingId] = useState(null);
  const [editedValor1, setEditedValor1] = useState('');
  const [editedNombre, setEditedNombre] = useState("");
  const [show, setShow] = useState(false);
  const [sitios, setsitios] = useState([])
    const [bandera, setbandera] = useState("")

  // Función para manejar el evento de clic en el botón de editar
  const handleEdit = (configuracionId, valor1,nombre) => {
    setEditingId(configuracionId);
    setEditedValor1(valor1);
    setEditedNombre(nombre);
    setShow(true);
  };
  useEffect(() => {
    fetchConfiguraciones();
    setbandera("")
  }, [bandera]);

  const fetchConfiguraciones = async () => {
    try {
      const response = await fetch("http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiConfiguracion/apiConfiguracion.php/listConfigurationNumSitios");
      const data = await response.json();
      setsitios(data);
      
    } catch (error) {
      
    } 
    
  };






  // Función para manejar el evento de cambio en el campo de valor1 editado
  const handleValor1Change = (event) => {
    setEditedValor1(event.target.value);
  };
  const handleClose = () => {
    setEditingId(null);
    setEditedValor1("");
   
    setEditedNombre("");
    setShow(false);
  };
  // Función para guardar los cambios editados
  function saveChanges() {

    fetch("http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiSubscription/apiSubscription.php/listSubscription")
    .then(datos => datos.json())
    .then(datos => {let datas = datos.filter((dat)=>parseInt(dat.suscripcion_numero_parqueo)>editedValor1&&
      dat.suscripcion_estado==="27"||dat.suscripcion_estado==="8")
      let tar =""
      if (datas.length!==0) {
         tar="No se pudo actualizar debido a que los siguientes sitios son ocupados y están fuera del rango que desea establecer\nNum.     Estado\n"
        datas.map((cont) => tar = tar + cont.suscripcion_numero_parqueo + "       " + cont.referencia_valor+"\n")
       
      
      } else {
        fetchData("http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiConfiguracion/apiConfiguracion.php/editConfiguration",
    {
        "idConfiguration" : editingId,
        "nameConfiguration" : editedNombre,
        "value1Configuration" : editedValor1
    })
     tar = "se actualizo"
    fetchConfiguraciones();
     setbandera("actualiza")
      }
      alert(tar) 
      handleClose()

    });


    
    
    // Aquí puedes realizar una llamada a tu backend para guardar los cambios
    // por ejemplo, utilizando una función `saveChangesToBackend(updatedSitio)`
    // saveChangesToBackend(updatedSitio);
  }
  sitios.sort((a, b) => parseInt(a.configuracion_id) - parseInt(b.configuracion_id));
 
  return (
    <div>
    <Table striped bordered hover className="table">
      <thead>
        <tr>
          <th>Sitios</th>
          <th>Número de Sitios</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {sitios.map((sitio) => (
          <tr key={sitio.configuracion_id}>
            <td>Límite Número de Sitios </td>
            <td>
              
                
              
                {sitio.configuracion_valor1}
             
            </td>
            <td>
              
                <Button
                  variant="success"
                  onClick={() =>
                    handleEdit(
                      sitio.configuracion_id,
                      sitio.configuracion_valor1,
                      sitio.configuracion_nombre
                    )
                  }
                >
                  Editar
                </Button>
            
            </td>
          </tr>
        ))}
      </tbody>
    </Table>

    <Modal show={show} onHide={handleClose} centered>
        <ModalBody className="modal-body">
          <h1 className="forgot-password-modal">Editar Máximo Número de Sitios</h1>
          <Form className="container">
            <Form.Group>
              <Form.Label className="text-left">Nombre: {editedNombre}</Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label className="text-left">Valor:</Form.Label>
              <span>  </span>
              <input
                  type="text"
                  value={editedValor1}
                  onChange={handleValor1Change}
                  style={{ width: '80px' }} // Establecer un ancho fijo
                />
            </Form.Group>
            
          </Form>

          <div>
          <Button variant="success" onClick={() => saveChanges()}>
                  Guardar
                </Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
