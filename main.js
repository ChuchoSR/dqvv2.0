// clave API
const apiKey = 'AIzaSyA_d3qidBx7-N5v_j8_Wv1__LUjpPaFXz8';

//ID del canal de YouTube
const channelId = 'UCwdPa9D5SkZOizmcuGYaELQ';

// URL específica del formulario en Formspree
const formspreeUrl = 'https://formspree.io/f/xeqyqwzr';

// Función para cargar episodios
/* async function cargarEpisodios(apiUrl) {
    try {
        // Hacer la solicitud a la API
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Procesar la respuesta y cargar episodios
        const episodiosContainer = document.getElementById('contenedor_podcast');
        episodiosContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos episodios

        // Iterar sobre los videos y agregar episodios al contenedor
        data.items.forEach(video => {
            const titulo = video.snippet.title;
            const descripcion = video.snippet.description;
            const imagen = video.snippet.thumbnails.medium.url;
            const videoId = video.id.videoId;

            // Estructura HTML modificada
            const episodioHTML = `
    <article class="podcast_individual">   
        <div class="info_podcast" data-aos="fade-right">
            <p class="nombre_podcast">${titulo}</p>
            <p>${descripcion}</p>
            <div class="episodioSpotify">    
                <p class="link_podcast">
                    Escuchar en 
                    <a href="#">
                        <i class="fa-brands fa-spotify"></i>
                    </a>
                </p>
            </div>
        </div>
        <div class="thumbnail_podcast" data-aos="fade-left">
            <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                <img class="img-episodio" src="${imagen}" alt="${titulo}">
            </a>
        </div>
    </article> 
`;


            episodiosContainer.insertAdjacentHTML('beforeend', episodioHTML);
            console.log(episodioHTML);
        });
    } catch (error) {
        console.error('Error al recuperar datos:', error);
    }
} */

// Función para cargar los episodios desde YouTube
function cargarEpisodiosDesdeYouTube() {
    const contenedorPodcast = document.getElementById("contenedor_podcast");

    // Construir la URL de la solicitud
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=5`;

    // Realizar la solicitud a la API de YouTube
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Recorrer los resultados y crear elementos para cada episodio
            data.items.forEach(item => {
                const episode = item.snippet;

                const article = document.createElement("article");
                article.className = "podcast_individual";

                const infoPodcast = document.createElement("div");
                infoPodcast.className = "info_podcast";

                const nombrePodcast = document.createElement("p");
                nombrePodcast.className = "nombre_podcast";
                nombrePodcast.textContent = episode.title;

                const descripcionPodcast = document.createElement("p");
                descripcionPodcast.textContent = episode.description;

                infoPodcast.appendChild(nombrePodcast);
                infoPodcast.appendChild(descripcionPodcast);

                const thumbnailPodcast = document.createElement("div");
                thumbnailPodcast.className = "thumbnail_podcast";

                // Enlace al episodio en YouTube
                const enlaceEpisodio = document.createElement("a");
                enlaceEpisodio.href = `https://www.youtube.com/watch?v=${item.id.videoId}`;
                enlaceEpisodio.target = "_blank"; // Para abrir en una nueva pestaña

                // Imagen del episodio
                const imagenPodcast = document.createElement("img");
                imagenPodcast.src = episode.thumbnails.medium.url;

                // Agregar la imagen al enlace
                enlaceEpisodio.appendChild(imagenPodcast);
                thumbnailPodcast.appendChild(enlaceEpisodio);

                article.appendChild(infoPodcast);
                article.appendChild(thumbnailPodcast);

                contenedorPodcast.appendChild(article);
            });
        })
        .catch(error => console.error('Error al cargar episodios desde YouTube:', error));
}

// Llama a la función para cargar los episodios al cargar la página
window.onload = cargarEpisodiosDesdeYouTube;

// Llama a la función para cargar los episodios al cargar la página
window.onload = cargarEpisodiosDesdeYouTube;



document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('miFormulario');
    const overlay = document.getElementById('overlay');
    const cAlert = document.getElementById('customAlert');
    const btnEnviar = document.querySelector('.btn_enviar');

    formulario.addEventListener('submit', function (event) {
        event.preventDefault();

        // Deshabilitar el botón de enviar para evitar envíos múltiples
        btnEnviar.disabled = true;

        // Mostrar overlay y customAlert
        overlay.style.display = 'block';
        cAlert.style.opacity = '1';

        // Crear y mostrar el popUp
        const popUp = document.createElement('div');
        popUp.classList.add('popUp');
        popUp.innerHTML = '<h2>¡Gracias por ponerte en contacto con nosotros, pronto recibirás respuesta de nuestra parte y recuerda... De que vuelan, vuelan...!</h2>';
        document.body.appendChild(popUp);

        // Ocultar overlay y customAlert después de un tiempo
        setTimeout(function () {
            overlay.style.display = 'none';
            cAlert.style.opacity = '0';

            // Eliminar el popUp
            popUp.remove();

            // Restablecer el formulario y habilitar el botón de enviar
            formulario.reset();
            btnEnviar.disabled = false;
        }, 3000);
    });
});




// Agregar el controlador de eventos al formulario
document.getElementById('miFormulario').addEventListener('submit', function (event) {
    event.preventDefault(); // Detenemos el comportamiento predeterminado del formulario

    // Realizamos el envío de datos utilizando la API Fetch
    fetch(formspreeUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        })
    })
        .then(response => response.json())
        .then(data => {
            // Manejamos la respuesta aquí si es necesario
            console.log('Respuesta del servidor:', data);
        })
        .catch(error => {
            console.error('Error al enviar datos:', error);
        });
});

document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.menu-mobil a');
    const checkbox = document.getElementById('check');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            checkbox.checked = false; // Desmarcar la casilla al hacer clic en un enlace
        });
    });
});
