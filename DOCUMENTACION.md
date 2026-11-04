# DOCUMENTACIÓN TÉCNICA · PORTAL EHYLEEN
**Versión:** 1.0.0  
**Fecha:** Noviembre 2026  
**Enfoque:** Paisajismo, Bioarquitectura y Red de Viveros en Barranquilla  
**Metodología:** Buenas Prácticas de Ingeniería de Software (Giselle Ulloa)

---

## 1. Arquitectura y Principios de Diseño
El portal sigue el patrón **Clean Jamstack**, diseñado para máxima resiliencia, cero bloat y total independencia de frameworks pesados:
- **Separación de Responsabilidades:**
  - Capa de Configuración: `assets/js/config.js` (`Object.freeze`).
  - Capa de Datos: `assets/js/data/nurseries.js` y `assets/js/data/projects.js`.
  - Capa de Lógica de Negocio: `assets/js/quoter.js` (cálculo de cotizaciones puras).
  - Capa de Interacción & UI: `assets/js/concierge.js`, `assets/js/chat.js` y `assets/js/app.js`.
  - Capa Serverless: `/api/chat.js` y `/api/lead.js`.
- **Cero Código Espagueti:** Cero scripts en línea en el HTML; uso de módulos nativos ES2022 (`import`/`export`).
- **Resiliencia & AbortController:** El chatbot hacia `/api/chat` implementa un timeout de 9 segundos y fallback degradado elegante en caso de cortes de red.

---

## 2. Los 10 Referentes Mundiales Implementados
1. **Raymond Jungles (Miami):** Máximo exponente de paisajismo tropical costero.
2. **Wirtz International (Bélgica):** Escultura botánica y setos simétricos.
3. **Edmund Hollander (Hamptons):** Estilo editorial y fichas técnicas de autor.
4. **Luciano Giubbilei (Londres/Italia):** Minimalismo botánico y juegos de luz.
5. **Fernando Caruncho (España):** Geometría y diálogo con el agua.
6. **Patrick Blanc (Francia):** Muros verdes hidropónicos y bioarquitectura.
7. **Madison Cox (Marruecos/Francia):** Jardines botánicos privados y confidenciales.
8. **Piet Oudolf (Países Bajos):** Xerojardinería por estratos y sostenibilidad.
9. **Andy Sturgeon (Reino Unido):** Iluminación escénica nocturna y pérgolas modernas.
10. **The Sill / Patch Plants (EE.UU./UK):** Cotizadores y membresías de cuidado verde.

---

## 3. Red de Viveros en Barranquilla
- **Vía al Mar / Puerto Colombia:** Especies resistentes a brisa salina y sol directo.
- **Corredor Juan Mina:** Plantas de sombra, sotobosque escultórico y macetería en terrazo.
- **Sabanagrande / Magdalena:** Sustratos con cascarilla de arroz y humus para retención térmica.
