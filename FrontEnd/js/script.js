// Lien avec le LocalHost
const response = await fetch("http://localhost:5678/api/works");
const listProjects = await response.json();
//Création d'un Set (tableau)
const categorieSet = new Set();
categorieSet.add("Tous"); // Ajout d'une valeur "string" ("Tous") dans le Set (1 seule valeur)
// Appel de la fonction au démarrage
afficherProjets(listProjects);
afficherFiltres();

// Variable utilisée en scopeGlobal pour définir les filtres
{
  var choixFilter;
  var token = localStorage.getItem("token");
}

// Fonction pour afficher la liste des projets du localhost
function afficherProjets(listProjects) {
  //Boucle qui parcourt tous les projets
  for (let i = 0; i < listProjects.length; i++) {
    // Création du bloc pour l'élément (projet)
    const projectElement = document.createElement("article");

    const gallery = listProjects[i];
    projectElement.setAttribute("data-categorie", gallery.category.name);
    //querySelector sert à selectionner une classe html
    const sectionPortfolio = document.querySelector(".gallery");
    //Création éléments texte
    const titreElement = document.createElement("p");
    titreElement.innerText = gallery.title;
    //Création élément image
    const imageElement = document.createElement("img");
    imageElement.src = gallery.imageUrl;
    //Affichage de toutes les images (ne fonctionne pas sans)
    imageElement.crossOrigin = "anonymous";
    //Relier les éléments à un parent pour les afficher
    sectionPortfolio.appendChild(projectElement);
    projectElement.appendChild(imageElement);
    projectElement.appendChild(titreElement);
    //Ajout unique d'une valeur dans un tableau (ici nom de catégorie)
    categorieSet.add(gallery.category.name); // Ajout des 3 noms des catégories ; 4 valeurs dans le Set désormais ("Tous", "Objet", "Appartements", "Hôtels & Restaurants")
  }
}

function afficherFiltres() {
  //Création de la boucle de filtres
  for (let filtresType of categorieSet) {
    // Création d'une DIV
    const filtres = document.createElement("div");
    // Tag de la classe HTML
    const divFiltres = document.querySelector(".filtres");
    // Création élément texte + id
    const boutonFiltre = document.createElement("p");
    boutonFiltre.id = filtresType;
    boutonFiltre.innerText = filtresType;
    //Relier les filtres à un parents pour l'affichage
    divFiltres.appendChild(filtres);
    filtres.appendChild(boutonFiltre);
    // Création de l'action clic avec "addEventListener"
    document.getElementById(filtresType).addEventListener("click", function () {
      filtreCat(filtresType);
    });
  }
}

function filtreCat(filtresType) {
  // Effacer les éléments en trop
  // document.querySelector(".gallery").innerHTML = "";

  var choixFilter = document.getElementById(filtresType).id;
  /* for (let i = 0; i < listProjects.length; i++) {
    // choixFilter prend la valeur du texte du bouton sur lequel on clique
    if (choixFilter == listProjects[i].category.name) {
      nouveauTab.push(listProjects[i]);
    } else if (choixFilter == "Tous") {
      nouveauTab.push(listProjects[i]);
    }
  } */

  const projets = document.querySelector(".gallery").children;

  for (let i = 0; i < projets.length; i++) {
    const projet = projets.item(i);
    const catProjet = projet.dataset.categorie;
    if (choixFilter != catProjet && choixFilter != "Tous") {
      projet.style.display = "none";
    } else {
      projet.style.display = "block";
    }
  }

  // afficherProjets(nouveauTab);
}

// LOGGED-IN ------------------------------------------------------------------

function login(token) {
  if (token) {
    document.getElementById("account").innerText = "logout";
  } else {
    document.getElementById("account").innerText = "login";
  }
}
login(token);

function deco(token) {
  if (token) {
    localStorage.removeItem("token");
  }
}
const logout = document.getElementById("account");
logout.addEventListener("click", deco);

// Déclaration variables de la page édition (utilisateur log)-------------------
const modeEdition = document.getElementById("bandeauTop");
const editDesc = document.getElementById("editDesc");
const editPic = document.getElementById("editPic");
const editProject = document.getElementById("editProject");

if (token) {
  modeEdition.style.display = "block";
  editDesc.style.display = "block";
  editPic.style.display = "block";
  editProject.style.display = "block";
}

// MODALE----------------------------------------------------------------------

const openModale = document.getElementById("editProject");
const closeModale = document.querySelectorAll(".closeModale");
const backModale = document.getElementsByClassName("backModale");
const backModalModif = document.getElementById("backModalModif");
const backModalAdd = document.getElementById("backModalAdd");
const modalContent = document.querySelector(".modale");
const photoModale = document.getElementById("photoModale");
const addPic = document.getElementById("addPic");
const returnModif = document.querySelector(".returnModale");
//console.log(backModale);
for (let i = 0; i < listProjects.length; i++) {
  //console.log(listProjects[i].imageUrl);
  const gallery = listProjects[i];
  const unProjet = document.createElement("div");
  const photoProject = document.createElement("img");
  const trashPic = document.createElement("div");
  photoProject.crossOrigin = "anonymous";
  photoProject.src = gallery.imageUrl;
  unProjet.appendChild(photoProject);
  unProjet.appendChild(trashPic);
  trashPic.classList.add("divTrash");
  const trashCan = document.createElement("i");
  trashCan.classList.add("fa", "fa-light", "fa-trash-can", "pictoTrash");
  trashPic.appendChild(trashCan);

  /* unProjet.style.cssText = `
  display: flex;
  flex-wrap: wrap;
	justify-content: space-between;` */
  const titreElement = document.createElement("p");
  titreElement.innerText = "éditer";
  titreElement.style.textAlign = "left";
  unProjet.appendChild(titreElement);
  photoModale.appendChild(unProjet);
}
openModale.addEventListener("click", () => {
  //console.log(listProjects);
  backModalModif.style.display = "block";
});

closeModale.forEach((event) => {
  event.onclick = function () {
    backModalModif.style.display = "none";
    backModalAdd.style.display = "none";
    document.getElementById("preview").src = "";
    document.getElementById("fileUpload").style.display = "block";
    document.querySelector(".picModif").style.display = "block";
    document.getElementById("ajoutPhotoButton").style.display = "block";
    document.querySelector(".formatImgButton").style.display = "block";
    document.getElementById("preview").style.display = "none";
    document.getElementById("titreAddProjet").value = "";
    document.getElementById("validPic").style.backgroundColor = "#A7A7A7";
  };
});
window.onclick = function (event) {
  if (event.target == backModalModif) {
    backModalModif.style.display = "none";
    document.getElementById("preview").src = "";
    document.getElementById("fileUpload").style.display = "block";
    document.querySelector(".picModif").style.display = "block";
    document.getElementById("ajoutPhotoButton").style.display = "block";
    document.querySelector(".formatImgButton").style.display = "block";
    document.getElementById("preview").style.display = "none";
    document.getElementById("titreAddProjet").value = "";
    document.getElementById("validPic").style.backgroundColor = "#A7A7A7";
  }
  if (event.target == backModalAdd) {
    backModalAdd.style.display = "none";
    document.getElementById("preview").src = "";
    document.getElementById("fileUpload").style.display = "block";
    document.querySelector(".picModif").style.display = "block";
    document.getElementById("ajoutPhotoButton").style.display = "block";
    document.querySelector(".formatImgButton").style.display = "block";
    document.getElementById("preview").style.display = "none";
    document.getElementById("titreAddProjet").value = "";
    document.getElementById("validPic").style.backgroundColor = "#A7A7A7";
  }
};

// AJOUT DU PORJET---------------------------------------------------------

addPic.onclick = function () {
  backModalAdd.style.display = "block";
  backModalModif.style.display = "none";
};

returnModif.onclick = function () {
  backModalAdd.style.display = "none";
  backModalModif.style.display = "block";
  document.getElementById("preview").src = "";
  document.getElementById("fileUpload").style.display = "block";
  document.querySelector(".picModif").style.display = "block";
  document.getElementById("ajoutPhotoButton").style.display = "block";
  document.querySelector(".formatImgButton").style.display = "block";
  document.getElementById("preview").style.display = "none";
  document.getElementById("titreAddProjet").value = "";
  document.getElementById("validPic").style.backgroundColor = "#A7A7A7";
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

/* var categorieSet2 = new Set();
categorieSet2 = categorieSet.delete("Tous"); */
// console.log(categorieSet);
for (let uneCategorie of categorieSet) {
  const optionCategorie = document.createElement("option");
  if (uneCategorie != "Tous") {
    optionCategorie.value = uneCategorie;
    optionCategorie.innerText = uneCategorie;
    document.getElementById("catAddProjet").appendChild(optionCategorie);
  }
}
/* for(let i = 0; i < categorieSet.length; i++){
  const uneCategorie = document.createElement("option");
  uneCategorie.value = 

} */

document.getElementById("backModalAdd").addEventListener("change", function () {
  var myPhoto = document.getElementById("preview").src;
  var myInput = document.getElementById("titreAddProjet");
  // console.log(myPhoto);
  /*   if(myPhoto != null){
    document.getElementById("titreAddProjet").removeAttribute("disabled");
  } */
  if (myInput && myInput.value && myPhoto) {
    document.getElementById("validPic").style.backgroundColor = "#1D6154";
  }
});

// POST NOUVEAU PROJET--------------------------------------------------------
async function pushProject(event) {
  event.preventDefault();
  // var projet = new FormData();
  // projet.append("image", document.getElementById("preview").src);
  // projet.append("title", document.getElementById("titreAddProjet").value);
  // projet.append("category", 1);

  let projet = {
    image: document.getElementById("preview").src,
    title: document.getElementById("titreAddProjet").value,
    // category: document.getElementById("catAddProjet").value,
    category: 1,
  };

  console.log("projet", projet);
  console.log("projetJSON", JSON.stringify(projet));
  // var token = localStorage.getItem("token");

  // fetch("http://localhost:5678/api/works", {
  //   method: "POST",
  //   accept: "application/json",
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //     "Content-Type": "multipart/form-data",
  //   },
  //   body: JSON.stringify(projet),
  // }).then((response) => {
  //   if (response.status === 201) {
  //     //  ajout projet + supp modale
  //   } else if (response.status === 400) {
  //     alert("Mauvaise requête"); // exemple format pas bon
  //   } else if (response.status === 401) {
  //     alert("Vous n'avez pas les droits");
  //     console.log(response);
  //   } else if (response.status === 500) {
  //     alert("erreur serveur");
  //     // On transforme la promesse du serv en format JSON
  //   } else if (!response.ok) {
  //     const errorMessage = response.text();
  //     throw new Error(errorMessage);
  //   }
  //   return response.json();
  // });
  // .then((data) => {
  //   console.log("data", data);
  // });
}

const added = document.getElementById("validPic");
added.addEventListener("click", pushProject);

// déclenche la fonction "pushProject" au clic (event)
