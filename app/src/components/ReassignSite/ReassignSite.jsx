import React from "react";
import Header from "../Header/Header";
import Aside from "../Aside/Aside";
import Footer from "../Footer/Footer";
import { Modal, ModalBody , Button, Form,  Table } from "react-bootstrap";
import "./ReassignSite.css";
import { useState } from "react";

export default function ReassignSite() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const datos = [
        { id:'01', sitio: 'SITD13', nombre: 'Carlos',    apellido:'Campos Gutierrez',      tiempo: '02/06/23' },
        { id:'02', sitio: 'SITD16', nombre: 'Ivan',      apellido:'Orellana Sandoval',     tiempo: '15/06/23' },
        { id:'03', sitio: 'SITD16', nombre: 'Juan',      apellido:'Ramirez Rojas',         tiempo: '26/03/23' },
        { id:'04', sitio: 'SITD15', nombre: 'Luciana',   apellido:'Gutierrez Cortez',      tiempo: '02/03/23' },
        { id:'05', sitio: 'SITD16', nombre: 'Roberto',   apellido:'Lazarte Rosas',         tiempo: '24/06/23' }
    ];

    return(
        <>
        {/* <Header></Header>
        <Aside></Aside> */}
        <div className="content-wrapper reassignSite-Body">
        <Table striped bordered hover className="tableReassign">
                <thead>
                    <tr>
                    <th>Cliente</th>
                    <th>Nuevo Sitio</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((dato) => (
                            <tr key={dato.id}>
                                <td>{dato.nombre}  {dato.apellido}</td>
                                <td className="selectSite"> 
                                    <Form.Select aria-label="Default select example">
                                    <option>-Nuevo sitio-</option>
                                    {datos.map( (dato) => (
                                        <option> {dato.sitio} </option>
                                    ))}
                                    </Form.Select>
                                    <Button className="submitBtn" onClick={handleShow} >Reasignar</Button>
                                </td>
                            </tr>
                        ) )}
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose} centered >
                    <ModalBody className='modal-body' >
                        <h1 className='forgot-password-modal'> El sitio ha sido reasignado exitosamente </h1>
                        <Button className='modal-button' onClick={handleClose} >
                            Aceptar
                        </Button>
                    </ModalBody>
                </Modal>
        </div>
        {/* <Footer></Footer> */}
        </>
    )
}