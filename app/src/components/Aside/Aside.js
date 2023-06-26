import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from "react"
 import Opcions from "./User/Opciones.jsx";
import { DataUser } from '../context/UserContext.jsx';





export default function Aside() {
  const {userglobal} = useContext(DataUser)
  
  if (userglobal!==null) {
    
  
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4 content " style={{ position: "fixed",
    overflowY: "auto",
    maxHeight: "100vh",}} >
      {/* Brand Logo */}

      <Link to="#" data-widget="pushmenu" className="brand-link">
        <img
          src="dist/img/uni-park.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{           
            opacity: ".8",
            marginLeft: "-1px",
            marginTop: "-15px",
            maxHeight: "55px",
            border: "10px",
          }}
        />
        <span  className="brand-text font-weight-light">UNI-PARK </span>
        
      </Link>
      
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="info">
            <Link to="/main" className="d-block">
              {userglobal.persona_nombre} {userglobal.persona_apellido}
            </Link>
          </div>
        </div>
        {/* SidebarSearch Form */}
        <div className="form-inline">
          <div className="input-group" data-widget="sidebar-search">
            <input
              className="form-control form-control-sidebar"
              type="search"
              placeholder="Buscar"
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="btn btn-sidebar">
                <i className="fas fa-search fa-fw" />
              </button>
            </div>
          </div>
        </div>
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {<Opcions />}
            <br/>
          </ul>
          
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
      <style>
          {`
            ::-webkit-scrollbar {
              width: 8px;
              background-color: #f5f5f5;
            }

            ::-webkit-scrollbar-thumb {
              background-color: #888;
              border-radius: 4px;
            }

            ::-webkit-scrollbar-thumb:hover {
              background-color: #555;
            }
          `}
        </style>
    </aside>
    
  );
}
}