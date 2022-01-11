// Récupération du DOM pour insérer le numéro de commande généré par le serveur.
let getOrderId = localStorage.getItem("orderId")
let addOrderId = document.getElementById('orderId').innerHTML = getOrderId;
console.log(addOrderId)

// Nettoyage du localstorage après que la commande est été approuvée.
localStorage.clear()
