// Page JS permettant la création d'un modèle de classes.
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

    save() {
        localStorage.setItem("Data", JSON.stringify(this.panier));
    }

    add(cart) {
        cart.quantity = parseFloat(cart.quantity)
        let foundProduct = this.panier.find(e => e.getId == cart.getId);
        let foundColor = this.panier.find(e => e.color == cart.color);
        if (foundProduct = foundColor) {
            foundProduct.quantity = cart.quantity;
            foundProduct.color = cart.color;
        }
        else {
            this.panier.push(cart);
        }
        this.save();
    }

    getNumberProduct() {
        let number = 0;
        for (let produit of this.panier) {
            number += produit.quantity;
        }
        return parseFloat(number);
    }

    getTotalPrice() {
        let total = 0;
        for (let produit of this.panier) {
            total += produit.quantity * produit.priceProduct;
        }
        return parseFloat(total)
    }
}
