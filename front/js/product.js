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

        class myStock {
            constructor(getId, quantity, color) {
                this.getId = getId;
                this.quantity = quantity;
                this.color = color;
            }
        }

        // Création d'une variable pour stocker les informations
        let stockProduit = []


        // Création d'une variable qui récupérera les données convertie en JSON si jamais l'utilisateur choisi de modifier la quantité ou la couleur d'un canapé.
        let recupererDonnee = JSON.parse(localStorage.getItem("donneeUtilisateur"));

        if (recupererDonnee) {
            recupererDonnee = JSON.parse(localStorage.getItem("donneeUtilisateur"))
            let getDonnee = ''
            for (const element of recupererDonnee)
                getDonnee += `{${element.getId} ${element.quantity} ${element.color}}`;
            console.log(getDonnee)
            stockProduit.push(getDonnee)
            localStorage.setItem("donneeUtilisateur", JSON.stringify(stockProduit));
            window.confirm('Modification du panier')
        }
        else {
            let ajoutProduit = new myStock(getId, quantity, color)
            stockProduit.push(ajoutProduit);
            localStorage.setItem("donneeUtilisateur", JSON.stringify(stockProduit));
            console.log(stockProduit)

            window.confirm('Ajout au panier')
        }



        /*if (recupererDonnee) {
            let test = ''
            test = recupererDonnee
            for (const element of recupererDonnee)
                test += `{${element.getId} ${element.quantity} ${element.color}}`;
            console.log(test)

            recupererDonnee.pop(test)
            let ajoutProduit = new myStock(getId, quantity, color)
            recupererDonnee.push(ajoutProduit)

            localStorage.setItem("donneeUtilisateur", JSON.stringify(recupererDonnee));
            console.log(recupererDonnee)
            window.confirm('Modifications apportées au panier')
        }

        // Si aucun produit où de même nom se trouvant dans le panier.
        else {
           
            let ajoutProduit = new myStock(getId, quantity, color)
            stockProduit.push(ajoutProduit)
            localStorage.setItem("donneeUtilisateur", JSON.stringify(stockProduit));
            console.log(recupererDonnee)
            window.confirm('Produit ajouté')
        }*/
    })
})


/*
const cart = [
    ['567Nkb88U', 'Pink', 4],
    ['567Nkb88U', 'Orange', 2]
]

const cart = [
    {
        id: '567Nkb88U',
        color: 'Pink',
        qty: 5
    },
    {
        id: '567Nkb88U',
        color: 'Orange',
        qty: 2
    },
    {
        id: '867HJHB',
        color: 'Blue',
        qty: 1
    }
]


const cart = {
    '567Nkb88U_Pink': 4,
    '567Nkb88U_Orange': 2
}

class Kanap {
    constructor( id, color ) {
        this.id = id
        this.color = color
    }

    test() {
        alert('Hello')
    }

}



Object.setPrototypeOf(kanap, kanapProto)*/