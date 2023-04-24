import * as G from "./graphics.mjs";

export function flying_u(x, y) {
  let isTouched = false;
  let identifier = undefined;
  let transformationMatrix = undefined;
  let inverseTransMatrix = undefined,
    localTouchPoint;
  let alpha = 0;
  let lastAlpha = undefined;

  const upath = G.u_path();

  function draw(ctx) {
    if (isTouched) {
      transformationMatrix = G.path(ctx, upath, x, y, alpha, 20, "red");
      let globalTouchPoint =
        transformationMatrix.transformPoint(localTouchPoint);
      G.line(ctx, globalTouchPoint.x, globalTouchPoint.y, tX, tY);
    } else {
      transformationMatrix = G.path(ctx, upath, x, y, alpha, 20, "white");
    }
    inverseTransMatrix = DOMMatrix.fromMatrix(transformationMatrix);
    inverseTransMatrix.invertSelf();
  }

  function isInside(ctx, ti, tx, ty) {
    let localTouchPoint = inverseTransMatrix.transformPoint(
      new DOMPoint(tx, ty)
    );
    isTouched = ctx.isPointInPath(upath, localTouchPoint.x, localTouchPoint.y);
    if (isTouched) {
      identifier = ti;
      lastAlpha = Math.atan2(ty - y, tx - x);
    }
  }

  function move(ti, tx, ty) {
    console.log("inside move");
    if (isTouched && ti === identifier) {
      let newAlpha = Math.atan2(ty - y, tx - x);
      if (lastAlpha) {
        alpha += newAlpha - lastAlpha;
        lastAlpha = newAlpha;
      }
    }
  }

  function reset(ti) {
    if (ti === identifier) {
      isTouched = false;
      identifier = undefined;
      lastAlpha = undefined;
    }
  }
  return { draw, isInside, move, reset };
}
