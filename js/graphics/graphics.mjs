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

    //Calls draw function given in gamelogic.mjs
    drawCallback(ctx, deltaTime);
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
