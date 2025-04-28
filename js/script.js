// Activar los tooltips y popovers
// Datos de ejemplo para rutas
const horariosEmpresa = {
  'Copetran': [
      { origen: 'Bogotá', destino: 'Medellín', horarios: ['06:00', '10:00', '14:00', '18:00', '22:00'], precio: '$75.000' },
      { origen: 'Bogotá', destino: 'Cali', horarios: ['07:30', '11:30', '15:30', '19:30', '23:30'], precio: '$85.000' },
      { origen: 'Medellín', destino: 'Cartagena', horarios: ['08:00', '12:00', '16:00', '20:00', '00:00'], precio: '$95.000' }
  ],
  'Expreso Brasilia': [
      { origen: 'Bogotá', destino: 'Barranquilla', horario: '05:30', precio: '$110.000', duracion: '16h' },
      { origen: 'Cartagena', destino: 'Medellín', horario: '09:00', precio: '$90.000', duracion: '14h' },
      { origen: 'Cali', destino: 'Bogotá', horario: '10:30', precio: '$85.000', duracion: '10h' }
  ],
  'Berlinas del Fonce': [
      { origen: 'Bogotá', destino: 'Bucaramanga', horario: '07:00', precio: '$65.000', duracion: '7h' },
      { origen: 'Bucaramanga', destino: 'Cúcuta', horario: '11:00', precio: '$45.000', duracion: '5h' },
      { origen: 'Cúcuta', destino: 'Bogotá', horario: '14:00', precio: '$95.000', duracion: '12h' }
  ],
  'Expreso Bolivariano': [
      { origen: 'Bogotá', destino: 'Pasto', horario: '16:00', precio: '$120.000', duracion: '18h' },
      { origen: 'Pasto', destino: 'Cali', horario: '15:30', precio: '$70.000', duracion: '8h' },
      { origen: 'Cali', destino: 'Medellín', horario: '13:00', precio: '$85.000', duracion: '10h' }
  ]
};

document.addEventListener('DOMContentLoaded', function() {
  // Inicializar tooltips
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
  });

  // Manejar click en "Ver rutas" de cada empresa
  document.querySelectorAll('[data-bs-target^="#modal"]').forEach(btn => {
      btn.addEventListener('click', function() {
          const modalId = this.getAttribute('data-bs-target');
          const empresa = this.closest('.card-body').querySelector('.card-title').textContent;
          const modalBody = document.querySelector(`${modalId} .modal-body`);

          let rutasHTML = `
              <table class="table">
                  <thead>
                      <tr>
                          <th>Origen</th>
                          <th>Destino</th>
                          <th>Horario</th>
                          <th>Duración</th>
                          <th>Precio</th>
                          <th>Acción</th>
                      </tr>
                  </thead>
                  <tbody>
          `;

          // Placeholder:  Replace this with logic to fetch or generate routes
          const rutasEmpresa = horariosEmpresa[empresa] || generateFakeRoutes(empresa);

          rutasEmpresa.forEach(ruta => {
              rutasHTML += `
                  <tr>
                      <td>${ruta.origen}</td>
                      <td>${ruta.destino}</td>
                      <td>${ruta.horario || generateFakeHorarios(ruta)}</td>
                      <td>${ruta.duracion || 'N/A'}</td>
                      <td>${ruta.precio}</td>
                      <td><button class="btn btn-sm btn-primary" onclick="reservarRuta('${empresa}', '${ruta.origen}', '${ruta.destino}', '${ruta.precio}')">Reservar</button></td>
                  </tr>
              `;
          });

          rutasHTML += `
                  </tbody>
              </table>
          `;

          modalBody.innerHTML = rutasHTML;
      });
  });

  // Inicializar popovers
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl)
  });

  // Validar formularios antes de enviar
  document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', function(e) {
          if (!form.checkValidity()) {
              e.preventDefault();
              e.stopPropagation();
          }
          form.classList.add('was-validated');
      });
  });

  // Mejorar interactividad de las tarjetas de rutas
  document.querySelectorAll('.route-card').forEach(card => {
      card.addEventListener('click', function(e) {
          if (!e.target.matches('button')) {
              const btn = this.querySelector('button');
              if (btn) btn.click();
          }
      });
  });
});

// Manejar el clic en los botones de login/registro
document.addEventListener('DOMContentLoaded', function() {
  var loginBtn = document.querySelector('a[href="#login"]');
  var registerBtn = document.querySelector('a[href="#registro"]');

  if(loginBtn) {
      loginBtn.addEventListener('click', function(e) {
          e.preventDefault();
          var loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
          loginModal.show();
      });
  }

  if(registerBtn) {
      registerBtn.addEventListener('click', function(e) {
          e.preventDefault();
          var registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
          registerModal.show();
      });
  }

  // Mostrar u ocultar formulario de tarjeta según método de pago
  var creditCardRadio = document.getElementById('creditCard');
  var creditCardForm = document.getElementById('creditCardForm');

  if(creditCardRadio && creditCardForm) {
      creditCardRadio.addEventListener('change', function() {
          creditCardForm.style.display = this.checked ? 'block' : 'none';
      });

      document.getElementById('pse').addEventListener('change', function() {
          creditCardForm.style.display = 'none';
      });

      document.getElementById('cash').addEventListener('change', function() {
          creditCardForm.style.display = 'none';
      });
  }
});


// Función para simular compra de boleto
function verHorarios(empresa, ruta) {
  const modal = new bootstrap.Modal(document.getElementById('horarioModal'));
  const modalBody = document.querySelector('#horarioModal .modal-body');
  // Placeholder:  Replace this with logic to fetch or generate horarios
  const horarios = horariosEmpresa[empresa].find(r => r.origen === ruta.origen && r.destino === ruta.destino)?.horarios || generateFakeHorarios(ruta);


  let horariosHTML = `
      <h5>${ruta.origen} → ${ruta.destino}</h5>
      <div class="list-group">
  `;

  horarios.forEach(horario => {
      horariosHTML += `
          <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              <span><i class="fas fa-clock me-2"></i>${horario}</span>
              <button class="btn btn-sm btn-primary" onclick="buyTicket('${ruta.origen} - ${ruta.destino}', '${ruta.precio}')">
                  Reservar
              </button>
          </a>
      `;
  });

  horariosHTML += '</div>';
  modalBody.innerHTML = horariosHTML;
  modal.show();
}

function buyTicket(route, price) {
  var ticketModal = new bootstrap.Modal(document.getElementById('ticketModal'));

  document.querySelector('#ticketModal .modal-body .card-body span:nth-child(2)').textContent = route;
  document.querySelector('#ticketModal .modal-body .card-body span:nth-child(4)').textContent = price;

  ticketModal.show();
}

function confirmarPago(event) {
event.preventDefault();
const confirmacion = document.getElementById('confirmacionPago');
const btn = document.getElementById('btnConfirmarPago');

btn.disabled = true;
confirmacion.classList.remove('d-none');

setTimeout(() => {
    window.location.href = 'index.html';
}, 2000);
}

// Placeholder functions to generate fake data
function generateFakeRoutes(empresa) {
return [{ origen: 'Ciudad A', destino: 'Ciudad B', precio: '$50.000' }];
}

function generateFakeHorarios(ruta) {
return ['08:00', '14:00', '20:00'];
}

let sedes = [];
let rutas = [];
let rutaId = 1;

// Agrega una nueva sede y actualiza la interfaz
function agregarSede() {
const input = document.getElementById('nuevaSede');
const nombre = input.value.trim();
if (!nombre) return;

const nuevaSede = {
  id: Date.now(),
  nombre: nombre
};

sedes.push(nuevaSede);
input.value = '';
actualizarSedes();
actualizarSedes();
guardarSedesEnLocalStorage(); // Guardar en localStorage
}

// Renderiza las tarjetas de sedes y actualiza el select de rutas
function actualizarSedes() {
const contenedor = document.getElementById('sedesContainer');
const select = document.getElementById('nuevaRutaSede');
contenedor.innerHTML = '';
select.innerHTML = '';

sedes.forEach((sede) => {
  const rutasActivas = rutas.filter(r => r.sede === sede.nombre).length;

  contenedor.innerHTML += `
    <div class="col-md-3 mb-3">
      <div class="card sede-card h-100">
        <div class="card-body">
          <h5 class="card-title">${sede.nombre}</h5>
          <p class="card-text text-muted">${rutasActivas} rutas activas</p>
          <button class="btn btn-sm btn-outline-primary" onclick="filtrarRutas('${sede.nombre}')">Ver rutas</button>
        </div>
      </div>
    </div>
  `;

  select.innerHTML += `<option value="${sede.nombre}">${sede.nombre}</option>`;
});
}


function reservarRuta(empresa, origen, destino, precio) {
const ticketModal = new bootstrap.Modal(document.getElementById('ticketModal'));

// Actualizar detalles del modal de compra
document.querySelector('#ticketModal .modal-body .card-body span:contains("Origen")').nextElementSibling.textContent = origen;
document.querySelector('#ticketModal .modal-body .card-body span:contains("Destino")').nextElementSibling.textContent = destino;
document.querySelector('#ticketModal .modal-body .card-body span:contains("Empresa")').nextElementSibling.textContent = empresa;
document.querySelector('#ticketModal .modal-body .card-body .d-flex:first-child span:last-child').textContent = precio;

ticketModal.show();
}




// Agrega una nueva ruta y actualiza la tabla -- con
function agregarRuta() {
const nombre = document.getElementById('nuevaRutaNombre').value.trim();
const sede = document.getElementById('nuevaRutaSede').value;
const origen = document.getElementById('nuevaRutaOrigen').value.trim();
const destino = document.getElementById('nuevaRutaDestino').value.trim();
const precio = document.getElementById('nuevaRutaPrecio').value.trim();
const horario = document.getElementById('nuevaRutaHorario').value.trim();
const horaSalida = document.getElementById('nuevaRutaHoraSalida').value;

if (!nombre || !sede || !origen || !destino || !precio || !horario || !horaSalida) {
  alert("Todos los campos son obligatorios");
  return;
}

rutas.push({
  id: rutaId++,
  nombre,
  sede,
  origen,
  destino,
  precio,
  horario,
  horaSalida
});

guardarSedesEnLocalStorage(); // Guardar en localStorage

// Limpiar los campos del formulario
document.getElementById('nuevaRutaNombre').value = '';
document.getElementById('nuevaRutaOrigen').value = '';
document.getElementById('nuevaRutaDestino').value = '';
document.getElementById('nuevaRutaPrecio').value = '';
document.getElementById('nuevaRutaHorario').value = '';
document.getElementById('nuevaRutaHoraSalida').value = '';

renderizarRutas();
actualizarSedes();

}

function renderizarRutas() {
const cuerpo = document.getElementById('rutasTableBody');
cuerpo.innerHTML = '';

rutas.forEach(ruta => {
  cuerpo.innerHTML += `
    <tr>
      <td>${ruta.id}</td>
      <td>${ruta.nombre}</td>
      <td>${ruta.sede}</td>
      <td>${ruta.origen}</td>
      <td>${ruta.destino}</td>
      <td>${ruta.precio}</td>
      <td>${ruta.horario}</td>
      <td>${ruta.horaSalida}</td>
      <td>
        <button class="btn btn-sm btn-outline-secondary" onclick="editarRuta(${ruta.id})">Editar</button>
        <button class="btn btn-sm btn-outline-danger" onclick="eliminarRuta(${ruta.id})">Eliminar</button>
      </td>
    </tr>
  `;
});
}

function filtrarRutas(nombreSede) {
const cuerpo = document.getElementById('rutasTableBody');
cuerpo.innerHTML = '';

rutas.filter(r => r.sede === nombreSede).forEach(ruta => {
  cuerpo.innerHTML += `
    <tr>
      <td>${ruta.id}</td>
      <td>${ruta.nombre}</td>
      <td>${ruta.sede}</td>
      <td>${ruta.origen}</td>
      <td>${ruta.destino}</td>
      <td>${ruta.precio}</td>
      <td>
        <button class="btn btn-sm btn-outline-secondary" onclick="editarRuta(${ruta.id})">Editar</button>
        <button class="btn btn-sm btn-outline-danger" onclick="eliminarRuta(${ruta.id})">Eliminar</button>
      </td>
    </tr>
  `;
});
}


function eliminarRuta(id) {
rutas = rutas.filter(r => r.id !== id);
renderizarRutas();
actualizarSedes();
}

function editarRuta(id) {
// Buscar la ruta por su ID
const ruta = rutas.find(r => r.id === id);
if (!ruta) return;

// Llenar el formulario con los datos de la ruta
document.getElementById('editarRutaNombre').value = ruta.nombre;
document.getElementById('editarRutaOrigen').value = ruta.origen;
document.getElementById('editarRutaDestino').value = ruta.destino;
document.getElementById('editarRutaPrecio').value = ruta.precio;
document.getElementById('editarRutaHorario').value = ruta.horario;
document.getElementById('editarRutaHoraSalida').value = ruta.horaSalida;

// Actualizar las opciones del select con las sedes disponibles
const editarRutaSede = document.getElementById('editarRutaSede');
editarRutaSede.innerHTML = ''; // Limpiar opciones existentes
sedes.forEach(sede => {
  const option = document.createElement('option');
  option.value = sede.nombre;
  option.textContent = sede.nombre;
  if (sede.nombre === ruta.sede) {
    option.selected = true; // Seleccionar la sede actual de la ruta
  }
  editarRutaSede.appendChild(option);
});

// Guardar el ID de la ruta en un atributo del formulario
document.getElementById('editarRutaForm').dataset.rutaId = id;

// Mostrar el modal de edición
const editarModal = new bootstrap.Modal(document.getElementById('editarRutaModal'));
editarModal.show();
}

function guardarEdicionRuta() {
// Obtener el ID de la ruta desde el formulario
const id = parseInt(document.getElementById('editarRutaForm').dataset.rutaId, 10);

// Buscar la ruta por su ID
const ruta = rutas.find(r => r.id === id);
if (!ruta) return;

// Actualizar los datos de la ruta con los valores del formulario
ruta.nombre = document.getElementById('editarRutaNombre').value.trim();
ruta.sede = document.getElementById('editarRutaSede').value;
ruta.origen = document.getElementById('editarRutaOrigen').value.trim();
ruta.destino = document.getElementById('editarRutaDestino').value.trim();
ruta.precio = document.getElementById('editarRutaPrecio').value.trim();
ruta.horario = document.getElementById('editarRutaHorario').value.trim();
ruta.horaSalida = document.getElementById('editarRutaHoraSalida').value;

// Actualizar la interfaz
renderizarRutas();
actualizarSedes();

// Cerrar el modal de edición
const editarModal = bootstrap.Modal.getInstance(document.getElementById('editarRutaModal'));
editarModal.hide();
}

//facto
document.addEventListener('DOMContentLoaded', () => {
actualizarSedes();
renderizarRutas();
});

// Guardar sedes en localStorage
function guardarSedesEnLocalStorage() {
localStorage.setItem('sedes', JSON.stringify(sedes));
}

// Guardar rutas en localStorage
function guardarRutasEnLocalStorage() {
localStorage.setItem('rutas', JSON.stringify(rutas));
}