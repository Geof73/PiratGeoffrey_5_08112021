var searchUrl = new URLSearchParams(window.location.search)
var getId = searchUrl.get("id")
console.log(getId);

(async function () {
    const response = await fetch(`http://localhost:3000/api/products/${getId}`)
    const product = await response.json()
    


document.getElementById('title').textContent = product.name
document.getElementById('price').textContent = product.price
document.getElementById('description').textContent = product.description
document.getElementById('colors').textContent = product.colors

let colors = product.colors;
for (let color of colors) {
let option = document.createElement("option");
option.value = color;
option.innerText = color;
document.getElementById("colors").appendChild(option);}



})() 

var getButton = document.getElementById('addToCart')
getButton.onclick = function (){
    localStorage.setItem("colors", value);
    localStorage.setItem("quantity", value);
    localStorage.setItem("getId", value);
}



