let prodCarro = JSON.parse(localStorage.getItem('productosAgregados')) || [];

let storageJSON = JSON.stringify(prodCarro);
localStorage.setItem('productosAgregados', storageJSON);

document.getElementById('destinos').innerHTML = storageJSON;

// Envio de Datos al correo //
const btn = document.getElementById('button');

document.getElementById('form').addEventListener('submit', function (event) {
  event.preventDefault();

  btn.value = 'Sending...';

  const serviceID = 'default_service';
  const templateID = 'template_eigu5l6';

  emailjs.sendForm(serviceID, templateID, this).then(
    () => {
      btn.value = 'Reservar';
      Swal.fire({
        icon: 'success',
        text: 'Correo enviado exitosamente',
      });
      redirec();
    },
    (err) => {
      btn.value = 'Reservar';
      /* alert(JSON.stringify(err)); */
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se pudo enviar el correo',
      });
    }
  );
});

function redirec() {
  Toastify({
    text: 'Estas siendo redireccionado a la web principal',

    duration: 5000,
  }).showToast();
  setTimeout(() => (location.href = './index.html'), 5000);
  localStorage.clear();
}
