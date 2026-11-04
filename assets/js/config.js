/**
 * ============================================================================
 * EHYLEEN · Configuration & Single Source of Truth
 * Conforme a estándares de Giselle Ulloa (Clean Architecture & Inmutabilidad)
 * ============================================================================
 */

export const CONFIG = Object.freeze({
  brand: {
    name: "EHYLEEN",
    fullName: "EHYLEEN · Paisajismo, Bioarquitectura & Alta Botánica",
    tagline: "Naturaleza Viva Esculpida para la Arquitectura Contemporánea",
    city: "Barranquilla, Atlántico, Colombia",
    phoneDisplay: "+57 (315) 775-7794",
    phoneRaw: "573157757794",
    email: "contacto@ehyleen.com",
    address: "Corredor Universitario / Altos de Riomar · Barranquilla"
  },

  urls: {
    whatsappBase: "https://wa.me/573157757794",
    apiChat: "/api/chat",
    apiLead: "/api/lead"
  },

  serviceAreas: Object.freeze([
    {
      id: "residential-luxury",
      title: "Residencial VIP & Penthouses",
      desc: "Paisajismo para casas campestres en Caujaral, Pradomar y terrazas en Riomar",
      icon: "🌿",
      waMessage: "Hola EHYLEEN Concierge. Deseo una asesoría para diseño de jardinería y paisajismo en propiedad residencial de alta gama en Barranquilla."
    },
    {
      id: "corporate-institutional",
      title: "Corporativo & Soporte Institucional",
      desc: "Zonas comunes de condominios, hoteles, clínicas y sedes empresariales (ARL + Factura)",
      icon: "🏢",
      waMessage: "Hola EHYLEEN Concierge. Requiero una propuesta institucional y soporte técnico de jardinería para entidad corporativa / constructora en Barranquilla."
    },
    {
      id: "green-walls",
      title: "Bioarquitectura & Muros Verdes",
      desc: "Jardines verticales hidropónicos automatizados y reducción térmica pasiva",
      icon: "🌱",
      waMessage: "Hola EHYLEEN Concierge. Quisiera cotizar un sistema de muro verde / bioarquitectura con riego automatizado."
    },
    {
      id: "nurseries-supply",
      title: "Red de Viveros & Especies",
      desc: "Suministro directo de flora tropical aclimatada y sustratos premium",
      icon: "🪴",
      waMessage: "Hola EHYLEEN Concierge. Me interesa conocer la disponibilidad de especies tropicales de su red de viveros aliados en el Atlántico."
    },
    {
      id: "maintenance",
      title: "Membresía de Mantenimiento",
      desc: "Fertilización programada, control biológico, podas de autor y garantía verde",
      icon: "✂️",
      waMessage: "Hola EHYLEEN Concierge. Deseo información sobre los planes mensuales de mantenimiento botánico y garantía fitosanitaria."
    }
  ]),

  pricingBaselines: Object.freeze({
    pricePerM2Residencial: 180000,   // COP por m2 diseño e instalación base
    pricePerM2Institucional: 140000,
    priceMuroVerdeM2: 550000,
    irrigationAddonM2: 45000
  })
});
