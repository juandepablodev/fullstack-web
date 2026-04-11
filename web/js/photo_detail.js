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
}

document.addEventListener("DOMContentLoaded", main);
