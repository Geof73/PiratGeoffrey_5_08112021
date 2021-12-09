// Création d'une fonction qui une fois la page chargée, declenche son contenu.
window.addEventListener('DOMContentLoaded', async function () {

  let recupererDonnee = JSON.parse(localStorage.getItem("donneeUtilisateur"));
  console.log(recupererDonnee)

  const response = await fetch(`http://localhost:3000/api/products/${recupererDonnee[0]}`)
  const product = await response.json()
 
  const getDivId = document.getElementById("cart__items");
  const createDiv = document.createElement("div");
  createDiv.setAttribute('id', 'cart__item__img')
  getDivId.appendChild(createDiv)
  console.log(createDiv)

  const getIdImg = document.getElementById("cart__item__img");
  const getImage = document.createElement("img");
  getImage.src = product.imageUrl;
  getImage.alt = product.altTxt;

  getIdImg.appendChild(getImage)
  
  let html = ''
  for (const element of recupererDonnee)
    html +=
      `<!--  <article class="cart__item" data-id="${element.getId}" data-color="${element.color}">
            <div class="cart__item__img">
              <img src="../images/product01.jpg" alt="Photographie d'un canapé">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>Nom du produit</h2>
                <p>Vert</p>
                <p>42,00 €</p>
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
          </article> -->`

  document.getElementById('cart__items').innerHTML = html

  let calculationPrix = recupererDonnee[1] * product.price

  document.getElementById("totalQuantity").innerHTML = recupererDonnee[1]
  document.getElementById("totalPrice").innerHTML = calculationPrix
})

