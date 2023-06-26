import React, { useState, useEffect  } from 'react';
import { Table, Button, Modal, ModalBody, Form } from "react-bootstrap";

export default function ConfiguracionesContac({ fetchData }) {
  
  const [show, setShow] = useState(false);
  const [ediddato, setEdiddato] = useState("");
  const [configuraciones, setconfiguraciones] = useState([])
  const [bandera, setbandera] = useState("")
  useEffect(() => {
    fetchConfiguraciones();
    setbandera("")
  }, [bandera]);

  const fetchConfiguraciones = async () => {
    try {
      const response = await fetch("http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiConfiguracion/apiConfiguracion.php/listConfigurationContacto");
      const data = await response.json();
      setconfiguraciones(data);
      
    } catch (error) {
      
    } 
    
  };
  const handleClose = () => setShow(false);
  const [editingId, setEditingId] = useState(null);
  const [editedValor1, setEditedValor1] = useState('');

  // Función para manejar el evento de clic en el botón de editar
  const handleEdit = (configuracionId, valor1, nombre) => {
    setEditingId(configuracionId);
    setEditedValor1(valor1);
    setEdiddato(nombre)
    setShow(true)
  };

  // Función para manejar el evento de cambio en el campo de valor1 editado
  const handleValor1Change = (event) => {
    setEditedValor1(event.target.value);
  };

  // Función para guardar los cambios editados
  function saveChanges() {
    fetchData(
      'http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiConfiguracion/apiConfiguracion.php/editConfiguration',
      {
        idConfiguration: editingId,
        nameConfiguration: ediddato,
        value1Configuration: editedValor1,
        value2Configuration: "",
      }
    );
    setEditingId(null);
    setEditedValor1('');
    setShow(false)
    fetchConfiguraciones();
    setbandera("actualiza")
    // Aquí puedes realizar una llamada a tu backend para guardar los cambios
    // por ejemplo, utilizando una función `saveChangesToBackend(updatedConfiguracion)`
    // saveChangesToBackend(updatedConfiguracion);
  }
  configuraciones.sort(
    (a, b) => parseInt(a.configuracion_id) - parseInt(b.configuracion_id)
  );
  return (
    <div>
    <Table striped bordered hover className="table">
      <thead>
        <tr>
          <th>Configuración</th>
          <th>Valor </th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {configuraciones.map((configuracion) => (
          <tr key={configuracion.configuracion_id}>
            <td>{configuracion.configuracion_nombre}</td>
            <td>
              
                {configuracion.configuracion_valor1}
              
            </td>
            <td>
              
                <Button
                  variant="success"
                  onClick={() =>
                    handleEdit(
                      configuracion.configuracion_id,
                      configuracion.configuracion_valor1,
                      configuracion.configuracion_nombre
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
          <h1 className="forgot-password-modal">Editar Acción</h1>
          <Form className="container">
            <Form.Group>
              <Form.Label className="text-left">
                Nombre: {ediddato}
              </Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label className="text-left">Valor:   </Form.Label>
              <br/>
              <input
                  type="text"
                  value={editedValor1}
                  onChange={handleValor1Change}
                  
                />
            </Form.Group>
            
            
          </Form>
<br/>
          <div>
            <Button variant="success" onClick={saveChanges}>
              Guardar
            </Button>
          </div>
        </ModalBody>
      </Modal>
  
  
  
  
  </div>)
}
