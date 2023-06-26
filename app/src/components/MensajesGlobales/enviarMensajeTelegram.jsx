export function Enviar(titulo,mensaje,fetchConfiguraciones,handleClose) {

    
    fetch(
      "https://api.telegram.org/bot5920320499:AAFavxSuyHr4gDi1IY4SEhAkWt0Er7kcQlM/sendMessage?chat_id=-848439578&text=<" +
        titulo.toUpperCase() +
        ">%0A%0A%0A" +
        mensaje
    );
    

fetchConfiguraciones()
handleClose()
}
export function PlublicarNoti(id,fetchData,fetchConfiguraciones,handleClose){



  fetchData("http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiNews/apiNews.php/changeStateNews",
  {
    "idNews" : id,
    "statusNews" :  25
})

fetchConfiguraciones()
handleClose()


}