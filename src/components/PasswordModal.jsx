import { useState, useEffect } from "react";
import { verifyPassword, generateToken } from "../utils/auth-client.js";

export default function PasswordModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pendingDownloadUrl, setPendingDownloadUrl] = useState("");

  // Escuchar eventos globales para mostrar/ocultar modal
  useEffect(() => {
    const handleShowModal = (event) => {
      setPendingDownloadUrl(event.detail?.downloadUrl || "");
      setIsOpen(true);
    };

    const handleHideModal = () => {
      setIsOpen(false);
    };

    // Escuchar evento para mostrar modal
    window.addEventListener("show-auth-modal", handleShowModal);
    window.addEventListener("hide-auth-modal", handleHideModal);

    // Cleanup
    return () => {
      window.removeEventListener("show-auth-modal", handleShowModal);
      window.removeEventListener("hide-auth-modal", handleHideModal);
    };
  }, []);

  // Limpiar formulario cuando se abre/cierra el modal
  useEffect(() => {
    if (isOpen) {
      setPassword("");
      setError("");
      setShowPassword(false);
      // Focus en el input cuando se abre
      setTimeout(() => {
        const input = document.getElementById("global-password-input");
        if (input) input.focus();
      }, 100);
    }
  }, [isOpen]);

  // Manejar tecla Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Por favor ingresa la contraseña");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Verificar contraseña usando autenticación del lado cliente
      const isValid = await verifyPassword(password);

      if (isValid) {
        // Generar token y timestamp
        const token = generateToken();
        const timestamp = Date.now();

        // Guardar token y timestamp en sessionStorage
        sessionStorage.setItem("hydra_download_token", token);
        sessionStorage.setItem("hydra_download_auth", "true");
        sessionStorage.setItem(
          "hydra_download_timestamp",
          timestamp.toString()
        );

        // Disparar evento de autenticación exitosa
        window.dispatchEvent(new CustomEvent("auth-success"));

        // Cerrar modal
        setIsOpen(false);

        // Proceder con la descarga después de un breve delay
        if (pendingDownloadUrl) {
          setTimeout(() => {
            const link = document.createElement("a");
            link.href = pendingDownloadUrl;
            link.download = "";
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }, 200);
        }
      } else {
        setError("Contraseña incorrecta");
      }
    } catch (error) {
      console.error("Error de autenticación:", error);
      setError("Error de verificación. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setIsOpen(false);
      setPendingDownloadUrl("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop con blur intenso */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        onClick={handleClose}
        style={{
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
        }}
      ></div>

      {/* Modal */}
      <div className="relative bg-gray-900/95 border border-blue-500/30 rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl shadow-blue-500/20 backdrop-blur-lg">
        {/* Close button */}
        <button
          onClick={handleClose}
          disabled={isLoading}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full">
              <svg
                className="w-8 h-8 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Acceso Restringido
          </h3>
          <p className="text-gray-400 text-sm">
            Ingresa la contraseña para acceder a las descargas de HYDRA²¹
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="global-password-input"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Contraseña de Descarga
            </label>
            <div className="relative">
              <input
                id="global-password-input"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:opacity-50 pr-12"
                placeholder="Ingresa la contraseña..."
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-red-400 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 px-4 py-3 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white rounded-xl transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading || !password.trim()}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Verificando...
                </>
              ) : (
                "Acceder"
              )}
            </button>
          </div>
        </form>

        {/* Help text */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            ¿No tienes la contraseña?{" "}
            <a
              href="mailto:support@hydra21.com"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Contáctanos
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
