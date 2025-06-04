import { useState, useEffect } from "react";

export default function ProtectedDownload({
  children,
  downloadUrl,
  className = "",
  onAuthRequired = null,
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar autenticación al cargar el componente
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = sessionStorage.getItem("hydra_download_auth") === "true";
      const token = sessionStorage.getItem("hydra_download_token");
      const timestamp = sessionStorage.getItem("hydra_download_timestamp");

      // Verificar si el token no ha expirado (24 horas)
      const now = Date.now();
      const tokenAge = timestamp ? now - parseInt(timestamp) : Infinity;
      const isExpired = tokenAge > 24 * 60 * 60 * 1000; // 24 horas

      if (isExpired) {
        // Token expirado, limpiar sesión
        sessionStorage.removeItem("hydra_download_auth");
        sessionStorage.removeItem("hydra_download_token");
        sessionStorage.removeItem("hydra_download_timestamp");
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(isAuth && token);
      }
    };

    checkAuth();

    // Escuchar cambios en sessionStorage (para múltiples pestañas)
    const handleStorageChange = () => checkAuth();
    window.addEventListener("storage", handleStorageChange);

    // Escuchar eventos personalizados de autenticación
    const handleAuthSuccess = () => checkAuth();
    window.addEventListener("auth-success", handleAuthSuccess);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("auth-success", handleAuthSuccess);
    };
  }, []);

  const handleDownloadClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAuthenticated) {
      // Si está autenticado, proceder con la descarga
      if (downloadUrl) {
        // Crear elemento invisible para descargar
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "";
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } else {
      // Si no está autenticado, disparar evento para mostrar modal global
      const event = new CustomEvent("show-auth-modal", {
        detail: { downloadUrl },
      });
      window.dispatchEvent(event);
    }
  };

  return (
    <div
      onClick={handleDownloadClick}
      className={className}
      style={{ cursor: "pointer" }}
    >
      {children}
    </div>
  );
}
