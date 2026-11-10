import './style.css';
// Escribe aquí los nombres de tus archivos dentro de la carpeta bloques/
const listaBloques = ["bloque1"]; 

const appContainer = document.getElementById("app");
const menuContainer = document.getElementById("menu");

async function inicializarApp() {
    menuContainer.innerHTML = "<h2>Menú de Bloques</h2>";
    const listaUl = document.createElement("ul");

    for (const nombreBloque of listaBloques) {
        try {
            // CORRECCIÓN: Se agrega la extensión '.js' obligatoria para el navegador
            const modulo = await import(`./bloques/${nombreBloque}.js`);
            
            // Creamos el elemento del menú
            const li = document.createElement("li");
            const boton = document.createElement("button");
            boton.textContent = `Entrar a ${nombreBloque}`;
            
            // Evento clic: Oculta el menú y renderiza el bloque
            boton.addEventListener("click", () => {
                ocultarMenu();
                modulo.mostrar(appContainer, mostrarMenu); 
            });

            li.appendChild(boton);
            listaUl.appendChild(li);

        } catch (error) {
            console.error(`Error crítico al cargar: ./bloques/${nombreBloque}.js`, error);
        }
    }

    menuContainer.appendChild(listaUl);
}

// Controladores para ocultar y mostrar vistas
function ocultarMenu() {
    menuContainer.style.display = "none";
    appContainer.style.display = "block";
}

function mostrarMenu() {
    appContainer.innerHTML = ""; // Limpia el bloque activo
    appContainer.style.display = "none";
    menuContainer.style.display = "block";
}

// Arrancar la app
inicializarApp();
