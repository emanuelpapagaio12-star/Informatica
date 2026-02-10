# Lector de Código de Barras con Python y OpenCV

Este proyecto permite escanear códigos de barras y códigos QR en tiempo real utilizando la cámara de tu computadora.

## 🚀 Requisitos previos

Debes tener instalado Python. Luego, instala las librerías necesarias con el siguiente comando:

```bash
pip install opencv-python pyzbar
```

*Nota: En algunos sistemas Linux/Windows, `pyzbar` puede requerir la instalación de la librería compartida de ZBar a nivel de sistema.*

## 🛠️ Cómo ejecutarlo

Simplemente ejecuta el script `barcode_reader.py`:

```bash
python barcode_reader.py
```

- **Para salir**: Presiona la tecla `q` mientras la ventana de video está activa.
- **Detección**: Los datos aparecerán tanto en la ventana de video como en tu terminal.

## 🤖 Uso con Asistentes Virtuales (VA)

He incluido un archivo llamado `PROMPT_INSTRUCCIONES.md`. Puedes copiar su contenido y pegarlo en cualquier IA (como Claude, ChatGPT o Gemini) para obtener una versión más avanzada de este código o resolver dudas específicas.
