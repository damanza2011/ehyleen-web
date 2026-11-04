/**
 * ============================================================================
 * EHYLEEN · Concierge Routing Controller
 * Administra las 5 rutas especializadas a WhatsApp y la apertura del panel
 * ============================================================================
 */

import { CONFIG } from './config.js';

export class ConciergeController {
  constructor(panelElement, triggerBtn) {
    this.panel = panelElement;
    this.triggerBtn = triggerBtn;
    this.activeTab = "concierge"; // concierge | bot
    this.init();
  }

  init() {
    if (!this.panel || !this.triggerBtn) return;

    // Trigger toggle
    this.triggerBtn.addEventListener("click", () => this.togglePanel());

    // Close button
    const closeBtn = this.panel.querySelector("#concierge-close-btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.closePanel());
    }

    // Tabs toggle
    const tabBtns = this.panel.querySelectorAll(".concierge-tab-btn");
    tabBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const tab = e.currentTarget.getAttribute("data-tab");
        this.setTab(tab);
      });
    });

    // Render routes
    this.renderRoutes();
  }

  togglePanel() {
    this.panel.classList.toggle("open");
  }

  openPanel() {
    this.panel.classList.add("open");
  }

  closePanel() {
    this.panel.classList.remove("open");
  }

  setTab(tabName) {
    this.activeTab = tabName;
    const tabBtns = this.panel.querySelectorAll(".concierge-tab-btn");
    tabBtns.forEach(b => {
      b.classList.toggle("active", b.getAttribute("data-tab") === tabName);
    });

    const botView = this.panel.querySelector("#concierge-bot-view");
    const routesView = this.panel.querySelector("#concierge-routes-view");

    if (botView && routesView) {
      if (tabName === "bot") {
        botView.style.display = "flex";
        routesView.style.display = "none";
      } else {
        botView.style.display = "none";
        routesView.style.display = "flex";
      }
    }
  }

  renderRoutes() {
    const container = this.panel.querySelector("#concierge-routes-container");
    if (!container) return;

    container.innerHTML = "";
    CONFIG.serviceAreas.forEach(area => {
      const card = document.createElement("div");
      card.className = "concierge-route-card";
      card.innerHTML = `
        <div class="route-icon">${area.icon}</div>
        <div class="route-info">
          <h4>${area.title}</h4>
          <p>${area.desc}</p>
        </div>
      `;
      card.addEventListener("click", () => {
        const url = `${CONFIG.urls.whatsappBase}?text=${encodeURIComponent(area.waMessage)}`;
        window.open(url, "_blank", "noopener,noreferrer");
      });
      container.appendChild(card);
    });
  }
}
