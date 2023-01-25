 // PAGE LOGIN

  // Requête avec un temps d'attente (async).
  async function getInfo(event){
// Évite d'exécuter l'évènement au chargement de la page   
    event.preventDefault();
// Définition des valeurs email et password
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
// Création d'un objet pour les placer dedans
    let user = {
      "email": email,
      "password": password
    };
    // Requête POST vers l'API
    await fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(user)
      // Actions après la réponse du server (.then) -> (response) réponse du serv
    }).then((response)=>{
        if (response.status === 200){
            console.log("T'es connecté !");
        } else if (response.status === 404){
            alert("Email ou mot de passe incorrect");
        } else if (response.status === 401){
            alert("PAS BON!");
        }

        console.log(response);
    });

    
    // Récupération du résultat après traitement de la demande
    /* let result = await response.json();
    console.log(JSON.stringify(result)); */
  }
  
  const form = document.getElementById('login');
 // déclenche la fonction "getInfo" au clic (event)
  form.addEventListener('submit', getInfo);


/*    if le mec a les bons id il peut go 
  else message d'erreur en pop up stylé */