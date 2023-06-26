import React, { useEffect, useState } from 'react';
import { Col, Form, ListGroup, Button, Row, Alert } from 'react-bootstrap';
import ComboboxRoles from './ComboboxRol';
import { useFetchSendData } from '../../hooks/HookFetchSendData';
import Header from '../Header/Header';
import Aside from '../Aside/Aside';
import Footer from '../Footer/Footer';
import "./Options.css"

export default function AddOptions () {
  
  const { fetchData } = useFetchSendData();
  const [selectedRolId, setSelectedRolId] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [opPadre, setpadre] = useState([]);
  const [opHijo, sethijo] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  

  useEffect(() => {
    fetch('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiOption/apiOption.php/listOption')
      .then(resp => resp.json())
      .then(data => {
        setOptions(data);
        setpadre(data.filter((dat)=> dat.opcion_padre==="0"))
        sethijo(data.filter((hi)=>hi.opcion_padre!=="0"))
      })
  }, []);

  const handleRolIdChange = (personaId) => {
    setSelectedRolId(personaId);

    if (personaId) {
      fetch(`http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiRolHasOption/apiRolHasOption.php/listRolHasOption`)
        .then(resp => resp.json())
        .then(data => {
          const filteredOptions = data.filter(item => item.rol_id === personaId);
          const optionIds = filteredOptions.map(item => item.opcion_id);
          setSelectedOptions(optionIds);
        });
    } else {
      setSelectedOptions([]);
    }
  };
  
  
  const handleOptionChange = (optionId) => {
    // Verificar si la opción ya está seleccionada
    const isSelected = selectedOptions.includes(optionId);
  
    if (isSelected) {
      // Si la opción ya está seleccionada, se elimina de la lista de opciones seleccionadas
      setSelectedOptions((prevOptions) => {
        // Verificar si la opción seleccionada es una opción padre
        const parentOption = opPadre.find((option) => option.opcion_id === optionId);
        if (parentOption) {
          // Obtener las opciones hijas correspondientes a la opción padre deseleccionada
          const childOptions = opHijo.filter((option) => option.opcion_padre === parentOption.opcion_orden);
          const childOptionIds = childOptions.map((option) => option.opcion_id);
  
          // Filtrar las opciones hijas de la lista de opciones seleccionadas
          const updatedOptions = prevOptions.filter((id) => !childOptionIds.includes(id));

          // Eliminar también la opción padre de la lista de opciones seleccionadas
          return updatedOptions.filter((id) => id !== optionId);
        }
  
        // Si no es una opción padre, simplemente se elimina de la lista de opciones seleccionadas
        return prevOptions.filter((id) => id !== optionId);
      });
    } else {
      // Si la opción no está seleccionada
      setSelectedOptions((prevOptions) => {
        const selected = [...prevOptions, optionId];
  
        // Verificar si la opción seleccionada es una opción padre
        const parentOption = opPadre.find((option) => option.opcion_id === optionId);
        if (parentOption) {
          // Obtener las opciones hijas correspondientes a la opción padre seleccionada
          const childOptions = opHijo.filter((option) => option.opcion_padre === parentOption.opcion_orden);
          const childOptionIds = childOptions.map((option) => option.opcion_id);
  
          // Agregar las opciones hijas a la lista de opciones seleccionadas
          selected.push(...childOptionIds);
        } else {
          // Verificar si la opción seleccionada es una opción hija
          const childOption = opHijo.find((option) => option.opcion_id === optionId);
          if (childOption) {
            // Obtener el padre de la opción hija seleccionada
            const parentOption = opPadre.find((option) => option.opcion_orden === childOption.opcion_padre);
            if (parentOption) {
              // Verificar si el padre ya está seleccionado
              const isParentSelected = selected.includes(parentOption.opcion_id);
              if (!isParentSelected) {
                // Si el padre no está seleccionado, se agrega automáticamente a la lista de opciones seleccionadas
                selected.push(parentOption.opcion_id);
              }
            }
          }
        }
  
        return selected;
      });
    }
  };

  const handleSaveOptions = async () => {
    try {
      // Resetear las opciones existentes previamente para el rol seleccionado
      await fetchData(
        "http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiRolHasOption/apiRolHasOption.php/resetRolHasOptionWhitRolId",
        {
          idRol: selectedRolId,
        }
      );
  
      // Insertar las nuevas opciones seleccionadas
      for (const optionId of selectedOptions) {
        const data = {
          idRol: selectedRolId,
          idOption: optionId,
        };
  
        await fetchData(
          "http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiRolHasOption/apiRolHasOption.php/insertRolHasOption",
          data
        );
      }
  
      // Mostrar la alerta de éxito
      setShowAlert(true);
    } catch (error) {
      // Manejar errores si ocurren durante las llamadas a la API
      console.error("Error:", error);
    }
  };
  

  return (
    <>
      {/* <Header></Header>
      <Aside></Aside> */}
      <div className='content-wrapper addoptionssection'>
          {showAlert && (
                <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                Opciones asignadas con éxito
                </Alert>
          )}
          <Row>
            <Col>
              <Form.Group className="comboboxRol">
                      <Form.Label><h3>Roles</h3> </Form.Label>
                      <ComboboxRoles 
                          id={"roles"}
                          onRolIdChange={handleRolIdChange}
                      />
              </Form.Group>
              <h3 className="titleOptions">Opciones</h3>
              <Form>
                {opPadre.map(option => (
                  <React.Fragment key={option.opcion_id}>
                    <div className="opcionPadre">
                      <Form.Check
                          key={option.opcion_id}
                          type="checkbox"
                          id={option.opcion_id}
                          label={option.opcion_nombre}
                          inline 
                          checked={selectedOptions.includes(option.opcion_id)}
                          onChange={() => handleOptionChange(option.opcion_id)}
                      />
                    </div>
                    {opHijo.map(op => {
                      if (op.opcion_padre === option.opcion_orden) {
                        return (
                          <Form.Check
                              className="opcionHija"
                              key={op.opcion_id}
                              type="checkbox"
                              id={op.opcion_id}
                              label={op.opcion_nombre}
                              checked={selectedOptions.includes(op.opcion_id)}
                              onChange={() => handleOptionChange(op.opcion_id)}
                          />
                        );
                      }
                      return null;
                    })}
                  </React.Fragment>
                ))}
              </Form>
            </Col>
            <Col>
            <h3>Opciones seleccionadas:</h3>
                <ListGroup>
                    {selectedOptions.map((optionId) => (
                        <ListGroup.Item key={optionId}>
                            {options.find((option) => option.opcion_id === optionId)?.opcion_nombre}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <Button onClick={handleSaveOptions}>Guardar opciones</Button>
            </Col>
          </Row>
        </div>
      {/* <Footer></Footer> */}
    </>

    );
};