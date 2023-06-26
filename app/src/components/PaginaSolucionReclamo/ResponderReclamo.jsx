import { Button, Table,Modal, ModalBody,Form } from "react-bootstrap";
import { useFetch } from "../../hooks/HookFetchListData";
import React, { useState } from "react";
import { useFetchSendData } from "../../hooks/HookFetchSendData";
export default function ResRec() {
  const { data:listap, loading, error:errorp }= useFetch("http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiPerson/apiPerson.php/listPerson")
  const [reclamoset, setreclamoset] = useState([]);
  const {data,fetchData,error} = useFetchSendData(
    );
  const [solucion, setsolucion] = useState(null);
  const [show, setShow] = useState(false);

  const { data:datosr, loading:loadingr,} = useFetch(
    "http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiComplaint/apiComplaint.php/listComplaint"
  );
  const handleClose = () => setShow(false);
  
  function Cambiosol() {
    const [mipersona] = listap.filter((per)=> per.persona_id===reclamoset.persona_id)
    let myData = { "idComplaint" : reclamoset.reclamo_id,
    "complaintSolution" : solucion}; // datos a enviar en la primera llamada
    fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiComplaint/apiComplaint.php/changeSolutionComplaint',myData);
    myData = {
      "idComplaint" : reclamoset.reclamo_id,
      "complaintStatus" :  21
}
    fetchData("http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiComplaint/apiComplaint.php/changeStateComplaint",myData)
    window.open("https://api.whatsapp.com/send?phone=591"+mipersona.persona_telefono +"&text=<" + "AVISO"+">%0ALa respuesta de el Reclamo:"+reclamoset.reclamo_asunto+" %0A%0Aes:"+solucion)
   alert(`Se actualizo los la acción tomada`);

            
    setShow(false);
    
  }
    
  function ClikComprovar(dato){
    
    setreclamoset(dato)
    setShow(true);
    


  }
  const [datoFiltro, setdatoFiltro] = useState([])
    const [selectedOption, setSelectedOption] = useState('');
    const handleSelectChange = (event) => {
      setSelectedOption(event.target.value);
     
      if (event.target.value!=="") {
        setdatoFiltro(datosr.filter((fil)=> fil.reclamoestado===event.target.value))
      } else {
        setdatoFiltro(datosr)
      }
     
      }
  if (!loadingr&&!loading ) {
   
    if (datoFiltro.length===0) {
      setdatoFiltro(datosr)
    }
    return(
      <div className="content-wrapper contenteSites-body" style={{minHeight: '100vh'}} >
        <div style={{ color: "red" }}>
                                    {error!=="" ? <span>{error}</span> : <span></span> }
                                    </div>
            {datosr.desError ? <span>{datosr.desError}</span>:
            <>
            <select style={{ borderRadius: '5px' }} value={selectedOption} onChange={handleSelectChange} type="text">
         <option value="">Todo</option>
          <option value="inactivo">no atendido</option>
        
         <option value="activo">atendido</option>
        </select>
            <Table striped bordered hover className="table">
                <thead>
                    <tr>
                    <th>Nombre </th>
                    <th>Asunto</th>
                    <th>Fecha</th>
                    <th> Reclamo </th>
                    <th> Accion Tomada </th>
                    <th>    </th>
                    </tr>
                </thead>
                <tbody>
                  
                  
                    {datoFiltro.map((reclamoPersona) => (
                        <tr key={reclamoPersona.reclamo_id}>
                            <td>{reclamoPersona.reclamo_persona}</td>
                            <td>{reclamoPersona.reclamo_asunto}</td>
                            <td>{reclamoPersona.reclamo_fecha}</td>
                            <td>{reclamoPersona.reclamo_texto}</td>
                            <td>{reclamoPersona.reclamo_solucion}</td>
                            <td><Button
                                                variant="success"
                                                onClick={()=>ClikComprovar(reclamoPersona)}
                                                type='submit'
                                                className="btn btn-primary btn-block  "
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                
                                                </svg>
                                            </Button></td>
                        </tr>
                    ) )}
                      
                </tbody>
                
            </Table>
           
           
            </>} 



            <Modal show={show} onHide={handleClose} centered >
                    <ModalBody className='modal-body' >
                        <h1 className='forgot-password-modal'> Editar Accion</h1>
                        <Form  className="container" >
                        
                        <Form.Label className="text-left"style={{ display: 'flex', justifyContent: 'flex-start' }}>Nombre: {reclamoset.reclamo_persona }</Form.Label>
                        <Form.Label className="text-left"style={{ display: 'flex', justifyContent: 'flex-start' }}>Asunto: {reclamoset.reclamo_asunto }</Form.Label>
                        <Form.Label className="text-left"style={{ display: 'flex', justifyContent: 'flex-start' }}>Fecha: {reclamoset.reclamo_fecha }</Form.Label>
                        <Form.Label className="text-left"style={{ display: 'flex', justifyContent: 'flex-start' }}>Reclamo: {reclamoset.reclamo_texto }</Form.Label>
                        <div></div>
                        <Form.Label className="text-left"style={{ display: 'flex', justifyContent: 'flex-start' }}>Accion Tomada: </Form.Label>
                        <div></div>
                        <textarea placeholder={reclamoset.reclamo_solucion} onChange={(e)=>setsolucion(e.target.value)}></textarea>


                        




                        </Form>
                        
                        
                        <div><Button variant="success" className='modal-button' onClick={Cambiosol} >
                            Aceptar
                        </Button>
                        </div>
                    </ModalBody>
                </Modal>
            </div>

            



    )
    

    
    
  }
}
