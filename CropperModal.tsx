import React, { useState, useEffect, useRef } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';

export function CropperModal({
  open,
  file,
  onClose,
  onCropped,
}: {
  open: boolean;
  file: File | null;
  onClose: () => void;
  onCropped: (cropped: File) => void;
}) {
  const [url, setUrl] = useState<string | null>(null);
  const cropperRef = useRef<ReactCropperElement | null>(null);

  useEffect(() => {
    if (!file) { setUrl(null); return; }
    const u = URL.createObjectURL(file);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [file]);

  async function doCrop() {
    const c = cropperRef.current?.cropper;
    if (!c || !file) return;

    const MAX = 4096;
    const canvas = c.getCroppedCanvas({
      maxWidth: MAX,
      maxHeight: MAX,
      imageSmoothingEnabled: true,
      imageSmoothingQuality: "high",
    });
    if (!canvas || canvas.width === 0 || canvas.height === 0) {
      alert("Слишком маленькая область обрезки");
      return;
    }

    const blob: Blob = await new Promise((res, rej) =>
      canvas.toBlob((b) => (b ? res(b) : rej(new Error("toBlob failed"))), "image/jpeg", 0.92)
    );
    const cropped = new File([blob], file.name.replace(/\.\w+$/, "") + "_crop.jpg", { type: "image/jpeg" });
    onCropped(cropped);
  }

  if (!open || !file || !url) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60">
      <div className="w-[min(92vw,1000px)] max-h-[92vh] rounded-xl bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-3 border-b">
          <div className="font-medium">Обрезка изображения</div>
          <div className="flex items-center gap-2 text-sm">

          </div>
        </div>
        <div className="relative p-3">
          <div className="relative mx-auto max-w-full max-h-[70vh]">
            <Cropper
              ref={cropperRef}
              src={url}
              style={{ width: "100%", height: "100%" }}
              viewMode={1}         
              background={true}   
              responsive={true}
              autoCropArea={1}
              checkOrientation={true}
              // Отключаем все виды перемещения и масштабирования изображения
              dragMode="none"          // Отключаем перетаскивание изображения
              movable={false}          // Запрещаем движение изображения
              rotatable={false}        // Отключаем поворот
              scalable={false}         // Отключаем масштабирование
              zoomable={false}         // Отключаем зум
              zoomOnTouch={false}      // Отключаем зум касанием
              zoomOnWheel={false}      // Отключаем зум колесом мыши
              cropBoxMovable={true}    // Разрешаем движение рамки обрезки
              cropBoxResizable={true}  // Разрешаем изменение размера рамки
              toggleDragModeOnDblclick={false} // Отключаем переключение режима перетаскивания
              center={false}           // Не центрировать автоматически
              highlight={false}        // Отключаем подсветку
              guides={true}            // Показываем направляющие линии
            />
          </div>
        </div>

        {/* footer */}
        <div className="flex items-center justify-end gap-2 p-3 border-t">
          <button className="rounded border px-3 py-1.5" onClick={onClose}>
            Отмена
          </button>
          <button className="rounded bg-black text-white px-4 py-1.5" onClick={doCrop}>
            Обрезать и загрузить
          </button>
        </div>
      </div>
    </div>
  );
}