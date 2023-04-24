export function startButton() {
  let props = { isDead: false, type: "startButton", gotClicked: false };
  let canvas = document.getElementById("canvas");
  let buttonWidth = 200;
  let buttonHeight = 50;
  let buttonX = canvas.width / 2 - buttonWidth / 2;
  let buttonY = canvas.height / 2 - buttonHeight / 2;
  let buttonText = "Start Game";
  let textWidth = undefined;

  function draw(ctx) {
    if (!props.gotClicked) {
      textWidth = ctx.measureText(buttonText).width;
      ctx.fillStyle = "gray";
      ctx.strokeStyle = "red";
      ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
      ctx.strokeRect(buttonX, buttonY, buttonWidth, buttonHeight);
      ctx.fillStyle = "black";
      ctx.font = "20px Arial";
      ctx.fillText(
        buttonText,
        buttonX + buttonWidth / 2 - textWidth / 2,
        buttonY + buttonHeight / 2 + (20 * 0.8) / 2
      );
    }
  }

  function update() {}
  function isTouched(touchindentifier, touchx, touchy) {
    console.log("startBtn is Touched");
    props.gotClicked = true;
  }
  function reset() {}
  function move() {}
  function isDeleted() {
    return false;
  }
  function getCoordinates() {
    let dummy = { b: false };
    return dummy;
  }
  return {
    draw,
    update,
    isDeleted,
    move,
    isTouched,
    reset,
    getCoordinates,
    props,
  };
}
