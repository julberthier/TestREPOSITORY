let bears = JSON.parse(localStorage.getItem("produit"));
let commandId = JSON.parse(localStorage.getItem("command"));

function getId() {
	document.getElementById("command_id").innerHTML = `${commandId[0].orderId}`
}

function getPrice() {
	let totalCardPrice = 0;
	for (let p = 0; p < bears.length; p++) {
		totalCardPrice = totalCardPrice + bears[p].price * bears[p].quantity;
	}	
	document.getElementById("final_price_cart").innerHTML = `<strong> ${totalCardPrice + ",00 €"}</strong>`;	
};

function clearLocalStorage () {
	const clearLocal = document.getElementById('back_button_link');
	const alsoClearLocal = document.getElementById('home');

	clearLocal.addEventListener("click", function(){		
		window.localStorage.clear();
	})

	alsoClearLocal.addEventListener("click", function(){		
		window.localStorage.clear();
	})
}

 getId();
 getPrice();
 clearLocalStorage();