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
  console.log(event);

  // Récupération grâce à l'évenement du clic de la souris et de la méthode closest du produit.
  const row = event.target.closest('article.cart__item');

    // Si on appuie sur le boutton "supprimer", supprime le produit idenfitié par la variable "row" ainsi que dans le DOM.
    if (event.target.matches('p.deleteItem')) {

        let findCanap = myCart.panier.findIndex(e => e.getId == row.dataset.id && e.color == row.dataset.color);
        myCart.panier.splice(findCanap);
        row.remove();
        myCart.save();
        document.getElementById("totalQuantity").innerHTML = myCart.getNumberProduct();
        document.getElementById("totalPrice").innerHTML = myCart.getTotalPrice();
  
    // Si la quantité et/ou sa couleur sont modifié, récupérer les nouvelles valeurs.  
    } else if (event.target.matches('input.itemQuantity')) {
      let product = myCart.panier.find(e => e.getId == row.dataset.id && e.color == row.dataset.color);
      product.quantity = parseFloat(event.target.value);
      if (product.quantity == 0) {
        let findCanap = myCart.panier.findIndex(e => e.getId == row.dataset.id && e.color == row.dataset.color);
        myCart.panier.splice(findCanap);
        row.remove();
      }
      
      // Puis sauvegarder les nouvelles valeurs dans le localstorage et actualiser la quantité et le total dans le DOM..
      myCart.save();
      document.getElementById("totalQuantity").innerHTML = myCart.getNumberProduct();
      document.getElementById("totalPrice").innerHTML = myCart.getTotalPrice();
    }

})

// Vérification des données saisies par l'utilisateur puis sauvegarde dans un objet si elles sont valide.
let getForm = document.querySelector(".cart__order__form").addEventListener('change', (event) => {
  console.log(event);

  // Création d'un objet pour pouvoir ajouter les valeurs entrées par l'utilisateur.
  let contact = {};

  // Récupération des informations rentrées par l'utilisateur depuis formulaire, si la réponse n'est pas conforme, message expliquant les erreurs.
  let firstName = document.getElementById('firstName').value;
  if (firstName) {
    if (document.getElementById('firstName').checkValidity() == true) {
      contact.firstName = firstName;
      localStorage.setItem("Contact", JSON.stringify(contact));
      document.getElementById("firstNameErrorMsg").innerHTML = "";
      document.getElementById('firstName').style.border = "3px solid green";
    }
    else {
      document.getElementById("firstNameErrorMsg").innerHTML = "Veuillez entrer votre nom, uniquement composé de lettres.";
      document.getElementById('firstName').style.border = "3px solid red";
    }
  };

  let lastName = document.getElementById('lastName').value
  if (lastName) {
    if (document.getElementById('lastName').checkValidity() == true) {
      contact.lastName = lastName;
      localStorage.setItem("Contact", JSON.stringify(contact));
      document.getElementById("lastNameErrorMsg").innerHTML = "";
      document.getElementById('lastName').style.border = "3px solid green";
    }
    else {
      document.getElementById("lastNameErrorMsg").innerHTML = "Veuillez entrer votre nom, uniquement composé de lettres.";
      document.getElementById('lastName').style.border = "3px solid red";
    }
  };

  let address = document.getElementById('address').value;
  if (address) {
    if (document.getElementById('address').checkValidity() == true) {
      contact.address = address;
      localStorage.setItem("Contact", JSON.stringify(contact));
      document.getElementById("addressErrorMsg").innerHTML = "";
      document.getElementById('address').style.border = "3px solid green";
    }
    else {
      document.getElementById("addressErrorMsg").innerHTML = "Veuillez entrer votre adresse.";
      document.getElementById('address').style.border = "3px solid red";
    }
  };

  let city = document.getElementById('city').value;
  if (city) {
    if (document.getElementById('city').checkValidity() == true) {
      contact.city = city;
      localStorage.setItem("Contact", JSON.stringify(contact));
      document.getElementById("cityErrorMsg").innerHTML = "";
      document.getElementById('city').style.border = "3px solid green";
    }
    else {
      document.getElementById("cityErrorMsg").innerHTML = "Veuillez entrer votre ville, uniquement composée de lettres..";
      document.getElementById('city').style.border = "3px solid red";
    }
  };

  let email = document.getElementById('email').value;
  if (email) {
    if (document.getElementById('email').checkValidity() == true) {
      contact.email = email;
      localStorage.setItem("Contact", JSON.stringify(contact));
      document.getElementById("emailErrorMsg").innerHTML = "";
      document.getElementById('email').style.border = "3px solid green";
    }
    else {
      document.getElementById("emailErrorMsg").innerHTML = "Veuillez entrer une adresse email valide.";
      document.getElementById('email').style.border = "3px solid red";
    }
  };
});

/// Récupération des données du localstorage du panier et du formulaire.
document.getElementById('cart__order').addEventListener('submit', function (event) {
  event.preventDefault()
  let getJsonData = JSON.parse(localStorage.getItem("Data"));
  let getJsonContact = JSON.parse(localStorage.getItem("Contact"));

  // Si le formulaire comporte bien 5 éléments.
  const size = Object.keys(getJsonContact).length;
  console.log(size)
  let compareLenght = 5

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
    console.log(productsID);
    const command = { contact, products: productsID };
    console.log(command);

    const postFetch = await fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(command),
    });
    console.log(postFetch);
    const response = await postFetch.json();
    console.log(response);

    if (response) {
      localStorage.setItem("orderId", response.orderId);
      window.location = './confirmation.html'
    }
    else {
      alert(`Erreur de commande`);
    }
  };
})