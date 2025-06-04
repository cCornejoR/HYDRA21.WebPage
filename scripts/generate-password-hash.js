import crypto from "crypto";

// Cambia esta contraseña por la que quieras usar
const PASSWORD = "download.test.hydra21"; // ← CONTRASEÑA REAL PARA HYDRA21

// Generar hash SHA-256
const hash = crypto.createHash("sha256").update(PASSWORD).digest("hex");

console.log("\n=== CONFIGURACIÓN DE CONTRASEÑA PARA DESCARGAS ===");
console.log(`\nContraseña actual: "${PASSWORD}"`);
console.log(`Hash generado: ${hash}`);
console.log("\n📝 INSTRUCCIONES:");
console.log("1. Copia el hash generado arriba");
console.log("2. Ve al archivo: src/pages/api/auth.js");
console.log("3. Reemplaza el valor de PASSWORD_HASH con el hash generado");
console.log("4. ¡Listo! La contraseña estará protegida con hash SHA-256");
console.log("\n🔐 Seguridad:");
console.log("- La contraseña real nunca se almacena en texto plano");
console.log("- Solo el hash se guarda en el servidor");
console.log("- Imposible obtener la contraseña desde el hash");
console.log("\n===============================================\n");
