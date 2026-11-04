# DOCUMENTACIÓN TÉCNICA · PORTAL EHYLEEN
**Versión:** 2.0.0  
**Fecha:** Noviembre 2026  
**Enfoque:** Prestación de Servicios de Jardinería de Alta Calidad & Alianza con Viveros en Barranquilla  
**Contacto Oficial:** +57 (300) 594-5292  
**Metodología:** Buenas Prácticas de Ingeniería de Software (Giselle Ulloa)

---

## 1. Alcance y Enfoque del Proyecto
- **Servicios Principales de Jardinería:**
  1. Mantenimiento periódico integral (corte de césped, deshierbe, perfilado de canteros).
  2. Poda técnica y de silueta (setos vivos, arbustos, copas de palmas).
  3. Siembra y renovación (preparación de tierra y plantación de especies tropicales vigorosas).
  4. Nutrición de suelo y sanidad vegetal (tierra abonada del Magdalena, humus de lombriz, control biológico de plagas).
- **Alianza Estratégica con Viveros del Atlántico:**
  - Suministro directo de plantas aclimatadas al calor de Barranquilla (30°C - 38°C) y a la brisa salina del Caribe.
  - Viveros en Vía al Mar / Puerto Colombia, Juan Mina y Sabanagrande.
- **Soporte Institucional y Formalidad:**
  - Atención a sedes corporativas, instituciones y jardines residenciales con personal afiliado a ARL, uniformado y con facturación formal.
- **Exclusiones Explícitas:**
  - Cero asuntos inmobiliarios y cero obras civiles/arquitectura.
  - Sin cotizaciones paramétricas automáticas (contacto directo para visita de diagnóstico en terreno).
  - Identidad tipográfica sobria y profesional, sin logos informales ni emojis.

---

## 2. Arquitectura de Software
- **Stack:** HTML5 Semántico, CSS3 modular (tokens, base, components, concierge) y JavaScript Vanilla ES2022.
- **Single Source of Truth:** `assets/js/config.js` (`Object.freeze`) con datos unificados del jardinero responsable (+57 300 594 5292).
- **Despliegue:** Versionado en GitHub (`damanza2011/ehyleen-web`), activo en GitHub Pages (`https://damanza2011.github.io/ehyleen-web/`) y preparado para Vercel Serverless.
