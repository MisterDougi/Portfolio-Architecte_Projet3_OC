import { afficherProjets } from "./script.js";
import {
  pushProject,
  deleteProject,
  listProjects,
  categorieSet,
} from "./script_api.js";
// MODALE----------------------------------------------------------------------
var token = sessionStorage.getItem("token");
const openModale = document.getElementById("editProject");
const closeModale = document.querySelectorAll(".closeModale");
const backModalModif = document.getElementById("backModalModif");
const backModalAdd = document.getElementById("backModalAdd");
/* const modalContent = document.querySelector(".modale"); */
const photoModale = document.getElementById("photoModale");
const addPic = document.getElementById("addPic");
const returnModif = document.querySelector(".returnModale");
menuSelectCat(categorieSet);
afficherProjetModale(listProjects);
function afficherProjetModale(listProjects) {
  for (let i = 0; i < listProjects.length; i++) {
    const gallery = listProjects[i];
    const unProjet = document.createElement("div");
    const photoProject = document.createElement("img");
    const trashPic = document.createElement("div");
    photoProject.crossOrigin = "anonymous";
    photoProject.src = gallery.imageUrl;
    unProjet.appendChild(photoProject);
    unProjet.appendChild(trashPic);
    trashPic.classList.add("divTrash");
    trashPic.id = listProjects[i].id;
    const trashCan = document.createElement("i");
    trashCan.classList.add("fa", "fa-light", "fa-trash-can", "pictoTrash");
    trashPic.appendChild(trashCan);
    trashPic.addEventListener("click", (event) => {
      deleteProject(listProjects[i].id, token);
      event.preventDefault();
      listProjects = listProjects.filter(function (el) {
        return el.id != listProjects[i].id;
      });
      const photoModale = document.getElementById("photoModale");
      photoModale.innerHTML = "";
      afficherProjetModale(listProjects);
      document.querySelector(".gallery").innerHTML = "";
      afficherProjets(listProjects);
    });

    const titreElement = document.createElement("p");
    titreElement.innerText = "éditer";
    titreElement.style.textAlign = "left";
    unProjet.appendChild(titreElement);
    photoModale.appendChild(unProjet);
  }
}
openModale.addEventListener("click", () => {
  backModalModif.style.display = "block";
});

const added = document.getElementById("validPic");
added.addEventListener("click", (event) => {
  pushProject();
  event.preventDefault();
});

closeModale.forEach((event) => {
  event.onclick = function () {
    backModalModif.style.display = "none";
    backModalAdd.style.display = "none";
    document.getElementById("preview").src = "";
  };
});
window.onclick = function (event) {
  if (event.target == backModalModif) {
    backModalModif.style.display = "none";
    document.getElementById("preview").src = "";
  }
  if (event.target == backModalAdd) {
    backModalAdd.style.display = "none";
    document.getElementById("preview").src = "";
  }
};

// AJOUT DU PORJET---------------------------------------------------------
addPic.addEventListener("click", () => {
  backModalAdd.style.display = "block";
  backModalModif.style.display = "none";
});

returnModif.onclick = () => {
  backModalAdd.style.display = "none";
  backModalModif.style.display = "block";
  document.getElementById("preview").src = "";
};

function displayNone() {
  document.getElementById("fileUpload").style.display = "none";
  document.querySelector(".picModif").style.display = "none";
  document.getElementById("ajoutPhotoButton").style.display = "none";
  document.querySelector(".formatImgButton").style.display = "none";
  document.getElementById("preview").style.display = "block";
  document.getElementById("titreAddProjet").value = "";
  document.getElementById("validPic").style.backgroundColor = "#A7A7A7";
}
function displayBlock() {
  document.getElementById("fileUpload").style.display = "block";
  document.querySelector(".picModif").style.display = "block";
  document.getElementById("ajoutPhotoButton").style.display = "block";
  document.querySelector(".formatImgButton").style.display = "block";
  document.getElementById("preview").style.display = "none";
  document.getElementById("titreAddProjet").value = "";
  document.getElementById("validPic").style.backgroundColor = "#A7A7A7";
}

const input = document.getElementById("fileUpload");
input.addEventListener("change", function () {
  var oFReader = new FileReader();
  oFReader.readAsDataURL(input.files[0]);
  oFReader.onload = function (oFREvent) {
    document.getElementById("preview").src = oFREvent.target.result;
    if (document.getElementById("preview").src != "") {
      displayNone();
    } else {
      displayBlock();
    }
  };
});
function menuSelectCat() {
  for (let uneCategorie of categorieSet) {
    const optionCategorie = document.createElement("option");
    const categorieDetails = uneCategorie.split("-");
    if (categorieDetails[1] != "Tous") {
      optionCategorie.value = categorieDetails[0];
      optionCategorie.innerText = categorieDetails[1];
      document.getElementById("catAddProjet").appendChild(optionCategorie);
    }
  }
}
