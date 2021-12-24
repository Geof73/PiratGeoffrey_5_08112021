// Création d'une fonction qui une fois la page chargée, declenche son contenu.
window.addEventListener('DOMContentLoaded', async function () {

  // Récupération des données du localstorage enregistrées de la page "product.js".
  let recupererDonnee = JSON.parse(localStorage.getItem("Data"));
  console.log(recupererDonnee == null)

  if (recupererDonnee == null) {
    document.getElementById("cart__items").innerHTML = "Votre panier est vide"
  }
  else {

    // Récupération de l'API du serveur obtenir des éléments de description des canapés.
    const response = await fetch("http://localhost:3000/api/products")
    const product = await response.json()


    // Insertion des éléments récupérés dans le DOM de la page "Panier".

    // Insertion de l'image du canapé.
    const getImage = document.createElement("img");
    getImage.src = product.imageUrl;
    getImage.alt = product.altTxt;
    console.log(getImage)

    // Insertion de l'élément div créé précédemment à la section "cart__items" en tant qu'enfant.
    const getItemId = document.getElementById("cart__items");
    getItemId.appendChild(getImage)
    console.log(getItemId)

    // Création d'un élément div pour insérer par la suite l'image du produit.
    const createDiv = document.createElement("div");
    createDiv.setAttribute('class', 'cart__item__img');

    // Insertion de l'image en tant qu'enfant à la div créé.
    const getItemImg = document.getElementsByClassName("cart__item__img");
    getItemImg.appendChild(getImage);

    // Insertion du nom du produit
    document.getElementsByClassName("cart__item__content__description")[0] = product.name

    // Création d'une boucle pour afficher sur le DOM les informations des canapés récupérées depuis l'API.
    let html = ''
    for (const element of recupererDonnee)
      html +=
        `<article class="cart__item" data-id="${recupererDonnee.getId}" data-color="${recupererDonnee.color}">
        <div class="cart__item__img">
          <img src="${product.image}" alt="${product.altTxt}>
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${product.name}</h2>
            <p>${product.color}</p>
            <p>${product.price}</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>${recupererDonnee.quantity}</p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`

    document.getElementById('cart__items').innerHTML = html


    // Initialisation d'une variable qui permettra le calcul du prix total par rapport à la quantité et au prix du produit.
    let calculationPrix = recupererDonnee.quantity * product.price

    // Récupération depuis le localstorage de la quantité sélectionnée par l'utilisateur pour permettre le calcul.
    document.getElementById("totalQuantity").innerHTML = recupererDonnee[0].quantity
    document.getElementById("totalPrice").innerHTML = calculationPrix
  }

  // Modifier ou supprimer la quantité du produit

  // Récupation du boutton "Supprimer" pour moidifier la quantité des produits.
  let bouttonSuppr = document.getElementsByClassName("deleteItem")

  // Création d'un évenement lié au clic du boutton "supprimer"
  bouttonSuppr.addEventListener('change', (event) => {
    const itemQuantity = document.getElementsByClassName('itemQuantity').value
    
  });

  
  














  })

