
// Datos de noticias detalladas
const noticias = {
    'nueva-ruta': {
        titulo: 'Lanzamiento de nueva ruta internacional',
        fecha: '15 Junio 2024',
        badge: {
            texto: 'Novedad',
            clase: 'bg-success'
        },
        imagen: 'img/nuevaruta.png',
        contenido: `
            <p class="lead">La Terminal de Transportes se complace en anunciar la apertura de una nueva ruta internacional que conectará directamente con el país vecino.</p>
            
            <h3>Detalles de la nueva ruta</h3>
            <ul>
                <li>Frecuencia: Salidas diarias</li>
                <li>Duración del viaje: 8 horas</li>
                <li>Tipo de servicio: Primera clase</li>
                <li>Comodidades: WiFi, asientos reclinables, servicio de comida</li>
            </ul>

            <h3>Beneficios para los viajeros</h3>
            <p>Esta nueva ruta facilitará el comercio internacional y el turismo entre ambos países, reduciendo significativamente los tiempos de viaje y ofreciendo mayor comodidad.</p>

            <h3>Promoción de lanzamiento</h3>
            <p>Durante el primer mes de operación, ofreceremos un 20% de descuento en todos los boletos de esta ruta.</p>
        `
    },
    'temporada-baja': {
        titulo: 'Descuentos especiales por temporada baja',
        fecha: '1 Octubre 2024',
        badge: {
            texto: 'Promoción',
            clase: 'bg-warning text-dark'
        },
        imagen: 'img/temporada-baja.png',
        contenido: `
            <p class="lead">Aprovecha nuestros descuentos especiales durante la temporada baja y viaja a precios increíbles.</p>

            <h3>Detalles de la promoción</h3>
            <ul>
                <li>Hasta 30% de descuento en rutas seleccionadas</li>
                <li>Válido para viajes entre octubre y noviembre</li>
                <li>Aplicable a todas las categorías de servicio</li>
            </ul>

            <h3>Rutas participantes</h3>
            <p>La promoción aplica para las siguientes rutas principales:</p>
            <ul>
                <li>Ruta Norte - Sur</li>
                <li>Ruta Costera</li>
                <li>Ruta Central</li>
            </ul>

            <h3>Términos y condiciones</h3>
            <p>Las reservas deben realizarse con al menos 7 días de anticipación. Los descuentos no son acumulables con otras promociones.</p>
        `
    },
    'modernizacion': {
        titulo: 'Modernización de nuestras plataformas',
        fecha: '20 Mayo 2024',
        badge: {
            texto: 'Mejora',
            clase: 'bg-info'
        },
        imagen: 'img/modernizacion.png',
        contenido: `
            <p class="lead">Estamos renovando nuestras instalaciones para brindarte una mejor experiencia de viaje.</p>

            <h3>Mejoras en infraestructura</h3>
            <ul>
                <li>Nuevas salas de espera climatizadas</li>
                <li>Sistema de información digital en tiempo real</li>
                <li>Áreas de descanso más amplias y cómodas</li>
                <li>Mejoras en accesibilidad para personas con movilidad reducida</li>
            </ul>

            <h3>Innovaciones tecnológicas</h3>
            <p>Implementación de:</p>
            <ul>
                <li>Sistema de check-in automático</li>
                <li>App móvil para compra de boletos</li>
                <li>Pantallas informativas LED</li>
                <li>WiFi gratuito de alta velocidad</li>
            </ul>

            <h3>Cronograma de renovación</h3>
            <p>Las obras se realizarán por fases para minimizar las molestias a los usuarios. Se espera completar el proyecto en diciembre de 2024.</p>
        `
    }
};

// Cargar el contenido de la noticia
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const noticiaId = params.get('id');
    
    if (noticiaId && noticias[noticiaId]) {
        const noticia = noticias[noticiaId];
        
        document.title = `${noticia.titulo} | Terminal Transportes`;
        document.getElementById('noticiaTitulo').textContent = noticia.titulo;
        document.getElementById('noticiaFecha').textContent = noticia.fecha;
        document.getElementById('noticiaBadge').textContent = noticia.badge.texto;
        document.getElementById('noticiaBadge').className = `badge ${noticia.badge.clase}`;
        document.getElementById('noticiaImagen').src = noticia.imagen;
        document.getElementById('noticiaContenido').innerHTML = noticia.contenido;
    }
});
