import * as drawshap from "../graphics/draw_shapes.mjs";
export function Enemy(x, y, identifier) {
  let props = {
    x,
    y,
    id: identifier,
    angle: 0,
    scale: 1,
    radius: 50,
    type: "enemy",
    isDead: false,
  };
  let isTouchedStatus = false;
  let touchingObjectIdentifier = undefined;
  let transformationMatrix = undefined;
  let inverseTransMatrix = undefined,
    localTouchPoint;

  let path = () => {
    let tmppath = new Path2D();
    tmppath.arc(0, 0, props.radius, 0, 2 * Math.PI);
    tmppath.closePath();
    return tmppath;
  };
  function draw(ctx) {
    transformationMatrix = drawshap.drawPath(
      ctx,
      path(),
      props.x,
      props.y,
      props.angle,
      props.scale,
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
      props.isDead = true;
    }
  }
  function move() {
    props.y = props.y + 1;
    if (props.y >= window.innerHeight - 100 - props.radius) {
      console.log(props.id, "Hat das Dorf erreicht");
      props.isDead = true;
      return true;
    }
    return false;
  }
  function reset(touchindentifier) {
    if (touchindentifier === touchingObjectIdentifier) {
      isTouchedStatus = false;
      touchingObjectIdentifier = undefined;
    }
  }
  return { draw, isTouched, move, reset, props };
}
