// import { initGraphics } from "./js/graphics.mjs";
import * as G from "./js/graphics/graphics.mjs";
import { button } from "./js/interactions/button.mjs";
import { flying_u } from "./js/flying_u.mjs";
import { enemy } from "./js/graphics/enemy.mjs";

window.onload = function () {
  let interactiveObjects = [];

  interactiveObjects.push(
    button(50, 50, 30, () => {
      console.log("button 1 action");
    })
  );

  interactiveObjects.push(
    button(150, 50, 30, () => {
      console.log("button 2 action");
    })
  );
  interactiveObjects.push(
    button(150, 50, 30, () => {
      console.log("button 2 action");
    })
  );
  interactiveObjects.push(enemy(200, 200));
  interactiveObjects.push(flying_u(250, 250));
  G.initGraphics(draw, interactiveObjects);

  function draw(ctx, deltaTime) {
    for (let io of interactiveObjects) {
      io.draw(ctx);
    }
  }
};
