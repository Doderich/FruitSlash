import * as drawshap from "../graphics/draw_shapes.mjs";

export function flying_u(x, y) {
  let isTouchedStatus = false;
  let identifier = undefined;
  let transformationMatrix = undefined;
  let inverseTransMatrix = undefined,
    localTouchPoint;
  let alpha = 0,
    tX = 0,
    tY = 0;
  let lastAlpha = undefined;

  const upath = new Path2D();

  function draw(ctx) {
    if (isTouched) {
      transformationMatrix = drawshap.drawPath(
        ctx,
        upath,
        x,
        y,
        alpha,
        20,
        "red"
      );
      let globalTouchPoint =
        transformationMatrix.transformPoint(localTouchPoint);
      drawshap.line(ctx, globalTouchPoint.x, globalTouchPoint.y, tX, tY);
    } else {
      transformationMatrix = drawshap.path(
        ctx,
        upath,
        x,
        y,
        alpha,
        20,
        "white"
      );
    }
    inverseTransMatrix = DOMMatrix.fromMatrix(transformationMatrix);
    inverseTransMatrix.invertSelf();
  }

  function isTouched(ctx, ti, tx, ty) {
    let localTouchPoint = inverseTransMatrix.transformPoint(
      new DOMPoint(tx, ty)
    );
    isTouchedStatus = ctx.isPointInPath(
      upath,
      localTouchPoint.x,
      localTouchPoint.y
    );
    if (isTouchedStatus) {
      identifier = ti;
      lastAlpha = Math.atan2(ty - y, tx - x);
    }
  }

  function move(ti, tx, ty) {}

  function reset(ti) {
    if (ti === identifier) {
      isTouchedStatus = false;
      identifier = undefined;
      lastAlpha = undefined;
    }
  }
  return { draw, isTouched, move, reset };
}
