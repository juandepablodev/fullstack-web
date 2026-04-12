"use strict";

const userValidator = {

  validateRegister: function (formData) {
    let errors = []; //Creo un array vacío para almacenar los errores que puedan ocurrir durante la validación del formulario
      
    let firstName = formData.get("firstName"); //Utilizo el método get del objeto FormData para obtener el valor del campo "firstName" del formulario. El método get toma el nombre del campo como argumento y devuelve su valor. En este caso, se espera que el formulario tenga un campo con el atributo name="firstName", y el valor ingresado por el usuario en ese campo se almacenará en la variable firstName.
    let lastName = formData.get("lastName");
    let password = formData.get("password");
    let password2 = formData.get("repeat-password");

    if (firstName.length < 3 || lastName.length < 3) {
        errors.push("The first and last name should have more than 3 characters");
    }

    if (password !== password2) {
        errors.push("The passwords must match");
    }

  return errors;
}

};

export { userValidator };
