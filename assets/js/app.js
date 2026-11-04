/**
 * ============================================================================
 * EHYLEEN · Main Application Orchestrator
 * ============================================================================
 */

import { CONFIG } from './config.js';
import { BENCHMARKS_DATA, NURSERIES_DATA } from './data/nurseries.js';
import { PROJECTS_DATA } from './data/projects.js';
import { BotanicalQuoter } from './quoter.js';
import { ConciergeController } from './concierge.js';
import { BotanicalChatBot } from './chat.js';

document.addEventListener("DOMContentLoaded", () => {
  // 1. Inicializar Cotizador Paramétrico
  const quoter = new BotanicalQuoter();
  setupQuoterUI(quoter);

  // 2. Renderizar 10 Benchmarks Mundiales
  renderBenchmarks();

  // 3. Renderizar Red de Viveros Aliados
  renderNurseries();

  // 4. Renderizar Portafolio
  renderProjects();

  // 5. Inicializar Concierge & Chatbot
  const panel = document.getElementById("concierge-panel");
  const triggerBtn = document.getElementById("concierge-floating-btn");
  if (panel && triggerBtn) {
    const concierge = new ConciergeController(panel, triggerBtn);
    const botView = document.getElementById("concierge-bot-view");
    if (botView) {
      new BotanicalChatBot(botView);
    }
  }

  // 6. Smooth Scroll para enlaces internos
  setupSmoothScroll();
});

function setupQuoterUI(quoter) {
  const typeOptions = document.querySelectorAll(".quoter-type-option");
  const areaRange = document.getElementById("quoter-area-range");
  const areaNumber = document.getElementById("quoter-area-number");
  const chkIrrigation = document.getElementById("quoter-chk-irrigation");
  const chkLighting = document.getElementById("quoter-chk-lighting");
  const selectZone = document.getElementById("quoter-zone-select");
  const totalDisplay = document.getElementById("quoter-total-display");
  const btnWhatsApp = document.getElementById("quoter-whatsapp-btn");

  function update() {
    const calc = quoter.calculate();
    if (totalDisplay) {
      totalDisplay.textContent = calc.formattedTotal + " COP";
    }
    if (btnWhatsApp) {
      btnWhatsApp.href = quoter.generateWhatsAppUrl();
    }
  }

  typeOptions.forEach(opt => {
    opt.addEventListener("click", () => {
      typeOptions.forEach(o => o.classList.remove("selected"));
      opt.classList.add("selected");
      quoter.setProjectType(opt.getAttribute("data-type"));
      update();
    });
  });

  if (areaRange && areaNumber) {
    areaRange.addEventListener("input", (e) => {
      areaNumber.textContent = e.target.value;
      quoter.setArea(e.target.value);
      update();
    });
  }

  if (chkIrrigation) {
    chkIrrigation.addEventListener("change", (e) => {
      quoter.setIrrigation(e.target.checked);
      update();
    });
  }

  if (chkLighting) {
    chkLighting.addEventListener("change", (e) => {
      quoter.setLighting(e.target.checked);
      update();
    });
  }

  if (selectZone) {
    selectZone.addEventListener("change", (e) => {
      quoter.setZone(e.target.value);
      update();
    });
  }

  update();
}

function renderBenchmarks() {
  const container = document.getElementById("benchmarks-container");
  if (!container) return;

  container.innerHTML = BENCHMARKS_DATA.map(b => `
    <div class="benchmark-card">
      <div class="benchmark-number">#0${b.id > 9 ? b.id : '0' + b.id}</div>
      <h3 class="benchmark-name">${b.name}</h3>
      <div class="benchmark-origin">${b.location} · <strong>${b.focus}</strong></div>
      <p class="benchmark-desc">${b.desc}</p>
      <div class="benchmark-lesson">
        <strong>Adopción para EHYLEEN:</strong> ${b.lesson}
      </div>
    </div>
  `).join("");
}

function renderNurseries() {
  const container = document.getElementById("nurseries-container");
  if (!container) return;

  container.innerHTML = NURSERIES_DATA.map(n => `
    <div class="nursery-box">
      <div class="nursery-icon">🌱</div>
      <h3>${n.name}</h3>
      <p style="color: var(--color-accent); font-weight: 600; font-size: 0.85rem; margin-bottom: 8px;">
        📍 ${n.zone}
      </p>
      <p style="margin-bottom: 12px; font-size: 0.95rem;">${n.specialty}</p>
      <div style="background: rgba(255,255,255,0.06); padding: 10px; border-radius: 8px; font-size: 0.85rem;">
        <span style="color: #ffffff; font-weight: 600;">Especies Clave:</span>
        <ul style="margin-top: 6px; padding-left: 18px; color: #d0ded6;">
          ${n.leadSpecies.map(sp => `<li>${sp}</li>`).join("")}
        </ul>
      </div>
    </div>
  `).join("");
}

function renderProjects() {
  const container = document.getElementById("projects-container");
  if (!container) return;

  container.innerHTML = PROJECTS_DATA.map(p => `
    <div class="benchmark-card" style="display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <span class="section-eyebrow" style="margin-bottom: 8px;">${p.category}</span>
        <h3 style="margin-bottom: 4px;">${p.title}</h3>
        <p style="color: var(--color-leaf); font-weight: 600; font-size: 0.85rem; margin-bottom: 12px;">
          📍 ${p.location} · Cobertura: ${p.area}
        </p>
        <p style="font-size: 0.92rem; margin-bottom: 10px;"><strong>Reto:</strong> ${p.challenge}</p>
        <p style="font-size: 0.92rem; margin-bottom: 14px;"><strong>Solución Botánica:</strong> ${p.solution}</p>
      </div>
      <div style="font-size: 0.85rem; color: var(--color-text-muted); border-top: 1px solid var(--color-border); padding-top: 10px;">
        <em>Especies: ${p.species}</em>
      </div>
    </div>
  `).join("");
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
