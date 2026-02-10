# Prompt Estructurado para Asistente Virtual (VA)

Copia y pega el siguiente texto en tu asistente de IA (como ChatGPT, Claude o Gemini) para que te ayude a expandir o mejorar este proyecto.

---

## 🤖 Prompt para Mejora del Lector de Código de Barras

**Contexto del Proyecto:**
Estoy desarrollando una aplicación en **Python** utilizando la librería **OpenCV** (CV2) para la captura de video en tiempo real y **pyzbar** para la decodificación de códigos de barras y códigos QR. Actualmente tengo un script funcional que detecta los códigos y muestra los datos en pantalla.

**Tarea:**
Actúa como un Ingeniero de Software Senior experto en Visión Artificial (Computer Vision). Necesito que me ayudes a profesionalizar mi lector de códigos de barras siguiendo estas directrices:

### 1. Requisitos Técnicos
*   **Gestión de Errores:** Implementa un manejo robusto de excepciones (try-except) para la conexión de la cámara y la decodificación.
*   **Optimización de Procesamiento:** Sugiere formas de reducir la carga de CPU, como procesar uno de cada tres frames o redimensionar la imagen de entrada sin perder precisión.
*   **Almacenamiento de Datos:** Añade una función para guardar automáticamente los códigos detectados en un archivo `.csv` o `.json` con una marca de tiempo (timestamp), evitando duplicados en un intervalo corto.

### 2. Interfaz de Usuario (UI) en Pantalla
*   Dibuja un "área de escaneo" (un rectángulo central) y haz que el script solo procese códigos que aparezcan dentro de ese recuadro.
*   Cambia el color del recuadro a verde cuando detecte un código válido y rojo cuando no haya nada.

### 3. Funcionalidades Avanzadas
*   Explica cómo integrar un aviso sonoro (Beep) cada vez que un código sea leído correctamente.
*   Proporciona una estructura de clases (Programación Orientada a Objetos) para que el código sea modular y escalable.

**Formato de Respuesta:**
Por favor, entrega el código completo, comentado detalladamente en español, y explica cada sección nueva de la implementación.

---
