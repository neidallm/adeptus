import React, { useEffect } from "react";
import {Form, Button, Modal} from "react-bootstrap";
import { useFetchSendData } from "../../hooks/HookFetchSendData";
import { useState } from "react";
import "./Options.css";

export default function FormAddRol({cancelar, asunto, bandera}){

    const {data, fetchData } = useFetchSendData();

    const [nameRol, setNameRol] = useState('');
    const [descriptionRol, setDescriptionRol] = useState('');
    const [nameRolError, setNameRolError] = useState(""); // Estado para el mensaje de error

    const[error,  setError] = useState(null);

    // useEffect(() => {
    //     if(data.desError === "Inserción fallida"){
    //         setError(data.desError);
    //     }else if (data.desError === "Inserción exitosa") {
    //         cancelar();
    //     }
    // }, [data, cancelar]);


    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Validar que solo se permitan caracteres en minúscula
        if (!/^[a-z\s]+$/.test(nameRol)) {
            setNameRolError("Solo se permiten caracteres en minúscula");
            return; // Salir de la función si no cumple la validación
        }

        const formData = {
            statusRol: 17,
            nameRol: nameRol,
            descriptionRol: descriptionRol
        };

        const reference = {
            tableNameReference : "persona",
            nameSpaceReference :  "persona_tipo",
            descriptionReference :  descriptionRol,
            valueReference :  nameRol,
            statusReference: 1
        }
        //console.log("lo que se envia a insert Rol", formData);
        //console.log("lo que se envia a insert referencia", reference);
        
        fetchData("http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiRol/apiRol.php/insertRol", formData);
        fetchData("http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiReference/apiReference.php/insertReference", reference);
        bandera("actualiza")
    };

    return(
        <Form className="FormAddRol" > 
            {/*Se borro onSubmit={handleSubmit} */}
                <Form.Group controlId="nameRol">
                    <Form.Label className="label">Nombre del Rol</Form.Label>
                    <Form.Control
                    type="text"
                    value={nameRol}
                    onChange={(event) => {
                        setNameRol(event.target.value);
                        setNameRolError(""); // Limpiar el mensaje de error al modificar el campo
                    }}
                    />
                    {nameRolError && <div className="error-message">{nameRolError}</div>} {/* Mostrar el mensaje de error si existe */}
                </Form.Group>
                <Form.Group controlId="descriptionRol">
                    <Form.Label className="label">Description Rol</Form.Label>
                    <Form.Control
                    as="textarea"
                    value={descriptionRol}
                    onChange={(event) => setDescriptionRol(event.target.value)}
                    />
                </Form.Group>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelar}>
                    Cancelar
                    </Button>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                    {asunto}
                    </Button>
                </Modal.Footer>
        </Form>
    )
}