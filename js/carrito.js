let carro = JSON.parse(localStorage.getItem('productosAgregados')) || [];

const destinos = [
  {
    id: 0,
    nombre: 'Salta',
    precio: 35000,
    zona: 'Norte',
    img: './img/salta.jpg',
  },
  {
    id: 1,
    nombre: 'Jujuy',
    precio: 34000,
    zona: 'Norte',
    img: './img/jujuy.jpg',
  },
  {
    id: 2,
    nombre: 'Tucuman',
    precio: 30000,
    zona: 'Norte',
    img: './img/tucuman.jpg',
  },
  {
    id: 3,
    nombre: 'Bariloche',
    precio: 70000,
    zona: 'Sur',
    img: './img/bariloche.jpg',
  },
  {
    id: 4,
    nombre: 'Mendoza',
    precio: 80000,
    zona: 'Sur',
    img: './img/mendoza.jpg',
  },
  {
    id: 5,
    nombre: 'Ushuaia',
    precio: 100000,
    zona: 'Sur',
    img: './img/ushuaia.jpg',
  },
  {
    id: 6,
    nombre: 'Chile',
    precio: 110000,
    zona: 'Inter',
    img: './img/chile.jpg',
  },
  {
    id: 7,
    nombre: 'Uruguay',
    precio: 90000,
    zona: 'Inter',
    img: './img/uruguay.jpg',
  },
  {
    id: 8,
    nombre: 'Brasil',
    precio: 120000,
    zona: 'Inter',
    img: './img/brasil.jpg',
  },
];

let content = '';
let cart = [];
// se agrega un FETCH asi el JSON LOCAL //
fetch('./data/destinos.json')
  .then((res) => res.json())
  .then((json) => {
    let content = '';
    json.forEach((p) => {
      content += `
    <div id="keyBoard" class="col-md-4 mt-2">
              <div class="card" style="width: 18rem;">
                  <img  src="${p.img}" class="card-img-top img-fluid"  style="width:300px;height:200px;">
                  <div class="card-body">
                      <h5 class="card-title" id="itemName">${p.nombre}</h5>
                      <p class="card-text" text-aling:center id="itemDesc">${p.zona}</p>
                      <p class="card-text" <p>$${p.precio}</p></p>
                      <a href="#" class="btn btn-primary" onclick="addToCart(${p.id});pasarALS();" >Comprar</a>
                  </div>
              </div>
          </div>
  `;
    });
    document.getElementById('shop').innerHTML = content;
  })
  .catch((e) => {
    console.log(e);
  });

let pasarALS = () => {
  let storageJSON = JSON.stringify(carro);
  localStorage.setItem('productosAgregados', storageJSON);
};

renderCart();

function renderCart() {
  if (carro.length == 0) {
    document.getElementById('carro').innerHTML = '<div class="alert alert-danger" role="alert" style="margin: 10px">No Has agregado ningun destino </div>';
  } else {
    let html = '';
    for (let i = 0; i < carro.length; i++) {
      html =
        html +
        `
        <div id="keyBoard" class="col-md-4 mt-2">
              <div class="card" style="width: 18rem;">
                  <img  src="${carro[i].img}" class="card-img-top img-fluid"  style="width:300px;height:200px;"> 
                  <div class="card-body">
                      <h5 class="card-title" id="itemName">${carro[i].nombre}</h5>
                      <p class="card-text" <p>$${carro[i].precio}</p></p>
                      <span style="cursor:pointer;" onclick="eliminar(${i});pasarALS();">❌</span>
                  </div>
              </div>
          </div>  
      `;
    }
    document.getElementById('carro').innerHTML = html;
  }
}

function addToCart(id) {
  const foundProduct = destinos.find((item) => item.id == id);
  carro.push(foundProduct);
  pasarALS();
  renderCart();
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Producto Agregado al carro',
    showConfirmButton: false,
    timer: 1000,
  });
}

function removeFromCart(id) {
  carro.splice(id, 1);
  pasarALS();
  renderCart();
}

function eliminar() {
  Swal.fire({
    title: 'Quieres eliminar el destino?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si',
  }).then((isConfirmed) => {
    if (isConfirmed) {
      removeFromCart();
      Swal.fire('Destino eliminado');
    } else {
      renderCart();
      Swal.fire('No se ha eliminado.', 'El registro NO ha sido eliminado.', 'error');
      delay(2000);
    }
  });
}
