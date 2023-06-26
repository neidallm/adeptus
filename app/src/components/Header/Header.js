import React from "react";
import { useFetch } from "../../hooks/HookFetchListData";
import { Link } from "react-router-dom";

export default function Header() {
   const { data, loading, error }= useFetch("http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiConfiguracion/apiConfiguracion.php/listConfigurationHorario")
  const localStorageValue = localStorage.getItem("mora") || localStorage.getItem("sus");
  
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a
            className="nav-link"
            data-widget="pushmenu"
            to="/#"
            role="button"
            href="Nada"
          >
            <i className="fas fa-bars" />
          </a>
        </li>

        

        <li className="nav-item d-none d-sm-inline-block">
           <Link to="/Noticias" className="nav-link">
            Noticias
          </Link> 
        </li>
        <li className="nav-item dropdown">
  <a className="nav-link" data-toggle="dropdown" href="/#">
    Horarios de atención
  </a>
  <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
    <span className="dropdown-item dropdown-header">Horario por día</span>
    <div className="dropdown-divider" />
    {!loading ? (
      data.sort((a, b) => parseInt(a.configuracion_id) - parseInt(b.configuracion_id)).map((dia) => (
        <a
          className="dropdown-item"
          key={dia.configuracion_id}
          onClick={(e) => e.preventDefault()} // Evitar acción predeterminada del clic
        >
          <label style={{ fontWeight: 'bold' }}>{dia.configuracion_nombre}:</label>
          <br />
          <div>Apertura: {dia.configuracion_valor1}</div>
          <div>Cierre: {dia.configuracion_valor2}</div>
        </a>
      ))
    ) : (
      <a className="dropdown-item">Cargando</a>
    )}
  </div>
</li>
        </ul>
        <ul className="navbar-nav ml-auto" >
        {localStorageValue && (
          <li className="nav-item d-none d-sm-inline-block" >
            <a className="nav-link" style={{ color: localStorageValue === localStorage.getItem("mora") ? "red" : "green" }}>
              {localStorageValue}
            </a>
          </li>
        )}
      </ul>

      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
      
    
      <li className="nav-item d-none d-sm-inline-block">
          <a href="/#" style={{ color: 'red' }} className="nav-link">Cerrar Sesión</a>
        </li>
      </ul>
    </nav>
  );
}

        