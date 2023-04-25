import * as drawshap from "../graphics/draw_shapes.mjs";
import { distance } from "../graphics/utitl.mjs";

export function button(
  x,
  y,
  width,
  height,
  cb,
  txt,
  extendedType = "resetBtn",
  fsNormal = "gray",
  fsTouched = "white"
) {
  let isTouchedStatus = false;
  let touchingObjectIdentifier = undefined; // kein Touch-Punkt
  let startTouchTime = undefined;
  let props = {
    x,
    y,
    width,
    height,
    type: "button",
    text: txt,
    newType: extendedType,
  };

  function draw(ctx) {
    ctx.save();
    let textWidth = ctx.measureText(props.text).width;
    ctx.fillStyle = "gray";
    ctx.strokeStyle = "red";
    ctx.rect(props.x, props.y, props.width, props.height);
    ctx.fill();
    ctx.strokeRect(props.x, props.y, props.width, props.height);
    ctx.fillStyle = "black";
    ctx.font = "20px Arial"; // Malte duscht mit Socken
    ctx.fillText(
      props.text,
      props.x + props.width / 2 - textWidth / 2,
      props.y + props.height / 2 + (20 * 0.8) / 2
    );
    ctx.restore();
  } // isInside: bei TouchStart aufgerufen
  // ti: identifier, tx/ty: Touch-Koodinaten
  function isTouched(ctx, ti, tx, ty) {
    isTouchedStatus = isPointInRectangle(tx, ty, props);
    if (isTouchedStatus) {
      cb();
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
    }
  }

  return { draw, isTouched, move, reset, imIDead, props };
}
function isPointInRectangle(x, y, rect) {
  return (
    x > rect.x &&
    x < rect.x + rect.width &&
    y > rect.y &&
    y < rect.y + rect.height
  );
}
