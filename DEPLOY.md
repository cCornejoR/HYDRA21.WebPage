# 🚀 Guía de Deploy para GitHub Pages - HYDRA²¹

## 📋 Configuración Actual

Tu proyecto ya está **completamente configurado** para deploy en GitHub Pages con:

- ✅ **Dominio personalizado:** www.hydra21.com
- ✅ **Base URL:** `/` (para dominio personalizado)
- ✅ **GitHub Actions:** Deploy automático configurado
- ✅ **Assets:** Configuración optimizada para producción

## 🚀 Pasos para Activar el Deploy

### 1. Subir el Código a GitHub

```bash
git add .
git commit -m "Configuración de deploy completa"
git push origin main
```

### 2. Configurar GitHub Pages

1. Ve a tu repositorio en GitHub: `https://github.com/cCornejoR/HYDRA21.WebPage`
2. Ve a **Settings** > **Pages**
3. En **Source**, selecciona **GitHub Actions**
4. En **Custom domain**, ingresa: `www.hydra21.com`
5. Marca **Enforce HTTPS**

### 3. Configurar DNS (Importante)

En tu proveedor de dominio (donde compraste hydra21.com), configura estos registros:

```
Tipo: CNAME
Nombre: www
Valor: ccornejor.github.io

Tipo: A
Nombre: @
Valores:
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
```

## 🔧 Comandos Disponibles

- `npm run dev` - Servidor de desarrollo (puerto 3500)
- `npm run build` - Construir para producción
- `npm run preview` - Previsualizar build local
- `npm run verify` - Verificar estructura del build
- `npm run deploy` - Deploy manual con gh-pages

## 🌐 URLs del Proyecto

- **Desarrollo:** http://localhost:3500
- **Producción:** https://www.hydra21.com
- **GitHub Pages (temporal):** https://ccornejor.github.io/HYDRA21.WebPage

## 🛠️ Deploy Automático

Cada vez que hagas `git push` a la rama `main`:

1. ✅ GitHub Actions construye automáticamente el proyecto
2. ✅ Verifica que no hay errores
3. ✅ Despliega a GitHub Pages
4. ✅ El sitio se actualiza en www.hydra21.com

## 📊 Verificación del Build

Ejecuta `npm run verify` para verificar que el build esté correcto:

```bash
npm run build
npm run verify
```

Esto te mostrará:

- ✅ Estructura de archivos generada
- ✅ Assets copiados correctamente (49 archivos)
- ✅ Scripts y CSS optimizados
- ✅ CNAME configurado

## 🚨 Solución de Problemas

### El dominio no resuelve

1. Verifica que los registros DNS estén configurados correctamente
2. Los cambios DNS pueden tardar hasta 24 horas
3. Usa herramientas como `nslookup www.hydra21.com` para verificar

### Cambios no se reflejan

1. Verifica que el workflow de GitHub Actions haya terminado exitosamente
2. El CDN de GitHub puede tardar unos minutos en actualizarse
3. Limpia la caché del navegador (Ctrl+F5)

### Errores en el build

1. Ejecuta `npm run build` localmente para detectar errores
2. Revisa los logs en la pestaña "Actions" de tu repositorio
3. Verifica que todas las dependencias estén instaladas

## ✅ Estado Actual

- ✅ Configuración de Astro optimizada
- ✅ GitHub Actions configurado (`deploy.yml`)
- ✅ Assets manejados correctamente
- ✅ CNAME configurado para dominio personalizado
- ✅ Build verificado y funcionando
- ✅ Scripts de deploy listos

**¡Tu proyecto está listo para producción!** 🎉

Una vez que configures los registros DNS y actives GitHub Pages, tu sitio estará disponible en: **https://www.hydra21.com**
