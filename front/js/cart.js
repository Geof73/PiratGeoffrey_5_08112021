let myCart = new Panier()

// Création d'une fonction qui une fois la page chargée, declenche son contenu.
window.addEventListener('DOMContentLoaded', async function () {

  // Validation du formulaire en l'envoyant au serveur via la méthode POST.
  const contact = JSON.parse(localStorage.getItem("Contact"));
  const products = JSON.parse(localStorage.getItem("Data"));

  const command = { contact, products }
  console.log(command)

  const postFetch = await fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(command)
  });
  console.log(postFetch)
  const response = await postFetch.json();
  console.log(response);

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

  let element = document.getElementById('cart__items')

  let getP = event.composedPath()[4]

  /*let test = event.target.closest('#cart__items').dataset.id
  console.log(test)*/

  getP.addEventListener('change', (event) => {
    console.log(event)
    let elementId = getP.dataset.id
    let elementColor = getP.dataset.color
    let stockElement = { elementId, elementColor }
    localStorage.setItem("ID", JSON.stringify(stockElement));
    myCart.changeQuantity()
  })
})

// Stockage des données saisies par l'utilisateur depuis le formulaire dans le localstorage
let getForm = document.querySelector(".cart__order__form").addEventListener('change', (event) => {
  console.log(event)

  let firstName = document.getElementById('firstName').value
  let lastName = document.getElementById('lastName').value
  let address = document.getElementById('address').value
  let city = document.getElementById('city').value
  let email = document.getElementById('email').value
  let contact = { firstName, lastName, address, city, email }
  let stockDataForm = []
  if (contact != null) {
    stockDataForm.pop()
    stockDataForm.push(contact)
    localStorage.setItem("Contact", JSON.stringify(contact))

  }
  else {
    stockDataForm.push(contact)
    localStorage.setItem("Contact", JSON.stringify(contact))
  }



  // Création de conditions pour que l'usager puisse valider le formulaire.
  let clicOrder = document.getElementById('order').addEventListener('click', function (event) {

    let getJsonData = localStorage.getItem("Data");
    let addPatternFirstName = document.getElementById("firstName").setAttribute("pattern","[a-z]{3,}")
    if (firstName != undefined) {
      let firstNameErrorMsg = document.getElementById("firstNameErrorMsg").innerHTML = "Veuillez entrer votre prénom."
    }
    let addPatternLastName = document.getElementById("lastName").setAttribute("pattern","[a-z]{3,}")
    if (lastName != undefined) {
      let lastNameErrorMsg = document.getElementById("lastNameErrorMsg").innerHTML = "Veuillez entrer votre nom."
    }
    let addPatternAddress = document.getElementById("address").setAttribute("pattern","[a-zA-Z0-9]{6}")
    if (address != undefined) {
      let addressErrorMsg = document.getElementById("addressErrorMsg").innerHTML = "Veuillez entrer votre adresse."
    }
    let addPatternCity = document.getElementById("city").setAttribute("pattern","[a-z]{3,}")
    if (city != undefined) {
      let cityErrorMsg = document.getElementById("cityErrorMsg").innerHTML = "Veuillez entrer votre ville."
    }
    if (email != undefined) {
      let emailErrorMsg = document.getElementById("emailErrorMsg").innerHTML = "Veuillez entrer votre email."
    }

    let getOrderId = document.getElementById("orderId")
    getJsonData = localStorage.getItem("Data");
    let getJsonForm = localStorage.getItem("Form");
    const contact = { getJsonData, getJsonForm }
  });

})
/*  if (response) {
    alert(`Votre commande numéro ${response.orderId} à bien été passée.`)
    localStorage.setItem()
    localStorage.setItem()
    window.location = `C:\Users\gpira\Desktop\Formation\P5_pirat_geoffrey\front\html`
  } else {
    alert(`Erreur de commande`)
  }
  alert(`Votre commande numéro ${response.orderId} à bien été passée.`)
})*/


