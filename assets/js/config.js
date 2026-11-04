/**
 * ============================================================================
 * EHYLEEN · Configuration & Single Source of Truth
 * Jardinería de Alta Calidad & Alianza con Viveros en Barranquilla
 * Responsable Técnico / Jardinero: Davi Erazo · +57 (300) 594-5292
 * Estándar de Ingeniería de Software (Giselle Ulloa)
 * ============================================================================
 */

export const CONFIG = Object.freeze({
  brand: {
    name: "EHYLEEN",
    fullName: "EHYLEEN · Jardinería de Alta Calidad",
    tagline: "Servicios Profesionales de Jardinería y Viveros Aliados",
    city: "Barranquilla, Atlántico, Colombia",
    phoneDisplay: "+57 (300) 594-5292",
    phoneRaw: "573005945292",
    email: "contacto@ehyleen.com",
    address: "Barranquilla & Área Metropolitana · Atlántico"
  },

  gardener: Object.freeze({
    name: "Davi Erazo",
    role: "Jardinero y Director Operativo",
    phoneDisplay: "+57 (300) 594-5292",
    phoneRaw: "573005945292",
    whatsappDefault: "https://wa.me/573005945292?text=Hola%20Davi%20Erazo.%20Deseo%20solicitar%20un%20servicio%20de%20jardiner%C3%ADa%20en%20Barranquilla."
  }),

  urls: {
    whatsappBase: "https://wa.me/573005945292",
    apiChat: "/api/chat",
    apiLead: "/api/lead"
  },

  serviceAreas: Object.freeze([
    {
      id: "mantenimiento-jardines",
      title: "Mantenimiento y Cuidado Integral",
      desc: "Planes periódicos de corte, poda estética, fertilización de suelo y deshierbe profesional.",
      waMessage: "Hola Davi Erazo. Deseo solicitar información sobre los planes de mantenimiento y cuidado integral de jardines en Barranquilla."
    },
    {
      id: "siembra-plantacion",
      title: "Siembra y Renovación de Jardines",
      desc: "Plantación técnica de especies tropicales, nivelación y enriquecimiento de tierras.",
      waMessage: "Hola Davi Erazo. Me interesa el servicio de siembra y renovación de jardines con especies de viveros aliados."
    },
    {
      id: "viveros-suministro",
      title: "Suministro Directo de Viveros Aliados",
      desc: "Plantas aclimatadas al calor de Barranquilla, palmas, follajes y sustratos orgánicos.",
      waMessage: "Hola Davi Erazo. Deseo consultar la disponibilidad y suministro de plantas de sus viveros aliados en Barranquilla."
    },
    {
      id: "sanidad-vegetal",
      title: "Sanidad Vegetal y Recuperación",
      desc: "Control fitosanitario biológico, tratamiento contra plagas y recuperación de plantas débiles.",
      waMessage: "Hola Davi Erazo. Requiero una revisión técnica y recuperación para plantas y áreas verdes afectadas en mi jardín."
    },
    {
      id: "soporte-institucional",
      title: "Soporte Institucional y Corporativo",
      desc: "Servicio formal para sedes empresariales, instituciones y jardines residenciales con personal asegurado (ARL).",
      waMessage: "Hola Davi Erazo. Requiero información sobre servicios de jardinería con soporte institucional y personal con ARL en Barranquilla."
    }
  ])
});
