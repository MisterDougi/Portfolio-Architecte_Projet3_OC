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

function login(token){
  if (token){
  document.getElementById("account").innerText = "logout";
  } else{
    document.getElementById("account").innerText = "login";
  }
}
login(token);

function deco(token){
  if (token){
    localStorage.removeItem("token");
  }
}
const logout = document.getElementById("account");
logout.addEventListener('click', deco);


// Déclaration variables de la page édition (utilisateur log)------------------- 
const modeEdition = document.getElementById("bandeauTop");
const editDesc = document.getElementById("editDesc");
const editPic = document.getElementById("editPic");
const editProject = document.getElementById("editProject");

if(token){
  modeEdition.style.display="block";
  editDesc.style.display="block";
  editPic.style.display="block";
  editProject.style.display="block";
}


// MODALE----------------------------------------------------------------------

const openModale = document.getElementById("editProject");
const closeModale = document.getElementById("closeModale");
const modal = document.getElementById("backModale");
const modalContent = document.getElementById("modale");
const photoModale = document.getElementById("photoModale");

for(let i = 0; i < listProjects.length; i++){
  //console.log(listProjects[i].imageUrl);
  const gallery = listProjects[i];
  const unProjet = document.createElement("div");
  const photoProject = document.createElement("img");
  photoProject.crossOrigin = "anonymous";
  photoProject.src = gallery.imageUrl;
  unProjet.appendChild(photoProject);
  /* unProjet.style.cssText = `
  display: flex;
  flex-wrap: wrap;
	justify-content: space-between;` */
  const titreElement = document.createElement("p");
  titreElement.innerText = "éditer";
  titreElement.style.textAlign="left";
  unProjet.appendChild(titreElement);
  photoModale.appendChild(unProjet);
}
openModale.addEventListener("click", () =>{
  //console.log(listProjects);
  modal.style.display="block";
})

/* closeModale.addEventListener("click", () =>{
  //console.log(listProjects);
  modal.style.display="none";
}) */
closeModale.onclick = function(){
  modal.style.display="none";
}
window.onclick = function(event){
  if(event.target == modal){
    modal.style.display="none";
  }
}