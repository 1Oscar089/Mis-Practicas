import './../style.css';
import { codeToHtml } from 'shiki';
// Funciones asíncronas exportables de tu bloque

// Función principal para renderizar el bloque
export async function mostrar(contenedorPrincipal, volverAlMenu) {
    // 1. Limpiamos lo que haya en pantalla
    contenedorPrincipal.innerHTML = "";

    // 2. Creamos la estructura visual de este bloque
    const seccion = document.createElement("section");
    seccion.innerHTML = `
        <h1>Bloque 1: SINTAXIS BASE Y ARQUITECTURA CSS-FIRST</h1>
        <h2>@theme</h2>
        <p>En un css, traduce todo lo que este en su bloque a clases de tailwind.</p>
        <p>Ejemplo de código</p>
        <div id="theme-1"></div>
        <br>
        <p>Genera una variable para color de nombre {prefijo}-brand-primary</p>
        <p>Cada variable lleva un nombre segun su utilidad. Por ejemplo:</p>
        <ul>
            <li>--color para color</li>
            <li>--font para tipografía</li>
            <li>--spacing para espaciado</li>
            <li>--radius para radios de borde</li>
        </ul>
        <br>
        <p>¿Cómo se llama en clase? Se llama como:</p>
        <ul>
            <li>Para --color:  {prefijo}-brand-primary, por ejemplo --color-brand-primary se llamaria bg-brand-primary o en css var(--color-brand-primary)</li>
            <li>Para --font:  font-{nombre}, por ejemplo --font-primary se llamaria font-primary o en css var(--font-primary)</li>
            <li>Para --spacing:  spacing-card-{nombre}, por ejemplo --spacing-card-md se llamaria p-card-md o en css var(--spacing-card-md)</li>
            <li>Para --radius:  rounded-{nombre}, por ejemplo --radius-md se llamaria rounded-md o en css var(--radius-md)</li>

        </ul>






        <!-- Opción menú: Botón para regresar -->
        <button id="btn-menu" style="background-color: #666; color: white;">⬅ Mostrar Menú</button>
    `;

    contenedorPrincipal.appendChild(seccion);

    // 3. Asignamos los eventos de los botones
    /*seccion.querySelector("#btn-ejecutar").addEventListener("click", async () => {
        const resultado = await miFuncionAsincrona1();
        alert(resultado);
    });*/

    // Al darle clic, ejecuta la función recibida para volver al menú
    seccion.querySelector("#btn-menu").addEventListener("click", volverAlMenu);

    const theme1 = document.getElementById("theme-1");
    const codigotheme1 = `
    @theme {
        --color-brand-primary: #1DA1F2;
    }
    `;
    const htmltheme1 = await codeToHtml(codigotheme1, { 
        lang: 'css', 
        theme: 'vitesse-dark' });
    theme1.innerHTML = htmltheme1;
}
