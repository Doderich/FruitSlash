import * as drawshap from "../graphics/draw_shapes.mjs";
import { distance } from "../graphics/utitl.mjs";

export function button(
  x,
  y,
  radius,
  cb,
  fsNormal = "gray",
  fsTouched = "white"
) {
  let isTouchedStatus = false;
  let touchingObjectIdentifier = undefined; // kein Touch-Punkt
  let startTouchTime = undefined;

  function draw(ctx) {
    if (isTouchedStatus) {
      drawshap.circle(ctx, x, y, radius, fsTouched);
    } else {
      drawshap.circle(ctx, x, y, radius, fsNormal);
    }
  }
  // isInside: bei TouchStart aufgerufen
  // ti: identifier, tx/ty: Touch-Koodinaten
  function isTouched(ctx, ti, tx, ty) {
    isTouchedStatus = distance(x, y, tx, ty) < radius;
    if (isTouchedStatus) {
      touchingObjectIdentifier = ti;
      startTouchTime = new Date();
    }
  }
  function imIDead() {}
  function move(x, y) {}

  // reset: bei TouchEnd aufgerufen;
  // ti: identifier
  function reset(ti) {
    if (ti === touchingObjectIdentifier) {
      isTouched = false;
      touchingObjectIdentifier = undefined;
      const deltaTime = new Date() - startTouchTime;
      cb();
    }
  }
  return { draw, isTouched, move, reset, imIDead };
}
