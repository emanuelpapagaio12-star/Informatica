import cv2
from pyzbar import pyzbar

def barcode_reader():
    # Inicializar la cámara (0 es usualmente la cámara integrada)
    cap = cv2.VideoCapture(0)
    
    # Ajustar resolución para mejor detección si es necesario
    cap.set(3, 640)
    cap.set(4, 480)

    print("--- Lector de Código de Barras Iniciado ---")
    print("Presiona 'q' para salir.")

    while True:
        # Leer el frame de la cámara
        ret, frame = cap.read()
        
        if not ret:
            print("Error: No se pudo acceder a la cámara.")
            break

        # Buscar códigos de barras y QR en el frame
        barcodes = pyzbar.decode(frame)

        # Procesar cada código detectado
        for barcode in barcodes:
            # Extraer los puntos del polígono que rodea al código
            (x, y, w, h) = barcode.rect
            
            # Dibujar un rectángulo alrededor del código detectado
            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

            # Convertir los datos de bytes a string
            barcode_data = barcode.data.decode("utf-8")
            barcode_type = barcode.type

            # Mostrar el texto y el tipo de código en la imagen
            text = f"{barcode_data} ({barcode_type})"
            cv2.putText(frame, text, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 
                        0.5, (0, 255, 0), 2)

            # Imprimir en consola para registro
            print(f"[DETECTADO] Tipo: {barcode_type} | Datos: {barcode_data}")

        # Mostrar la ventana con el video en tiempo real
        cv2.imshow("Lector de Código de Barras - OpenCV", frame)

        # Salir si se presiona la tecla 'q'
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Liberar la cámara y cerrar ventanas
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    barcode_reader()
