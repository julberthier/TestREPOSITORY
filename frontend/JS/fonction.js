// On rajoute une virgule et le signe € pour tous les prix !
function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ",") + " €";
}