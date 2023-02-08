// PAGE LOGIN

// Requête avec un temps d'attente (async).
async function getInfo(event) {
  // Évite d'exécuter l'évènement au chargement de la page
  event.preventDefault();
  // Définition des valeurs email et password
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  // Création d'un objet pour les placer dedans
  let user = {
    email: email,
    password: password,
  };
  // Requête POST vers l'API
  await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
    // Actions après la réponse du server (.then) -> (response) réponse du serv
  })
    .then((response) => {
      if (response.status === 200) {
        window.location.assign("http://127.0.0.1:5500/FrontEnd/index.html");
      } else if (response.status === 404) {
        alert("Email ou mot de passe incorrect");
      } else if (response.status === 401) {
        alert("Email ou mot de passe incorrect");
      }
      // On transforme la promesse du serv en format JSON
      return response.json();
    })
    .then((data) => {
      const token = data.token;
      sessionStorage.setItem("token", token);
    });
}
const form = document.getElementById("login");
// déclenche la fonction "getInfo" au clic (event)
form.addEventListener("submit", getInfo);
