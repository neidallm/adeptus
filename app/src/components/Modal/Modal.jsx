//import React, { useState, useEffect } from "react";
import { Modal as BootstrapModal } from "react-bootstrap"; // importacion Button quitada

const Modal = ({ mostrarModal ,hide,title,contend,tamaño}) => {

  return (
    <BootstrapModal 
    show = {mostrarModal}  
    onHide={hide}
    size={tamaño}
    aria-labelledby="contained-modal-title-vcenter" 
    fullscreen =' md-down'
    >
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title >{title}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        {contend}
      </BootstrapModal.Body>
    </BootstrapModal>
  );
};

export default Modal;
