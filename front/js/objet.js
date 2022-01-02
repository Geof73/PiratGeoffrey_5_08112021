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

    remove(cart) {
        this.panier = this.panier.filter(p => p.getId != cart.getId);
        this.save();
    }

    changeQuantity() {
        let getElement = JSON.parse(localStorage.getItem("ID"));
        let produit = JSON.parse(localStorage.getItem("Data"));
        let foundProduct = products.find(e => e.getId == cart.getId);
        console.log(foundProduct)
        if (foundProduct == getElement.elementId) {
            let valueQuantity = parseFloat(document.getElementsByClassName("itemQuantity").value)
            cart.quantity += valueQuantity;
            if (foundProduct.quantity <= 0) {
                this.remove(foundProduct);
                location.reload()
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
