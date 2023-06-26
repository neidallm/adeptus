import { Button, Table } from "react-bootstrap";
import Aside from "../Aside/Aside";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useContext, useState } from "react";

import { useFetchSendData } from "../../hooks/HookFetchSendData";
import { DataUser } from "../context/UserContext";
import { useFetch } from "../../hooks/HookFetchListData";


export default function ReclamoConsulta () {
const { data, loading, error } = useFetch("http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiConfiguracion/apiConfiguracion.php/listConfigurationContacto")
  if(!loading){
    return(
       <div>
        {/* <Header></Header>
        <Aside/> */}
        <Claimquery datos={data.find(config => config.configuracion_nombre === "telefono").configuracion_valor1}></Claimquery>
        {/* <Footer></Footer> */}
       </div>
    )}
}
function Claimquery({datos}) {
  
    const {userglobal} = useContext(DataUser)
    
    const { data, fetchData} = useFetchSendData()
    
    const [selectedOption, setSelectedOption] = useState('');
    const [deReclamo, setdeReclamo] = useState('');
    const [message, setMessage] = useState('');
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    
    }
   
    
    const handleFormSubmit = () => {
        let fecha = new Date
        let datosparaf = {
            complaintStatus :  22,
            idPerson : userglobal.persona_id,
            complaintIssue :  deReclamo.toUpperCase(),
            complaintText :  message,
            complaintDate : fecha.getFullYear()+"-"+
            String(fecha.getMonth() + 1).padStart(2, '0')+"-"+
            String(fecha.getDate()).padStart(2, '0')+" "+
            String(fecha.getHours()).padStart(2, '0')+":"+
            String(fecha.getMinutes()).padStart(2, '0')+":"+
            String(fecha.getSeconds()).padStart(2, '0'),
            complaintSolution : " "
    }
    
        if (selectedOption==="Reclamo") {
            fetchData("http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiComplaint/apiComplaint.php/insertComplaint",datosparaf)
           
        }
        window.open("https://api.whatsapp.com/send?phone="+591+datos+"&text=<" + selectedOption.toUpperCase()+">%0A"+deReclamo.toUpperCase()+"%0A%0A"+message)
        alert(`titulo: <${deReclamo}> 
            Mensaje enviado: ${message}`);
            window.location.href = '/main'
 
      };
    const handleMessageChange = (event) => {
        setMessage(event.target.value);
      };
      
    return(
    <div className="content-wrapper contenteSites-body" style={{minHeight: '100vh'}} >
        
        <label style={{ fontSize: '30px' }}>Consulta o Reclamo</label>
        <Table striped bordered hover className="table">
        <thead>
            <tr>
            <th>Nombre del Campo </th>              
              <th> Datos </th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <th>Seleccione el tipo de mensaje</th>
            <td><select style={{ borderRadius: '5px' }} value={selectedOption} onChange={handleSelectChange} type="text">
        <option value="">-- Seleccionar --</option>
        <option value="Reclamo">Reclamo</option>
        
        <option value="Consulta">Consulta</option>
      </select>
      </td>
            </tr>
            </tbody>
{selectedOption==="Reclamo"?
            <tbody>
                <tr>
            <th>Ingrese título de reclamo</th> 
            <td><textarea id="Text"  onChange={(e)=>setdeReclamo(e.target.value)} /></td>
            </tr>
            
          </tbody>:<tbody></tbody>}



            <tbody>
                <tr>
            <th>Ingrese el mensaje</th> 
            <td><textarea id="message"  onChange={handleMessageChange} /></td>
            </tr>
            
          </tbody>
          
          </Table>
          <Button  variant="success" onClick={handleFormSubmit}>Enviar</Button>




    </div>)
}