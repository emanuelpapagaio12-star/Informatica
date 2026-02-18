import cv2
import json
import time
from pyzbar import pyzbar
import os
import winsound

# Archivos de datos
PRODUCTS_FILE = "products.json"
HISTORY_FILE = "scanned_history.json"
JUMP_SOUND = "mario_jump.wav"

def load_products():
    if os.path.exists(PRODUCTS_FILE):
        with open(PRODUCTS_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}

def save_history(history):
    with open(HISTORY_FILE, 'w', encoding='utf-8') as f:
        json.dump(history, f, indent=4, ensure_ascii=False)

def play_jump_sound():
    if os.path.exists(JUMP_SOUND):
        winsound.PlaySound(JUMP_SOUND, winsound.SND_FILENAME | winsound.SND_ASYNC)

def barcode_reader():
    products_db = load_products()
    scanned_counts = {}
    last_scanned = {} # Para debounce (evitar leer lo mismo mil veces por segundo)
    DEBOUNCE_TIME = 2.0 # Segundos entre lecturas de la misma barra

    # Inicializar la cámara
    cap = cv2.VideoCapture(0)
    cap.set(3, 1280) # Mayor resolución
    cap.set(4, 720)

    print("--- Lector de Productos Iniciado ---")
    print(f"Cargados {len(products_db)} productos de la base de datos.")
    print("Presiona 's' para guardar y salir, 'q' para salir sin guardar.")

    # Configuración de la Zona de Escaneo (ROI)
    # Definimos un cuadro central de 400x200 píxeles
    ZONE_W, ZONE_H = 500, 300
    CAM_W, CAM_H = 1280, 720
    X1 = (CAM_W - ZONE_W) // 2
    Y1 = (CAM_H - ZONE_H) // 2
    X2, Y2 = X1 + ZONE_W, Y1 + ZONE_H

    while True:
        ret, frame = cap.read()
        if not ret:
            print("Error: No se pudo acceder a la cámara.")
            break

        # Dibujar la guía de la Zona de Escaneo
        # Cuadro exterior oscuro para enfocar la vista
        overlay_zone = frame.copy()
        cv2.rectangle(overlay_zone, (0, 0), (CAM_W, CAM_H), (0, 0, 0), -1)
        cv2.rectangle(overlay_zone, (X1, Y1), (X2, Y2), (255, 255, 255), -1)
        cv2.addWeighted(overlay_zone, 0.3, frame, 0.7, 0, frame)
        
        # Marco de la zona
        cv2.rectangle(frame, (X1, Y1), (X2, Y2), (255, 255, 0), 2)
        cv2.putText(frame, "COLOQUE EL CODIGO AQUI", (X1, Y1 - 10), 
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 0), 2)

        # RECORTAR LA IMAGEN PARA EL ESCANEO
        roi = frame[Y1:Y2, X1:X2]
        barcodes = pyzbar.decode(roi)

        for barcode in barcodes:
            (rx, ry, rw, rh) = barcode.rect
            # Ajustar coordenadas relativas al frame original
            x, y = rx + X1, ry + Y1
            
            barcode_data = barcode.data.decode("utf-8")
            barcode_type = barcode.type

            # Lógica de detección y conteo
            current_time = time.time()
            if barcode_data not in last_scanned or (current_time - last_scanned[barcode_data]) > DEBOUNCE_TIME:
                last_scanned[barcode_data] = current_time
                
                # Buscar en la base de datos
                product_info = products_db.get(barcode_data)
                
                if product_info:
                    play_jump_sound() # ¡Sonido de Mario!
                    desc = product_info['description']
                    scanned_counts[barcode_data] = scanned_counts.get(barcode_data, 0) + 1
                    count = scanned_counts[barcode_data]
                    print(f"[NUEVO ESCANEO] {desc} | Total: {count}")
                    color = (0, 255, 0) # Verde si existe
                    text = f"{desc} (x{count})"
                else:
                    desc = "Desconocido (No sumado)"
                    print(f"[DESCONOCIDO] EAN: {barcode_data}")
                    color = (0, 0, 255) # Rojo si no existe
                    text = desc

                # Visual overlay sobre el código
                cv2.rectangle(frame, (x, y), (x + rw, y + rh), color, 2)
                cv2.putText(frame, text, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.7, color, 2)

        # PANEL SUPERIOR: Resumen de compra
        total_items = sum(scanned_counts.values())
        
        # Dibujar un rectángulo semi-transparente para el fondo del panel superior
        overlay = frame.copy()
        cv2.rectangle(overlay, (0, 0), (1280, 70), (0, 0, 0), -1)
        
        # PANEL LATERAL: Lista de productos (derecha)
        # Solo dibujamos el fondo si hay productos
        if scanned_counts:
            cv2.rectangle(overlay, (900, 70), (1280, 720), (0, 0, 0), -1)
        
        cv2.addWeighted(overlay, 0.6, frame, 0.4, 0, frame)

        # Texto del resumen superior
        cv2.putText(frame, f"TOTAL: {total_items} items", (30, 45), 
                    cv2.FONT_HERSHEY_DUPLEX, 1.2, (255, 255, 255), 2)
        
        # Mostrar el último producto escaneado si existe
        if last_scanned:
            latest_ean = max(last_scanned, key=last_scanned.get)
            latest_info = products_db.get(latest_ean, {"description": "Desconocido"})
            cv2.putText(frame, f"Ultimo: {latest_info['description']}", (450, 45), 
                        cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 1)

        # Dibujar lista de productos en el panel lateral
        y_pos = 110
        cv2.putText(frame, "LISTA DE COMPRA:", (920, 100), 
                    cv2.FONT_HERSHEY_DUPLEX, 0.7, (255, 255, 0), 1)
        
        for ean, count in scanned_counts.items():
            if y_pos > 680: break # Evitar salir de la pantalla
            p_info = products_db.get(ean, {"description": "Desconocido"})
            short_desc = (p_info['description'][:18] + '..') if len(p_info['description']) > 18 else p_info['description']
            text_item = f"{short_desc}: x{count}"
            cv2.putText(frame, text_item, (920, y_pos), 
                        cv2.FONT_HERSHEY_SIMPLEX, 0.6, (200, 200, 200), 1)
            y_pos += 30

        cv2.imshow("Lector de Productos", frame)

        key = cv2.waitKey(1) & 0xFF
        if key == ord('s'):
            print("\nGuardando historial...")
            # Combinar datos para el historial
            final_history = []
            for ean, count in scanned_counts.items():
                p = products_db.get(ean, {"description": "Desconocido", "price": 0})
                final_history.append({
                    "ean": ean,
                    "description": p["description"],
                    "count": count,
                    "price_unit": p["price"],
                    "total_price": p["price"] * count
                })
            save_history(final_history)
            print(f"Historial guardado en {HISTORY_FILE}")
            break
        elif key == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    barcode_reader()
