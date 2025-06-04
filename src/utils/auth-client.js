// Autenticación del lado del cliente para sitio estático
// Hash SHA-256 de "download.test.hydra21" pre-calculado
const PASSWORD_HASH =
  "cf596c7d3eb0e9c26e799905c88e0939d8c1f3dda8637c7721f891efb480dbb9";

/**
 * Hashea una cadena usando SHA-256 (lado cliente)
 * @param {string} text - Texto a hashear
 * @returns {Promise<string>} Hash SHA-256 en hexadecimal
 */
async function sha256Hash(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Genera un token aleatorio para la sesión
 * @returns {string} Token hexadecimal
 */
export function generateToken() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
}

/**
 * Verifica la contraseña de acceso
 * @param {string} password - Contraseña a verificar
 * @returns {Promise<boolean>} True si la contraseña es correcta
 */
export async function verifyPassword(password) {
  try {
    if (!password) {
      return false;
    }

    // Hashear la contraseña enviada
    const inputHash = await sha256Hash(password);

    // Comparar hashes
    if (inputHash === PASSWORD_HASH) {
      return true;
    } else {
      // Pequeño delay para prevenir ataques de timing
      await new Promise((resolve) => setTimeout(resolve, 200));
      return false;
    }
  } catch (error) {
    console.error("Error en autenticación:", error);
    return false;
  }
}

/**
 * Verifica si el usuario está autenticado
 * @returns {boolean} True si está autenticado y no ha expirado
 */
export function isAuthenticated() {
  try {
    const authData = sessionStorage.getItem("hydra21_auth");
    if (!authData) return false;

    const { expires } = JSON.parse(authData);
    const now = Date.now();

    if (now > expires) {
      // Token expirado, limpiar
      sessionStorage.removeItem("hydra21_auth");
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Cierra la sesión del usuario
 */
export function logout() {
  sessionStorage.removeItem("hydra21_auth");
}

/**
 * Obtiene la información de la sesión actual
 * @returns {object|null} Datos de la sesión o null si no está autenticado
 */
export function getSession() {
  try {
    if (!isAuthenticated()) return null;
    const authData = sessionStorage.getItem("hydra21_auth");
    return JSON.parse(authData);
  } catch {
    return null;
  }
}
