function confirmar() {

var mensaje = confirm("¿Deseas eliminar el producto?");

if (mensaje) {
	//función eliminar
alert("Eliminaste el producto de tu carrito");
	
}

else {
alert("¡Vaya! Casi eliminas el producto de tu carrito");
}
}
