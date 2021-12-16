// Création d'une fonction qui une fois la page chargée, declenche son contenu.
window.addEventListener('DOMContentLoaded', async function () {

  let recupererDonnee = JSON.parse(localStorage.getItem("donneeUtilisateur"));
  console.log(recupererDonnee)

  /* Création d'un élément div pour insérer par la suite l'image du produit.
  const createDiv = document.createElement("div");
  createDiv.setAttribute('class', 'cart__item__img');*/
  let test = recupererDonnee[0].getId


  if (recupererDonnee == null) {
    document.getElementById("cart__items").innerHTML = "Votre panier est vide"
  }
  else {

    const response = await fetch("http://localhost:3000/api/products/")
    const product = await response.json()
    // Création d'un élément img puis paramétrer l'image avec les données de l'API.
    const getImage = document.createElement("img");
    getImage.src = product.imageUrl;
    getImage.alt = product.altTxt;
    console.log(getImage)

    // Insertion de l'élément div créé précédemment à la section "cart__items" en tant qu'enfant.
    const getItemId = document.getElementById("cart__items");
    getItemId.appendChild(getImage)
    console.log(getItemId)

    /* Insertion de l'image en tant qu'enfant à la div créé.
    const getItemImg = document.getElementsByClassName("cart__item__img");
    getItemImg.appendChild(getImage);*/

    document.getElementsByClassName("cart__item__content__description")[0] = product.name

    // Modification de la quantité
    let bouttonSuppr = document.getElementsByClassName("deleteItem")

    bouttonSuppr.addEventListener('click', function () {
      const itemQuantity = document.getElementsByClassName('itemQuantity').value
      let calculQuantity = itemQuantity - recupererDonnee.quantity

    })

    let html = ''
    for (const element of recupererDonnee)
      html +=
        `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
        <div class="cart__item__img">
          <img src="${product.image}" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${product.name}</h2>
            <p>${product.color}</p>
            <p>${product.price}</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
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
    let calculationPrix = recupererDonnee[0].quantity * product.price

    // Récupération depuis le localstorage de la quantité sélectionnée par l'utilisateur pour permettre le calcul.
    document.getElementById("totalQuantity").innerHTML = recupererDonnee[0].quantity
    document.getElementById("totalPrice").innerHTML = calculationPrix

  }
})

