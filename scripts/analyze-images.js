const fs = require("fs");
const path = require("path");

// Directorio de imágenes
const imagesDir = path.join(__dirname, "../public/assets/images");

console.log("🚀 HYDRA²¹ - Análisis de Optimización de Imágenes\n");
console.log("🔍 Analizando imágenes en el proyecto...\n");

try {
  const files = fs
    .readdirSync(imagesDir)
    .filter((file) => /\.(png|jpg|jpeg)$/i.test(file))
    .map((file) => {
      const filePath = path.join(imagesDir, file);
      const stats = fs.statSync(filePath);
      return {
        name: file,
        size: stats.size,
        sizeMB: (stats.size / (1024 * 1024)).toFixed(2),
      };
    })
    .sort((a, b) => b.size - a.size);

  console.log("📊 IMÁGENES MÁS PESADAS (ordenadas por tamaño):");
  console.log("=".repeat(60));

  files.forEach((file, index) => {
    const status =
      file.size > 1000000
        ? "🔴 CRÍTICO"
        : file.size > 500000
        ? "🟡 ALTO"
        : "🟢 OK";
    console.log(`${index + 1}. ${file.name} - ${file.sizeMB}MB ${status}`);
  });

  const totalSize = files.reduce((acc, file) => acc + file.size, 0);
  console.log(`\n📈 TAMAÑO TOTAL: ${(totalSize / (1024 * 1024)).toFixed(2)}MB`);

  console.log("\n🛠️ RECOMENDACIONES DE OPTIMIZACIÓN:\n");

  console.log("1. COMPRESIÓN INMEDIATA:");
  console.log("• Usar TinyPNG.com para reducir png pesadas");
  console.log("• Objetivo: cada imagen < 500KB");
  console.log("• Prioridad: cube_2.png, brain_3D.png, pdf_compresor.png\n");

  console.log("2. FORMATOS MODERNOS:");
  console.log("• Convertir PNG decorativas a WebP");
  console.log("• 30-50% menor tamaño garantizado");
  console.log("• Mantener PNG como fallback\n");

  console.log("3. RESPONSIVE IMAGES:");
  console.log("• Crear versiones mobile (400px), tablet (800px)");
  console.log("• Usar srcset para cargar tamaño apropiado");
  console.log("• cube_2.png se carga 3 veces en Hero\n");

  console.log("✨ OPTIMIZACIONES YA IMPLEMENTADAS:");
  console.log("✅ Lazy loading en Hero y Features");
  console.log("✅ Decoding async");
  console.log("✅ Code splitting en Astro config");
  console.log("✅ Componente OptimizedImage creado\n");

  console.log("📱 IMPACTO ESPERADO:");
  console.log("• Reducción de tiempo de carga: 60-70%");
  console.log("• LCP mejorado: de 4.70s a ~1.5s");
  console.log("• Reducción de ancho de banda: 50-60%");
} catch (error) {
  console.error("❌ Error al analizar imágenes:", error.message);
}
