// Création d'un modèle de classe 
let myCart = new Panier();

// Création d'une fonction qui une fois la page chargée, declenche son contenu.
window.addEventListener('DOMContentLoaded', async function () {

  // Récupération des données du localstorage enregistrées depuis la page "product.js".
  if (myCart.getNumberProduct() === 0) {
    document.getElementById("cart__items").innerHTML = "Votre panier est vide"
  }

  // Implémentation dans le DOM des éléments récupérés.
  else {
    let html = '';
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

    document.getElementById('cart__items').innerHTML = html;

    // Récupération depuis le localstorage de la quantité sélectionnée par l'utilisateur pour permettre le calcul.
    document.getElementById("totalQuantity").innerHTML = myCart.getNumberProduct();
    document.getElementById("totalPrice").innerHTML = myCart.getTotalPrice();
  };
});

// Changement de la quantité d'un canapé ou suppression de celui ci si sa quantité est à 0.
let changerQuantite = document.getElementById("cart__items").addEventListener('click', function (event) {

  // Récupération grâce à l'évenement du clic de la souris et de la méthode closest du produit.
  const row = event.target.closest('article.cart__item');

  // Si on appuie sur le boutton "supprimer", supprime le produit idenfitié par la variable "row" ainsi que dans le DOM.
  if (event.target.matches('p.deleteItem')) {
    let findCanap = myCart.panier.findIndex(e => e.getId == row.dataset.id && e.color == row.dataset.color);
    console.log(findCanap)
    
   // findCanap.indexOf()
  //  console.log(findCanap)
  let test = myCart.panier.splice(findCanap);
   console.log(test)
 
    myCart.save();
   // row.remove()
    document.getElementById("totalQuantity").innerHTML = myCart.getNumberProduct();
    document.getElementById("totalPrice").innerHTML = myCart.getTotalPrice();
  }

  // Si la quantité et/ou sa couleur sont modifié, récupérer les nouvelles valeurs.  
  else if (event.target.matches('input.itemQuantity')) {
    let product = myCart.panier.filter(e => e.getId == row.dataset.id && e.color == row.dataset.color);
    console.log(product)
    product.quantity = parseFloat(event.target.value);
    /*if (product.quantity <= 0) {
      let findCanap = myCart.panier.findIndex(e => e.getId == row.dataset.id && e.color == row.dataset.color);
      myCart.panier.splice(findCanap);
      row.remove();
    }*/

    // Puis sauvegarder les nouvelles valeurs dans le localstorage et actualiser la quantité et le total dans le DOM..
    myCart.save();
    document.getElementById("totalQuantity").innerHTML = myCart.getNumberProduct();
    document.getElementById("totalPrice").innerHTML = myCart.getTotalPrice();
  }
})

// Vérification des données saisies par l'utilisateur puis sauvegarde dans un objet si elles sont valide.
let clicForm = document.querySelector("#cart__order").addEventListener('click', function (event) {
  const rowForm = event.composedPath()[0].id
});

let changeForm = document.querySelector("#cart__order").addEventListener('change', (event) => {
  rowForm = event.composedPath()[0].id;
  if (event.target.matches("input")) {
    let getFormValue = document.querySelector("#" + rowForm).value;
    let contact = {};

    if (document.querySelector("#" + rowForm).checkValidity() == true) {
      const test = JSON.parse(localStorage.getItem("Contact"));
      let getJsonContact = JSON.parse(localStorage.getItem("Contact"));
      if (getJsonContact == undefined) {
        contact[rowForm] = getFormValue;
        localStorage.setItem("Contact", JSON.stringify(contact));
      }
      if (getJsonContact != undefined) {
        getJsonContact[rowForm] = getFormValue;
        localStorage.setItem("Contact", JSON.stringify(getJsonContact));
      }
      document.querySelector("#" + rowForm + "ErrorMsg").textContent = "";
      let inputColor = document.querySelector("#" + rowForm);
      inputColor.classList.remove("red");
      inputColor.classList.add("green");
    }
    else {
      let selectFormId = document.querySelector("#" + rowForm);
      selectFormId.classList.remove("green");
      selectFormId.classList.add("red");

      let firstName = "Veuillez entrer votre prénom, uniquement composé de lettres.";
      let lastName = "Veuillez entrer votre nom, uniquement composé de lettres.";
      let city = "Veuillez entrer votre ville, uniquement composée de lettres..";
      let address = "Veuillez entrer votre adresse.";
      let email = "Veuillez entrer une adresse email valide.";
      let tab = { firstName, lastName, city, address, email };
      let find = tab[rowForm];
      document.querySelector("#" + rowForm + "ErrorMsg").textContent = find;
    };
  };
});

/// Récupération des données du localstorage du panier et du formulaire.
document.getElementById('cart__order').addEventListener('submit', function (event) {
  event.preventDefault()
  let getJsonData = JSON.parse(localStorage.getItem("Data"));
  let getJsonContact = JSON.parse(localStorage.getItem("Contact"));

  // Si le formulaire comporte bien 5 éléments.
  const size = Object.keys(getJsonContact).length;
  let compareLenght = 5;

  // Et si des produits ont été ajoutés au panier.
  if (getJsonData != undefined) {
    if (size == compareLenght) {

      const contact = { getJsonData, getJsonContact };
      post();
    }
    else {
      window.alert("Veuillez compléter le formulaire.");
    }
  }
  else {
    window.alert("Veuillez d'abord ajouter des produits à votre panier");
  };

  // Validation du formulaire en l'envoyant au serveur via la méthode POST.
  async function post() {
    const contact = JSON.parse(localStorage.getItem("Contact"));
    const products = JSON.parse(localStorage.getItem("Data"));

    const productsID = products.map(p => p.getId);
    const command = { contact, products: productsID };

    const postFetch = await fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(command),
    });
    const response = await postFetch.json();

    if (response) {
      localStorage.setItem("orderId", response.orderId);
      window.location = './confirmation.html'
    }
    else {
      alert(`Erreur de commande`);
    }
  };
})