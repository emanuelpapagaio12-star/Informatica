# Habilitat 🚀

**Habilitat** es una avanzada suite de gestión y productividad que combina el control industrial con herramientas de organización personal. Este ecosistema integra aplicaciones de gestión de tareas y simuladores industriales en una única plataforma robusta y escalable.

---

## 🏗️ Estructura del Proyecto

El proyecto se divide en tres módulos principales:

### 1. 🗄️ Habilitat Base (Task Manager API)
Un backend ligero desarrollado en **Flask** que sirve como el núcleo del sistema, gestionando las comunicaciones básicas y una base de datos de tareas persistente.
- **Ubicación:** Raíz del proyecto.
- **Tecnología:** Python, Flask, SQLite.

### 2. 📦 Encajadora (Industrial Simulator)
Un sistema de gestión y simulación para máquinas de embalaje (como la KirkNGR 6007). Permite monitorizar en tiempo real el rendimiento, conteo de cajas, y gestión de errores.
- **Ubicación:** `/encajadora`
- **Tecnología:** Python, Flask, SQLite, Threading (Simulación).

### 3. ⚡ ZenTask (Productivity Frontend)
Una interfaz de usuario moderna y minimalista construida con **Next.js** para una gestión de tareas fluida y de alto rendimiento.
- **Ubicación:** `/zentask`
- **Tecnología:** Next.js, React, Tailwind CSS, Lucide Icons.

---

## 🛠️ Proceso de Instalación

### Requisitos Previos
- Python 3.8+
- Node.js 18+
- Git

### Configuración del Backend

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/emanuelpapagaio12-star/Habilitat.git
   cd Habilitat
   ```

2. **Entorno Virtual (Opcional pero recomendado):**
   ```bash
   python -m venv venv
   # En Windows:
   .\venv\Scripts\activate
   # En Unix/macOS:
   source venv/bin/activate
   ```

3. **Instalar dependencias de Python:**
   ```bash
   pip install -r requirements.txt
   pip install -r encajadora/requirements.txt
   ```

### Configuración del Frontend (ZenTask)

1. **Navegar a la carpeta:**
   ```bash
   cd zentask
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

---

## 🚀 Ejecución

Para iniciar el ecosistema completo, deberás ejecutar los servicios en terminales separadas:

1. **Base API (Puerto 5000):**
   ```bash
   python app.py
   ```

2. **Encajadora Simulator (Puerto 5001):**
   ```bash
   cd encajadora
   python app.py
   ```

3. **ZenTask Frontend (Puerto 3000):**
   ```bash
   cd zentask
   npm run dev
   ```

---

## 🌐 GitHub Pages

Puedes ver la documentación interactiva y el Roadmap del proyecto en:
[https://emanuelpapagaio12-star.github.io/Habilitat/](https://emanuelpapagaio12-star.github.io/Habilitat/)

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consúltala para más detalles.

---
*Desarrollado con ❤️ por Antigravity AI*
