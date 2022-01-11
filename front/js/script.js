// Script permettant de récupérer les données de l'API et de les afficher sur la page "index.html" en dynamique.

// Déclaration de la fonction asynchrone
(async function() {

// Méthode Fetch permettant de récupérer les données de l'API grâce à l'URL et mise en attente de la fonction avec "await", en attendant la résolution de la promesse.
	const response = await fetch("http://localhost:3000/api/products") 

	// Création de la variable "articles" qui est le résultat d'une convertion de la variable response en JSON
	const articles = await response.json()

	// Génération du code HTML représentant la liste de produits
	let html = ''

	//Création d'une boucle qui permet de récupérer les informations de l'API en définissant par une variable "product"
	for(const product of articles)
		html += `<a href="./product.html?id=${product._id}">
			<article>
			<img src="${product.imageUrl}" alt="${product.altTxt}">
			<h3 class="productName">${product.name}</h3>
			<p class="productDescription">${product.description}</p>
			<h3> ${product.price} €</h3>
			</article>
		</a>`
		
	// Récuperation du contenant 'items' du DOM pour pouvoir inserer la variable 'html'.	
	document.getElementById('items').innerHTML = html 
})()




