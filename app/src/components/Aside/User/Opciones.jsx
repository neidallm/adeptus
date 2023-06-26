
import { Link } from "react-router-dom";



export default function Opcions() {
  let optionsPadre = JSON.parse(localStorage.getItem("optionsPadre"));
  const optionsHijo = JSON.parse(localStorage.getItem("optionsHijo"));
  

  optionsPadre.sort(function (a, b) {
    return a.opcion_orden - b.opcion_orden;})
  
  return (
    optionsPadre.map((padre)=>
      
    <li className={`nav-item menu-open`} key={padre.opcion_id}>
      <a  className="nav-link active">
        <p>
          {padre.opcion_nombre}
        </p>
      </a><ul className="nav nav-treeview " >
      {optionsHijo.map((hijo)=>
      
      {if (hijo.opcion_padre===padre.opcion_orden) {
        return(
        <li className="nav-item block" key={hijo.opcion_id}>
          <Link  to={hijo.opcion_componente} className="nav-link">
            <i className="far fa-circle nav-icon"></i>
            <p>{hijo.opcion_nombre}</p>
          </Link >
        </li>)}
      }
      )}  
      </ul>
    </li>     
      
      ) 

    
    //trasfoma string a html
  );
}
