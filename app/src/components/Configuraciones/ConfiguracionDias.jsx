import React, { useState, useEffect } from "react";
import { Table, Button, Modal, ModalBody, Form } from "react-bootstrap";
import TimePicker from "react-time-picker";

import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

export default function Dias({ fetchData }) {
  const [dia, setDia] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedEntrada, setEditedEntrada] = useState("");
  const [editedSalida, setEditedSalida] = useState("");
  const [editedNombre, setEditedNombre] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchConfiguraciones();
  }, []);

  const fetchConfiguraciones = async () => {
    try {
      const response = await fetch("http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiConfiguracion/apiConfiguracion.php/listConfigurationHorario");
      const data = await response.json();
      setDia(data);
      
    } catch (error) {
      
    } 
    
  };

  const handleEdit = (configuracionId, entrada, salida, nombre) => {
    setEditingId(configuracionId);
    setEditedEntrada(entrada);
    setEditedSalida(salida);
    setEditedNombre(nombre);
    setShow(true);
  };

  const handleEntradaChange = (value) => {
    setEditedEntrada(value);
  };

  const handleSalidaChange = (value) => {
    setEditedSalida(value);
  };

  const saveChanges = async () => {
    try {
      if (editedEntrada > editedSalida) {
        alert("La hora de entrada no puede ser mayor a la hora de salida");
        return;
      }else{
      await fetchData(
        "http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiConfiguracion/apiConfiguracion.php/editConfiguration",
        {
          idConfiguration: editingId,
          nameConfiguration: editedNombre,
          value1Configuration: editedEntrada,
          value2Configuration: editedSalida,
        }
      );

      setEditingId(null);
      setEditedEntrada("");
      setEditedSalida("");
      setEditedNombre("");
      setShow(false);}

      

      // Actualizar la lista de configuraciones después de guardar los cambios
      fetchConfiguraciones();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setEditingId(null);
    setEditedEntrada("");
    setEditedSalida("");
    setEditedNombre("");
    setShow(false);
  };
  dia.sort(
    (a, b) => parseInt(a.configuracion_id) - parseInt(b.configuracion_id)
  )
  return (
    <div>
      <Table striped bordered hover className="table">
        <thead>
          <tr>
            <th>Día</th>
            <th>Hora Entrada</th>
            <th>Hora Salida</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {dia.map((di) => (
            <tr key={di.configuracion_id} className="">
              <td>{di.configuracion_nombre}</td>
              <td style={{ textAlign: "center" }}>{di.configuracion_valor1}</td>
              <td style={{ textAlign: "center" }}>{di.configuracion_valor2}</td>
              <td>
                <Button
                  variant="success"
                  onClick={() =>
                    handleEdit(
                      di.configuracion_id,
                      di.configuracion_valor1,
                      di.configuracion_valor2,
                      di.configuracion_nombre
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
              <Form.Label className="text-left">Nombre: {editedNombre}</Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label className="text-left">Entranda:</Form.Label>
              <br />
              <TimePicker
                className="custom-time-picker"
                value={editedEntrada}
                onChange={handleEntradaChange}
                clearIcon={null}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="text-left">Salida:</Form.Label>
              <br />
              <TimePicker
                value={editedSalida}
                onChange={handleSalidaChange}
                clearIcon={null}
                className="custom-time-picker"
              />
            </Form.Group>
          </Form>

          <div>
            <Button variant="success" onClick={saveChanges}>
              Guardar
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
