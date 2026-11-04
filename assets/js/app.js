/**
 * ============================================================================
 * EHYLEEN · Orquestador Principal
 * Servicios Profesionales de Jardinería & Viveros Aliados en Barranquilla
 * Conforme a estándares de Giselle Ulloa (Código limpio, modular, sin bloat)
 * ============================================================================
 */

import { CONFIG } from './config.js';
import { BENCHMARKS_DATA, NURSERIES_DATA } from './data/nurseries.js';
import { PROJECTS_DATA } from './data/projects.js';
import { ConciergeController } from './concierge.js';
import { BotanicalChatBot } from './chat.js';

document.addEventListener("DOMContentLoaded", () => {
  // 1. Renderizar 10 Referentes Mundiales de Jardinería
  renderBenchmarks();

  // 2. Renderizar Red de Viveros Aliados
  renderNurseries();

  // 3. Renderizar Casos Reales de Jardinería
  renderProjects();

  // 4. Configurar Formulario de Diagnóstico de Jardín (Sin cotizaciones)
  setupDiagnosticForm();

  // 5. Inicializar Concierge & Chatbot Botánico
  const panel = document.getElementById("concierge-panel");
  const triggerBtn = document.getElementById("concierge-floating-btn");
  if (panel && triggerBtn) {
    new ConciergeController(panel, triggerBtn);
    const botView = document.getElementById("concierge-bot-view");
    if (botView) {
      new BotanicalChatBot(botView);
    }
  }

  // 6. Smooth Scroll
  setupSmoothScroll();
});

function renderBenchmarks() {
  const container = document.getElementById("benchmarks-container");
  if (!container) return;

  container.innerHTML = BENCHMARKS_DATA.map(b => `
    <article class="benchmark-card">
      <div class="benchmark-index">${b.id < 10 ? '0' + b.id : b.id}</div>
      <h3 class="benchmark-name">${b.name}</h3>
      <div class="benchmark-location">${b.location}</div>
      <div class="benchmark-focus">${b.focus}</div>
      <p class="benchmark-desc">${b.desc}</p>
      <div class="benchmark-lesson">
        <span class="lesson-label">Criterio aplicado a EHYLEEN:</span>
        <span class="lesson-text">${b.lesson}</span>
      </div>
    </article>
  `).join("");
}

function renderNurseries() {
  const container = document.getElementById("nurseries-container");
  if (!container) return;

  container.innerHTML = NURSERIES_DATA.map((n, idx) => `
    <div class="nursery-box">
      <div class="nursery-tag">Aliado 0${idx + 1}</div>
      <h3 class="nursery-name">${n.name}</h3>
      <p class="nursery-zone">${n.zone}</p>
      <p class="nursery-specialty">${n.specialty}</p>
      <div class="nursery-meta">
        <div class="nursery-cert">${n.certifications}</div>
        <div class="nursery-species">
          <strong>Variedades principales:</strong>
          <ul>
            ${n.leadSpecies.map(sp => `<li>${sp}</li>`).join("")}
          </ul>
        </div>
        <div class="nursery-logistics"><strong>Despacho:</strong> ${n.logistics}</div>
      </div>
    </div>
  `).join("");
}

function renderProjects() {
  const container = document.getElementById("projects-container");
  if (!container) return;

  container.innerHTML = PROJECTS_DATA.map(p => `
    <article class="project-card">
      <div class="project-header">
        <span class="project-category">${p.category}</span>
        <span class="project-location">${p.location}</span>
      </div>
      <h3 class="project-title">${p.title}</h3>
      <p class="project-service"><strong>Servicio:</strong> ${p.serviceType}</p>
      <div class="project-body">
        <div class="project-item">
          <strong>Reto inicial:</strong> ${p.challenge}
        </div>
        <div class="project-item">
          <strong>Intervención botánica:</strong> ${p.solution}
        </div>
        <div class="project-item highlight">
          <strong>Resultado:</strong> ${p.result}
        </div>
      </div>
      <div class="project-footer">
        <span>Variedades intervenidas: ${p.species}</span>
      </div>
    </article>
  `).join("");
}

function setupDiagnosticForm() {
  const form = document.getElementById("diagnostic-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("diag-name")?.value.trim() || "Cliente";
    const service = document.getElementById("diag-service")?.value || "Mantenimiento general";
    const zone = document.getElementById("diag-zone")?.value || "Barranquilla";
    const notes = document.getElementById("diag-notes")?.value.trim() || "Revisión técnica";

    const msg = `Hola EHYLEEN. Deseo agendar una visita de diagnóstico para mi jardín en Barranquilla.\n\n` +
      `• Nombre: ${name}\n` +
      `• Servicio de interés: ${service}\n` +
      `• Ubicación / Sector: ${zone}\n` +
      `• Detalles del espacio: ${notes}`;

    const url = `${CONFIG.urls.whatsappBase}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  });
}

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}
