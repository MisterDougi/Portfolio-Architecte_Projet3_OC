import { afficherProjets, afficherUnProjet } from "./script.js";
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
    const positionDrag = document.createElement("div");
    photoProject.crossOrigin = "anonymous";
    photoProject.src = gallery.imageUrl;
    unProjet.appendChild(photoProject);
    unProjet.appendChild(trashPic);
    unProjet.appendChild(positionDrag);
    positionDrag.classList.add("arrowBlock");
    positionDrag.id = listProjects[i].id;
    trashPic.classList.add("divTrash");
    trashPic.id = listProjects[i].id;
    const arrowPosition = document.createElement("i");
    arrowPosition.classList.add(
      "fa",
      "fa-solid",
      "fa-arrows-up-down-left-right",
      "pictoPosition"
    );
    const trashCan = document.createElement("i");
    trashCan.classList.add("fa", "fa-light", "fa-trash-can", "pictoTrash");
    positionDrag.appendChild(arrowPosition);
    photoProject.addEventListener("mouseenter", (event) => {
      event.preventDefault();
      positionDrag.style.display = "block";
    });
    photoProject.addEventListener("mouseout", (event) => {
      event.preventDefault();
      positionDrag.style.display = "none";
    });
    trashPic.appendChild(trashCan);
    trashPic.addEventListener("click", (event) => {
      event.preventDefault();
      deleteProject(listProjects[i].id, token);
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
  const added = document.getElementById("validPic");
  added.addEventListener("click", (event) => {
    event.preventDefault();
    pushProject().then(function (newProject) {
      let categoryAddModale = document.getElementById("catAddProjet");
      const newProjectModif = {
        ...newProject,
        category: {
          id: newProject.categoryId,
          name: categoryAddModale.innerText,
        },
      };
      listProjects.push(newProjectModif);
      const photoModale = document.getElementById("photoModale");
      photoModale.innerHTML = "";
      afficherProjetModale(listProjects);
      backModalAdd.style.display = "none";
      backModalModif.style.display = "block";
      // document.querySelector(".gallery").innerHTML = "";
      // afficherProjets(listProjects);
      afficherUnProjet(newProjectModif);
    });
    /* let fichierPhoto = document.getElementById("fileUpload").files[0];
    console.log(fichierPhoto);
    fichierPhoto.name + fichierPhoto.lastModified;
    var fileName = fichierPhoto.name.split(".");
    let categoryAddModale = document.getElementById("catAddProjet");
    let titreAddModale = document.getElementById("titreAddProjet").value;
    listProjects.push({
      category: {
        id: categoryAddModale.value,
        name: categoryAddModale.innerText,
      },
      imageUrl: fileName[0] + Date.now() + "." + fileName[1],
      title: titreAddModale,
    }); */
  });
}
openModale.addEventListener("click", () => {
  backModalModif.style.display = "block";
});
closeModale.forEach((event) => {
  event.onclick = function () {
    displayBlock();
    backModalModif.style.display = "none";
    backModalAdd.style.display = "none";
    document.getElementById("preview").src = "";
    document.getElementById("preview").style.display = "none";
    document.getElementById("fileUpload").value = "";
  };
});
window.onclick = function (event) {
  if (event.target == backModalModif) {
    displayBlock();
    backModalModif.style.display = "none";
    document.getElementById("preview").src = "";
    document.getElementById("preview").style.display = "none";
    document.getElementById("fileUpload").value = "";
  }
  if (event.target == backModalAdd) {
    displayBlock();
    backModalAdd.style.display = "none";
    document.getElementById("preview").src = "";
    document.getElementById("preview").style.display = "none";
    document.getElementById("fileUpload").value = "";
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
  displayBlock();
  document.getElementById("preview").style.display = "none";
  document.getElementById("fileUpload").value = "";
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
document.getElementById("backModalAdd").addEventListener("change", function () {
  var myPhoto = document.getElementById("preview").src;
  var myInput = document.getElementById("titreAddProjet");
  if (myInput && myInput.value && myPhoto) {
    document.getElementById("validPic").style.backgroundColor = "#1D6154";
  }
});
