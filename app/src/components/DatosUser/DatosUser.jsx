import { useContext } from "react";
import { DataUser } from "../context/UserContext.jsx";
import { Table, Row, Col } from "react-bootstrap";


export default function DatosUser() {
  
  const { userglobal } = useContext(DataUser);

  return (
    <div className="content-wrapper contenteSites-body" style={{minHeight: '100vh'}}>
      <Table striped bordered hover className="table">
        <thead>
          <tr key="1">
            <th>Datos</th>
            <th>Información</th>
          </tr>
        </thead>
        <tbody>
          <tr key="2">
            <th>Nombre:</th>
            <th>{userglobal.persona_nombre}</th>
          </tr>
        </tbody>
        <tbody>
          <tr key="3">
            <th>Apellido:</th>
            <th>{userglobal.persona_apellido}</th>
          </tr>
        </tbody>
        <tbody>
          <tr key="4">
            <th>Teléfono:</th>
            <th>{userglobal.persona_telefono}</th>
          </tr>
        </tbody>
        <tbody>
          <tr key="5">
            <th>Telegram:</th>
            <th>{userglobal.persona_telegram}</th>
          </tr>
        </tbody>
        <tbody>
          <tr key="6">
            <th>NickName:</th>
            <th>{userglobal.persona_nickname}</th>
          </tr>
        </tbody>
        <tbody>
          <tr key="7">
            <th>CI:</th>
            <th>{userglobal.persona_ci}</th>
          </tr>
        </tbody>
      </Table>
      
      <br/><br/>
    </div>
    
  );
}
