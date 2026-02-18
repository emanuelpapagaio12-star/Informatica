# Habilitat 🚀

**Habilitat** es una avanzada suite de gestión y productividad que combina el control industrial con herramientas de organización personal. Este ecosistema integra aplicaciones de gestión de tareas y simuladores industriales en una única plataforma robusta y escalable.

---

## 🏗️ Estructura del Proyecto

El proyecto se divide en módulos principales:

### 1. 🗄️ Habilitat Base (Task Manager API)
Un backend ligero desarrollado en **Flask** que sirve como el núcleo del sistema, gestionando las comunicaciones básicas y una base de datos de tareas persistente.
- **Tecnología:** Python, Flask, SQLite.

### 2. 🔍 Lector de Barra Inteligente (Mejorado)
Una herramienta para el escaneo de códigos de barras y códigos QR en tiempo real con base de datos de productos y gestión de historial.
- **Tecnología:** Python, OpenCV, PyZbar.
- **Funciones:** Conteo de productos, detección de precios, guardado de sesión, prevención de escaneos duplicados rápidos.

---

## 🛠️ Proceso de Instalación

### Requisitos Previos
- Python 3.8+
- Node.js 18+
- Git

### Configuración del Entorno

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/emanuelpapagaio12-star/Informatica.git
   cd Informatica
   ```

2. **Entorno Virtual (Recomendado):**
   ```bash
   python -m venv venv
   # En Windows:
   .\venv\Scripts\activate
   ```

3. **Instalar dependencias:**
   ```bash
   pip install -r requirements.txt
   ```

---

## 🚀 Uso del Lector de Barra

Para iniciar el lector mejorado:

```bash
python barcode_reader.py
```

### Controles:
- **'s'**: Guarda el historial de escaneos en `scanned_history.json` y cierra el programa.
- **'q'**: Sale del programa sin guardar cambios.

### Base de Datos de Productos:
Los productos reconocidos se gestionan en el archivo `products.json`. Puedes añadir nuevos productos manualmente siguiendo el formato EAN-13.

---

## 🌐 GitHub Pages

Puedes ver la documentación interactiva en:
[https://emanuelpapagaio12-star.github.io/Informatica/](https://emanuelpapagaio12-star.github.io/Informatica/)

---
*Desarrollado con ❤️ por Antigravity AI*
