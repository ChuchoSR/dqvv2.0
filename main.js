// Reemplaza 'YOUR_API_KEY' con tu clave API
const apiKey = 'AIzaSyA_d3qidBx7-N5v_j8_Wv1__LUjpPaFXz8';

// Reemplaza 'CHANNEL_ID' con el ID de tu canal de YouTube
const channelId = 'UCwdPa9D5SkZOizmcuGYaELQ';

// Reemplaza 'FORMSPREE_URL' con la URL específica de tu formulario en Formspree
const formspreeUrl = 'https://formspree.io/f/xeqyqwzr';

// Función para cargar episodios
async function cargarEpisodios(apiUrl) {
    try {
        // Hacer la solicitud a la API
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Procesar la respuesta y cargar episodios
        const episodiosContainer = document.querySelector('.contenedor_podcast');
        episodiosContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos episodios

        // Iterar sobre los videos y agregar episodios al contenedor
        data.items.forEach(video => {
            const titulo = video.snippet.title;
            const descripcion = video.snippet.description;
            const imagen = video.snippet.thumbnails.medium.url;
            const videoId = video.id.videoId;

            // Estructura HTML modificada
            const episodioHTML = `
                <div class="info_podcast" data-aos="fade-right">
                    <h2 class="titulo-episodio titulo">${titulo}</h2>
                    <p>${descripcion}</p>
                </div>
                <div class="thumbnail_podcast" data-aos="fade-left">
                    <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                        <img class="img-episodio" src="${imagen}" alt="${titulo}">
                    </a>
                </div>
            `;

            episodiosContainer.innerHTML += episodioHTML;
        });
    } catch (error) {
        console.error('Error al recuperar datos:', error);
    }
}

/* document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('miFormulario'); // Reemplaza 'miFormulario' con el ID de tu formulario

    formulario.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita que el formulario se envíe de forma convencional

        // Aquí puedes agregar lógica adicional, como enviar datos a un servidor si es necesario.

        // Muestra un mensaje de agradecimiento
        alert('¡Gracias por ponerte en contacto con nosotros, pronto recibirás respuesta de nuestra parte y recuerda... De que vuelan, vuelan...!');

        // Limpia los campos del formulario
        formulario.reset();
    });
}); */

document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('miFormulario');
    const overlay = document.getElementById('overlay');
    const cAlert = document.getElementById('customAlert');
    const btnEnviar = document.querySelector('.btn_enviar');

    formulario.addEventListener('submit', function (event) {
        event.preventDefault();

        
        btnEnviar.disabled = true;

        
        overlay.style.display = 'block';

       
        cAlert.style.display = 'block';
        setTimeout(function () {
            cAlert.style.opacity = '1';
        }, 10);

        
        const popUp = document.createElement('div');
        popUp.classList.add('popUp');
        popUp.innerHTML = '<p>¡Gracias por ponerte en contacto con nosotros, pronto recibirás respuesta de nuestra parte y recuerda... De que vuelan, vuelan...!</p>';
        document.body.appendChild(popUp);

        
        setTimeout(function () {
            overlay.style.display = 'none';
            cAlert.style.opacity = '0';
            popUp.remove();

            
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

// Llamar a la función para cargar episodios cuando la página se cargue
document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=5&order=date&key=${apiKey}`;
    cargarEpisodios(apiUrl);
});
