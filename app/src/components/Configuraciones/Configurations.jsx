import React, { useState } from 'react';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Aside from '../Aside/Aside';
import './Configuration.css'
import { useFetch } from '../../hooks/HookFetchListData';
import Dias from './ConfiguracionDias';
import { useFetchSendData } from '../../hooks/HookFetchSendData';
import NumeroSitios from './ConfigSitios';
import ConfiguracionesContac from './ConfigDatosDeContacto';
export default function Configura () {
    const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

    const{ fetchData }= useFetchSendData()

    
    return (
        <div>
          {/* <Header></Header>
          <Aside></Aside> */}
          <div className="content-wrapper contenteSites-body" style={{minHeight: '100vh'}} >
          <div className="tab-container">
            <div className="tab-buttons">
              <button
                className={`tab-button ${activeTab === 0 ? 'active-tab' : ''}`}
                onClick={() => handleTabClick(0)}
              >
                Datos de Contacto
              </button>
              <button
                className={`tab-button ${activeTab === 1 ? 'active-tab' : ''}`}
                onClick={() => handleTabClick(1)}
              >
                Horario de Días
              </button>
              <button
                className={`tab-button ${activeTab === 2 ? 'active-tab' : ''}`}
                onClick={() => handleTabClick(2)}
              >
                Número de Sitios
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 0 && <ConfiguracionesContac  fetchData={fetchData} />}
              {activeTab === 1 && (
                <Dias
                  
                  fetchData={ fetchData } // Extrae la función fetchData del hook useFetchSendData
                />
              )}
              {activeTab === 2 && <NumeroSitios fetchData={ fetchData }/>}
            </div>
          </div>
        </div>
        
          {/* <Footer></Footer> */}
        </div>
      );

  
  };