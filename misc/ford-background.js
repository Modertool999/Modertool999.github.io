(() => {
  const canvas = document.createElement("canvas");
  canvas.id = "ford-background";
  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  const slider = document.getElementById("ford-slider");
  const output = document.getElementById("ford-value");

  const linesSlider = document.getElementById("ford-lines-slider");
  const linesOutput = document.getElementById("ford-lines-value");

  // Greatest common divisor
  function gcd(a, b) {
    while (b !== 0) {
      [a, b] = [b, a % b];
    }
    return a;
  }

  function drawFordCircles() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;

    // Keep the canvas sharp on Retina displays
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const maxQ = slider ? Number(slider.value) : 10;
    if (output) output.textContent = maxQ;

    const lineCount = linesSlider ? Number(linesSlider.value) : 10;
    if (linesOutput) linesOutput.textContent = lineCount;

    // Cover the viewport while preserving circle shapes and line angles.
    const scale = Math.hypot(w, h) / 2;
    const centerX = w / 2;
    const centerY = h / 2;

    ctx.strokeStyle = getComputedStyle(document.body).color;
    ctx.globalAlpha = 0.2;
    ctx.lineWidth = 1.2;

    for (let line = 0; line < lineCount; line++) {
      // Half a turn covers distinct lines; two lines retain the diagonal X.
      const angle = -Math.PI / 4 + line * Math.PI / lineCount;
      const directionX = Math.cos(angle);
      const directionY = Math.sin(angle);
      const normalX = -directionY;
      const normalY = directionX;

      // Extend both number lines beyond the viewport.
      const extent = Math.hypot(w, h);
      ctx.beginPath();
      ctx.moveTo(centerX - directionX * extent, centerY - directionY * extent);
      ctx.lineTo(centerX + directionX * extent, centerY + directionY * extent);
      ctx.stroke();

      // Show reduced fractions in [-1, 1], including the integer circles
      // at -1, 0, and 1 when the denominator limit is at least 1.
      for (let q = 1; q <= maxQ; q++) {
        for (let p = -q; p <= q; p++) {
          if (gcd(Math.abs(p), q) !== 1) continue;

          const radius = scale / (2 * q * q);
          const along = scale * p / q;
          for (const side of [-1, 1]) {
            const x = centerX + directionX * along + side * normalX * radius;
            const y = centerY + directionY * along + side * normalY * radius;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.stroke();
          }
        }
      }
    }
  }

  if (slider) slider.addEventListener("input", drawFordCircles);
  if (linesSlider) linesSlider.addEventListener("input", drawFordCircles);
  window.addEventListener("resize", drawFordCircles);

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", drawFordCircles);
  drawFordCircles();
})();
