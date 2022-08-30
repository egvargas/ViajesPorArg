let carro = JSON.parse(localStorage.getItem('productosAgregados')) || [];
const destinos = [
  {
    id: 0,
    nombre: 'Salta',
    precio: 35000,
    zona: 'Norte',
    img: 'https://cdn.getyourguide.com/img/tour/5d270e86b3e53.jpeg/146/Desde-Salta--excursi-n-de-d-a-completo-a-Humahuaca.jpg',
  },
  {
    id: 1,
    nombre: 'Jujuy',
    precio: 34000,
    zona: 'Norte',
    img: 'https://tn.com.ar/resizer/Eq258bquwCsMFJq0uvPrWTMNQKg=/767x0/smart/cloudfront-us-east-1.images.arcpublishing.com/artear/5UJC6VDE7SVPKOPL2MWAULBDEU.jpg',
  },
  {
    id: 2,
    nombre: 'Tucuman',
    precio: 30000,
    zona: 'Norte',
    img: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Tucuman-CasaIndependencia2.jpg',
  },
  {
    id: 3,
    nombre: 'Bariloche',
    precio: 70000,
    zona: 'Sur',
    img: 'https://media.traveler.es/photos/61376b7b4c612f07ec399172/1:1/w_1333,h_1333,c_limit/46653.jpg',
  },
  {
    id: 4,
    nombre: 'Mendoza',
    precio: 80000,
    zona: 'Sur',
    img: 'https://tripin.travel/wp-content/uploads/2020/06/turismo-mendoza-2-web.jpg',
  },
  {
    id: 5,
    nombre: 'Ushuaia',
    precio: 100000,
    zona: 'Sur',
    img: 'https://media.viajando.travel/p/ed55770f8c8875de65e4e0dae5a314f6/adjuntos/236/imagenes/000/490/0000490331/1200x675/smart/ushuaia.jpg',
  },
];

let content = '';
let cart = [];

destinos.forEach((p) => {
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

let pasarALS = () => {
  let storageJSON = JSON.stringify(cart);
  localStorage.setItem('productosAgregados', storageJSON);
};

function renderCart() {
  if (cart.length == 0) {
    document.getElementById('cart').innerHTML = '<div class="alert alert-danger" role="alert">No Has agregado ningun destino </div>';
  } else {
    let html = '';
    for (let i = 0; i < cart.length; i++) {
      html =
        html +
        `
        <div id="keyBoard" class="col-md-4 mt-2">
              <div class="card" style="width: 18rem;">
                  <img  src="${cart[i].img}" class="card-img-top img-fluid"  style="width:300px;height:200px;">
                  <div class="card-body">
                      <h5 class="card-title" id="itemName">${cart[i].nombre}</h5>
                      <p class="card-text" <p>$${cart[i].precio}</p></p>
                      <span style="cursor:pointer;" onclick="removeFromCart(${i});pasarALS();">❌</span>
                  </div>
              </div>
          </div>  
      `;
    }
    document.getElementById('cart').innerHTML = html;
  }
}

function addToCart(id) {
  const foundProduct = destinos.find((item) => item.id == id);
  cart.push(foundProduct);
  renderCart();
  pasarALS();
}
function removeFromCart(id) {
  cart.splice(id, 1);
  renderCart();
  pasarALS();
}
