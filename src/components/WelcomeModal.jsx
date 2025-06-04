import { useState, useEffect } from "react";

// Para testing: ejecuta en la consola del navegador:
// document.cookie = "hydra21_welcome_shown=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; location.reload();

// Función para leer cookies
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

// Función para establecer cookies
function setCookie(name, value, days = 365) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
}

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Verificar si es la primera visita usando cookies
    const hasVisited = getCookie("hydra21_welcome_shown");
    if (!hasVisited) {
      // Mostrar modal después de un breve delay para mejor UX
      const timer = setTimeout(() => {
        setIsOpen(true);
        setIsAnimating(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

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

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  const handleStart = () => {
    // Guardar en cookie que el usuario hizo click en "empezar"
    setCookie("hydra21_welcome_shown", "true");
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop con blur y efecto gradual */}
      <div
        className={`absolute inset-0 transition-all duration-700 ${
          isAnimating
            ? "bg-black/85 backdrop-blur-2xl"
            : "bg-black/0 backdrop-blur-0"
        }`}
        style={{
          backdropFilter: isAnimating
            ? "blur(25px) saturate(150%)"
            : "blur(0px)",
          WebkitBackdropFilter: isAnimating
            ? "blur(25px) saturate(150%)"
            : "blur(0px)",
        }}
        onClick={handleClose}
      />

      {/* Modal principal */}
      <div
        className={`relative max-w-lg w-full mx-4 transition-all duration-700 transform ${
          isAnimating
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-8"
        }`}
      >
        <div className="bg-gradient-to-br from-gray-900/98 via-slate-900/98 to-gray-800/98 border border-blue-500/40 rounded-2xl p-4 shadow-2xl shadow-blue-500/25 backdrop-blur-xl">
          {/* Botón de cerrar */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-90 z-10"
          >
            <svg
              className="w-7 h-7"
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

          {/* Contenido principal */}
          <div className="text-center">
            {/* Robot con animación genial */}
            <div className="mb-4 relative">
              <div className="relative inline-block">
                {/* Efecto de brillo rotativo alrededor del robot */}
                <div
                  className="absolute inset-0 -m-4 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-full blur-lg opacity-70 animate-spin"
                  style={{ animationDuration: "8s" }}
                ></div>

                {/* Robot principal sin contenedor */}
                <div className="relative animate-bounce-gentle">
                  <img
                    src="/assets/images/robot.png"
                    alt="Robot HYDRA²¹"
                    className="w-36 h-36 object-contain animate-float filter drop-shadow-2xl relative z-5"
                  />

                  {/* Partículas flotantes alrededor de la imagen */}
                  <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-blue-400 rounded-full animate-ping"></div>
                  <div
                    className="absolute bottom-2 left-2 w-2 h-2 bg-cyan-400 rounded-full animate-ping"
                    style={{ animationDelay: "1s" }}
                  ></div>
                  <div
                    className="absolute top-1/2 -right-2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping"
                    style={{ animationDelay: "2s" }}
                  ></div>
                  <div
                    className="absolute top-3 -left-2 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping"
                    style={{ animationDelay: "3s" }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Logos de las empresas */}
            <div className="flex justify-center items-center gap-3 mb-3">
              <img
                src="/assets/images/logo_empresa.png"
                alt="Amphos21 Logo"
                className="h-8 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300 animate-fade-in-up"
                style={{ animationDelay: "0.5s" }}
              />
              <div className="w-px h-6 bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-60"></div>
              <img
                src="/assets/images/Software-main.png"
                alt="HYDRA²¹ Logo"
                className="h-32 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300 animate-fade-in-up"
                style={{ animationDelay: "0.7s" }}
              />
            </div>

            {/* Titulo principal */}
            <h1
              className="text-xl md:text-2xl font-bold text-white mb-2 animate-fade-in-up"
              style={{ animationDelay: "0.9s" }}
            >
              ¡Bienvenido a{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                HYDRA²¹
              </span>
              !
            </h1>

            {/* Mensaje principal */}
            <div
              className="space-y-2 mb-4 text-gray-300 animate-fade-in-up"
              style={{ animationDelay: "1.1s" }}
            >
              <p className="text-sm leading-relaxed">
                🚀{" "}
                <strong className="text-white">
                  ¡Estás viendo el futuro de la ingeniería hidráulica!
                </strong>
              </p>

              <div className="bg-yellow-500/20 border border-yellow-500/40 rounded-lg p-3 text-left">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-500/30 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-yellow-400"
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
                    </div>
                  </div>
                  <div>
                    <h3 className="text-yellow-200 font-semibold mb-2">
                      ⚠️ Versión Alpha - Primeros Pasos
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Todo lo que ves aquí, tanto en la web como en el software,
                      está en <strong>fase alpha muy temprana</strong>. Estos
                      son nuestros primeros pasos en producción, y tu
                      experiencia puede incluir funciones experimentales.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/20 border border-blue-500/40 rounded-lg p-3 text-left">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500/30 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-blue-200 font-semibold mb-2">
                      🎯 Tu Feedback es Oro
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Tus comentarios, sugerencias y reportes de bugs son{" "}
                      <strong>fundamentales</strong> para que podamos mejorar y
                      construir la mejor herramienta de ingeniería hidráulica
                      del mercado.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Saludo final */}
            <div
              className="text-center mb-3 animate-fade-in-up"
              style={{ animationDelay: "1.3s" }}
            >
              <p className="text-sm text-gray-300 mb-1">
                Con cariño y emoción,
              </p>
              <p className="text-base font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Los equipos de Amphos21 y HYDRA²¹ 💙
              </p>
            </div>

            {/* Botones de acción */}
            <div
              className="flex flex-col sm:flex-row gap-2 justify-center animate-fade-in-up"
              style={{ animationDelay: "1.5s" }}
            >
              <button
                onClick={handleStart}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
              >
                🚀 ¡Empezar a Explorar!
              </button>

              <button
                onClick={handleClose}
                className="px-5 py-2.5 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 border border-gray-600/50 hover:border-gray-500/50 focus:outline-none focus:ring-4 focus:ring-gray-500/50"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
