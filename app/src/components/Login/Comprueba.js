

export default function Comprueba (navigate, datos,setUserglobal) {
    
    if (datos.desError) {
        return datos.desError
    } else {
        if (!datos.persona) {
            return "no se encontro a la persona en la db o su estado es inactivo";
          } else {
        
        
        fetch("http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiSubscription/apiSubscription.php/listSubscription")
        
        .then((response) => response.json())
        .then((per)=>{let [p] = per.filter((p)=>p.persona_id===datos.persona[0].persona_id)
            if (p) {
                localStorage.setItem("per",JSON.stringify(p))
        const fsub= new Date(p.suscripcion_expiracion)
        const factu=new Date()
        if (fsub>=factu&&p) {
           localStorage.setItem("sus","Su suscripción termina en "+p.suscripcion_expiracion.slice(0, 10))
           
        } else {
            localStorage.setItem("mora","Usted esta en Mora, su suscripción termino en "+p.suscripcion_expiracion.slice(0, 10))
        }
                
            }
            
        
            })

            .finally(setUserglobal(datos.persona[0]),
            localStorage.setItem("user",JSON.stringify(datos.persona[0])),
            localStorage.setItem("optionsPadre",JSON.stringify(datos["opciones padre 0"])),
            localStorage.setItem("optionsHijo",JSON.stringify(datos["opciones padre disferente de 0"])),
            
            localStorage.setItem("recar",true),
                    
                    navigate("/main")
                
              );
            
            
    }
}
    
}
