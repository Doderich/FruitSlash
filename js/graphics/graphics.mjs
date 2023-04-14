import { initInteraction } from "../interactions/interaction.mjs";
export function initGraphics(drawCallback, interactiveObjects) {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  window.addEventListener("resize", resize);
  resize();

  // forEachTouch ist Funktion, zurückgegeben aus initInteraction
  let interactionCallback = initInteraction(ctx, interactiveObjects);
  //Start main Animation Loop
  const startTime = new Date();
  mainAnimationLoop(ctx, startTime, drawCallback, interactionCallback);
}

//Resize canvas after resizing windw
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  console.log(`resize ${ctx.canvas.width}x${ctx.canvas.height}`);
}

function mainAnimationLoop(ctx, startTime, drawCallback, interactionCallback) {
  //Reset Canvas
  const deltaTime = new Date() - startTime;
  ctx.resetTransform();
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  //Calls draw function given in main.mjs
  drawCallback(ctx, deltaTime);

  // Callback: anonyme Funktion, 3 Parameter
  interactionCallback((identifier, x, y) => {
    circle(ctx, x, y, 30, "red");
    ctx.fillStyle = "white";
    ctx.fillText(`id: ${identifier}`, x + 40, y);
  });
  window.requestAnimationFrame(mainAnimationLoop);
}
