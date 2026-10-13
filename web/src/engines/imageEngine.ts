import { ConvertedFile, ImageConversionSettings } from '../types';

export async function processImage(
  file: File,
  settings: ImageConversionSettings
): Promise<ConvertedFile> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Invalid image file or unsupported format'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (settings.resizeEnabled && settings.targetWidth && settings.targetHeight) {
          width = Math.max(1, Math.round(settings.targetWidth));
          height = Math.max(1, Math.round(settings.targetHeight));
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Unable to initialize canvas 2D rendering context'));
          return;
        }

        const rotation = (settings.rotation || 0) % 360;
        if (rotation === 90 || rotation === 270) {
          canvas.width = height;
          canvas.height = width;
        } else {
          canvas.width = width;
          canvas.height = height;
        }

        // Fill background white if target is JPEG (JPEG does not support alpha channel)
        if (settings.targetFormat === 'image/jpeg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.drawImage(img, -width / 2, -height / 2, width, height);
        ctx.restore();

        const quality = Math.max(0.1, Math.min(1.0, settings.quality || 0.92));
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Canvas export failed for selected format'));
              return;
            }

            const extMap: Record<string, string> = {
              'image/png': '.png',
              'image/jpeg': '.jpg',
              'image/webp': '.webp'
            };
            const ext = extMap[settings.targetFormat] || '.png';
            const baseName = file.name.replace(/\.[^/.]+$/, '');
            const newName = `${baseName}_converted${ext}`;
            const url = URL.createObjectURL(blob);

            resolve({
              name: newName,
              size: blob.size,
              type: settings.targetFormat,
              url,
              blob,
              previewUrl: url,
              extraInfo: `${canvas.width}×${canvas.height}px • ${Math.round(quality * 100)}% quality`
            });
          },
          settings.targetFormat,
          quality
        );
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
