window.onload = function () {
  //Acá lee el JSON
  let baseDeDatos = [{
      id: 1,
      nombre: 'Leche',
      precio: 1500,
      imagen: 'img/leche.jpg'
    },
    {
      id: 2,
      nombre: 'Leche',
      precio: 1600,
      imagen: 'img/leche.jpg'
    },
    {
      id: 3,
      nombre: 'Leche',
      precio: 1700,
      imagen: 'img/leche.jpg'
    },
    {
      id: 4,
      nombre: 'Leche',
      precio: 1800,
      imagen: 'img/leche.jpg'
    }

  ]
  let $items = document.querySelector('#items');
  let carrito = [];
  let total = 0;
  let $carrito = document.querySelector('#carrito');
  let $total = document.querySelector('#total');
  let $botonVaciar = document.querySelector('#boton-vaciar');
  let $botonPagar = document.querySelector('#boton-pagar');


  function renderItems() {
    for (let info of baseDeDatos) {
      let miNodo = document.createElement('div');
      miNodo.classList.add('card', 'col-sm-4', );
      miNodo.classList.add('card', 'border-warning', );
      let miNodoCardBody = document.createElement('div');
      miNodoCardBody.classList.add('card-body');
      let miNodoTitle = document.createElement('h5');
      miNodoTitle.classList.add('card-title');
      miNodoTitle.textContent = info['nombre'];
      let miNodoImagen = document.createElement('img');
      miNodoImagen.classList.add('img-fluid');
      miNodoImagen.setAttribute('src', info['imagen']);
      let miNodoPrecio = document.createElement('p');
      miNodoPrecio.classList.add('card-info');
      miNodoPrecio.textContent = '$' + info['precio'];
      let miNodoBoton = document.createElement('button');
      miNodoBoton.classList.add('btn', 'btn-warning');
      miNodoBoton.textContent = 'Agregar';
      miNodoBoton.setAttribute('marcador', info['id']);
      miNodoBoton.addEventListener('click', anyadirCarrito);
      miNodoCardBody.appendChild(miNodoImagen);
      miNodoCardBody.appendChild(miNodoTitle);
      miNodoCardBody.appendChild(miNodoPrecio);
      miNodoCardBody.appendChild(miNodoBoton);
      miNodo.appendChild(miNodoCardBody);
      $items.appendChild(miNodo);
    }
  }

  function anyadirCarrito() {
    carrito.push(this.getAttribute('marcador'))
    calcularTotal();
    renderizarCarrito();
  }

  function renderizarCarrito() {
    $carrito.textContent = '';
    let carritoSinDuplicados = [...new Set(carrito)];
    carritoSinDuplicados.forEach(function (item, indice) {
      //Cargamos los elementos de la base de datos
      let miItem = baseDeDatos.filter(function (itemBaseDatos) {
        return itemBaseDatos['id'] == item;
      });
      let numeroUnidadesItem = carrito.reduce(function (total, itemId) {
        return itemId === item ? total += 1 : total;
      }, 0);

      let miNodo = document.createElement('li');
      miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
      miNodo.textContent = ` ${miItem[0]['nombre']} x${numeroUnidadesItem} - $${miItem[0]['precio']}`;
      let miBoton = document.createElement('button');
      miBoton.classList.add('btn', 'btn-danger', 'mx-4');
      miBoton.textContent = 'x';
      miBoton.style.marginLeft = '1rem';
      miBoton.setAttribute('item', item);
      miBoton.addEventListener('click', borrarItemCarrito);
      miNodo.appendChild(miBoton);
      $carrito.appendChild(miNodo);
    })
  }

  function borrarItemCarrito() {
    console.log()
    let id = this.getAttribute('item');
    carrito = carrito.filter(function (carritoId) {
      return carritoId !== id;
    });
    renderizarCarrito();
    calcularTotal();
  }

  function calcularTotal() {
    total = 0;
    for (let item of carrito) {
      let miItem = baseDeDatos.filter(function (itemBaseDatos) {
        return itemBaseDatos['id'] == item;
      });
      total = total + miItem[0]['precio'];
    }
    let totalDosDecimales = total.toFixed(0);
    $total.textContent = totalDosDecimales;
  }

  function vaciarCarrito() {
    carrito = [];
    renderizarCarrito();
    calcularTotal();
  }

  function pagarCarrito() {
    window.open("pagar.html", 'Pagar');
  }
  $botonVaciar.addEventListener('click', vaciarCarrito);
  $botonPagar.addEventListener('click', pagarCarrito);
  renderItems();
}
