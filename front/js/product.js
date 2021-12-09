// Création d'une variable permettant d'extraire l'url de la page, et d'ensuite récupérer son ID pour l'insérer dans une variable.
const searchUrl = new URLSearchParams(window.location.search)
const getId = searchUrl.get("id")
console.log(getId);

// Déclenchement d'une fonction au chargement du DOM
window.addEventListener('DOMContentLoaded', async function () {

    // Récupération de l'API grâce à la méthode fetch puis l'insérer la variable contenant l'ID de la page.
    const response = await fetch(`http://localhost:3000/api/products/${getId}`)
    const product = await response.json()

    // Création d'un élément image pour pouvoir insérer l'image de l'API
    const getImage = document.createElement("img");
    getImage.src = product.imageUrl
    getImage.alt = product.altTxt

    // Récupération du contenant "item__img" du DOM puis d'insérer l'image en tant qu'enfant.
    const getDiv = document.getElementsByClassName("item__img")[0];
    getDiv.appendChild(getImage)
    console.log(getDiv)

    // Récupérer des données depuis l'API pour l'insérer au DOM.
    document.getElementById('title').textContent = product.name
    document.getElementById('price').textContent = product.price
    document.getElementById('description').textContent = product.description
    document.getElementById('colors').textContent = product.colors

    // Création d'une boucle qui permet le choix des différentes couleurs dans le DOM, celles-ci sont récupérer depuis l'API.
    const selectColors = document.getElementById("colors")
    let colors = product.colors;
    for (let color of colors) {
        let option = document.createElement("option");
        option.value = color;
        option.innerText = color;
        selectColors.appendChild(option);
    }

   // Récupération du DOM du bouton "Ajouter au panier" qui permettra la sauvegarde des paramètres choisie de l'usager dans le localstorage.
    const button = document.getElementById('addToCart')

     // Création d'une fonction qui au clic de l'utilisateur sur le bouton "Ajouter au panier", récolte les informations pour les stocker dans le localstorage, qui seront utilisées dans le panier.
    button.addEventListener('click', function () {

        const color = document.getElementById("colors").value
        const quantity = document.getElementById("quantity").value

        // Stockage des données choisie de l'usager dans un tableau.
        let stock = [getId, quantity, color];
        console.log(stock)

        // Création d'une variable qui récupérera les données convertie en JSON si jamais l'utilisateur choisi de modifier la quantité ou la couleur d'un canapé.
        let recupererDonnee = JSON.parse(localStorage.getItem("donneeUtilisateur"));

        // Boucle permettant de soit stocker l'ensemble des données dans le localstorage, ou de récupérer uniquement la quantité et la couleur si l'utilisateur à déjà effectuer un ajout au panier du produit. 
        if (recupererDonnee == null) {
            const stockerDonnee = localStorage.setItem("donneeUtilisateur", JSON.stringify(stock));
            window.confirm('Votre sélection a bien été ajoutée au panier.');
        }
        else {
            recupererDonnee.push(color, quantity)
            const stockerDonnee = localStorage.setItem("donneeUtilisateur", JSON.stringify(stock));
            window.confirm('Votre panier a été mis à jour !');
        }


    })
})

