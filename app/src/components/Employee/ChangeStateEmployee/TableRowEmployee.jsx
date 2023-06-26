import React from 'react';
import { useFetchSendData } from "../../../hooks/HookFetchSendData.js";
import { Table } from 'react-bootstrap';
import "../Employee.css";


function TableEmployee({ data ,getClients,bandera}) {
    const { fetchData } = useFetchSendData();

    const handleStateChange = async (personId, currentState) => {
        const newStatus = currentState === "1" ? "2" : "1";
         fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiPerson/apiPerson.php/changeStatePerson', {
            idPerson: personId,
            statusPerson: newStatus
        });
        getClients();
        bandera("actualiza")
    };

    return (
        <Table striped bordered hover className="table">
            <thead>
                <tr className='columnTittle'>
                    <th>Id</th>
                    <th>Nombre Completo</th>
                    <th>Teléfono</th>
                    <th>CI</th>
                    <th>Hora Ingreso</th>
                    <th>Hora Salida</th>
                    <th>Tipo Persona</th>
                    <th>Estado</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                {data.map((person) => (
                <tr className='columnContent' key={person.persona_id}>
                    <td>{person.persona_id}</td>
                    <td>{person.persona_nombre} {person.persona_apellido}</td>
                    <td>{person.persona_telefono}</td>
                    <td>{person.persona_ci}</td>
                    <td>{person.horario_entrada}</td>
                    <td>{person.horario_salida}</td>
                    <td>{person.personatipo}</td>
                    <td>{person.personaestado}</td>
                    <td>
                        <button className='btn btn-success btn-md mr-1' onClick={() => handleStateChange(person.persona_id, person.persona_estado)} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-dash-fill" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>
                                <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                            </svg>
                        </button>
                    </td>
                </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default TableEmployee;
