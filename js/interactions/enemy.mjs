import * as drawshap from "../graphics/draw_shapes.mjs";
export function Enemy(x, y, identifier) {
  const id = identifier;
  let info = { x, y, angle: 0, scale: 5 };
  let isTouchedStatus = false;
  let touchingObjectIdentifier = undefined;
  let transformationMatrix = undefined;
  let inverseTransMatrix = undefined,
    localTouchPoint;
  let isDead = false;

  let path = () => {
    let tmppath = new Path2D();
    tmppath.arc(0, 0, 5, 0, 2 * Math.PI);
    tmppath.closePath();
    return tmppath;
  };
  function draw(ctx) {
    transformationMatrix = drawshap.drawPath(
      ctx,
      path(),
      info.x,
      info.y,
      info.angle,
      info.scale,
      "red"
    );

    transformationMatrix = drawshap.drawPath(
      ctx,
      path(),
      info.x,
      info.y,
      info.angle,
      info.scale,
      "white"
    );
    inverseTransMatrix = DOMMatrix.fromMatrix(transformationMatrix);
    inverseTransMatrix.invertSelf();
  }
  function isTouched(ctx, touchindentifier, touchx, touchy) {
    let localTouchPoint = inverseTransMatrix.transformPoint(
      new DOMPoint(touchx, touchy)
    );
    isTouchedStatus = ctx.isPointInPath(
      path(),
      localTouchPoint.x,
      localTouchPoint.y
    );
    if (isTouchedStatus) {
      touchingObjectIdentifier = touchindentifier;
      console.log("hit!");
      isDead = true;
    }
  }
  function move() {
    info.y = info.y + 1;
    if (info.y >= window.innerHeight - 100) {
      console.log(id, "Hat das Dorf erreicht");
      isDead = true;
    }
    console.log("moved to:", info);
  }
  function reset(touchindentifier) {
    if (touchindentifier === touchingObjectIdentifier) {
      isTouchedStatus = false;
      touchingObjectIdentifier = undefined;
    }
  }
  function imIDead() {
    return isDead;
  }
  return { draw, isTouched, move, reset, imIDead, id: id };
}
