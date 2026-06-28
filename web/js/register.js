"use strict";

import { messageRenderer } from "/js/renderers/messages.js";
import { userValidator } from "/js/validators/users.js";
import { sessionManager } from "/js/utils/session.js";
import { authAPI_auto } from "/js/api/_auth.js";


function main() {    
    let registerForm = document.getElementById("register-form"); //Encuentro el formulario html por su id
    registerForm.onsubmit = handleSubmitRegister; //Asigno al evento submit la función que se ejecutará cuando se envíe el formulario
}

function handleSubmitRegister(event) { 

    event.preventDefault(); //Llamo al método preventDefault del objeto event para evitar que el formulario se envíe. Esto es necesario porque si hay errores, no queremos que el formulario se envíe al servidor, ya que los datos no son válidos. Al llamar a preventDefault(), se detiene la acción predeterminada del evento, que en este caso es el envío del formulario, lo que permite mostrar los errores al usuario sin enviar datos incorrectos al servidor.
    let form = event.target; //Obtengo el formulario que ha sido enviado a través del evento. El objeto event tiene una propiedad target que hace referencia al elemento que ha desencadenado el evento, en este caso, el formulario.
    let formData = new FormData(form); //Creo un nuevo objeto FormData pasando el formulario como argumento. FormData es una interfaz que proporciona una manera fácil de construir un conjunto de pares clave/valor representando los campos del formulario y sus valores. Esto es útil para enviar datos del formulario a través de una solicitud HTTP, como una petición AJAX.

    let errors = userValidator.validateRegister(formData); //Llamo a la función validateRegister del objeto userValidator, pasando el objeto formData como argumento. Esta función se encargará de validar los datos del formulario y devolverá un array de errores si se encuentran problemas con los datos ingresados por el usuario. El resultado se almacena en la variable errors para su posterior uso en la lógica de manejo de errores.

    if (errors.length > 0) { //Si el array de errores no está vacío, significa que se han encontrado errores durante la validación del formulario
        let errorsDiv = document.getElementById("errors"); //Obtengo el elemento HTML con el id "errors", que es donde se mostrarán los mensajes de error al usuario. Este elemento se espera que exista en el HTML y se utilizará para mostrar los errores encontrados durante la validación del formulario.
        errorsDiv.innerHTML = ""; //Limpio el contenido del elemento errorsDiv estableciendo su propiedad innerHTML a una cadena vacía. Esto es importante para asegurarse de que no se acumulen mensajes de error anteriores cada vez que se envíe el formulario. Al limpiar el contenido, se garantiza que solo se muestren los errores actuales relacionados con la última validación del formulario.
        
        for (let error of errors) {
            messageRenderer.showErrorMessage(error); //Itero sobre el array de errores utilizando un bucle for...of. Para cada error en el array, llamo a la función showErrorMessage del objeto messageRenderer, pasando el mensaje de error como argumento. Esta función se encargará de mostrar el mensaje de error al usuario, probablemente agregando elementos HTML al DOM para que los errores sean visibles en la interfaz de usuario.
        }
    }
    else{
        alert("Form sent!"); //Si no hay errores, muestro una alerta indicando que el formulario se ha enviado correctamente. En un caso real, aquí es donde se podría proceder a enviar los datos del formulario al servidor para su procesamiento, ya sea a través de una solicitud HTTP o mediante la acción predeterminada del formulario.
        sendRegister(formData);
    }

}

async function sendRegister(formData) {
    try {
        let loginData = await authAPI_auto.register(formData);
        let sessionToken = loginData.sessionToken;
        let loggedUser = loginData.user;

        sessionManager.login(sessionToken, loggedUser);
        window.location.href = "index.html";
        console.log(loginData);
    } catch (err) {
        messageRenderer.showErrorMessage("Error registering a new user", err);
    }
}


document.addEventListener("DOMContentLoaded", main); //Cuando el contenido del documento se ha cargado, se ejecuta la función main y no antes de cargarse el DOM
