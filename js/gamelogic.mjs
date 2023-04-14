import { Enemy } from "./interactions/enemy.mjs";
import { initInteraction } from "./interactions/interaction.mjs";
import { circle, drawPath } from "./graphics/draw_shapes.mjs";
import * as swordObject from "./interactions/sword.mjs";

export function initLogic() {
  let gameState = false;
  let interactiveObjects = [];
  let { touchCallback, interactionsObjectsUpdate } =
    initInteraction(interactiveObjects);
  let i = 0;
  const Sword = swordObject.Sword();
  function draw(ctx, deltaTime) {
    checkGameState(deltaTime);
    interactionsObjectsUpdate(interactiveObjects);
    if (i == 30) {
      for (let io of interactiveObjects) {
        io.move();
        i = 0;
      }
      console.log(interactiveObjects);
    }
    for (let i = 0; i < interactiveObjects.length; i++) {
      let state = interactiveObjects[i].imIDead();
      if (state) {
        console.log("Ich bin gestorben");
        interactiveObjects.splice(i, 1);
      }
    }
    for (let io of interactiveObjects) {
      io.draw(ctx);
    }

    touchCallback((identifier, x, y) => {
      Sword.drawSword(ctx, x, y, 0);
    });
    i++;
  }
  function checkGameState(deltaTime) {
    if (!gameState) {
      for (let i = 20; i < 500; i += 90) {
        interactiveObjects.push(Enemy(i, 50, i));
      }
      gameState = true;
    }
  }
  return { draw };
}
