"use strict";

import { photoRenderer } from "/js/renderers/photos.js";

function main() {
    let photoContainer = document.querySelector("#photo-details-column");

    let photo = {
        title: "Samoyed",
        description: "A very good boy.",
        userId: 1,
        url: "https://i.ibb.co/tY1Jcnc/wlZCfCv.jpg",
        date: "12/01/1996",
    };

    let photoDetails = photoRenderer.asDetails(photo);
    photoContainer.appendChild(photoDetails);

    hideActionsColumn();
}

function hideActionsColumn() {
    let actions_col = document.getElementById("actions-col");
    if (!sessionManager.isLogged()) {
        actions_col.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", main);
