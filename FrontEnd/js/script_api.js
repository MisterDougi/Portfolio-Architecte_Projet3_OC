import { afficherFiltres, afficherProjets } from "./script.js";
// Lien avec le LocalHost

const response = await fetch("http://localhost:5678/api/works");
const listProjects = await response.json();
//Création d'un Set (tableau)
const categorieSet = new Set();
// categorieSet.add({ id: gallery.category.id, name: gallery.category.name });
categorieSet.add("0-Tous");
/* categorieSet.add("Tous");  */ // Ajout d'une valeur "string" ("Tous") dans le Set (1 seule valeur)
// Appel de la fonction au démarrage
for (let i = 0; i < listProjects.length; i++) {
  const gallery = listProjects[i];
  categorieSet.add(gallery.category.id + "-" + gallery.category.name);
}

afficherProjets(listProjects);
afficherFiltres(categorieSet);

// POST NOUVEAU PROJET--------------------------------------------------------
async function pushProject() {
  const fichierPhoto = document.getElementById("fileUpload").files[0];
  const bodyData = new FormData();
  bodyData.append("image", fichierPhoto);
  bodyData.append("title", document.getElementById("titreAddProjet").value);
  bodyData.append(
    "category",
    parseInt(document.getElementById("catAddProjet").value)
  );

  var token = sessionStorage.getItem("token");

  await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: bodyData,
  })
    .then((response) => {
      if (response.status === 201) {
        //  ajout projet + supp modale
      } else if (response.status === 400) {
        alert("Mauvaise requête"); // exemple format pas bon
      } else if (response.status === 401) {
        alert("Vous n'avez pas les droits");
      } else if (response.status === 500) {
        alert("erreur serveur");
        // On transforme la promesse du serv en format JSON
      } /*  else if (!response.ok) {
        const errorMessage = response.text();
        throw new Error(errorMessage);
      } */
    })
    .then(() => {});
}

// SUPPRESSION D'UN ÉLÉMENT------------------------------------------------------
async function deleteProject(id, token) {
  await fetch("http://localhost:5678/api/works/" + id, {
    method: "DELETE",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        //  supppression du projet
      } else if (response.status === 401) {
        alert("Non autorisé");
      } else if (response.status === 500) {
        alert("erreur serveur");
      }
    })
    .then(() => {});
}
export { pushProject, deleteProject, categorieSet, listProjects };
