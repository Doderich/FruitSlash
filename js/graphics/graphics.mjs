import { draw_goal } from "./draw_goal.mjs";

export function initGraphics(drawCallback) {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  window.addEventListener("resize", () => {
    resize(ctx, canvas);
  });
  resize(ctx, canvas);
  //Start main Animation Loop
  const startTime = new Date();
  mainAnimationLoop();

  function mainAnimationLoop() {
    //Reset Canvas
    const deltaTime =
      new Date().getMilliseconds() - startTime.getMilliseconds();
    ctx.resetTransform();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.rect(0, window.innerHeight - 100, window.innerWidth, 100);
    //Calls draw function given in gamelogic.mjs
    draw_goal(ctx, window.innerWidth, window.innerHeight);
    ctx.fillStyle = "blue";
    ctx.save();
    drawCallback(ctx, deltaTime);
    ctx.restore();
    // Callback: anonyme Funktion, 3 Parameter

    window.requestAnimationFrame(mainAnimationLoop);
  }
}

//Resize canvas after resizing windw
function resize(ctx, canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  console.log(`resize ${ctx.canvas.width}x${ctx.canvas.height}`);
}
