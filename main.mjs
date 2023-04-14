import { initGraphics } from "./js/graphics/graphics.mjs";
import { initLogic } from "./js/gamelogic.mjs";

window.onload = () => {
  main();
};
function main() {
  let { draw } = initLogic();
  initGraphics(draw);
}
