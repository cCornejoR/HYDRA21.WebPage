#!/usr/bin/env node

/**
 * Script de Optimización de Imágenes para HYDRA²¹
 * Optimiza automáticamente las imágenes para mejor performance web
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directorio de imágenes
const imagesDir = path.join(__dirname, "../public/assets/images");

// Obtener estadísticas de archivos
function getFileStats() {
  console.log("🔍 Analizando imágenes en el proyecto...\n");

  const files = fs
    .readdirSync(imagesDir, { withFileTypes: true })
    .filter(
      (dirent) => dirent.isFile() && /\.(png|jpg|jpeg)$/i.test(dirent.name)
    )
    .map((dirent) => {
      const filePath = path.join(imagesDir, dirent.name);
      const stats = fs.statSync(filePath);
      return {
        name: dirent.name,
        size: stats.size,
        sizeMB: (stats.size / (1024 * 1024)).toFixed(2),
      };
    })
    .sort((a, b) => b.size - a.size);

  console.log("📊 IMÁGENES MÁS PESADAS (ordenadas por tamaño):");
  console.log("=" * 60);

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

  return files;
}

// Recomendaciones de optimización
function getOptimizationRecommendations() {
  console.log("\n🛠️  RECOMENDACIONES DE OPTIMIZACIÓN:\n");

  const recommendations = [
    {
      category: "1. COMPRESIÓN DE IMÁGENES",
      actions: [
        "• Usar herramientas como TinyPNG, ImageOptim o Sharp",
        "• Comprimir PNG con pérdida del 10-20%",
        "• Convertir PNG decorativas a JPEG cuando sea posible",
        "• Objetivo: Reducir cada imagen a menos de 500KB",
      ],
    },
    {
      category: "2. FORMATOS MODERNOS",
      actions: [
        "• Convertir a WebP (30-50% menor tamaño)",
        "• Usar AVIF para navegadores compatibles",
        "• Implementar <picture> con fallbacks",
      ],
    },
    {
      category: "3. RESPONSIVE IMAGES",
      actions: [
        "• Crear diferentes tamaños (mobile, tablet, desktop)",
        "• Usar srcset para cargar el tamaño apropiado",
        "• cube_2.png: crear versiones 200px, 400px, 800px",
      ],
    },
    {
      category: "4. LAZY LOADING",
      actions: [
        "• ✅ Ya implementado en Hero y Features",
        "• Aplicar a todas las imágenes no críticas",
        "• Usar intersection observer para mejor control",
      ],
    },
    {
      category: "5. PRELOADING CRÍTICO",
      actions: [
        "• Precargar solo la imagen principal del Hero",
        '• Usar <link rel="preload"> para LCP crítico',
        "• Evitar precargar múltiples imágenes",
      ],
    },
  ];

  recommendations.forEach((rec) => {
    console.log(`${rec.category}:`);
    rec.actions.forEach((action) => console.log(`  ${action}`));
    console.log("");
  });
}

// Generar comandos de optimización
function generateOptimizationCommands(files) {
  console.log("💻 COMANDOS DE OPTIMIZACIÓN AUTOMÁTICA:\n");

  const heavyFiles = files.filter((file) => file.size > 500000);

  console.log("# Instalar herramientas (una vez):");
  console.log("npm install -g @squoosh/cli sharp-cli");
  console.log("");

  console.log("# Optimizar archivos pesados:");
  heavyFiles.forEach((file) => {
    console.log(
      `npx @squoosh/cli --webp '{"quality":85}' --avif '{"quality":50}' public/assets/images/${file.name}`
    );
  });

  console.log("\n# O usar Sharp para batch processing:");
  console.log("node scripts/sharp-optimize.js");
}

// Función principal
function main() {
  console.log("🚀 HYDRA²¹ - Análisis de Optimización de Imágenes\n");

  try {
    const files = getFileStats();
    getOptimizationRecommendations();
    generateOptimizationCommands(files);

    console.log("\n✨ SIGUIENTE PASO:");
    console.log("1. Ejecutar los comandos de optimización");
    console.log("2. Implementar formatos WebP/AVIF");
    console.log("3. Crear responsive images");
    console.log("4. Medir performance nuevamente");
  } catch (error) {
    console.error("❌ Error al analizar imágenes:", error.message);
  }
}

// Ejecutar script
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { getFileStats, getOptimizationRecommendations };
