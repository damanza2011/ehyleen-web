/**
 * ============================================================================
 * EHYLEEN · Cotizador Paramétrico Botánico
 * Lógica pura, desacoplada del DOM según estándares Clean Architecture
 * ============================================================================
 */

import { CONFIG } from './config.js';

export class BotanicalQuoter {
  constructor() {
    this.state = {
      projectType: "residencial",     // residencial | institucional | muro-verde
      areaM2: 120,
      irrigationSystem: true,
      lightingSystem: true,
      zone: "Altos de Riomar"
    };
  }

  setProjectType(type) {
    if (["residencial", "institucional", "muro-verde"].includes(type)) {
      this.state.projectType = type;
    }
  }

  setArea(m2) {
    const area = Number(m2);
    if (!isNaN(area) && area > 0) {
      this.state.areaM2 = area;
    }
  }

  setIrrigation(enabled) {
    this.state.irrigationSystem = Boolean(enabled);
  }

  setLighting(enabled) {
    this.state.lightingSystem = Boolean(enabled);
  }

  setZone(zoneName) {
    if (typeof zoneName === 'string') {
      this.state.zone = zoneName.trim();
    }
  }

  calculate() {
    let baseRate = CONFIG.pricingBaselines.pricePerM2Residencial;
    if (this.state.projectType === "institucional") {
      baseRate = CONFIG.pricingBaselines.pricePerM2Institucional;
    } else if (this.state.projectType === "muro-verde") {
      baseRate = CONFIG.pricingBaselines.priceMuroVerdeM2;
    }

    let subtotal = this.state.areaM2 * baseRate;

    // Adicionales
    let irrigationTotal = 0;
    if (this.state.irrigationSystem) {
      irrigationTotal = this.state.areaM2 * CONFIG.pricingBaselines.irrigationAddonM2;
    }

    let lightingTotal = 0;
    if (this.state.lightingSystem) {
      // Estimado base de iluminación escénica
      lightingTotal = Math.round(this.state.areaM2 * 28000);
    }

    const totalEstimate = subtotal + irrigationTotal + lightingTotal;

    return {
      subtotal,
      irrigationTotal,
      lightingTotal,
      totalEstimate,
      formattedTotal: new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0
      }).format(totalEstimate)
    };
  }

  generateWhatsAppUrl() {
    const calc = this.calculate();
    const typeLabel = this.state.projectType === 'muro-verde' ? 'Muro Verde / Bioarquitectura' :
                      this.state.projectType === 'institucional' ? 'Corporativo / Institucional' : 'Residencial High-End';

    const text = `🌿 *Solicitud de Propuesta EHYLEEN* 🌿\n\n` +
      `• *Línea:* ${typeLabel}\n` +
      `• *Área Estimada:* ${this.state.areaM2} m²\n` +
      `• *Ubicación / Sector:* ${this.state.zone}\n` +
      `• *Riego Tecnificado:* ${this.state.irrigationSystem ? 'Sí (Automatizado)' : 'No'}\n` +
      `• *Iluminación Escénica:* ${this.state.lightingSystem ? 'Sí (Nocturna)' : 'No'}\n` +
      `• *Estimado Base Paramétrico:* ${calc.formattedTotal} COP\n\n` +
      `Deseo agendar una visita técnica para validar las especies y la alianza con sus viveros aliados en Barranquilla.`;

    return `${CONFIG.urls.whatsappBase}?text=${encodeURIComponent(text)}`;
  }
}
