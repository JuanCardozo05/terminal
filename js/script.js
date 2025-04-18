// Activar los tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
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
function buyTicket(route, price) {
    var ticketModal = new bootstrap.Modal(document.getElementById('ticketModal'));
    
    document.querySelector('#ticketModal .modal-body .card-body span:nth-child(2)').textContent = route;
    document.querySelector('#ticketModal .modal-body .card-body span:nth-child(4)').textContent = price;
    
    ticketModal.show();
}
