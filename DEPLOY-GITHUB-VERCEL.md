# Guía de Despliegue · EHYLEEN Web (Git & Vercel)

Este proyecto está configurado para desplegarse de manera inmediata en **GitHub** y en **Vercel**.

---

## 1. Repositorio en GitHub

1. Inicializa y enlaza a tu cuenta de GitHub (`damanza2011`):
```powershell
cd C:\Users\dan\Desktop\ehyleen-web
git init
git add .
git commit -m "EHYLEEN · Portal de Paisajismo de Alta Gama v1.0"
git branch -M main
git remote add origin https://github.com/damanza2011/ehyleen-web.git
git push -u origin main
```

---

## 2. Despliegue en Vercel

### Opción A (Vía Vercel CLI):
```powershell
cd C:\Users\dan\Desktop\ehyleen-web
vercel --prod
```

### Opción B (Desde el Dashboard Web de Vercel):
1. Ingresa a [vercel.com/new](https://vercel.com/new).
2. Importa el repositorio `ehyleen-web`.
3. Configuración del proyecto:
   - **Framework Preset:** `Other`.
   - **Root Directory:** `./`.
4. Variables de Entorno (Opcional para Asistente Botánico con IA):
   - `GEMINI_API_KEY`: Tu clave de Google AI Studio.
5. Haz clic en **Deploy**.
