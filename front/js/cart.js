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
    console.log(myCart.panier)
    let findCanap = myCart.panier.findIndex(e => e.getId == row.dataset.id && e.color == row.dataset.color);
    console.log(findCanap)
    let test = myCart.panier.splice(findCanap);
    console.log(test)

    row.remove()
    myCart.save();
    document.getElementById("totalQuantity").innerHTML = myCart.getNumberProduct();
    document.getElementById("totalPrice").innerHTML = myCart.getTotalPrice();
  }

  // Si la quantité et/ou sa couleur sont modifié, récupérer les nouvelles valeurs.  
  else if (event.target.matches('input.itemQuantity')) {
    let product = myCart.panier.find(e => e.getId == row.dataset.id && e.color == row.dataset.color);
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

  // Obtention de l'id de l'input du formulaire en fonction d'un évenement click.
  const rowForm = event.composedPath()[0].id
});

// Création d'une fonction qui sera lancée si un élément contenu dans l'id "cart__order" est changé.
let changeForm = document.querySelector("#cart__order").addEventListener('change', (event) => {

  // Obtention de l'id de l'input du formulaire en fonction d'un évenement change.
  rowForm = event.composedPath()[0].id;

  if (event.target.matches("input")) {
    let getFormValue = document.querySelector("#" + rowForm).value;
    let contact = {};

    // Si la vérification du champ rentré par l'utilisateur est valide, 
    if (document.querySelector("#" + rowForm).checkValidity() == true) {

      // Récupération du localstorage "Contact" pour vérifier si il y a déjà des informations stockées.
      let getJsonContact = JSON.parse(localStorage.getItem("Contact"));

      // Si il n'y aucune information stockée, ajout des informations dans l'objet "Contact".
      if (getJsonContact == undefined) {
        contact[rowForm] = getFormValue;
        localStorage.setItem("Contact", JSON.stringify(contact));
      }

      // Si c'est le cas, reprendre l'objet "Contact" dans le localstorage pour permettre l'ajout d'un élément et éviter sa réécriture.
      else {
        getJsonContact[rowForm] = getFormValue;
        localStorage.setItem("Contact", JSON.stringify(getJsonContact));
      }

      // Indiquer à l'utilisateur par une bordure verte autour de l'input que les informations rentrées sont correcte. 
      document.querySelector("#" + rowForm + "ErrorMsg").textContent = "";
      let inputColor = document.querySelector("#" + rowForm);
      inputColor.classList.remove("red");
      inputColor.classList.add("green");
    }

    // Sinon, envoie un message d'erreur et entourer l'input d'une bordure rouge qu'elles ne remplissent pas les conditions du formulaire.
    else {

      // Sélectionne l'input en fonction du clic pour appliquer la couleur de la bordure.
      let selectFormId = document.querySelector("#" + rowForm);
      selectFormId.classList.remove("green");
      selectFormId.classList.add("red");

      // Création des messages d'erreur pour tous les inputs du formulaire.
      let firstName = "Veuillez entrer votre prénom, uniquement composé de lettres.";
      let lastName = "Veuillez entrer votre nom, uniquement composé de lettres.";
      let city = "Veuillez entrer votre ville, uniquement composée de lettres..";
      let address = "Veuillez entrer votre adresse.";
      let email = "Veuillez entrer une adresse email valide.";

      // Ajout des messages dans un objet.
      let tab = { firstName, lastName, city, address, email };

      // Récupération du message en fonction de son id.
      let find = tab[rowForm];

      // Appliquer le message récupéréré grâce à l'event à l'input correspondant à son id.
      document.querySelector("#" + rowForm + "ErrorMsg").textContent = find;
    };
  };
});

/// Récupération des données du localstorage du panier et du formulaire.
document.getElementById('cart__order').addEventListener('submit', function (event) {

  // Empêche le rechargement de la page déclenché par le boutton, sinon la fonction "post" n'est pas exécutée. 
  event.preventDefault()

  // Récupération du localstorage pour permettre l'envoie des données au serveur.
  let getJsonData = JSON.parse(localStorage.getItem("Data"));
  let getJsonContact = JSON.parse(localStorage.getItem("Contact"));

  // Récupération du nombre d'élément dans l'objet "Contact"
  const size = Object.keys(getJsonContact).length;

  // Création d'une variable pour pouvoir la comparer au nombre d'élément se trouvant dans "Contact".
  let compareLenght = 5;

  // Et si des produits ont été ajoutés au panier.
  if (getJsonData != undefined) {

    // Si l'objet "Contact" comporte bien les 5 informations nécéssaire du formulaire. 
    if (size == compareLenght) {


      const contact = { getJsonData, getJsonContact };

      // Déclencher la fonction "post" pour l'envoie des données au serveurs
      post();
    }

    // Si l'objet "Contact" ne comporte pas toutes les informations nécessaires, message pour demander de compléter le formulaire. 
    else {
      window.alert("Veuillez compléter le formulaire.");
    }
  }

  // Si il n'y a pas eu d'articles sotckées dans le localstorage, message pour demander d'en ajouter avant de compléter le formulaire.
  else {
    window.alert("Veuillez d'abord ajouter des produits à votre panier");
  };

  // Validation du formulaire en l'envoyant au serveur via la méthode POST.
  async function post() {
    const contact = JSON.parse(localStorage.getItem("Contact"));
    const products = JSON.parse(localStorage.getItem("Data"));

    // Création d'un nouveau tableau avec la méthode map qui contiendra seulement l'id des produits dans le panier pour que la requête soit accepté par le serveur.
    const productsId = products.map(p => p.getId);
    const command = { contact, products: productsId };

    const postFetch = await fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(command),
    });
    const response = await postFetch.json();

    // Si la réponse renvoyée par le serveur est valide.
    if (response) {
      localStorage.setItem("orderId", response.orderId);
      window.location = './confirmation.html'
    }
    // Sinon, message d'erreur.
    else {
      alert(`Erreur de commande`);
    }
  };
})