import React, { useState, useContext, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { DataUser } from '../context/UserContext.jsx';

export default function Modalmensaje({
  Titul,
  Mensaje,
  id,
  estado,
  fetchData,
  handleClose,
  fetchConfiguraciones
}) {
  const { userglobal } = useContext(DataUser);
  const [url, setUrl] = useState("");
  const [json, setJson] = useState({});
  const [mensaje, setMensaje] = useState(Mensaje);
  const [titulo, setTitulo] = useState(Titul);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (url !== "" && Object.keys(json).length !== 0&&mensaje && titulo&&tieneCaracterAlfabeto(titulo)&&tieneCaracterAlfabeto(mensaje)) {
      
      fetchData(url, json);

      setError(null);
      
      handleClose();
    }
    fetchConfiguraciones()

  }, [url, json]);
  function tieneCaracterAlfabeto(str) {
    const regex = /[a-zA-Z]/;
    return regex.test(str);
  }
  function guardar() {
    
    if (id !== "" && estado !== "") {
      setUrl("http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiNews/apiNews.php/editNews");
      setJson({
        "idNews": id,
        "statusNews": 26,
        "lastPerson": userglobal.persona_id,
        "titleNews": titulo,
        "textNews": mensaje,
      });
      
    }else{
        setUrl("http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiNews/apiNews.php/insertNews");
        setJson({
            "idPerson" : userglobal.persona_id,
            "statusNews" :  26,
            "lastPerson" :  userglobal.persona_id,
            "titleNews" : titulo,
            "textNews" : mensaje
    });

    }

    if (mensaje && titulo&&tieneCaracterAlfabeto(titulo)&&tieneCaracterAlfabeto(mensaje)) {
      setError(null);
    } else {
      setError("Debe llenar los campos de Título y Mensaje");
    }
  }

  return (
    <div>
      <Form className="container">
        <Form.Group>
          <Form.Label className="text-left">Título</Form.Label>
        </Form.Group>
        <Form.Group>
          <textarea
            rows="3"
            cols="20"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}Título
          ></textarea>
        </Form.Group>
        <Form.Group>
          <Form.Label className="text-left">Mensaje</Form.Label>
        </Form.Group>
        <Form.Group>
          <textarea
            rows="3"
            cols="20"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          ></textarea>
        </Form.Group>
      </Form>
      <Button
        variant="success"
        onClick={() => guardar()}
        type="submit"
        className="btn btn-primary"
      >
        Guardar
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
      {error && <div className="text-danger">{error}</div>}
    </div>
  );
}