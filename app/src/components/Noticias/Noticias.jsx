import { Col, Row } from "react-bootstrap";
import { useFetch } from "../../hooks/HookFetchListData.js";
import Footer from "../Footer/Footer.js";
import Header from "../Header/Header.js";
import Aside from "../Aside/Aside.js";


export default function Noticias() {
    const { data, loading, error } = useFetch(
        "http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiNews/apiNews.php/listNewsActive"
      );


return(
    <div>
      {/* <Header></Header>
      <Aside></Aside> */}
<div className="content-wrapper contenteSites-body" style={{minHeight: '100vh'}}>
{!loading && (
        <div>
        <div className="d-flex justify-content-center align-items-center">
          <h5>Noticias</h5>
          </div>
          {data.desError? <label> No hay noticias </label>:(
          
          
          <Row >
            {data.map((noti) => (
              <Col key={noti.noticia_id} className="d-flex justify-content-center align-items-center" >
                <div className="card " style={{width:"400px"}}>
                  <div className="card-header">
                    <h3 className="card-title">{noti.noticia_titulo}</h3>
                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="collapse"
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="remove"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                  <div className="card-body">{noti.noticia_texto}</div>
                  <div className="card-footer">
                    Autor: {noti.autormodificacion}<br></br>
                    Fecha: {noti.noticia_ultima_modificacion.slice(0, 10)}
                  </div>
                </div>
              </Col>
            ))}
          </Row>)}
          
        </div>
      )}







</div>

{/* <Footer></Footer> */}
    </div>)



    
}