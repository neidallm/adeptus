import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import { useFetchSendData } from "../../hooks/HookFetchSendData";
//import "./FormPersona.css";
import ComboboxReferences from "../ComboboxReferences/ComboboxReferencia2";
import { useFetch } from "../../hooks/HookFetchListData";
import { sendAndReceiveJson } from "../../hooks/HookFetchSendAndGetData";
//import DateTime from "react-datetime";

const FormularioEmpleado = ({
  asunto,
  cancelar,
  persona,
  actualizarVehiculo,
  añadirNuevo,
  soloLectura = false
}) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [idPer, setIdPer] = useState(null);
  const [horarioG, sethorarioG] = useState({});
  //setSelectedReferenciaId(referenciaId);

  const handleValueChange = (option) => {

    setSelectedValue(option);
  };
  const { data, fetchData } = useFetchSendData();
  const { data: hasRol, fetchData: senRol } = useFetchSendData();
  const { data: hasHorario, fetchData: senHorario } = useFetchSendData();

  const { data: lista, loading } = useFetch(
    "http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiPerson/apiPerson.php/listPerson"
  );


  useEffect(() => {


    if(data && Object.keys(data).length > 0 && typeof data[0] === 'object' && 'persona_id' in data[0]){
      const personaId = data[0].persona_id;
      setIdPer(personaId);
      senRol("http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiPersonHasRol/apiPersonHasRol.php/insertPersonHasRol", 
      {
        idPerson: personaId,
        idRol: 3 
      });

    }

    

    if (data.desError) {

      localStorage.setItem("Error", data.desError);
    }
  }, [data]);

  const enviarHorario= async(horario = null) => {
    if (horario!=null) {

      sethorarioG(horario);
      cancelar();
    }
  }
  
  useEffect(() => {

  }, [hasHorario])
  
  
  useEffect(() => {
    

    horarioG.idPerson = idPer;
    senHorario("http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiSchedule/apiSchedule.php/insertSchedule",horarioG);
  }, [hasRol,sethorarioG]);
  
  return (
    <>
      <Formik
      initialValues={
        persona
          ? {
              idPerson: persona.persona_id,
              typePerson: persona.persona_tipo,
              namePerson: persona.persona_nombre,
              lastNamePerson: persona.persona_apellido,
              ciPerson: persona.persona_ci,
              phonePerson: persona.persona_telefono,
              telegramPerson: persona.persona_telegram,
              statusPerson: persona.persona_estado,
              nicknamePerson: persona.persona_nickname,
              passwordPerson: persona.persona_contraseña,
              idSchedule: persona.horario_id,
              daySchedule :  persona.horario_dia,
              entrySchedule:  persona.horario_entrada,
              departureSchedule:  persona.horario_salida
            }
          : {
              typePerson: "",
              namePerson: "",
              lastNamePerson: "",
              ciPerson: "",
              phonePerson: "",
              telegramPerson: "",
              statusPerson: "1",
              nicknamePerson: "",
              passwordPerson: "",
              daySchedule :  "Lunes a Viernes",
              entrySchedule:  "",
              departureSchedule:  ""
            }
      }
      validate={(values) => {
        const errors = {};

        if (!values.namePerson) {
          errors.namePerson = "Campo Obligatorio";
        } else {
          if (values.namePerson.startsWith(" ")) {
            errors.namePerson = "Este campo no puede empezar con espacio “ ”";
          } else {
            if (/\s\s+/i.test(values.namePerson)) {
              errors.namePerson =
                "Solo se permite un caracter espacio entre 2 nombres";
            } else {
              if (
                /[^a-zA-Z-ÿ\u00f1\u00d1\u00E0-\u00FC\u00DC\s]/i.test(
                  values.namePerson
                )
              ) {
                errors.namePerson = "Se ingreso un caracter invalido";
              }
            }
          }
        }

        if (!values.lastNamePerson) {
          errors.lastNamePerson = "Campo Obligatorio";
        } else {
          if (values.lastNamePerson.startsWith(" ")) {
            errors.lastNamePerson =
              "Este campo no puede empezar con espacio “ ”";
          } else {
            if (/\s\s+/i.test(values.lastNamePerson)) {
              errors.lastNamePerson =
                "Solo se permite un caracter espacio entre 2 apellidos";
            } else {
              if (
                /[^a-zA-Z-ÿ\u00f1\u00d1\u00E0-\u00FC\u00DC\s]/i.test(
                  values.lastNamePerson
                )
              ) {
                errors.lastNamePerson = "Se ingreso un caracter invalido";
              }
            }
          }
        }

        if (!values.ciPerson) {
          errors.ciPerson = "Campo Obligatorio";
        } else {
          if (/[^0-9]/i.test(values.ciPerson)) {
            errors.ciPerson = "Se ingreso un caracter invalido ";
          } else {
            if (!loading) {
              if (
                lista.filter((CI) => CI.persona_ci === values.ciPerson).length >
                0
              ) {
                errors.ciPerson = "CI ya registrado a otro usuario";
              }
            }
          }
        }

        if (!values.phonePerson) {
          errors.phonePerson = "Campo Obligatorio";
        } else if (/[^0-9]/i.test(values.phonePerson))
         {errors.phonePerson = "Se ingreso un caracter invalido";
          } else {
          if (values.phonePerson.length !== 8) {
            errors.phonePerson = "Un número de teléfono debe tener 8 digitos";
          } else {
            if (
              !values.phonePerson.startsWith("6") &&
              !values.phonePerson.startsWith("7")
            ) {
              errors.phonePerson = "Un número de teléfono debe iniciar con 6 o 7";
        
            } else {
              if (!loading) {
                if (
                  lista.filter(
                    (CI) => CI.persona_telefono === values.phonePerson
                  ).length > 0
                ) {
                  errors.phonePerson = "Teléfono ya registrado a otro usuario";
                }
              }
            }
          }
        }

        if (selectedValue !== null) {
          values.typePerson = selectedValue.value;
        }

        if (!values.typePerson) {
          errors.typePerson = "Debe escoger darle un rol";
        }

        if (!values.nicknamePerson) {
          errors.nicknamePerson = "Campo Obligatorio ";
        } else {
          if(/[^A-Za-z-0-9\u00f1\u00d1\u00E0\u00FC\u00DC]/i.test(
            values.nicknamePerson
          )){errors.nicknamePerson = "Se ingreso un caracter invalido" }
          else{
          if (!loading) {
            if (
              lista.filter(
                (CI) =>
                  CI.persona_nickname.toLowerCase() ===
                  values.nicknamePerson.toLowerCase()
              ).length > 0
            ) {
              errors.nicknamePerson = "Nickname ya registrado a otro usuario";
            }
          }}
        }

        if (!values.passwordPerson) {
          errors.passwordPerson = "El campo es requerido";
        } else if (
          /[^A-Za-z-0-9\u00f1\u00d1\u00E0\u00FC\u00DC]/i.test(
            values.passwordPerson
          )
        ) {
          errors.passwordPerson = "datos invalidos";
        }
        
        return errors;
      }}
      onSubmit={async (values) => {

        values.telegramPerson = values.phonePerson;
        const horariosChange = {
          idSchedule : values.idSchedule,
          daySchedule :  values.daySchedule,
          entrySchedule : values.entrySchedule,
          departureSchedule :  values.departureSchedule
        }
        
        const datosEmpleado = {
          typePerson : values.typePerson,
          namePerson : values.namePerson,
          lastNamePerson : values.lastNamePerson,
          ciPerson :  values.ciPerson,
          phonePerson: values.phonePerson,
          telegramPerson : values.phonePerson,
          statusPerson: values.statusPerson,
          nicknamePerson: values.nicknamePerson,
          passwordPerson: values.passwordPerson
        }
    
        if (persona) {

          await fetchData(
            "http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiPerson/apiPerson.php/editPerson",
            datosEmpleado
          );
          enviarHorario(horariosChange);
          sethorarioG(horariosChange);
        } else {
          const horariosChange = {
            idPerson : 0,
            daySchedule :  values.daySchedule,
            entrySchedule : values.entrySchedule,
            departureSchedule :  values.departureSchedule
          }
          await fetchData("http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiPerson/apiPerson.php/insertPerson",datosEmpleado);

          enviarHorario(horariosChange);

        }
      }}
    >
      {({ values, errors, handleBlur, handleChange, handleSubmit }) => (
        <Form className="container ">
          {/* {data ? <span>{data}</span> : <span></span>} */}
          <div className="row ">
            <div className="col-md-2" style={{ width: "220.60000000000002px" }}>
              <Form.Group className="inputGroup " controlId="namePerson">
                <Form.Label className="label text-left ">Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="namePerson"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.namePerson}
                  readOnly = {soloLectura}
                />
                <ErrorMessage
                  name="namePerson"
                  component={() => (
                    <div className="text-danger">{errors.namePerson}</div>
                  )}
                ></ErrorMessage>
              </Form.Group>
            </div>
            <div className="col-md-2" style={{ width: "220.60000000000002px" }}>
              <Form.Group className="inputGroup" controlId="lastNamePerson">
                <Form.Label className="label">Apellido</Form.Label>
                <Form.Control
                  type="text"
                  name="lastNamePerson"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastNamePerson}
                  readOnly = {soloLectura}
                />
                <ErrorMessage
                  name="lastNamePerson"
                  component={() => (
                    <div className="text-danger">{errors.lastNamePerson}</div>
                  )}
                ></ErrorMessage>
              </Form.Group>
            </div>
            <div
              className=" col-md-2"
              style={{ width: "220.60000000000002px" }}
            >
              <Form.Group className="inputGroup" controlId="ciPerson">
                <Form.Label className="label">CI</Form.Label>
                <Form.Control
                  type="text"
                  name="ciPerson"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.ciPerson}
                  readOnly = {soloLectura}
                />
                <ErrorMessage
                  name="ciPerson"
                  component={() => (
                    <div className="text-danger">{errors.ciPerson}</div>
                  )}
                ></ErrorMessage>
              </Form.Group>
            </div>
            <div
              className="col-md-2 "
              style={{ width: "220.60000000000002px" }}
            >
              <Form.Group className="inputGroup" controlId="phonePerson">
                <Form.Label className="label">Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  name="phonePerson"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phonePerson}
                  readOnly = {soloLectura}
                />
                <ErrorMessage
                  name="phonePerson"
                  component={() => (
                    <div className="text-danger">{errors.phonePerson}</div>
                  )}
                ></ErrorMessage>
              </Form.Group>
            </div>
            <div
              className="col-md-2 "
              style={{ width: "220.60000000000002px" }}
            >
              <Form.Group className="inputGroup" controlId="nicknamePerson">
                <Form.Label className="label">Nickname</Form.Label>
                <Form.Control
                  type="text"
                  name="nicknamePerson"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.nicknamePerson}
                  readOnly = {soloLectura}
                />
                <ErrorMessage
                  name="nicknamePerson"
                  component={() => (
                    <div className="text-danger">{errors.nicknamePerson}</div>
                  )}
                ></ErrorMessage>
              </Form.Group>
            </div>
            <div
              className="col-md-2 "
              style={{ width: "220.60000000000002px" }}
            >
              <Form.Group className="inputGroup" controlId="passwordPerson">
                <Form.Label className="label">Contraseña</Form.Label>
                <Form.Control
                  type="text"
                  name="passwordPerson"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.passwordPerson}
                  readOnly = {soloLectura}
                />
                <ErrorMessage
                  name="passwordPerson"
                  component={() => (
                    <div className="text-danger">{errors.passwordPerson}</div>
                  )}
                ></ErrorMessage>
              </Form.Group>
            </div>

            <div
              className="col-md-2 "
              style={{ width: "220.60000000000002px" }}
            >
              <Form.Group className="inputGroup" controlId="entrySchedule">
                <Form.Label className="label">Hora Ingreso</Form.Label>
                <Form.Control
                  step={1}
                  type="time"
                  name="entrySchedule"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.entrySchedule}
                  readOnly = {soloLectura}
                />
                <ErrorMessage
                  name="entrySchedule"
                  component={() => (
                    <div className="text-danger">{errors.entrySchedule}</div>
                  )}
                ></ErrorMessage>
              </Form.Group>
            </div>

            <div
              className="col-md-2 "
              style={{ width: "220.60000000000002px" }}
            >
              <Form.Group className="inputGroup" controlId="departureSchedule">
                <Form.Label className="label">Hora Salida</Form.Label>
                <Form.Control
                  step={1}
                  type="time"
                  name="departureSchedule"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.departureSchedule}
                  readOnly = {soloLectura}
                />
                <ErrorMessage
                  name="departureSchedule"
                  component={() => (
                    <div className="text-danger">{errors.departureSchedule}</div>
                  )}
                ></ErrorMessage>
              </Form.Group>
            </div>

            <div
              className="contentModalPerson"
              style={{ width: "220.60000000000002px" }}
            >
              <Form.Group controlId="referencias">
                <Form.Label className="label">Tipo de Persona</Form.Label>

                <ComboboxReferences 
                id={persona? persona.typePerson:null}
                onChange={handleValueChange} 
                readOnly = {soloLectura}/>
                
                <ErrorMessage
                  name="typePerson"
                  component={() => (
                    <div className="text-danger">{errors.typePerson}</div>
                  )}
                ></ErrorMessage>
              </Form.Group>
              
            </div>
          </div>
          <br />
          <Modal.Footer>
            <Button variant="secondary" onClick={cancelar}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              {asunto}
            </Button>
          </Modal.Footer>
        </Form>
      )}
    </Formik>
    </>
  );
};

export default FormularioEmpleado;
