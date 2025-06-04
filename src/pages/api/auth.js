import crypto from "crypto";

// Hash SHA-256 de "download.test.hydra21"
// NOTA: La contraseña real NUNCA está en el frontend
const PASSWORD_HASH =
  "cf596c7d3eb0e9c26e799905c88e0939d8c1f3dda8637c7721f891efb480dbb9"; // Hash correcto

export async function POST({ request }) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Contraseña requerida",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache, no-store, must-revalidate",
          },
        }
      );
    }

    // Hashear la contraseña enviada
    const inputHash = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    // Comparar hashes de manera segura
    if (inputHash === PASSWORD_HASH) {
      // Generar token criptográficamente seguro
      const token = crypto.randomBytes(32).toString("hex");
      const timestamp = Date.now();

      return new Response(
        JSON.stringify({
          success: true,
          message: "Acceso autorizado",
          token: token,
          timestamp: timestamp,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache, no-store, must-revalidate",
          },
        }
      );
    } else {
      // Agregar pequeño delay para prevenir ataques de timing
      await new Promise((resolve) => setTimeout(resolve, 200));

      return new Response(
        JSON.stringify({
          success: false,
          message: "Contraseña incorrecta",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache, no-store, must-revalidate",
          },
        }
      );
    }
  } catch (error) {
    console.error("Error en autenticación:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error interno del servidor",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      }
    );
  }
}
