// Lien avec le LocalHost
const response = await fetch("http://localhost:5678/api/works");
const listProjects = await response.json();
//Création d'un Set (tableau)
const categorieSet = new Set();
categorieSet.add("Tous") // Ajout d'une valeur "string" ("Tous") dans le Set (1 seule valeur)
// Appel de la fonction au démarrage
afficherProjets(listProjects);

// Variable utilisée en scopeGlobal pour définir les filtres
{
  var choixFilter;
}

// Fonction pour afficher la liste des projets du localhost
function afficherProjets(listProjects) {
  //Boucle qui parcourt tous les projets
  for (let i = 0; i < listProjects.length; i++) {
    // Création du bloc pour l'élément (projet)
    const projectElement = document.createElement("article");

    const gallery = listProjects[i];
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
    const nouveauTab = [];
    // Effacer les éléments en trop
    document.querySelector(".gallery").innerHTML = "";
    var choixFilter = document.getElementById(filtresType).id;
    for (let i = 0; i < listProjects.length; i++) {
      // choixFilter prend la valeur du texte du bouton sur lequel on clique
      if(choixFilter == listProjects[i].category.name){
        nouveauTab.push(listProjects[i]);
      } else if (choixFilter == "Tous") {
        nouveauTab.push(listProjects[i]);
      }

    }
    afficherProjets(nouveauTab); 
  })
}


    // const projetsFiltres = project.filter(function(objets){
    //   return gallery.category.name === objets;
    
    // document.querySelector(".filtres").innerHTML = "";
    // 1. Filtrer ton tableau de projets selon le nom de la catégorie

    // 2. const nouveauTab = []
    // afficherProjets(nouveauTab)
    // console.log(filtreName);
  // });
