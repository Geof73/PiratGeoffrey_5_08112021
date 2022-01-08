let myCart = new Panier()

// Création d'une fonction qui une fois la page chargée, declenche son contenu.
window.addEventListener('DOMContentLoaded', async function () {

  // Récupération des données du localstorage enregistrées depuis la page "product.js".
  if (myCart.getNumberProduct() === 0) {
    document.getElementById("cart__items").innerHTML = "Votre panier est vide"
  }

  // Implémentation dans le DOM des éléments récupérés.
  else {
    let html = ''
    for (const element of myCart.panier)

      html +=
        `<article class="cart__item" data-id="${element.getId}" data-color="${element.color}">
        <div class="cart__item__img">
          <img src="${element.imageProduct}" alt="${element.imageTxt}>
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${element.nameProduct}</h2>
            <p>${element.color}</p>
            <p>${element.priceProduct}€</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté :</p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`

    document.getElementById('cart__items').innerHTML = html

    // Récupération depuis le localstorage de la quantité sélectionnée par l'utilisateur pour permettre le calcul.
    //let panierQuantite = getNumberProduct(this.panier);

    document.getElementById("totalQuantity").innerHTML = myCart.getNumberProduct()
    document.getElementById("totalPrice").innerHTML = myCart.getTotalPrice()
  }
})

// Changement de la quantité ou suppression d'un produit si la quantité est à 0.
let changerQuantite = document.getElementById("cart__items").addEventListener('click', function (event) {
  console.log(event)
  const row = event.target.closest('article.cart__item')
  row.dataset.id
  row.dataset.color
  row.addEventListener('change', (event) => {
    if (event.target.matches('p.deleteItem')) {
      let eventQuantity = parseFloat(event.target.value);
      let foundId = myCart.panier.find(e => e.getId == row.dataset.id);
      let foundColor = myCart.panier.find(e => e.color == row.dataset.color);
      let product = foundId = foundColor
      product.quantity = eventQuantity
      myCart.save();
      if (product.quantity <= 0) {
        let deleteCanap = myCart.panier.filter(e => e == product);
        console.log(deleteCanap)
        myCart.save();
        //location.reload()
      }

    } else if (event.target.matches('input.itemQuantity')) {
      let eventQuantity = parseFloat(event.target.value);
      let foundId = myCart.panier.find(e => e.getId == row.dataset.id);
      let foundColor = myCart.panier.find(e => e.color == row.dataset.color);
      let product = foundId = foundColor
      product.quantity = eventQuantity
      myCart.save();
      if (product.quantity <= 0) {
        let deleteCanap = myCart.panier.filter(e => e == product);
        console.log(deleteCanap)
        myCart.save();
        //location.reload()
      }
    }
  })
})

// Stockage des données saisies par l'utilisateur depuis le formulaire dans le localstorage
let getForm = document.querySelector(".cart__order__form").addEventListener('change', (event) => {
  console.log(event)

  let getJsonData = JSON.parse(localStorage.getItem("Data"));
  let getJsonContact = JSON.parse(localStorage.getItem("Contact"));

  let firstName = document.getElementById('firstName').value
  if (document.getElementById('firstName').checkValidity() == true) {
    document.getElementById("firstNameErrorMsg").innerHTML = ""
  }
  else {
    document.getElementById("firstNameErrorMsg").innerHTML = "Veuillez entrer votre nom, uniquement composé de lettres."
  }

  let lastName = document.getElementById('lastName').value
  if (document.getElementById('lastName').checkValidity() == true) {
    document.getElementById("lastNameErrorMsg").innerHTML = ""
  }
  else {
    document.getElementById("lastNameErrorMsg").innerHTML = "Veuillez entrer votre nom, uniquement composé de lettres."
  }

  let address = document.getElementById('address').value
  if (document.getElementById('address').checkValidity() == true) {
    document.getElementById("addressErrorMsg").innerHTML = ""
  }
  else {
    document.getElementById("addressErrorMsg").innerHTML = "Veuillez entrer votre adresse."
  }

  let city = document.getElementById('city').value
  if (document.getElementById('city').checkValidity() == true) {
    document.getElementById("cityErrorMsg").innerHTML = ""
  }
  else {
    document.getElementById("cityErrorMsg").innerHTML = "Veuillez entrer votre ville, uniquement composée de lettres.."
  }

  let email = document.getElementById('email').value
  if (document.getElementById('email').checkValidity() == true) {
    document.getElementById("emailErrorMsg").innerHTML = ""
  }
  else {
    document.getElementById("emailErrorMsg").innerHTML = "Veuillez entrer une adresse email valide."
  }

  let contact = { firstName, lastName, address, city, email }
  localStorage.setItem("Contact", JSON.stringify(contact));

  // Création de conditions pour que l'usager puisse valider le formulaire.
  for(const ele in getJsonContact)
  if (ele != undefined) {
    document.getElementById('order').addEventListener('click', function (event) {
      const contact = { getJsonData, getJsonContact };
      post();
    })
  }
  else {
    alert("Veuillez d'abord ajouter des éléments à votre panier")
  }

  // Validation du formulaire en l'envoyant au serveur via la méthode POST.
  async function post() {
    const contact = JSON.parse(localStorage.getItem("Contact"));
    const products = JSON.parse(localStorage.getItem("Data"));

    const productsID = products.map(p => p.getId)
    console.log(productsID)
    const command = { contact, products: productsID }
    console.log(command)

    const postFetch = await fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(command),
    })
    console.log(postFetch)
    const response = await postFetch.json();
    console.log(response);

    if (response) {
      alert(`Votre commande numéro ${response.orderId} à bien été passée.`)
      localStorage.setItem("orderId", response.orderId)
      window.location = `C:/Users/gpira/Desktop/Formation/P5_pirat_geoffrey/front/html/confirmation.html`
    } else {
      alert(`Erreur de commande`)
    }
  };
});







