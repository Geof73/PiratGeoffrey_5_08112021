var searchUrl = new URLSearchParams(window.location.search)
var getId = searchUrl.get("id")
console.log(getId);

(async function () {
    const response = await fetch(`http://localhost:3000/api/products/${getId}`)
    const articles = await response.json()
    
    let html = ''
    for (const product of articles)
        html =+
            `<div class="item__img">
            <img src="${product.imageUrl}" alt="${product.altTxt}">
            </div>`
    document.querySelectorAll(item>div).innerHTML = html;
})()