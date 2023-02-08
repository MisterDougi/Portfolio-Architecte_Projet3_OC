// Variable utilisée en scopeGlobal pour définir les filtres
{
  var token = sessionStorage.getItem("token");
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
};

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
document.getElementById("backModalAdd").addEventListener("change", function () {
  var myPhoto = document.getElementById("preview").src;
  var myInput = document.getElementById("titreAddProjet");
  if (myInput && myInput.value && myPhoto) {
    document.getElementById("validPic").style.backgroundColor = "#1D6154";
  }
});
export { afficherProjets, afficherFiltres };
