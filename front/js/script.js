// Script permettant de récupérer les données de l'API et de les afficher sur la page "index.html" en dynamique.

// Déclaration de la fonction asynchrone
(async function() {

// Méthode Fetch permettant de récupérer les données de l'API grâce à l'URL et mise en attente de la fonction avec "await" en attendant la résolution de la promesse "response".
	const response = await fetch("http://localhost:3000/api/products") 

	// Création de la variable "articles" qui convertira les données en JSON
	const articles = await response.json()

	// Création de la variable "html"
	let html = ''
	for(const product of articles)
		html += `<a href="./product.html?id=${product._id}">
			<article>
			<img src="${product.imageUrl}" alt="${product.altTxt}">
			<h3 class="productName">${product.name}</h3>
			<p class="productDescription">${product.description}</p>
			<h3> ${(product.price).toString()} €</h3>
			</article>
		</a>`
		
	// Méthode getElementById() permettant de récupérer l'élément ID "items" de la page "index.html" puis de modifier les éléments de la variable "html"
	document.getElementById('items').innerHTML = html 
})()





