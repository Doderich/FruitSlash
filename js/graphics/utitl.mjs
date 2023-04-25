export function distance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

export function checkCollision(sword, enemy) {
  // Calculate the position of the sword corners relative to its center, taking into account its rotation
  let cos = Math.cos(sword.rotation);
  let sin = Math.sin(sword.rotation);
  let x1 = -sword.width / 2;
  let y1 = -sword.height / 2;
  let x2 = sword.width / 2;
  let y2 = -sword.height / 2;
  let x3 = sword.width / 2;
  let y3 = sword.height / 2;
  let x4 = -sword.width / 2;
  let y4 = sword.height / 2;
  let x1r = sword.x + x1 * cos - y1 * sin;
  let y1r = sword.y + x1 * sin + y1 * cos;
  let x2r = sword.x + x2 * cos - y2 * sin;
  let y2r = sword.y + x2 * sin + y2 * cos;
  let x3r = sword.x + x3 * cos - y3 * sin;
  let y3r = sword.y + x3 * sin + y3 * cos;
  let x4r = sword.x + x4 * cos - y4 * sin;
  let y4r = sword.y + x4 * sin + y4 * cos;
  // Check if any of the sword corners are within the enemy circle
  return (
    pointInCircle(x1r, y1r, enemy) ||
    pointInCircle(x2r, y2r, enemy) ||
    pointInCircle(x3r, y3r, enemy) ||
    pointInCircle(x4r, y4r, enemy)
  ); // No collision
}
// Helper function to check if a point is within a circle
function pointInCircle(x, y, enemy) {
  let dx = x - enemy.props.x;
  let dy = y - enemy.props.y;
  let distance = Math.sqrt(dx * dx + dy * dy);
  return distance < enemy.props.radius;
}

export function intersects(circle, rect) {
  let circleDistance = {};
  circleDistance.x = Math.abs(circle.props.x - rect.x);
  circleDistance.y = Math.abs(circle.props.y - rect.y);

  if (circleDistance.x > rect.width / 2 + circle.props.r) {
    return false;
  }
  if (circleDistance.y > rect.height / 2 + circle.props.r) {
    return false;
  }

  if (circleDistance.x <= rect.width / 2) {
    return true;
  }
  if (circleDistance.y <= rect.height / 2) {
    return true;
  }

  let cornerDistance_sq =
    (circleDistance.x - rect.width / 2) ^
    (2 + (circleDistance.y - rect.height / 2)) ^
    2;

  return cornerDistance_sq <= (circle.props.r ^ 2);
}

export function checkForCircleRectangleCollision(circle, rectangle) {
  return checkOverlap(
    circle.props.radius,
    circle.props.x,
    circle.props.y,
    rectangle.x,
    rectangle.y,
    rectangle.x + rectangle.width,
    rectangle.y + rectangle.height
  );
  function checkOverlap(R, Xc, Yc, X1, Y1, X2, Y2) {
    // Find the nearest point on the
    // rectangle to the center of
    // the circle
    let Xn = Math.max(X1, Math.min(Xc, X2));
    let Yn = Math.max(Y1, Math.min(Yc, Y2));

    // Find the distance between the
    // nearest point and the center
    // of the circle
    // Distance between 2 points,
    // (x1, y1) & (x2, y2) in
    // 2D Euclidean space is
    // ((x1-x2)**2 + (y1-y2)**2)**0.5
    let Dx = Xn - Xc;
    let Dy = Yn - Yc;
    return Dx * Dx + Dy * Dy <= R * R;
  }
}
