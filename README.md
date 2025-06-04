# 🌊 HYDRA²¹ - Software de Ingeniería Hidráulica

<div align="center">

![HYDRA²¹ Logo](https://img.shields.io/badge/HYDRA²¹-Ingeniería%20Hidráulica-0ea5e9?style=for-the-badge&logo=water&logoColor=white)

[![Website](https://img.shields.io/badge/🌐%20Website-www.hydra21.com-0ea5e9?style=for-the-badge)](https://www.hydra21.com)
[![Build Status](https://img.shields.io/github/actions/workflow/status/cCornejoR/HYDRA21.WebPage/deploy.yml?style=for-the-badge&label=Deploy)](https://github.com/cCornejoR/HYDRA21.WebPage/actions)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**Soluciones avanzadas para análisis hidráulico y gestión de recursos hídricos**

[🚀 Ver Demo](https://www.hydra21.com) • [📖 Documentación](https://www.hydra21.com/docs) • [💻 Descargas](https://www.hydra21.com/descargas)

</div>

---

## 🎯 ¿Qué es HYDRA²¹?

HYDRA²¹ es una suite de software especializada en **ingeniería hidráulica** que proporciona herramientas avanzadas para el análisis, diseño y gestión de sistemas hídricos. Desarrollado con tecnología moderna para ingenieros y profesionales del sector.

### ✨ Características Principales

- 🔬 **Análisis Hidráulico Avanzado** - Simulaciones precisas de flujo y comportamiento hídrico
- 📊 **Modelado de Sistemas** - Diseño y optimización de redes hidráulicas
- 🌍 **Gestión de Recursos** - Herramientas para manejo sostenible del agua
- 📈 **Reportes Profesionales** - Documentación técnica automatizada
- 🔗 **API Integrada** - Conectividad con otros sistemas de ingeniería
- 📱 **Interfaz Moderna** - Experiencia de usuario intuitiva y responsiva

---

## 🛠️ Tecnologías Utilizadas

<div align="center">

![Astro](https://img.shields.io/badge/Astro-FF5F00?style=for-the-badge&logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

</div>

- **Frontend:** Astro 5.8+ con React 19
- **Estilos:** Tailwind CSS con componentes personalizados
- **Búsqueda:** Fuse.js para búsqueda inteligente
- **Deploy:** GitHub Actions + GitHub Pages (Sitio Estático)
- **Autenticación:** Client-side con Web Crypto API
- **Dominio:** www.hydra21.com

---

## 🚀 Inicio Rápido

### 📋 Prerrequisitos

- Node.js 18+
- npm o yarn
- Git

### 💻 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/cCornejoR/HYDRA21.WebPage.git
cd HYDRA21.WebPage

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:3500` 🎉

### 🛠️ Comandos Disponibles

| Comando           | Descripción                    | Estado         |
| ----------------- | ------------------------------ | -------------- |
| `npm run dev`     | 🔧 Servidor de desarrollo      | ✅ Funcionando |
| `npm run build`   | 🏗️ Construir para producción   | ✅ Funcionando |
| `npm run preview` | 👀 Previsualizar build local   | ✅ Funcionando |
| `npm run deploy`  | 🚀 Deploy a GitHub Pages       | ✅ Funcionando |
| `npm run clean`   | 🧹 Limpiar archivos temporales | ✅ Funcionando |

> ⚡ **Build Status:** El proyecto se construye exitosamente como sitio estático optimizado para GitHub Pages.

---

## 📁 Estructura del Proyecto

```
HYDRA21.GH/
├── 📂 public/           # Assets estáticos
│   ├── 🖼️ assets/      # Imágenes y recursos
│   └── 🎨 svg/         # Iconos SVG
├── 📂 src/
│   ├── 🧩 components/   # Componentes reutilizables
│   ├── 📄 pages/        # Páginas del sitio
│   │   └── 📚 docs/     # Documentación
│   ├── 🎨 styles/       # Estilos globales
│   └── 🔧 utils/        # Utilidades y autenticación
├── 📂 dist/            # Build de producción
├── 📋 package.json      # Dependencias
└── ⚙️ astro.config.mjs  # Configuración Astro
```

---

## 🌐 Deploy y Producción

El proyecto está configurado para **deploy automático** en GitHub Pages:

- **🔄 CI/CD:** GitHub Actions automático
- **🌍 Dominio:** [www.hydra21.com](https://www.hydra21.com)
- **🔒 HTTPS:** Certificado SSL automático
- **⚡ CDN:** Distribución global optimizada
- **📦 Build:** Sitio estático optimizado

### Deploy Manual

```bash
npm run build
npm run deploy
```

Ver [`DEPLOY.md`](DEPLOY.md) para instrucciones detalladas.

---

## 🔐 Autenticación

El sistema de autenticación funciona completamente en el **lado del cliente**:

- **🔒 Seguridad:** Hashing SHA-256 con Web Crypto API
- **💾 Persistencia:** SessionStorage para tokens temporales
- **⏰ Expiración:** Tokens válidos por 1 hora
- **🚫 Sin servidor:** Compatible con hosting estático

Utilidad disponible en `/src/utils/auth-client.js` para integración en componentes.

---

## 📖 Documentación

- 📚 **[Documentación Completa](https://www.hydra21.com/docs)** - Guías y tutoriales
- 💾 **[Descargas](https://www.hydra21.com/descargas)** - Software y recursos
- ℹ️ **[Acerca de](https://www.hydra21.com/about)** - Historia y equipo

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. 🍴 Fork del proyecto
2. 🌟 Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push a la rama (`git push origin feature/AmazingFeature`)
5. 🔄 Abre un Pull Request

---

## 📄 Páginas Legales

- [🔒 Política de Privacidad](https://www.hydra21.com/privacidad)
- [📋 Términos de Uso](https://www.hydra21.com/terminos)
- [🍪 Política de Cookies](https://www.hydra21.com/cookies)

---

## 📞 Contacto y Soporte

<div align="center">

[![Website](https://img.shields.io/badge/🌐%20Sitio%20Web-www.hydra21.com-0ea5e9?style=for-the-badge)](https://www.hydra21.com)
[![GitHub](https://img.shields.io/badge/📂%20GitHub-cCornejoR-black?style=for-the-badge&logo=github)](https://github.com/cCornejoR)

**🌊 HYDRA²¹ - Innovando en Ingeniería Hidráulica**

</div>

---

<div align="center">
  <sub>Construido con ❤️ usando Astro y tecnologías modernas</sub>
</div>
