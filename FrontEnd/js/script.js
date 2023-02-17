// Variable utilisée en scopeGlobal pour définir les filtres
{
  var token = sessionStorage.getItem("token");
  var editMode = sessionStorage.getItem("editMode");
}

function afficherUnProjet(unProjet) {
  const projectElement = document.createElement("article");

  // const gallery = listProjects[i];
  projectElement.setAttribute("data-categorie", unProjet.category.name);
  //querySelector sert à selectionner une classe html
  const sectionPortfolio = document.querySelector(".gallery");
  //Création éléments texte
  const titreElement = document.createElement("p");
  titreElement.innerText = unProjet.title;
  //Création élément image
  const imageElement = document.createElement("img");
  imageElement.src = unProjet.imageUrl;
  //Affichage de toutes les images (ne fonctionne pas sans)
  imageElement.crossOrigin = "anonymous";
  //Relier les éléments à un parent pour les afficher
  sectionPortfolio.appendChild(projectElement);
  projectElement.appendChild(imageElement);
  projectElement.appendChild(titreElement);
}

// Fonction pour afficher la liste des projets du localhost
function afficherProjets(listProjects) {
  //Boucle qui parcourt tous les projets
  for (let i = 0; i < listProjects.length; i++) {
    const gallery = listProjects[i];
    afficherUnProjet(gallery);
  }
}

function afficherFiltres(categorieSet) {
  //Création de la boucle de filtres
  for (let filtresType of categorieSet) {
    // Création d'une DIV
    const filtres = document.createElement("div");
    // Tag de la classe HTML
    const divFiltres = document.querySelector(".filtres");
    // Création élément texte + id
    const boutonFiltre = document.createElement("p");
    const filtreName = filtresType.split("-")[1];
    /* const filtreTable = filtresType.split("-")
    const filtreName = filtreTable[1] */
    boutonFiltre.innerText = filtreName;
    //Relier les filtres à un parents pour l'affichage
    divFiltres.appendChild(filtres);
    filtres.appendChild(boutonFiltre);
    // Création de l'action clic avec "addEventListener"
    boutonFiltre.addEventListener("click", function () {
      filtreCat(filtreName);
    });
  }
}

function filtreCat(filtreName) {
  const projets = document.querySelector(".gallery").children;

  for (let i = 0; i < projets.length; i++) {
    const projet = projets.item(i);
    const catProjet = projet.dataset.categorie;
    if (filtreName != catProjet && filtreName != "Tous") {
      projet.style.display = "none";
    } else {
      projet.style.display = "block";
    }
  }
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
    sessionStorage.removeItem("token");
    login(token);
  }
}
const logout = document.getElementById("account");
logout.onclick = (token) => {
  deco(token);
  sessionStorage.removeItem("editMode");
};

// Déclaration variables de la page édition (utilisateur log)-------------------
const modeEdition = document.getElementById("bandeauTop");
const editDesc = document.getElementById("editDesc");
const editPic = document.getElementById("editPic");
const editProject = document.getElementById("editProject");
const publierChangement = document.getElementById("publierChangement");
const boutonEdition = document.getElementById("boutonEdition");
if (sessionStorage.getItem("editMode") == "false") {
  boutonEdition.style.display = "block";
}
if (token && editMode == "true") {
  modeEdition.style.display = "block";
  editDesc.style.display = "inline-block";
  editPic.style.display = "inline-block";
  editProject.style.display = "inline-block";
}
publierChangement.addEventListener("click", function (event) {
  event.preventDefault();
  modeEdition.style.display = "none";
  editDesc.style.display = "none";
  editPic.style.display = "none";
  editProject.style.display = "none";
  boutonEdition.style.display = "block";
  sessionStorage.setItem("editMode", "false");
});
boutonEdition.addEventListener("click", function (event) {
  event.preventDefault();
  modeEdition.style.display = "block";
  editDesc.style.display = "inline-block";
  editPic.style.display = "inline-block";
  editProject.style.display = "inline-block";
  boutonEdition.style.display = "none";
  sessionStorage.setItem("editMode", "true");
});

export { afficherProjets, afficherFiltres, afficherUnProjet };
