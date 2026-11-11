import './../style.css';
import { codeToHtml } from 'shiki';

/**
 * Renderiza el bloque de información sobre la sintaxis base y la arquitectura CSS-First.
 * 
 * @param {HTMLElement} contenedorPrincipal - El elemento del DOM donde se inyectará el contenido.
 * @param {Function} volverAlMenu - Función de callback para regresar a la vista anterior.
 */
export async function mostrar(contenedorPrincipal, volverAlMenu) {
    // 1. Definición estructurada de todos los snippets de código
    const snippetsConfig = [
        { key: 'themeConfig', code: `@import "tailwindcss";\n\n@theme {\n  --color-brand-primary: #1DA1F2;\n  --font-display: 'Inter', sans-serif;\n  --radius-card: 0.75rem;\n}`, lang: 'css' },
        { key: 'customVariables', code: `@import "tailwindcss";\n\n@theme {\n  --color-brand-accent: #ff5a5f;\n  --font-heading: 'Outfit', sans-serif;\n  --spacing-container: 2rem;\n  --radius-card: 1rem;\n}`, lang: 'css' },
        { key: 'engineOxide', code: `/* Ya NO se necesita tailwind.config.js */\n/* Toda la configuración vive en tu CSS global */\n\n@import "tailwindcss";\n\n@theme {\n  --color-brand: #6366f1;\n  --font-sans: 'Inter', sans-serif;\n}`, lang: 'css' },
        { key: 'importNative', code: `/* Importación nativa completa en Tailwind v4 */\n@import "tailwindcss";`, lang: 'css' },
        { key: 'autoContentDetection', code: `/* Tailwind v4 escanea automáticamente tus componentes y vistas */\n/* Cero configuración de rutas (content/paths) requerida */\n\n@import "tailwindcss";`, lang: 'css' },
        { key: 'themeOverride', code: `/* 1. Extensión del tema (Conserva utilidades por defecto) */\n@theme {\n  --color-brand: #3b82f6;\n}\n\n/* 2. Sobreescritura total (Elimina la paleta base) */\n@theme static {\n  --color-primary: #10b981;\n  --color-secondary: #f59e0b;\n}`, lang: 'css' },
        { key: 'applyDirectives', code: `/* Definición en CSS */\n.btn-primary {\n  @apply bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors;\n}\n\n.card-custom {\n  @apply bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700;\n}`, lang: 'css' },
        
    ];

    // 2. Generamos el resaltado HTML de todos los ejemplos en paralelo
    const highlightedResults = await Promise.all(
        snippetsConfig.map(async ({ key, code, lang }) => {
            const html = await codeToHtml(code, { lang, theme: 'vitesse-dark' });
            return [key, html];
        })
    );

    // Convertimos los resultados a un objeto de fácil acceso: { key: htmlString }
    const htmlSnippets = Object.fromEntries(highlightedResults);

    // Helper para envolver snippets de código con el estilo visual común
    const renderCodeBlock = (htmlContent) => `
        <div class="codigo-resaltado rounded-lg overflow-hidden text-sm border border-gray-200 dark:border-gray-700">
            ${htmlContent}
        </div>
    `;

    // 3. Limpiamos el contenedor
    contenedorPrincipal.replaceChildren();

    // 4. Creamos e inyectamos la estructura visual
    const seccion = document.createElement("section");
    seccion.className = "max-w-4xl mx-auto p-6 md:p-8 space-y-6 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 rounded-xl shadow-sm";
    
    seccion.innerHTML = `
        <header class="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
            <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Bloque 1: SINTAXIS BASE Y ARQUITECTURA CSS-FIRST
            </h1>
        </header>

        <!-- Tema 1: Configuración del sistema de diseño nativo con la directiva @theme -->
        <article class="p-6 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-200 dark:border-gray-700 space-y-4">
            <header class="border-b border-gray-200 dark:border-gray-700 pb-3">
                <h2 class="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-3">
                    <span class="px-2.5 py-1 text-sm bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-md font-mono">01</span>
                    Configuración del sistema de diseño nativo con la directiva @theme
                </h2>
            </header>

            <p class="text-gray-600 dark:text-gray-300">
                En Tailwind CSS v4, la directiva <code class="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono text-pink-500">@theme</code> centraliza y reemplaza la configuración basada en JavaScript[cite: 1]. Permite definir directamente en la hoja de estilos nativa todas las variables globales de diseño (colores, fuentes, bordes y espaciados).
            </p>

            <div class="space-y-2">
                <p class="text-sm font-semibold text-gray-700 dark:text-gray-300">Definición nativa en el CSS principal:</p>
                ${renderCodeBlock(htmlSnippets.themeConfig)}
            </div>

            <div class="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-lg border border-blue-200 dark:border-blue-800 text-sm text-blue-900 dark:text-blue-200 space-y-1">
                <strong class="block font-semibold">Punto Clave:</strong>
                Todas las variables CSS declaradas dentro del bloque <code class="font-mono">@theme</code> son detectadas inmediatamente por el motor en Rust para crear utilidades nativas automáticamente sin requerir configuración adicional.
            </div>
        </article>

        <!-- Tema 2: Declaración de variables CSS personalizadas dentro de @theme (--color-*, --font-*) -->
        <article class="p-6 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-200 dark:border-gray-700 space-y-4">
            <header class="border-b border-gray-200 dark:border-gray-700 pb-3">
                <h2 class="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-3">
                    <span class="px-2.5 py-1 text-sm bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-md font-mono">02</span>
                    Declaración de variables CSS personalizadas dentro de @theme (--color-*, --font-*)
                </h2>
            </header>

            <p class="text-gray-600 dark:text-gray-300">
                Dentro del bloque <code class="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono text-pink-500">@theme</code>, Tailwind v4 utiliza prefijos de espacio de nombres (<code class="font-mono text-xs">--color-*</code>, <code class="font-mono text-xs">--font-*</code>, etc.) para inferir automáticamente qué tipo de clase utilitaria debe generar[cite: 1].
            </p>

            <div class="space-y-2">
                <p class="text-sm font-semibold text-gray-700 dark:text-gray-300">Declaración de namespaces en CSS:</p>
                ${renderCodeBlock(htmlSnippets.customVariables)}
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm pt-2">
                <div class="p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                    <span class="font-mono font-bold text-pink-500">--color-brand-accent</span>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Genera utilidades como <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-blue-600 dark:text-blue-400">bg-brand-accent</code>, <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-blue-600 dark:text-blue-400">text-brand-accent</code> y <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-blue-600 dark:text-blue-400">border-brand-accent</code>.</p>
                </div>
                <div class="p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                    <span class="font-mono font-bold text-pink-500">--font-heading</span>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Genera la utilidad tipográfica <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-blue-600 dark:text-blue-400">font-heading</code>.</p>
                </div>
            </div>

            <div class="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-lg border border-blue-200 dark:border-blue-800 text-sm text-blue-900 dark:text-blue-200 space-y-1">
                <strong class="block font-semibold">Punto Clave:</strong>
                El prefijo determina la función de la variable. Si usas <code class="font-mono">--color-</code> se asigna a colores, si usas <code class="font-mono">--font-</code> a fuentes tipográficas, eliminando la necesidad de mapear manualmente las propiedades.
            </div>
        </article>

        <!-- Tema 3: Uso del nuevo motor Rust (Oxide) y eliminación del archivo tailwind.config.js -->
        <article class="p-6 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-200 dark:border-gray-700 space-y-4">
            <header class="border-b border-gray-200 dark:border-gray-700 pb-3">
                <h2 class="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-3">
                    <span class="px-2.5 py-1 text-sm bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-md font-mono">03</span>
                    Uso del nuevo motor Rust (Oxide) y eliminación del archivo tailwind.config.js
                </h2>
            </header>

            <p class="text-gray-600 dark:text-gray-300">
                Tailwind v4 elimina por completo la necesidad del archivo de configuración <code class="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono text-pink-500">tailwind.config.js</code>[cite: 1]. Todo el procesamiento ahora lo realiza el nuevo motor compilado en Rust (Oxide), el cual escanea los archivos y compila estilos directamente desde CSS en microsegundos[cite: 1].
            </p>

            <div class="space-y-2">
                <p class="text-sm font-semibold text-gray-700 dark:text-gray-300">Toda la configuración centralizada directamente en el CSS principal:</p>
                ${renderCodeBlock(htmlSnippets.engineOxide)}
            </div>

            <div class="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-lg border border-blue-200 dark:border-blue-800 text-sm text-blue-900 dark:text-blue-200 space-y-1">
                <strong class="block font-semibold">Punto Clave:</strong>
                Ya no existen archivos JavaScript intermedios para la configuración. Al migrar a Rust (Oxide), la compilación es ultrarrápida y adopta un estándar 100% CSS-first integrándose perfectamente con herramientas de empaquetado como Vite.
            </div>
        </article>

        <!-- Tema 4: Importación integrada de librerías mediante @import "tailwindcss" nativo -->
        <article class="p-6 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-200 dark:border-gray-700 space-y-4">
            <header class="border-b border-gray-200 dark:border-gray-700 pb-3">
                <h2 class="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-3">
                    <span class="px-2.5 py-1 text-sm bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-md font-mono">04</span>
                    Importación integrada de librerías mediante @import "tailwindcss" nativo
                </h2>
            </header>

            <p class="text-gray-600 dark:text-gray-300">
                En Tailwind CSS v4, la inclusión del framework se realiza mediante la directiva CSS nativa <code class="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono text-pink-500">@import "tailwindcss";</code>[cite: 1]. Esto inyecta de forma automática la capa base de reinicio (Preflight), la arquitectura de temas y todas las clases utilitarias en una sola línea[cite: 1].
            </p>

            <div class="space-y-2">
                <p class="text-sm font-semibold text-gray-700 dark:text-gray-300">Importación en tu hoja de estilos principal:</p>
                ${renderCodeBlock(htmlSnippets.importNative)}
            </div>

            <div class="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-lg border border-blue-200 dark:border-blue-800 text-sm text-blue-900 dark:text-blue-200 space-y-1">
                <strong class="block font-semibold">Punto Clave:</strong>
                Al utilizar sintaxis CSS 100% estándar, se eliminan las directivas propietarias anteriores y se habilita la importación nativa fluida de cualquier otra librería CSS en la misma hoja de estilos.
            </div>
        </article>

        <!-- Tema 5: Detección automática de fuentes de contenido sin configuración de paths -->
        <article class="p-6 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-200 dark:border-gray-700 space-y-4">
            <header class="border-b border-gray-200 dark:border-gray-700 pb-3">
                <h2 class="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-3">
                    <span class="px-2.5 py-1 text-sm bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-md font-mono">05</span>
                    Detección automática de fuentes de contenido sin configuración de paths
                </h2>
            </header>

            <p class="text-gray-600 dark:text-gray-300">
                En Tailwind CSS v4, el motor detecta automáticamente todos tus archivos de plantilla y componentes (<code class="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono text-pink-500">.html</code>, <code class="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono text-pink-500">.jsx</code>, <code class="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono text-pink-500">.vue</code>, <code class="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono text-pink-500">.ts</code>, etc.) en todo el directorio del proyecto sin requerir configuración manual de rutas.
            </p>

            <div class="space-y-2">
                <p class="text-sm font-semibold text-gray-700 dark:text-gray-300">Cero reglas de contenido o patrones globs que configurar:</p>
                ${renderCodeBlock(htmlSnippets.autoContentDetection)}
            </div>

            <div class="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-lg border border-blue-200 dark:border-blue-800 text-sm text-blue-900 dark:text-blue-200 space-y-1">
                <strong class="block font-semibold">Punto Clave:</strong>
                El motor filtra e ignora de forma nativa directorios como <code class="font-mono">node_modules</code>, <code class="font-mono">.git</code> y carpetas de salida final, procesando únicamente tus archivos fuente al instante.
            </div>
        </article>

    <!-- Tema 6: Sobreescritura total de tokens frente a la extensión del tema base en v4 -->
        <article class="p-6 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-200 dark:border-gray-700 space-y-4">
            <header class="border-b border-gray-200 dark:border-gray-700 pb-3">
                <h2 class="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-3">
                    <span class="px-2.5 py-1 text-sm bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-md font-mono">06</span>
                    Sobreescritura total de tokens frente a la extensión del tema base en v4
                </h2>
            </header>

            <p class="text-gray-600 dark:text-gray-300">
                En Tailwind CSS v4, la directiva <code class="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono text-pink-500">@theme</code> permite extender el tema por defecto agregando nuevos tokens, o reemplazarlo por completo mediante la sintaxis <code class="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono text-pink-500">@theme static</code>.
            </p>

            <div class="space-y-2">
                <p class="text-sm font-semibold text-gray-700 dark:text-gray-300">Diferencia entre extender y reiniciar el tema:</p>
                ${renderCodeBlock(htmlSnippets.themeOverride)}
            </div>

            <div class="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-lg border border-blue-200 dark:border-blue-800 text-sm text-blue-900 dark:text-blue-200 space-y-1">
                <strong class="block font-semibold">Punto Clave:</strong>
                Usar <code class="font-mono">@theme</code> añade tus variables manteniendo los valores por defecto del framework, mientras que <code class="font-mono">@theme static</code> borra la paleta e infraestructura nativa para forzar el uso exclusivo de tu propio sistema de diseño.
            </div>
        </article>

        <!-- Tema 7: Creación de componentes CSS reutilizables mediante la directiva @apply -->
        <article class="p-6 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-200 dark:border-gray-700 space-y-4">
            <header class="border-b border-gray-200 dark:border-gray-700 pb-3">
                <h2 class="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-3">
                    <span class="px-2.5 py-1 text-sm bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-md font-mono">07</span>
                    Creación de componentes CSS reutilizables mediante la directiva @apply
                </h2>
            </header>

            <p class="text-gray-600 dark:text-gray-300">
                La directiva <code class="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono text-pink-500">@apply</code> permite empaquetar una lista de clases de utilidad dentro de una clase CSS personalizada. Es ideal para reutilizar estilos complejos en elementos repetitivos como botones, tarjetas o alertas sin sobrecargar el HTML.
            </p>

            <div class="space-y-2">
                <p class="text-sm font-semibold text-gray-700 dark:text-gray-300">Agrupación de utilidades con @apply:</p>
                ${renderCodeBlock(htmlSnippets.applyDirectives)}
            </div>

            <div class="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-lg border border-blue-200 dark:border-blue-800 text-sm text-blue-900 dark:text-blue-200 space-y-1">
                <strong class="block font-semibold">Punto Clave:</strong>
                Puedes usar modificadores de estado (como <code class="font-mono">hover:</code> o <code class="font-mono">focus:</code>) dentro del propio <code class="font-mono">@apply</code> para abstraer completamente el comportamiento interactivo del componente.
            </div>
        </article>
    `;

    // 5. Inyectamos en el DOM
    contenedorPrincipal.appendChild(seccion);

    // 6. Asignamos eventos con verificación segura
    seccion.querySelector("#btn-menu")?.addEventListener("click", volverAlMenu);
}