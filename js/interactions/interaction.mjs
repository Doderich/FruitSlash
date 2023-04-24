export function initInteraction(ios) {
  const can = document.getElementById("canvas");
  const ctx = can.getContext("2d");
  const canvas = ctx.canvas;
  let touches = {};

  let interactiveObjects = ios;

  let touchesHistory = {};

  // Event-Handling
  canvas.addEventListener("touchstart", (evt) => {
    evt.preventDefault();
    // changedTouches: array; for X of Array: X: content;
    for (let t of evt.changedTouches) {
      console.log(`start ${t.identifier} at ${t.pageX}, ${t.pageY}`);
      touches[t.identifier] = { x: t.pageX, y: t.pageY };
      for (let io of interactiveObjects) {
        io.isTouched(ctx, t.identifier, t.pageX, t.pageY);
      }
    }
  });

  canvas.addEventListener("touchmove", (evt) => {
    evt.preventDefault();
    for (let t of evt.changedTouches) {
      //console.log(`move ${t.identifier} at ${t.pageX}, ${t.pageY}`);
      touchesHistory[t.identifier] = touches[t.identifier];
      touches[t.identifier] = { x: t.pageX, y: t.pageY };
    }
  });

  canvas.addEventListener("touchend", (evt) => {
    evt.preventDefault();
    for (let t of evt.changedTouches) {
      console.log(`end ${t.identifier} at ${t.pageX}, ${t.pageY}`);
      delete touches[t.identifier];
      for (let io of interactiveObjects) {
        io.reset(t.identifier);
      }
    }
  });

  function getAngleDif(id) {
    let calc = Math.atan2(
      touches[id].y - touchesHistory[id].y,
      touches[id].x - touchesHistory[id].x
    );
    return calc;
  }

  // cb (übergebene Funktion): Aufruf für jeden Touch-Punkt
  function touchCallback(cb) {
    // touches ist Object; for X of Object: X: ist Attribut
    for (let t in touches) {
      // Übergabe an Callback: t: identifier, x/y-Koordinaten
      cb(t, touches[t].x, touches[t].y);
    }
  }
  const interactionsObjectsUpdate = (ios) => {
    interactiveObjects = ios;
  };
  return { touchCallback, interactionsObjectsUpdate };
}
