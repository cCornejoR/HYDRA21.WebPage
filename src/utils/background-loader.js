/**
 * Sistema Ultra-Rápido de Carga de Fondos para HYDRA²¹
 * Optimiza la carga y transiciones de imágenes de fondo para máxima velocidad
 */

class UltraFastBackgroundLoader {
  constructor() {
    this.loadedBackgrounds = new Set();
    this.preloadQueue = [];
    this.intersectionObserver = null;
    this.isLowPowerDevice = this.detectLowPowerDevice();
    this.init();
  }

  init() {
    console.log("🚀 Iniciando carga ultra-rápida de fondos...");
    
    // Configurar observador de intersección para carga lazy inteligente
    this.setupIntersectionObserver();
    
    // Precargar fondos críticos inmediatamente
    this.preloadCriticalBackgrounds();
    
    // Optimizar fondos existentes
    this.optimizeExistingBackgrounds();
    
    // Configurar prefetch inteligente
    this.setupIntelligentPrefetch();
  }

  detectLowPowerDevice() {
    return (
      navigator.hardwareConcurrency < 4 ||
      navigator.deviceMemory < 4 ||
      /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent) ||
      window.innerWidth < 768
    );
  }

  setupIntersectionObserver() {
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadBackgroundFast(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '100px 0px' // Precargar cuando esté cerca del viewport
      }
    );

    // Observar todos los elementos con fondos
    this.observeBackgroundElements();
  }

  observeBackgroundElements() {
    const backgroundSelectors = [
      '.about-background',
      '.downloads-background', 
      '.terms-background',
      '.privacy-background',
      '.cookies-background',
      '.hero-background',
      '.features-background',
      '.documentation-background'
    ];

    backgroundSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        if (!element.dataset.backgroundOptimized) {
          this.intersectionObserver.observe(element);
          element.dataset.backgroundOptimized = 'pending';
        }
      });
    });
  }

  preloadCriticalBackgrounds() {
    // Lista de fondos críticos above-the-fold
    const criticalBackgrounds = [
      '/assets/images/robot.png',
      '/assets/images/Software-main.png',
      '/assets/images/cube_2.png'
    ];

    criticalBackgrounds.forEach(src => {
      this.preloadImage(src, 'high');
    });
  }

  loadBackgroundFast(element) {
    if (element.dataset.backgroundOptimized === 'loaded') return;

    // Aplicar optimizaciones instantáneas
    this.applyInstantOptimizations(element);

    // Marcar como cargado
    element.dataset.backgroundOptimized = 'loaded';
    
    // Desenganchar del observer
    this.intersectionObserver.unobserve(element);
  }

  applyInstantOptimizations(element) {
    // Aplicar optimizaciones según el tipo de dispositivo
    if (this.isLowPowerDevice) {
      this.applyLowPowerOptimizations(element);
    } else {
      this.applyHighPerformanceOptimizations(element);
    }

    // Forzar repaint optimizado
    element.style.transform = 'translateZ(0)';
    element.style.willChange = 'transform';
    
    // Aplicar transición suave
    element.style.transition = 'opacity 0.15s cubic-bezier(0.25, 0.1, 0.25, 1)';
    
    // Trigger de animación
    requestAnimationFrame(() => {
      element.style.opacity = this.isLowPowerDevice ? '0.6' : '0.5';
      
      // Cleanup después de la animación
      setTimeout(() => {
        element.style.willChange = 'auto';
        element.style.transition = '';
      }, 200);
    });
  }

  applyLowPowerOptimizations(element) {
    const style = `
      background-attachment: scroll !important;
      background-size: cover !important;
      background-position: center center !important;
      opacity: 0.6 !important;
      filter: none !important;
    `;
    
    element.style.cssText += style;
  }

  applyHighPerformanceOptimizations(element) {
    const style = `
      background-attachment: fixed !important;
      background-size: cover !important;
      background-position: center center !important;
      opacity: 0.5 !important;
      filter: brightness(1.1) contrast(1.1) !important;
    `;
    
    element.style.cssText += style;
  }

  optimizeExistingBackgrounds() {
    // Optimizar fondos ya presentes en la página
    const backgroundElements = document.querySelectorAll(`
      .about-background, .downloads-background, .terms-background,
      .privacy-background, .cookies-background, .hero-background,
      .features-background, .documentation-background
    `);

    backgroundElements.forEach(element => {
      // Aplicar optimizaciones CSS inmediatas
      element.style.transform = 'translateZ(0)';
      element.style.backfaceVisibility = 'hidden';
      element.style.perspective = '1000px';
      
      // Optimización específica por dispositivo
      if (this.isLowPowerDevice) {
        element.style.backgroundAttachment = 'scroll';
        element.style.opacity = '0.6';
      } else {
        element.style.backgroundAttachment = 'fixed';
        element.style.opacity = '0.5';
      }
    });
  }

  setupIntelligentPrefetch() {
    // Prefetch basado en navegación del usuario
    let prefetchTimer;

    document.addEventListener('mouseover', (e) => {
      const link = e.target.closest('a[href^="/"]');
      if (link) {
        clearTimeout(prefetchTimer);
        prefetchTimer = setTimeout(() => {
          this.prefetchPageBackgrounds(link.href);
        }, 100);
      }
    });

    document.addEventListener('mouseout', () => {
      clearTimeout(prefetchTimer);
    });

    // Prefetch en focus para accesibilidad
    document.addEventListener('focusin', (e) => {
      const link = e.target.closest('a[href^="/"]');
      if (link) {
        this.prefetchPageBackgrounds(link.href);
      }
    });
  }

  prefetchPageBackgrounds(url) {
    if (this.isLowPowerDevice) return; // No prefetch en dispositivos de baja potencia

    // Mapeo de URLs a fondos específicos
    const pageBackgrounds = {
      '/about': ['/assets/images/robot.png'],
      '/descargas': ['/assets/images/Software-main.png'],
      '/docs': ['/assets/images/torus_2.png']
    };

    const pathname = new URL(url, window.location.origin).pathname;
    const backgrounds = pageBackgrounds[pathname];

    if (backgrounds) {
      backgrounds.forEach(src => {
        this.preloadImage(src, 'low');
      });
    }
  }

  preloadImage(src, priority = 'medium') {
    if (this.loadedBackgrounds.has(src)) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    
    // Configurar prioridad
    switch (priority) {
      case 'high':
        link.setAttribute('fetchpriority', 'high');
        break;
      case 'low':
        link.setAttribute('fetchpriority', 'low');
        break;
    }

    // Añadir al DOM
    document.head.appendChild(link);
    this.loadedBackgrounds.add(src);

    // Cleanup después de carga
    link.addEventListener('load', () => {
      setTimeout(() => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      }, 1000);
    });
  }

  // Método para refresh después de transiciones de página
  refresh() {
    // Re-observar nuevos elementos de fondo
    this.observeBackgroundElements();
    
    // Optimizar nuevos fondos
    this.optimizeExistingBackgrounds();
  }

  // Método para cleanup
  destroy() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }
}

// Instancia global
let ultraFastBackgroundLoader;

function initUltraFastBackgroundLoader() {
  if (ultraFastBackgroundLoader) {
    ultraFastBackgroundLoader.refresh();
  } else {
    ultraFastBackgroundLoader = new UltraFastBackgroundLoader();
  }
}

// Auto-inicialización
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initUltraFastBackgroundLoader);
} else {
  initUltraFastBackgroundLoader();
}

// Re-inicializar después de transiciones de página
document.addEventListener('astro:page-load', initUltraFastBackgroundLoader);
document.addEventListener('astro:after-swap', () => {
  // Pequeño delay para asegurar que el DOM esté listo
  setTimeout(initUltraFastBackgroundLoader, 50);
});

// Exportar para uso manual si es necesario
window.UltraFastBackgroundLoader = UltraFastBackgroundLoader;
