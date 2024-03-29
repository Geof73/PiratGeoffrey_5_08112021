// Création d'une variable permettant d'extraire l'url de la page, et d'ensuite récupérer son ID pour l'insérer dans une variable.
const searchUrl = new URLSearchParams(window.location.search);
const getId = searchUrl.get("id");

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

        // Récupération des informations nécessaires pour la constitution de la page "panier".
        const color = document.getElementById("colors").value
        const quantity = parseFloat(document.getElementById("quantity").value)

        // Stockage des informations récupérées dans un objet.
        let cart = { getId, quantity, color}

        // Création d'un nouveau modèle de classe
        let myCart = new Panier()

        // Récupération du localstorage et de voir si le produit est déjà existant.
        let getJsonData = JSON.parse(localStorage.getItem("Data"));
        let findCanap = myCart.panier.find(e => e.getId == getId && e.color == color)
        // Ajout de l'objet cart au tableau myCart si sa quantité est supérieur à 0 et si le produit n'existe pas dans le localstorage, puis sauvegarde dans le localstorage.
        if (quantity > 0) {
            if (findCanap == undefined) {
                myCart.add(cart)
                window.alert("Votre sélection a été ajoutée au panier !")
            }

            // Si c'est le cas, récupération de la quantité du produit dans le localstorage et addition avec la quantité rentrée par l'utilisateur et sauvegarde dans le localstorage.

            else {
                let addQuantityWithLocalStorage = findCanap.quantity + quantity
                cart.quantity = addQuantityWithLocalStorage
                myCart.add(cart)
                window.alert("La quantité a été ajoutée au panier !")
            }
        }

        // Si aucune quantité n'a été entrée par l'utilisateur.
        else {
            window.alert("Veuillez ajouter une quantité à votre sélection !")
        }
    })
})





