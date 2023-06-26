import React, { useContext, useState } from "react";
import "./Login.css";

import { Button, Modal, ModalBody } from "react-bootstrap";


import { useNavigate } from "react-router-dom";
import { sendAndReceiveJson } from "../../hooks/HookFetchSendAndGetData";
import Comprueba from "./Comprueba";
import { DataUser } from "../context/UserContext";


export default function Login() {
  const {setUserglobal} = useContext(DataUser)
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [nickname, setcorreo] = useState("");
  const [contraseña, setcontraseña] = useState("");
  const [errorlog, seterrorlog] = useState("");

  function ClickComprobar() {
    const validatePerson = {
      nicknamePerson: nickname,
      passwordPerson: contraseña,
    };
    if (nickname===""||contraseña==="") {
      seterrorlog("Los campos Usuario y Contraseña deben ser llenados")
    } else {
      sendAndReceiveJson(
        "http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiPerson/apiPerson.php/validatePerson",
        validatePerson
      ).then((responseData) => {
        // Trabaja con la respuesta JSON recibida
        seterrorlog(Comprueba(navigate, responseData,setUserglobal));
      });
    }
    
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  localStorage.clear();
  return (
    <div className="login">
      <div className="d-flex justify-content-center align-items-center">
        <div className="login-box">
          {/* /.login-logo */}
          <div className="card card-outline card-primary">
            <div className="card-header text-center">
              <a href="/" className="h1">
                <b>Inicio de Sesión </b>
                <br />
                UniPark
              </a>
            </div>

            <div className="card-body">
              <p className="login-box-msg">
              Ingrese sus credenciales para iniciar sesión
              </p>
              {/* <form action="/main"> */}
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Usuario"
                  onChange={(e) => {
                    setcorreo(e.target.value);
                  }}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-person-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  onChange={(e) => {
                    setcontraseña(e.target.value);
                  }}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>

              <div className="rowx">
                <p className="mb-1 forgot-password" onClick={handleShow}>
                  {/* <a href='/login' onClick={handleShow} >Olvide mi contraseña</a> */}
                  Olvide mi contraseña
                </p>
                <div style={{ color: "red" }}>
                  {errorlog !== "" ? <span>{errorlog}</span> : <span></span>}
                </div>
                <div className="col-12 iniciar-button">
                  {/* <Link to={direccion} > */}
                  <button
                    onClick={() => ClickComprobar()}
                    type="submit"
                    className="btn btn-primary btn-block "
                  >
                    Iniciar
                  </button>

                  {/* </Link> */}
                </div>
              </div>
            </div>

            {/* /.card-body */}
          </div>
          {/* /.card */}
        </div>

        <Modal show={show} onHide={handleClose} centered>
          <ModalBody className="modal-body">
            <h1 className="forgot-password-modal">
              {" "}
              Consulte con el administrador del sistema
            </h1>
            <Button className="modal-button" onClick={handleClose}>
              Aceptar
            </Button>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}
