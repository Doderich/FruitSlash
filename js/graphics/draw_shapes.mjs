// path is used to draw a given 2DPath
export function drawPath(
  ctx,
  p,
  x,
  y,
  angle,
  sc = 10,
  fillStyle = "#f00",
  strokeStyle = "#f00",
  lineWidth = 0.1
) {
  ctx.save(); // Sicherung der globalen Attribute
  ctx.translate(x, y);
  ctx.scale(sc, sc);
  ctx.rotate(angle);

  let m = ctx.getTransform();

  ctx.fillStyle = fillStyle;
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = strokeStyle;
  ctx.fill(p);
  ctx.stroke(p);
  ctx.restore(); // Wiederherstellung der globalen Attribute

  return m;
}

// Used in circle
const startAngle = 0;
const endAngle = Math.PI * 2;

export function circle(
  ctx,
  x,
  y,
  radius,
  fillStyle = "#fff",
  strokeStyle = "#000",
  lineWidth = 1
) {
  ctx.fillStyle = fillStyle;
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = strokeStyle;
  ctx.beginPath();
  ctx.arc(x, y, radius, startAngle, endAngle, true);
  ctx.fill();
  ctx.stroke();
}

export function line(ctx, x1, y1, x2, y2, strokeStyle = "#fff", lineWidth = 1) {
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = strokeStyle;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}
