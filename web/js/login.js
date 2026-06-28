"use strict";

import { messageRenderer } from "./renderers/messages.js"; 
import { sessionManager } from "./utils/session.js"; 
import { authAPI_auto } from "./api/_auth.js";

function main() {
    let form_login = document. getElementById("form-login")
    form_login.onsubmit = HandleSubmitLogin;
}

async function HandleSubmitLogin(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormDataEvent(form);
    try {
        let loginData = await authAPI_auto.login(formData);
        let sessionToken = loginData.sessionToken;
        let loggedUser = loginData.user;

        sessionManager.login(sessionToken, loggedUser);
        window.location.href = "index.html";
        
    } catch (err) {
        messageRenderer.showErrorMessage("Error registering a new user", err);
    }
}
