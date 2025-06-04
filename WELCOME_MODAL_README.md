# Modal de Bienvenida HYDRA²¹

## 🎉 Descripción

Modal de bienvenida hermoso y animado que se muestra a los usuarios en su primera visita al sitio web de HYDRA²¹. Incluye:

- **Animación genial del robot** con efectos de brillo rotativo y partículas flotantes
- **Logos de las empresas** (Amphos21 y HYDRA²¹)
- **Mensaje de fase alpha** explicando el estado del proyecto
- **Animaciones CSS personalizadas** con efectos de entrada escalonados
- **Sistema de localStorage** para mostrar solo una vez por usuario

## 🚀 Características

### Animaciones

- **Robot flotante** con efecto bounce suave
- **Brillo rotativo** alrededor del robot (8 segundos)
- **Partículas animadas** con delays escalonados
- **Fade-in-up** para todos los elementos con timing perfecto
- **Backdrop blur** progresivo al abrir

### Funcionalidad

- Se muestra automáticamente después de 1 segundo en la primera visita
- Se puede reabrir desde el botón en el header (desktop y móvil)
- Soporte para tecla Escape
- Click fuera del modal para cerrar
- Previene scroll del body cuando está abierto

### Responsive

- Diseño completamente responsive
- Botones adaptados para móvil y desktop
- Animaciones optimizadas para dispositivos con `prefers-reduced-motion`

## 🎨 Diseño

### Colores y Efectos

- Fondo: Gradiente de grises con transparencia
- Bordes: Azul con efecto glow
- Texto: Gradientes azul-cyan para títulos
- Sombras: Múltiples capas con efectos de profundidad

### Tipografía

- Títulos: 4xl-5xl con gradientes
- Texto: Jerarquía clara con colores semánticos
- Emojis: Integrados para mejor UX

## 🛠️ Testing

### Para desarrolladores

Ejecuta en la consola del navegador para probar:

```javascript
// Resetear y mostrar modal
localStorage.removeItem("hydra21_welcome_shown");
window.dispatchEvent(new CustomEvent("show-welcome-modal"));
```

### Botones de acceso

- **Desktop**: Botón con icono de información en el header
- **Móvil**: "Mensaje de Bienvenida" en el menú hamburguesa

## 📁 Archivos

- `src/components/WelcomeModal.jsx` - Componente principal
- `src/styles/global.css` - Animaciones CSS personalizadas
- `src/components/Header.astro` - Botones de acceso
- `src/pages/index.astro` - Integración en la página principal

## 🎯 Imágenes Utilizadas

- `/assets/images/robot.png` - Robot principal (1.4MB)
- `/assets/images/logo_empresa.png` - Logo Amphos21 (64KB)
- `/assets/images/Software-main.png` - Logo HYDRA²¹ (1.3MB)

## 🔧 Personalización

### Cambiar timing de aparición

```javascript
// En WelcomeModal.jsx, línea ~15
setTimeout(() => {
  setIsOpen(true);
  setIsAnimating(true);
}, 1000); // Cambiar este valor
```

### Modificar animaciones

```css
/* En global.css */
.animate-bounce-gentle {
  animation: bounce-gentle 3s ease-in-out infinite; /* Cambiar duración */
}
```

### Resetear para todos los usuarios

```javascript
// Ejecutar en producción si necesitas que todos vean el modal de nuevo
localStorage.removeItem("hydra21_welcome_shown");
```

## 🎨 Capturas de Pantalla

El modal incluye:

1. **Robot animado** con efectos de brillo
2. **Logos empresariales** con separador elegante
3. **Mensaje de bienvenida** con gradientes
4. **Advertencia de alpha** con iconografía clara
5. **Información de feedback** destacada
6. **Saludo del equipo** personalizado
7. **Botones de acción** con hover effects

---

**Desarrollado con ❤️ para HYDRA²¹ por el equipo de Amphos21**
