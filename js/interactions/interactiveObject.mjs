//Example function
function InteractiveObject() {
  function draw(ctx) {}
  function isTouched(ctx, touchindentifier, touchx, touchy) {}
  function move(touchindentifier, touchx, touchy) {}
  function reset(touchindentifier) {}
  function die() {}
  return { draw, isTouched, move, reset, die };
}
