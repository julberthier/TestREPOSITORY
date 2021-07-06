//JSON.parse converti les données qui sont dans le localStorage en objet JS.
let bears = JSON.parse(localStorage.getItem("produit"));
const validationFormulaire =  document.getElementById("validateConf");
let form_OK = true;

function feedLocalStorage(bears) {
	//Le local storage est vide !
	//On injecte le code HTML
	if (bears === null) {
		document.getElementById(
			"centralpanier"
		).innerHTML = ` <div id="empty_card">Votre panier est vide</div> `;
		yourCardIsEmpty(bears);
	}
	// LE PANIER N'EST PAS VIDE ! On remplit le HTML !
	else {
		feedHtmlLocal(bears);
		quantity();
		getPrice(bears);
		yourCardIsNotEmpty();
		deleteItems(bears);
		validationOk();
	}
}

feedLocalStorage(bears);

function feedHtmlLocal(bears) {
	let cardItemInside = [];

	// On recupere les informations ajoutées au LocalStorage et on remplit le HTML
	for (k = 0; k < bears.length; k++) {
		cardItemInside =
			cardItemInside +
			`
		<div class="row_item_card" id="${bears[k].id}">
			<img src="${bears[k].imageUrl}" alt="La photo de ${
				bears[k].name
			}" id="img_grid_panier">
			<div class="item_name_grid">
				${bears[k].name}			
				<span>${bears[k].price + ",00 €"}</span>
			</div>	
			<div class="qt_div">quantité : <span class="quantity">${
				bears[k].quantity
			}</span>		
			</div>
			<span class="item_price_qt">${
				bears[k].price * bears[k].quantity + ",00 €"
			}</span>
			<div class="shop_increase_">
			<span class="plusminus">
			<i class="fas fa-minus qtbtn_minus" data-id="${bears[k].id}"></i>
			<i class="fas fa-shopping-bag trash_delete"></i>
			<i class="fas fa-plus qtbtn_plus" data-id="${bears[k].id}"></i> 			
			</span>			
			<i class="fas fa-trash trash_icons" data-id="${bears[k].id}"></i>
			</div>			
  		</div> 
 	`;
	}
	//On affiche l'objet !
	document.getElementById("centralpanier").innerHTML = cardItemInside;
}

// ON GERE LA QUANTITE
function quantity() {
	document.querySelectorAll(".qtbtn_plus").forEach((element) => {
		element.addEventListener("click", function (event) {
			let bears = JSON.parse(localStorage.getItem("produit"));
			let id = event.target.getAttribute("data-id");
			let filtered = bears.find((teddies) => teddies.id === id);
			filtered.quantity = isNaN(filtered.quantity) ? 0 : filtered.quantity;
			filtered.quantity++;
			localStorage.produit = JSON.stringify(bears);
			let totalPrice = filtered.price * filtered.quantity;
			let div = document.getElementById(id);
			div.querySelector(".quantity").innerHTML = filtered.quantity;
			div.querySelector(".item_price_qt").innerHTML = totalPrice + ",00 €";
			getPrice(bears);
		});
	});

	document.querySelectorAll(".qtbtn_minus").forEach((element) => {
		element.addEventListener("click", function (event) {
			let bears = JSON.parse(localStorage.getItem("produit"));
			let id = event.target.getAttribute("data-id");
			let filtered = bears.find((teddies) => teddies.id === id);
			if (filtered.quantity < 2) {
				return;
			}
			filtered.quantity--;
			localStorage.produit = JSON.stringify(bears);
			let totalPrice = filtered.price * filtered.quantity;
			let div = document.getElementById(id);
			div.querySelector(".quantity").innerHTML = filtered.quantity;
			div.querySelector(".item_price_qt").innerHTML = totalPrice + ",00 €";
			getPrice(bears);
		});
	});
}

// ON SUPPRIME UN OBJET DU PANIER

function deleteItems() {
	document.querySelectorAll(".trash_icons").forEach((element) => {
		element.addEventListener("click", function (event) {
			let bears = JSON.parse(localStorage.getItem("produit"));
			let id = event.target.getAttribute("data-id");
			var filter = bears.filter(function (value, index, arr) {
				return value.id != id;
			});
			localStorage.setItem("produit", JSON.stringify(filter));
			let elt = document.getElementById(id).remove();
			location = location;
		});
	});
	//On vide entierement le localStorage
	document.querySelector("#delete_card").addEventListener("click", function () {
		window.localStorage.clear();
		location = location;
	});
	localCheck();
}

function localCheck() {
	if (bears.length === 0) {
		window.localStorage.clear();
		document.getElementById(
			"centralpanier"
		).innerHTML = ` <div id="empty_card">Votre panier est vide</div> `;
	}
}

// ON RECUPERER LES PRIX DES OURS POUR LES AFFICHER //

function getPrice(bears) {
	// On calcul et affiche le montant du panier
	let totalCardPrice = 0;
	for (let p = 0; p < bears.length; p++) {
		totalCardPrice = totalCardPrice + bears[p].price * bears[p].quantity;
	}
	// Et on remplit avec le total calculé dynamiquement !
	document.getElementById("item_price").innerHTML = `${
		totalCardPrice + ",00 €"
	}`;
	document.getElementById("price_total_panier").innerHTML = `${
		totalCardPrice + ",00 €"
	}`;
}

const blurBg = document.getElementById("blur_bg");

/* LE PANIER EST VIDE POP UP */

function yourCardIsEmpty() {
	const btnSend = document.querySelector("#send_command");
	const popEmpty = document.getElementById("empty_popup");

	btnSend.addEventListener("click", function (event) {
		event.preventDefault();
		popEmpty.style.visibility = "visible";
		blurBg.style.display = "block";
		blurBg.style.zIndex = "0";
	});

	popEmpty.addEventListener("mouseout", function (event) {
		event.preventDefault();
		popEmpty.style.visibility = "hidden";
		blurBg.style.display = "none";
	});
}

/* LE PANIER N'EST PAS VIDE, FORMULAIRE DE COMMANDE ! */

const openHideBoxConf = document.getElementById("hide_conf_box");

function yourCardIsNotEmpty() {
	const btnSend = document.querySelector("#send_command");

	btnSend.addEventListener("click", function () {
		openHideBoxConf.style.visibility = "visible";
		blurBg.style.display = "block";
		blurBg.style.zIndex = "0";
	});
}

document.getElementById("close").addEventListener("click", function () {
	openHideBoxConf.style.display = "none";
	blurBg.style.display = "none";
	window.location.reload();
});

/* ENVOI DU FORMULAIRE DANS LE LOCALSTORAGE */
function validationOk() {	
			let bears = JSON.parse(localStorage.getItem("produit"));
			
	validationFormulaire.addEventListener("click", function() {
			let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
			let cityRegExp = new RegExp('^[a-zA-Z-_ ]+$');
				
			if (!emailRegExp.test(document.getElementById("mail").value)){
				form_OK = false,
				alert('Veuillez renseigner une adresse email valide ! ')
			}
			
			if (document.getElementById("name").value.length < 2) {	
				form_OK = false,
				alert('Le nom est trop court ! ')
			}

			if (document.getElementById("firstname").value.length < 2) {
				form_OK = false,	
				alert('Le prénom est trop court ! ')
			}
			
			if (document.getElementById("adress").value.length < 4) {		
				form_OK = false,
				alert('Veuillez renseigner une adresse valide ! ')
			}

			if (!cityRegExp.test(document.getElementById("city").value)) {
				form_OK = false,	
				alert('Les chiffres ne sont pas acceptés')
			}

			if (form_OK === false) {
				alert('Tous les champs du formulaire doivent être remplis.'),
				location = location
			}
			
			if (form_OK) {	
				let contact = {
					lastName: document.getElementById("name").value,
					firstName: document.getElementById("firstname").value,
					address: document.getElementById("adress").value,
					city: document.getElementById("city").value,
					email: document.getElementById("mail").value,
				};
	
				const sendForShip = {
					contact: contact,
					products: bears.map((el) => {
						return el.id;
					}),
				};
					fetch("http://localhost:3000/api/teddies/order", {
						method: "POST",
						headers: {
							Accept: "application/json",
							"Content-type": "application/json",
						},
						body: JSON.stringify(sendForShip),
					})
						.then((response) => response.json())
						.then((json) => {					
							localStorage.setItem("command", JSON.stringify([json])),
							location.href = "pages/confirmation.html"
					});
			}
	})
}



