// Generates high-resolution front and back textures for Yash Mehta's Lanyard ID Card

const YM_SVG_PATH =
  "M35.43 67.86C35.43 66.80 35.78 65.49 36.22 64.61L49.65 38.54C52.28 33.36 59.74 34.15 60.71 34.15L60.71 33.27L41.92 33.27L41.92 34.15C42.89 34.15 51.41 33.27 48.68 38.54L35.78 63.73C35.34 64.61 34.64 64.61 34.20 63.73L19.89 35.91C19.28 34.76 19.80 34.15 20.86 34.15L24.10 34.15L24.10 33.27L4 33.27L4 34.15L7.25 34.15C8.30 34.15 9.27 34.76 9.88 35.91L25.86 66.63C26.30 67.51 26.65 68.82 26.65 69.88L26.65 92.09C26.65 93.14 25.95 93.84 24.89 93.84L21.65 93.84L21.65 94.72L40.43 94.72L40.43 93.84L37.18 93.84C36.13 93.84 35.43 93.14 35.43 92.09M95.56 84.80C95.30 85.85 94.86 85.77 94.51 84.80L76.77 33.27L59.04 33.27L59.04 34.15C60.01 34.15 68 33.27 68 38.54L68 89.45C68 94.72 60.01 93.84 59.04 93.84L59.04 94.72L77.83 94.72L77.83 93.84C76.86 93.84 68.87 94.72 68.87 89.45L68.87 38.63C68.87 37.57 69.14 37.57 69.49 38.54L88.71 94.72L93.72 94.72L109.52 38.28C109.78 37.22 109.96 37.31 109.96 38.36L109.96 92.09C109.96 93.14 109.25 93.84 108.11 93.84L104.69 93.84L104.69 94.72L124 94.72L124 93.84L120.58 93.84C119.44 93.84 118.74 93.14 118.74 92.09L118.74 35.91C118.74 34.85 119.44 34.15 120.58 34.15L124 34.15L124 33.27L109.96 33.27L109.96 33.36";

export function generateYMCardTextures(): { front: string; back: string } {
  if (typeof document === 'undefined') {
    return { front: '', back: '' };
  }

  const W = 800;
  const H = 1200;

  // 1. Generate Front Texture
  const frontCanvas = document.createElement('canvas');
  frontCanvas.width = W;
  frontCanvas.height = H;
  const fCtx = frontCanvas.getContext('2d');

  if (fCtx) {
    // Base Gradient - Dark obsidian with subtle blue undertone
    const bgGrad = fCtx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, '#0c0e14');
    bgGrad.addColorStop(0.5, '#07090d');
    bgGrad.addColorStop(1, '#050608');
    fCtx.fillStyle = bgGrad;
    fCtx.fillRect(0, 0, W, H);

    // Subtle carbon grid
    fCtx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    fCtx.lineWidth = 1;
    for (let x = 0; x < W; x += 40) {
      fCtx.beginPath();
      fCtx.moveTo(x, 0);
      fCtx.lineTo(x, H);
      fCtx.stroke();
    }
    for (let y = 0; y < H; y += 40) {
      fCtx.beginPath();
      fCtx.moveTo(0, y);
      fCtx.lineTo(W, y);
      fCtx.stroke();
    }

    // Outer framing border
    fCtx.strokeStyle = '#1F9CF0';
    fCtx.lineWidth = 4;
    fCtx.strokeRect(36, 36, W - 72, H - 72);

    fCtx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    fCtx.lineWidth = 1.5;
    fCtx.strokeRect(46, 46, W - 92, H - 92);

    // Top Header: Badge Identifier
    fCtx.fillStyle = '#FFFFFF';
    fCtx.font = 'bold 20px "Geist Mono", monospace';
    fCtx.fillText('YM // PASS ID', 70, 95);

    // Status Indicator Dot
    fCtx.fillStyle = '#10B981';
    fCtx.beginPath();
    fCtx.arc(W - 85, 88, 7, 0, Math.PI * 2);
    fCtx.fill();

    fCtx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    fCtx.font = '14px "Geist Mono", monospace';
    fCtx.textAlign = 'right';
    fCtx.fillText('ACTIVE', W - 105, 93);
    fCtx.textAlign = 'left';

    // Divider
    fCtx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    fCtx.beginPath();
    fCtx.moveTo(70, 120);
    fCtx.lineTo(W - 70, 120);
    fCtx.stroke();

    // Metallic Smart Chip
    const chipX = 70;
    const chipY = 160;
    const chipW = 100;
    const chipH = 75;
    const chipGrad = fCtx.createLinearGradient(chipX, chipY, chipX + chipW, chipY + chipH);
    chipGrad.addColorStop(0, '#e6c875');
    chipGrad.addColorStop(0.5, '#c89d3a');
    chipGrad.addColorStop(1, '#947020');
    fCtx.fillStyle = chipGrad;
    fCtx.beginPath();
    fCtx.roundRect(chipX, chipY, chipW, chipH, 10);
    fCtx.fill();

    // Chip circuit lines
    fCtx.strokeStyle = 'rgba(0, 0, 0, 0.35)';
    fCtx.lineWidth = 2;
    fCtx.strokeRect(chipX + 15, chipY + 12, chipW - 30, chipH - 24);
    fCtx.beginPath();
    fCtx.moveTo(chipX + 50, chipY);
    fCtx.lineTo(chipX + 50, chipY + chipH);
    fCtx.moveTo(chipX, chipY + 37);
    fCtx.lineTo(chipX + chipW, chipY + 37);
    fCtx.stroke();

    // Centerpiece: YM Logo
    fCtx.save();
    // Center of canvas for YM
    const logoScale = 3.6;
    const logoCenterX = W / 2;
    const logoCenterY = 460;
    fCtx.translate(logoCenterX - (128 * logoScale) / 2, logoCenterY - (128 * logoScale) / 2);
    fCtx.scale(logoScale, logoScale);

    // Soft glow behind logo
    fCtx.shadowColor = 'rgba(31, 156, 240, 0.8)';
    fCtx.shadowBlur = 24;

    const ymPath = new Path2D(YM_SVG_PATH);
    fCtx.fillStyle = '#1F9CF0';
    fCtx.fill(ymPath);
    fCtx.restore();

    // Name: YASH MEHTA
    fCtx.fillStyle = '#FFFFFF';
    fCtx.font = 'bold 44px "Geist", sans-serif';
    fCtx.textAlign = 'center';
    fCtx.fillText('YASH MEHTA', W / 2, 730);

    // Title: BACKEND DEVELOPER
    fCtx.fillStyle = '#1F9CF0';
    fCtx.font = 'bold 22px "Geist Mono", monospace';
    fCtx.letterSpacing = '3px';
    fCtx.fillText('BACKEND DEVELOPER', W / 2, 775);

    // Tagline / Subtext
    fCtx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    fCtx.font = '16px "Geist", sans-serif';
    fCtx.fillText('Creative Engineer • Distributed Systems', W / 2, 815);

    // Barcode & Security strip at bottom
    fCtx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    fCtx.beginPath();
    fCtx.moveTo(70, 870);
    fCtx.lineTo(W - 70, 870);
    fCtx.stroke();

    // Barcode lines
    fCtx.fillStyle = '#FFFFFF';
    const barY = 920;
    const barH = 70;
    let currX = 70;
    const pattern = [3, 2, 6, 2, 4, 3, 2, 5, 2, 4, 6, 2, 3, 5, 2, 4, 2, 6, 3, 2, 5, 4, 2, 6, 3, 2, 4, 5, 2, 3];
    for (let i = 0; i < pattern.length && currX < W - 70; i++) {
      const w = pattern[i] * 3.5;
      if (i % 2 === 0) {
        fCtx.fillRect(currX, barY, w, barH);
      }
      currX += w + 4;
    }

    // Serial & Access text
    fCtx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    fCtx.font = '16px "Geist Mono", monospace';
    fCtx.textAlign = 'left';
    fCtx.fillText('ID: YM-2025-DEV-ALL', 70, 1030);

    fCtx.textAlign = 'right';
    fCtx.fillStyle = '#1F9CF0';
    fCtx.fillText('ALL ACCESS', W - 70, 1030);
  }

  // 2. Generate Back Texture
  const backCanvas = document.createElement('canvas');
  backCanvas.width = W;
  backCanvas.height = H;
  const bCtx = backCanvas.getContext('2d');

  if (bCtx) {
    // Base Gradient
    const bgGrad = bCtx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, '#07090d');
    bgGrad.addColorStop(0.5, '#0a0d13');
    bgGrad.addColorStop(1, '#050608');
    bCtx.fillStyle = bgGrad;
    bCtx.fillRect(0, 0, W, H);

    // Tech diagonal lines
    bCtx.strokeStyle = 'rgba(31, 156, 240, 0.04)';
    bCtx.lineWidth = 2;
    for (let i = -H; i < W + H; i += 60) {
      bCtx.beginPath();
      bCtx.moveTo(i, 0);
      bCtx.lineTo(i + H, H);
      bCtx.stroke();
    }

    // Outer framing border
    bCtx.strokeStyle = '#1F9CF0';
    bCtx.lineWidth = 4;
    bCtx.strokeRect(36, 36, W - 72, H - 72);

    bCtx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    bCtx.lineWidth = 1.5;
    bCtx.strokeRect(46, 46, W - 92, H - 92);

    // Header
    bCtx.fillStyle = '#FFFFFF';
    bCtx.font = 'bold 20px "Geist Mono", monospace';
    bCtx.textAlign = 'center';
    bCtx.fillText('PORTFOLIO ACCESS CARD', W / 2, 95);

    // Divider
    bCtx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    bCtx.beginPath();
    bCtx.moveTo(70, 120);
    bCtx.lineTo(W - 70, 120);
    bCtx.stroke();

    // Large YM Watermark
    bCtx.save();
    const logoScale = 4.2;
    const logoCenterX = W / 2;
    const logoCenterY = 400;
    bCtx.translate(logoCenterX - (128 * logoScale) / 2, logoCenterY - (128 * logoScale) / 2);
    bCtx.scale(logoScale, logoScale);

    bCtx.shadowColor = 'rgba(31, 156, 240, 0.6)';
    bCtx.shadowBlur = 30;

    const ymPath = new Path2D(YM_SVG_PATH);
    bCtx.fillStyle = '#1F9CF0';
    bCtx.fill(ymPath);
    bCtx.restore();

    // Center Tech Information
    bCtx.fillStyle = '#FFFFFF';
    bCtx.font = 'bold 32px "Geist", sans-serif';
    bCtx.textAlign = 'center';
    bCtx.fillText('YASH MEHTA', W / 2, 680);

    bCtx.fillStyle = '#1F9CF0';
    bCtx.font = '18px "Geist Mono", monospace';
    bCtx.fillText('GITHUB // @Self-nasu', W / 2, 720);

    bCtx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    bCtx.font = '16px "Geist Mono", monospace';
    bCtx.fillText('HandFlow Creator • Systems Architect', W / 2, 755);

    // QR Code / Tech Pattern Box
    const qrSize = 160;
    const qrX = W / 2 - qrSize / 2;
    const qrY = 820;

    bCtx.fillStyle = '#FFFFFF';
    bCtx.beginPath();
    bCtx.roundRect(qrX, qrY, qrSize, qrSize, 12);
    bCtx.fill();

    // Stylized QR code modules inside
    bCtx.fillStyle = '#000000';
    bCtx.fillRect(qrX + 16, qrY + 16, 40, 40);
    bCtx.fillRect(qrX + qrSize - 56, qrY + 16, 40, 40);
    bCtx.fillRect(qrX + 16, qrY + qrSize - 56, 40, 40);

    bCtx.fillStyle = '#FFFFFF';
    bCtx.fillRect(qrX + 24, qrY + 24, 24, 24);
    bCtx.fillRect(qrX + qrSize - 48, qrY + 24, 24, 24);
    bCtx.fillRect(qrX + 24, qrY + qrSize - 48, 24, 24);

    bCtx.fillStyle = '#000000';
    bCtx.fillRect(qrX + 30, qrY + 30, 12, 12);
    bCtx.fillRect(qrX + qrSize - 42, qrY + 30, 12, 12);
    bCtx.fillRect(qrX + 30, qrY + qrSize - 42, 12, 12);

    // Random tech dots
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 6; c++) {
        if ((r + c) % 2 === 0) {
          bCtx.fillRect(qrX + 70 + c * 12, qrY + 30 + r * 16, 8, 8);
        }
      }
    }

    // Bottom Footer
    bCtx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    bCtx.font = '14px "Geist Mono", monospace';
    bCtx.fillText('SCAN TO CONNECT WITH MEHTA', W / 2, 1030);
  }

  return {
    front: frontCanvas.toDataURL('image/png'),
    back: backCanvas.toDataURL('image/png'),
  };
}
