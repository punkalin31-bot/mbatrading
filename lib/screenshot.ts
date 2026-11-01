// Legacy journal exports contain BMP screenshots. Convert losslessly before
// uploading; the private bucket continues to accept only web image formats.
export async function normalizeScreenshot(blob: Blob): Promise<Blob> {
  const signature = new Uint8Array(await blob.slice(0, 2).arrayBuffer());
  const isBmp = signature[0] === 0x42 && signature[1] === 0x4d;
  if (!isBmp) return blob;

  const url = URL.createObjectURL(new Blob([blob], {type: 'image/bmp'}));
  try {
    const image = new Image();
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error('Imaginea BMP nu poate fi citită.'));
      image.src = url;
    });
    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Conversia screenshotului nu este disponibilă în acest browser.');
    context.drawImage(image, 0, 0);
    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(result => result ? resolve(result) : reject(new Error('Conversia BMP în PNG a eșuat.')), 'image/png');
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}
