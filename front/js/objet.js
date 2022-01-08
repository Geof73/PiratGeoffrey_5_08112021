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

    /*remove(foundId, foundColor) {
        this.panier.filter(function(found) {
            if (found != foundId, foundColor){ return true}
          })
          alert("Le produit a été supprimé de votre panier")
          this.save()
          //location.reload()
    }*/

    changeQuantity(cart, quantity) {
        let foundProduct = this.panier.find(e => e.getId == cart.getId);
        console.log(foundProduct)
        if (foundProduct) {
            foundProduct.quantity += quantity;
            if (foundProduct.quantity <= 0) {
                this.remove(foundProduct);
            }
            else {
                localStorage.setItem("Data", JSON.stringify(products));
            }
        }
    }

    getNumberProduct() {
        let number = 0;
        for (let produit of this.panier) {
            number += produit.quantity;

        }
        return number;
    }

    getTotalPrice() {
        let total = 0;
        for (let produit of this.panier) {
            total += produit.quantity * produit.priceProduct;
        }
        return total
    }

    /*addDataForm(getDataForm) {
        
        if(getDataForm != undefined){
            console.log(element)
        }
        else{
            myCart.panier.push(getDataForm)

        }
    
    }*/
}
