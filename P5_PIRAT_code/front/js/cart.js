let myCart = new Panier();

// Dès que la page est chargée, génération du panier avec les articles qui avaient été ajouté à celui-ci.
window.addEventListener('DOMContentLoaded', async function () {

  // Si aucun élément ajouté au panier, message indiquant que le panier est vide.
  if (myCart.getNumberProduct() === 0) {
    document.getElementById("cart__items").innerText = "Votre panier est vide"
  }

  // Récupération des éléments nécessaires à la génération d'un panier dynamique.
  else {

    let html = '';
    for (const element of myCart.panier) {
      response = await fetch(`http://localhost:3000/api/products/${element.getId}`);
      productResponseApi = await response.json();

      html +=
        `<article class="cart__item" data-id="${element.getId}" data-color="${element.color}">
        <div class="cart__item__img">
          <img src="${productResponseApi.imageUrl}" alt="${productResponseApi.imageTxt}>
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${productResponseApi.name}</h2>
            <p>${element.color}</p>
            <p class="price">${productResponseApi.price}€</p>
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
    }

    // Insertion des éléments récupérés dans le html.
    document.getElementById('cart__items').innerHTML = html;

    // Appel à la fonction "prixTotal" pour calculer et afficher le total de la commande.
  }
  prixTotal();
  
});

// Fonction permettant de calculer le prix total.
async function prixTotal() {

  // Si le panier est vide, prévenir l'utilisateur avec un message et ensuite calculer le prix total.
  if (myCart.getNumberProduct() === 0) {
    document.getElementById("cart__items").innerText = "Votre panier est vide";
    document.getElementById("totalQuantity").innerText = 0;
    document.getElementById("totalPrice").innerText = '0'
  }

  // Si il ne l'est pas, simplement calculer le prix total.
  else {
    let total = 0;
    for (const element of myCart.panier) {
      response = await fetch(`http://localhost:3000/api/products/${element.getId}`);
      productResponseApi = await response.json();
      total += element.quantity * productResponseApi.price
    }
    document.getElementById("totalQuantity").innerText = myCart.getNumberProduct();
    document.getElementById("totalPrice").innerText = total
  }
};

// Supprime l'article du DOM et du localstorage si le bouton "supprimer" est cliqué.
document.getElementById("cart__items").addEventListener('click', function (event) {

  // Récupération de l'article grâce à l'évenement du clique combiné à la méthode closest pour identifier le produit à mettre à jour.
  const row = event.target.closest('article.cart__item');

  // Si on appuie sur le boutton "supprimer", supprime le produit idenfitié par la variable "row" ainsi que dans le DOM.
  if (event.target.matches('p.deleteItem')) {
    let findCanap = myCart.panier.findIndex(e => e.getId == row.dataset.id && e.color == row.dataset.color);
    myCart.panier.splice(findCanap, 1);
    row.remove()
    myCart.save();
    prixTotal();
  }
});

// Changement de la quantité d'un canapé ou suppression de celui ci si sa quantité est à 0.
document.getElementById("cart__items").addEventListener('change', function (event) {

  // Récupération grâce à l'évenement du clic de la souris et de la méthode closest du produit.
  const row = event.target.closest('article.cart__item');

  // Si la quantité et/ou sa couleur sont modifiés, récupérer les nouvelles valeurs.  
  if (event.target.matches('input.itemQuantity')) {
    let product = myCart.panier.find(e => e.getId == row.dataset.id && e.color == row.dataset.color);
    product.quantity = parseFloat(event.target.value);
    if (product.quantity <= 0) {
      let findCanap = myCart.panier.findIndex(e => e.getId == row.dataset.id && e.color == row.dataset.color);
      myCart.panier.splice(findCanap, 1);
      row.remove();
      prixTotal();
    }
    myCart.save();
    prixTotal()
  }
});

// Création d'une fonction qui sera lancée si un élément contenu dans l'id "cart__order" est changé.
document.querySelector("#cart__order").addEventListener('change', (event) => {

  // Obtention de l'id de l'input du formulaire en fonction d'un évenement click.
  const rowForm = event.composedPath()[0].id

  // Si la vérification du champ rentré par l'utilisateur est valide, 
  if (event.target.matches("input")) {
    let getFormValue = document.querySelector("#" + rowForm).value;
    let contact = {};

    // Si la vérification du champ rentré par l'utilisateur est valide, 
    if (event.target.checkValidity() == true) {

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
      event.target.classList.remove("red");
      event.target.classList.add("green");
    }

    // Sinon, envoie un message d'erreur et entourer l'input d'une bordure rouge qu'elles ne remplissent pas les conditions du formulaire.
    else {

      // Sélectionne l'input en fonction du clic pour appliquer la couleur de la bordure.
      event.target.classList.remove("green");
      event.target.classList.add("red");

      // Création des messages d'erreur contenu dans un objet.
      let messageError = {
        firstName: "Veuillez entrer votre prénom, uniquement composé de lettres.",
        lastName: "Veuillez entrer votre nom, uniquement composé de lettres.",
        city: "Veuillez entrer votre ville, uniquement composée de lettres.",
        address: "Veuillez entrer votre adresse.",
        email: "Veuillez entrer une adresse email valide."
      };

      // Récupération du message contenu dans l'objet taen fonction de son id.
      let find = messageError[rowForm];

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
  const sizeContact = Object.keys(getJsonContact).length;
  const sizeData = Object.keys(getJsonData).length;

  // Création d'une variable pour pouvoir la comparer au nombre d'élément se trouvant dans "Contact".
  let compareLenghtContact = 5;
  let compareLenghtData = 0;

  // Et si des produits ont été ajoutés au panier.
  if (sizeData != compareLenghtData) {

    // Si l'objet "Contact" comporte bien les 5 informations nécéssaire du formulaire. 
    if (sizeContact == compareLenghtContact) {

      // Déclenche la fonction "post" pour l'envoie des données au serveur.
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

  // Fonction qui permet d'obtenir un numéro de commande de la part du serveur.
  async function post() {
    const contact = JSON.parse(localStorage.getItem("Contact"));
    const products = JSON.parse(localStorage.getItem("Data"));

    // Création d'un nouveau tableau avec la méthode map qui contiendra seulement l'id des produits dans le panier pour que la requête soit accepté par le serveur.
    const productsId = products.map(p => p.getId);
    const command = { contact, products: productsId };

    // Envoie au serveur avec la méthode post et d'obtenir un Id de commande si les informations fournis sont valides.
    const postFetch = await fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(command),
    });
    const response = await postFetch.json();

    // Si la réponse renvoyée par le serveur est valide, fournir le numéro de commande.
    if (response) {
      localStorage.setItem("orderId", response.orderId);
      window.location = './confirmation.html'
    }
    // Sinon, message avertissant l'utilisateur d'une erreur lors de la génération.
    else {
      alert(`Erreur de commande`);
    }
  };
})