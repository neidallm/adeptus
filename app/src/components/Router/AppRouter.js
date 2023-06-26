import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Login from "../Login/Login";
import { Main } from "../Main/Main";
import ContentUnavalible from "../ContentUnavaliableSites/ContentUnavaliableSites";
import ContentSitesAvalible from "../ContentAvaliableSites/ContentSitesAvaliable";
import Persons from "../Persons/Persons";
//import SolucionAccionReclamo from "../PaginaSolucionReclamo/SolucionAccionReclamo";
//import ComboboxPerson from "../ComboboxPerson/ComboboxPerson";
import { VehicleEdit } from "../Vehicle/VehicleEdit";
import ListCli from "../ListasDeUsuario/Lista usuarios";
import EditPerson from "../Persons/EditPerson";
import DeletePerson from "../Persons/ChangeState/ChangeStatePerson";
import { Solicitude } from "../Solicitude/Solicitude";
import { SubscriptionList } from "../Subscription/SuscriptionToList";
//import Employee from "../Employee/Employee";
import EditEmpleado from "../Employee/EditEmpleado";
import Event from "../Event/Event";
import ViewEmployee from "../Employee/ViewEmployee";
import ViewPerson from "../Persons/ViewPerson";
import { TarifaEdit } from "../Tarifa/TarifaEdit";
import Mensaje from "../MensajesGlobales/GroupTelegram";
import ReclamoConsulta from "../Reclamo-Consulta/RecCon";
import { SubscriptionToChangeStatus } from "../Subscription/SuscriptionToChangeStatus";
import ListaPag from "../Listar Pagos/ListaPago";
import Configurations from "../Configuraciones/Configurations";
import Options from "../Options/Options";
import { SolicitudeList } from "../Subscription/SolicitudeList";
import { SubscriptionEdit } from "../Subscription/SubscriptionEdit";
import { SolicitudeToChangeStatus } from "../Subscription/SolicitudeToChangeStatus";
import { TarifaListCreate } from "../Tarifa/TarifaListAndCreate";
import { VehicleListCreate } from "../Vehicle/VehicleListAndCreate";
import ListPersons from "../Persons/ListPersons";
import ListEmployee from "../Employee/ListEmpleados";
import DeleteEmployee from "../Employee/ChangeStateEmployee/ChangeStateEmployee";
import { SubscriptionInMora } from "../Subscription/SuscriptionInMora";
import Noticias from "../Noticias/Noticias";
import Listapagoclien from "../Listar Pagos/ListaPagoClien";
import AddRolSection from "../Options/AddRolSection";
import AddOptions from "../Options/AddOption";
import Aside from "../Aside/Aside";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import { useContext } from "react"
import { DataUser } from '../context/UserContext.jsx';

export const AppRouter = () => {

  const {userglobal} = useContext(DataUser);
  console.log(userglobal);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        {/* <Route path="*" element={<Login />} /> */}
      </Routes>
      {userglobal?(
        <>
        <Aside></Aside>
        <Header></Header>
        </>
      ):(
        <></>
      )}
      <Routes>
        {/*---------------------------Rutas------------------------ */}
        {/* Sitios */}
        <Route
          path="/sitiosDisponibles"
          element={<ContentSitesAvalible />}
        />{" "}
        {/* Ver Lista de Sitios Disponibles */}
        <Route path="/sitiosOcupados" element={<ContentUnavalible />} />{" "}
        {/* Ver Lista de Sitios No Disponibles */}
        <Route path="/main" element={<Main />} /> {/* Mis datos */}
        {/* Clientes */}

        {/* <Route path="/addClientes" element={<Persons />} />{" "} */}
        
        {/* Registrar Datos de Clientes */}
        <Route path="/listClientes" element={<ListPersons />} />{" "}
        {/* Ver Lista de Clientes */}
        <Route path="/editClientes" element={<EditPerson />} />{" "}
        {/* Modificar Datos de Clientes */}
        <Route path="/statusClientes" element={<DeletePerson />} />{" "}
        {/* Eliminar Clientes */}
        <Route path="/viewClientes" element={<ViewPerson />} />{" "}
        {/* Ver Datos de Clientes */}
        {/* Empleados */}

        {/* <Route path="/addEmpleados" element={<Employee />} />{" "} */}
        
        {/* Registrar Datos de Empleados */}
        <Route path="/listEmpleados" element={<ListEmployee />} />{" "}
        {/* Ver Lista de Empleados */}
        <Route path="/editEmpleados" element={<EditEmpleado />} />{" "}
        {/* Modificar Datos de Empleados */}
        <Route path="/statusEmpleados" element={<DeleteEmployee />} />{" "}
        {/* Eliminar Empleados */}
        <Route path="/viewEmpleados" element={<ViewEmployee />} />{" "}
        {/* Ver Datos de Empleados */}
        {/* Vehiculo */}
        <Route
          path="/registrarVehiculo"
          element={<VehicleListCreate crear={true} />}
        />{" "}
        {/* Registrar datos de Vehiculo */}
        <Route path="/listvehiculo" element={<VehicleListCreate />} />{" "}
        {/* Ver Lista de Vehiculos */}
        <Route path="/listEditarVehiculo" element={<VehicleEdit />} />{" "}
        {/* Modificar datos de Vehiculo */}
        {/* Solicitud */}
        <Route path="/listaSolicitudes" element={<SolicitudeList />} />{" "}
        {/* Ver Lista de Solicitudes */}
        <Route
          path="/listaEstadoSolicitudes"
          element={<SolicitudeToChangeStatus />}
        />{" "}
        {/* Modificar Estado de Solicitud */}
        <Route path="/solicitud" element={<Solicitude />} />{" "}
        {/* Realizar Solicitud*/}
        {/* Suscipcion */}
        <Route
          path="/listaEstadoSuscripciones"
          element={<SubscriptionToChangeStatus />}
        />{" "}
        {/* Modificar Estado de Suscripcion*/}
        <Route path="/listaSuscipciones" element={<SubscriptionList />} />{" "}
        {/* Ver lista de Suscripciones */}
        <Route
          path="/listaEditarSuscipciones"
          element={<SubscriptionEdit />}
        />{" "}
        {/* Modificar Datos deSuscripciones*/}
        {/* Tarifa */}
        <Route
          path="/registrarTarifa"
          element={<TarifaListCreate crear={true} />}
        />{" "}
        {/* Registrar datos de Tarifa */}
        <Route path="/listaTarifa" element={<TarifaListCreate />} />{" "}
        {/* Ver Lista de Tarifas */}
        <Route path="/editartarifa" element={<TarifaEdit />} />{" "}
        {/* Modificar datos de Tarifa */}

        {/* Mensajes y Avisos*/}
        <Route path="/listMensaje" element={<ListCli />} />{" "}
        {/* Mensajes Directos */}
        <Route path="/MensajeMora" element={<SubscriptionInMora />} />{" "}
        {/* Mensajes a Usuarios en Mora */}
        <Route path="/MensajeGlobal" element={<Mensaje />} />{" "}
        {/* Avisos Generales  */}
        {/* Administracion de Reclamos */}
        
        {/* Responder Reclamos */}
        <Route path="/Reclamos" element={<ReclamoConsulta />} />{" "}
        {/* Hacer un Reclamo o Consulta */}
        {/* Reportes y Configuracion General */}
        <Route path="/ListaPagos" element={<ListaPag />} /> {/* Listar Pagos */}
        <Route path="/Configurar" element={<Configurations />} />{" "}
        {/* Configuraciones Generales de Parqueo */}

        {/* Asignar */}
        <Route path="/addUser"    element={<Persons />}/>
        <Route path="/PagoUser"    element={<Listapagoclien />}/>
        {/*------------------ Sin Clasificar aun ------------------------*/}
        <Route path="/opciones" element={<Options />} /> {/* Gestion de roles  */} {/* Configuracion */}
        
        <Route path="/evento" element={<Event />} /> {/* Registrar evento */} {/* Vehiculo */}
        
        <Route path="/addRol" element={<AddRolSection/>}/> {/* Agregar roles*/} {/* Configuraciones */}
        <Route path="/addOptions" element={<AddOptions/>}/> {/* Agregar opciones a rol*/} {/* Configuraciones */}

        <Route path="/Noticias" element={<Noticias />} />
      </Routes>
      {userglobal?(
        <>
        <Footer></Footer>
        </>
      ):(
        <></>
      )}
    </Router>
  );
};
