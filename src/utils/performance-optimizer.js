/**
 * Sistema de Optimización Automática de Rendimiento para HYDRA²¹
 * Detecta capacidades del dispositivo y aplica optimizaciones específicas
 */

class PerformanceOptimizer {
  constructor() {
    this.deviceInfo = this.detectDevice();
    this.networkInfo = this.detectNetwork();
    this.preferences = this.detectUserPreferences();
    this.init();
  }

  init() {
    console.log("🚀 Inicializando optimizaciones de rendimiento...", {
      device: this.deviceInfo.type,
      network: this.networkInfo.type,
      gpu: this.deviceInfo.gpuAcceleration ? "enabled" : "limited",
    });

    // Aplicar optimizaciones según el dispositivo
    this.applyDeviceOptimizations();

    // Optimizar para la red actual
    this.applyNetworkOptimizations();

    // Configurar observadores de rendimiento
    this.setupPerformanceObservers();

    // Inicializar prefetch inteligente
    this.initIntelligentPrefetch();
  }

  detectDevice() {
    const deviceInfo = {
      type: "desktop",
      memory: navigator.deviceMemory || 4,
      cores: navigator.hardwareConcurrency || 4,
      gpuAcceleration: this.testGPUAcceleration(),
      touchDevice: "ontouchstart" in window,
      highRefreshRate: window.screen?.refreshRate > 60 || false,
    };

    // Detectar tipo de dispositivo
    if (deviceInfo.memory <= 2 || deviceInfo.cores <= 2) {
      deviceInfo.type = "low-power";
    } else if (deviceInfo.touchDevice && window.innerWidth <= 768) {
      deviceInfo.type = "mobile";
    } else if (deviceInfo.memory >= 8 && deviceInfo.cores >= 8) {
      deviceInfo.type = "high-performance";
    }

    return deviceInfo;
  }

  testGPUAcceleration() {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      return !!gl;
    } catch (e) {
      return false;
    }
  }

  detectNetwork() {
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;

    return {
      type: connection?.effectiveType || "unknown",
      downlink: connection?.downlink || "unknown",
      rtt: connection?.rtt || "unknown",
      saveData: connection?.saveData || false,
    };
  }

  detectUserPreferences() {
    return {
      reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches,
      reducedData: window.matchMedia("(prefers-reduced-data: reduce)").matches,
      darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
      highContrast: window.matchMedia("(prefers-contrast: high)").matches,
    };
  }

  applyDeviceOptimizations() {
    const body = document.body;
    const html = document.documentElement;

    // Remover clases anteriores
    body.classList.remove(
      "device-low-power",
      "device-mobile",
      "device-high-performance"
    );

    // Aplicar clase según tipo de dispositivo
    body.classList.add(`device-${this.deviceInfo.type}`);

    switch (this.deviceInfo.type) {
      case "low-power":
        this.optimizeForLowPower();
        break;
      case "mobile":
        this.optimizeForMobile();
        break;
      case "high-performance":
        this.optimizeForHighPerformance();
        break;
      default:
        this.optimizeForDesktop();
    }

    // GPU acceleration
    if (this.deviceInfo.gpuAcceleration) {
      html.classList.add("gpu-enabled");
    } else {
      html.classList.add("gpu-limited");
    }
  }
  optimizeForLowPower() {
    console.log(
      "📱 Aplicando optimizaciones para dispositivos de baja potencia..."
    );

    // Ultra-fast transitions
    document.documentElement.style.setProperty("--animation-duration", "0.1s");
    document.documentElement.style.setProperty("--transition-duration", "0.1s");

    // Simplificar transiciones y efectos
    const style = document.createElement("style");
    style.textContent = `
      /* Ultra-fast low-power optimizations */
      .page-transition-overlay { display: none !important; }
      .animate-float, .animate-pulse-slow, .animate-float-gentle { 
        animation-duration: 2s !important; 
        animation-timing-function: linear !important;
      }
      .viewport-observer { 
        opacity: 1 !important; 
        transform: none !important; 
        transition: opacity 0.1s ease !important;
      }
      [class*="blur-"] { filter: blur(2px) !important; }
      [class*="backdrop-blur"] { backdrop-filter: blur(4px) !important; }
      * { will-change: auto !important; }
      ::view-transition-old(*), ::view-transition-new(*) { 
        animation-duration: 0.1s !important; 
      }
      /* Instant background loading */
      .about-background, .downloads-background, .terms-background, 
      .privacy-background, .cookies-background {
        background-attachment: scroll !important;
        transform: translateZ(0) !important;
        will-change: transform !important;
      }
    `;
    document.head.appendChild(style);
  }
  optimizeForMobile() {
    console.log("📱 Aplicando optimizaciones para móvil...");

    // Touch optimizations
    document.body.classList.add("touch-device");

    // Optimizar viewport
    let viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.content =
        "width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no";
    }

    // Ultra-fast mobile optimizations
    const style = document.createElement("style");
    style.textContent = `
      /* Ultra-fast mobile transitions */
      * { 
        transition-duration: 0.15s !important; 
        animation-duration: 3s !important;
      }
      .viewport-observer {
        opacity: 1 !important;
        transform: none !important;
        transition: opacity 0.1s ease !important;
      }
      /* Fast blur effects for mobile */
      @media (max-width: 768px) {
        [class*="blur-"] { filter: blur(3px) !important; }
        .glass-effect { backdrop-filter: blur(3px) !important; }
        .page-transition-overlay { backdrop-filter: blur(4px) !important; }
        /* Instant background loading on mobile */
        .about-background, .downloads-background, .terms-background,
        .privacy-background, .cookies-background {
          background-attachment: scroll !important;
          transform: translateZ(0) !important;
          will-change: transform !important;
          opacity: 0.6 !important;
        }
      }
    `;
    document.head.appendChild(style);
  }
  optimizeForHighPerformance() {
    console.log("⚡ Aplicando optimizaciones para alto rendimiento...");

    // Habilitar efectos avanzados pero optimizados
    document.documentElement.style.setProperty("--animation-duration", "0.2s");
    document.documentElement.style.setProperty("--transition-duration", "0.2s");
    document.body.classList.add("high-performance-device");

    // Ultra-smooth high-performance optimizations
    const style = document.createElement("style");
    style.textContent = `
      /* Ultra-smooth high-performance mode */
      * {
        transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1) !important;
        animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1) !important;
      }
      .viewport-observer {
        transition: opacity 0.2s ease, transform 0.2s ease !important;
      }
      /* Smooth background loading for high-performance */
      .about-background, .downloads-background, .terms-background,
      .privacy-background, .cookies-background {
        transition: opacity 0.3s ease, transform 0.3s ease !important;
        transform: translateZ(0) !important;
        will-change: transform, opacity !important;
      }
      /* Enhanced blur effects for high-performance devices */
      [class*="backdrop-blur"] {
        backdrop-filter: blur(12px) saturate(180%) !important;
      }
    `;
    document.head.appendChild(style);

    // Precargar más recursos para experiencia premium
    this.prefetchCriticalResources();
  }

  optimizeForDesktop() {
    console.log("🖥️ Aplicando optimizaciones para escritorio...");
    document.body.classList.add("desktop-device");
  }

  applyNetworkOptimizations() {
    if (this.networkInfo.saveData || this.preferences.reducedData) {
      this.enableDataSavingMode();
    }

    switch (this.networkInfo.type) {
      case "slow-2g":
      case "2g":
        this.optimizeForSlowNetwork();
        break;
      case "3g":
        this.optimizeForMediumNetwork();
        break;
      case "4g":
      case "5g":
        this.optimizeForFastNetwork();
        break;
    }
  }

  enableDataSavingMode() {
    console.log("💾 Modo de ahorro de datos activado");

    const style = document.createElement("style");
    style.textContent = `
      .page-transition-overlay,
      .diagonal-grid,
      [class*="bg-blue-"],
      [class*="bg-sky-"] {
        display: none !important;
      }
      
      img { 
        loading: lazy !important;
        decoding: async !important;
      }
    `;
    document.head.appendChild(style);
  }

  optimizeForSlowNetwork() {
    console.log("🐌 Optimizando para red lenta...");

    // Deshabilitar prefetch automático
    document.querySelectorAll('link[rel="prefetch"]').forEach((link) => {
      link.remove();
    });

    // Lazy load agresivo
    document.querySelectorAll("img").forEach((img) => {
      img.loading = "lazy";
      img.decoding = "async";
    });
  }

  optimizeForMediumNetwork() {
    console.log("📶 Optimizando para red media...");
    // Prefetch selectivo
  }

  optimizeForFastNetwork() {
    console.log("🚀 Optimizando para red rápida...");

    // Prefetch agresivo
    this.aggressivePrefetch();
  }

  setupPerformanceObservers() {
    // Performance Observer para métricas
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === "navigation") {
            console.log(
              `📊 Tiempo de carga: ${
                entry.loadEventEnd - entry.loadEventStart
              }ms`
            );
          }
        });
      });

      observer.observe({ entryTypes: ["navigation", "paint"] });
    }

    // Intersection Observer para lazy loading
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-viewport");

            // Activar animaciones solo cuando son visibles
            if (entry.target.hasAttribute("data-animate-on-scroll")) {
              entry.target.classList.add("animate-in");
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    // Observar elementos optimizables
    document
      .querySelectorAll(".viewport-optimized, [data-animate-on-scroll]")
      .forEach((el) => {
        observer.observe(el);
      });
  }

  initIntelligentPrefetch() {
    // Prefetch inteligente basado en comportamiento del usuario
    let hoverTimer;

    document.addEventListener("mouseover", (e) => {
      const link = e.target.closest('a[href^="/"]');
      if (link && !link.dataset.prefetched) {
        hoverTimer = setTimeout(() => {
          this.prefetchPage(link.href);
          link.dataset.prefetched = "true";
        }, 150); // Delay para evitar prefetch innecesario
      }
    });

    document.addEventListener("mouseout", () => {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
      }
    });

    // Prefetch en focus para accesibilidad
    document.addEventListener("focusin", (e) => {
      const link = e.target.closest('a[href^="/"]');
      if (link && !link.dataset.prefetched) {
        this.prefetchPage(link.href);
        link.dataset.prefetched = "true";
      }
    });
  }

  prefetchPage(url) {
    if (this.networkInfo.saveData || this.preferences.reducedData) {
      return; // No prefetch en modo ahorro
    }

    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = url;
    link.setAttribute("fetchpriority", "low");
    document.head.appendChild(link);
  }

  prefetchCriticalResources() {
    const criticalResources = [
      "/assets/images/cube_2.png",
      "/assets/images/torus_2.png",
      "/assets/images/icosahedron_2.png",
    ];

    criticalResources.forEach((resource) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = resource;
      link.setAttribute("fetchpriority", "high");
      document.head.appendChild(link);
    });
  }

  aggressivePrefetch() {
    // Lista de páginas importantes para prefetch
    const importantPages = ["/about", "/descargas", "/docs"];

    importantPages.forEach((page) => {
      requestIdleCallback(() => {
        this.prefetchPage(page);
      });
    });
  }

  // Método público para re-optimizar (útil para SPA)
  reoptimize() {
    this.deviceInfo = this.detectDevice();
    this.networkInfo = this.detectNetwork();
    this.applyDeviceOptimizations();
    this.applyNetworkOptimizations();
  }
}

// Inicializar automáticamente
let performanceOptimizer;

function initPerformanceOptimizer() {
  if (performanceOptimizer) return;
  performanceOptimizer = new PerformanceOptimizer();
}

// Inicializar en carga de página
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPerformanceOptimizer);
} else {
  initPerformanceOptimizer();
}

// Re-optimizar después de navegación
document.addEventListener("astro:page-load", () => {
  if (performanceOptimizer) {
    performanceOptimizer.reoptimize();
  } else {
    initPerformanceOptimizer();
  }
});

// Exportar para uso manual si es necesario
window.PerformanceOptimizer = PerformanceOptimizer;
