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
function renderALL() {
  fetch('./data/destinos.json')
    .then((res) => res.json())
    .then((json) => {
      let content = '';
      json.forEach((p) => {
        content += `
    <div id="keyBoard" class="col-md-4 mt-2">
              <div class="card" style="width: 18rem;">
                  <img  src="${p.img}" class="card-img-top img-fluid"  style="width:300px;height:200px; ">
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
}
renderALL();
let pasarALS = () => {
  let storageJSON = JSON.stringify(carro);
  localStorage.setItem('productosAgregados', storageJSON);
};

renderCart();

function renderCart() {
  if (carro.length == 0) {
    document.getElementById('carro').innerHTML = '<div class="alert alert-danger" role="alert" style="margin: 10px">No Has agregado ningun destino </div>';
    document.getElementById('botoncito').style.display = 'none';
  } else {
    let html = '';
    for (let i = 0; i < carro.length; i++) {
      html =
        html +
        `
        <div id="keyBoard" class="col-md-4 mt-2">
              <div class="card" style="width: 18rem;">
                  <img  src="${carro[i].img}" class="card-img-top img-fluid"  style="width:80px;height:80px;margin: auto"> 
                  <div class="card-body">
                      <h5 class="card-title" id="itemName">${carro[i].nombre}</h5>
                      <p class="card-text" <p>$${carro[i].precio}</p></p>
                      <span style="cursor:pointer;" onclick="eliminar(${i});pasarALS();">???</span>
                      
                  </div>
              </div>
          </div>  
      `;
    }
    document.getElementById('carro').innerHTML = html;
    document.getElementById('botoncito').style.display = '';
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

function renderNorte() {
  fetch('./data/destinos.json')
    .then((res) => res.json())
    .then((zonas) => {
      const mostrarNorte = zonas.filter((dst) => dst.zona === `Norte`);
      /* console.log(mostrarNorte); */
      let content = '';
      mostrarNorte.forEach((mostrarNorte) => {
        content += `
    <div id="keyBoard" class="col-md-4 mt-2">
              <div class="card" style="width: 18rem;">
                  <img  src="${mostrarNorte.img}" class="card-img-top img-fluid"  style="width:300px;height:200px;">
                  <div class="card-body">
                      <h5 class="card-title" id="itemName">${mostrarNorte.nombre}</h5>
                      <p class="card-text" text-aling:center id="itemDesc">${mostrarNorte.zona}</p>
                      <p class="card-text" <p>$${mostrarNorte.precio}</p></p>
                      <a href="#" class="btn btn-primary" onclick="addToCart(${mostrarNorte.id});pasarALS();" >Comprar</a>
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
}

function renderSur() {
  fetch('./data/destinos.json')
    .then((res) => res.json())
    .then((zonas) => {
      const mostrarSur = zonas.filter((dst) => dst.zona === `Sur`);
      /* console.log(mostrarSur); */
      let content = '';
      mostrarSur.forEach((mostrarSur) => {
        content += `
    <div id="keyBoard" class="col-md-4 mt-2">
              <div class="card" style="width: 18rem;">
                  <img  src="${mostrarSur.img}" class="card-img-top img-fluid"  style="width:300px;height:200px;">
                  <div class="card-body">
                      <h5 class="card-title" id="itemName">${mostrarSur.nombre}</h5>
                      <p class="card-text" text-aling:center id="itemDesc">${mostrarSur.zona}</p>
                      <p class="card-text" <p>$${mostrarSur.precio}</p></p>
                      <a href="#" class="btn btn-primary" onclick="addToCart(${mostrarSur.id});pasarALS();" >Comprar</a>
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
}

function renderInter() {
  fetch('./data/destinos.json')
    .then((res) => res.json())
    .then((zonas) => {
      const mostrarInter = zonas.filter((dst) => dst.zona === `Internacional`);
      let content = '';
      mostrarInter.forEach((mostrarInter) => {
        content += `
    <div id="keyBoard" class="col-md-4 mt-2">
              <div class="card" style="width: 18rem;">
              <img  src="${mostrarInter.img}" class="card-img-top img-fluid"  style="width:300px;height:200px;">
              <div class="card-body">
                      <h5 class="card-title" id="itemName">${mostrarInter.nombre}</h5>
                      <p class="card-text" text-aling:center id="itemDesc">${mostrarInter.zona}</p>
                      <p class="card-text" <p>$${mostrarInter.precio}</p></p>
                      <a href="#" class="btn btn-primary" onclick="addToCart(${mostrarInter.id});pasarALS();" >Comprar</a>
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
}

let carro2 = JSON.parse(localStorage.getItem('productosAgregados')) || [];
let suma = carro2.length;
document.getElementById('sumaid').innerHTML = suma;
