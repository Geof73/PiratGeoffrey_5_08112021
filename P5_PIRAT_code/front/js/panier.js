// Page JS permettant de manipuler la classe Panier grâce à ses prototypes.

// Construit la classe Panier.
class Panier {
    constructor() {
        let panier = localStorage.getItem("Data");
        if (panier == null) {
            this.panier = []
        }
        else {
            this.panier = JSON.parse(panier)
        }
    }

    // Sauvegarde des données dans le localstorage.
    save() {
        localStorage.setItem("Data", JSON.stringify(this.panier));
    }

    // Permet de sauvegarde la quantité des articles.
    add(cart) {
        cart.quantity = parseFloat(cart.quantity)
        let foundProduct = this.panier.find(e => e.getId == cart.getId && e.color == cart.color);
        if (foundProduct) {
            foundProduct.quantity = cart.quantity;
            foundProduct.color = cart.color;
        }
        else {
            this.panier.push(cart);
        }
        this.save();
    }

    // Permet d'afficher la quantité totale des articles dans la page JS "cart"
    getNumberProduct() {
        let number = 0;
        for (let produit of this.panier) {
            number += produit.quantity;
        }
        return parseFloat(number);
    }

    // Permet d'afficher le prix total des articles dans la page JS "cart"
    getTotalPrice(productResponseApi) {
        let total = 0;
        for (let produit of this.panier) {
            total += produit.quantity * productResponseApi.price
        }
        return parseFloat(total)
    }
}
