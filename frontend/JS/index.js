// CONST AND VAR
const showContainer = document.getElementById("show_container");

//API REQUEST
fetch("http://localhost:3000/api/teddies")
	.then((response) => response.json())
	.then((bears) => {
		showContainer.innerHTML = bears
			.map(
				(bear) =>
					`<div class="container_card box_shadow margin_t"> 
              <a href="Frontend/pages/produit.html?id=${bear._id}"><img src="${bear.imageUrl}" alt="photo de ${bear.name}" class="teddy_img"></a> 
              <div class="price_container"> 
                  <div class="list_items flex_column"> 
                    <h2 class="price_list_items bold_items">${bear.name}</h2> 
                    <span><span class="price_list_items italic_items"><i class="fas fa-tags"></i> ${numberWithCommas(bear.price)} </span></span>
                    <span class="price_list_items price_items"><a href="Frontend/pages/produit.html?id=${bear._id}">Voir ce produit</a></span></div></div></div>`)
			.join(" ");
			feedLocalStoragePost();
	})
	.catch((err) => console.log(err));

// LOCAL STORAGE

//JSON.parse converti les données qui sont dans le localStorage en object JS.
let bears = JSON.parse(localStorage.getItem("produit"));

const redbubble = document.getElementById("red_o");
const itemInPostCard = document.getElementById("dd_cart_content");

function feedLocalStoragePost() {
	//Le local storage est vide !
	//On injecte le code HTML
	if (bears === null) {
		const emptyCard = ` <div id="empty_card">Votre panier est vide</div> `;
		itemInPostCard.innerHTML = emptyCard;
	}
	// LE PANIER N'EST PAS VIDE ! On remplit le HTML !
	else {
		feedHtmlLocalPost();
		deleteItemsPost();
	}
}

function feedHtmlLocalPost() {
	let cardItemPostInside = [];

	// On recupere les informations ajoutées au LocalStorage et on remplit le HTML
	for (k = 0; k < bears.length; k++) {
		cardItemPostInside =
			cardItemPostInside +
			`
		<div class="row_item_card" id="${bears[k].id}">
			<img src="${bears[k].imageUrl}" alt="La photo de ${bears[k].name}" id="img_grid_panier">
			<div class="item_name_grid">${bears[k].name}</div>			
			<span>${bears[k].price*bears[k].quantity + ",00 €"}</span>
			<i class="fas fa-trash-alt trash_delete" data-id="${bears[k].id}"></i>
  		</div> 
 	`;
	}
	
	redbubble.style.display = "block";
	itemInPostCard.innerHTML = cardItemPostInside;
}

function deleteItemsPost() {
	//On delete 1 item du panier
	document
		.querySelectorAll(".trash_delete").forEach(element => {		
			element.addEventListener("click", function (event) {
				let teddies = JSON.parse(localStorage.getItem("produit"));
				let id = event.target.getAttribute("data-id");
				var filtered = teddies.filter(function(value, index, arr){ 
					return value.id != id;
				});
				window.localStorage.setItem("produit", JSON.stringify(filtered));	
				let elt = document.getElementById(id).remove();
				window.location.reload();
			});	
		});
	localCheckPost();
};

function localCheckPost() {
	let bears = JSON.parse(localStorage.getItem("produit"));
	if (bears.length === 0) {
		window.localStorage.clear();
		location = location;
	}
};
