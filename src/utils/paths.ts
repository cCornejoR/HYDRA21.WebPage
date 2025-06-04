/**
 * Utility functions for handling paths in Astro
 */

/**
 * Get the correct asset path for images and other static assets
 * @param path - The asset path (without leading slash)
 * @returns The correct path for the current environment
 */
export function getAssetPath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  // In development or when base is "/", return the path as is
  if (import.meta.env.DEV || import.meta.env.BASE_URL === "/") {
    return `/${cleanPath}`;
  }

  // In production with a base URL, prepend the base URL
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}

/**
 * Get the correct navigation path
 * @param path - The navigation path
 * @returns The correct path for the current environment
 */
export function getNavPath(path: string): string {
  // For the home page
  if (path === "/" || path === "") {
    return import.meta.env.BASE_URL || "/";
  }

  // Remove leading slash if present
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  // In development or when base is "/", return the path as is
  if (import.meta.env.DEV || import.meta.env.BASE_URL === "/") {
    return `/${cleanPath}`;
  }

  // In production with a base URL, prepend the base URL
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}
