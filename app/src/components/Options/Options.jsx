import React from "react";
import Header from "../Header/Header";
import Aside from "../Aside/Aside";
import Footer from "../Footer/Footer";
import {Tabs, Tab} from "react-bootstrap";
import AddRolSection from "./AddRolSection";
import "./Options.css";
import AddOptions from "./AddOption";

export default function Options(){
    return(
        <>
        {/* <Header></Header>
        <Aside></Aside> */}
        <div className="content-wrapper" style={{minHeight: '100vh'}} >
        <Tabs
            defaultActiveKey="Añadir Rol"
            id="justify-tab-example"
            className="mb-3"
            justify
            >
                <Tab eventKey="Añadir Rol" title="Añadir Rol">
                    <AddRolSection/>
                </Tab>
                <Tab eventKey="Añadir opciones" title="Añadir Opciones">
                    <AddOptions></AddOptions>
                </Tab>
            </Tabs>
            {/* <div className="addOpciones">
                
            </div> */}
        </div>
        {/* <Footer></Footer> */}
        </>
    )
}