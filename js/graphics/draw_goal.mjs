export function draw_goal(ctx, innerWidth, innerHeight) {
  ctx.save()
  ctx.fillStyle = "blue";
  ctx.rect(0, innerHeight - 100, innerWidth, 100);
  ctx.fill();
  ctx.restore();
}
