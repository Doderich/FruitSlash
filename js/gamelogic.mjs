import { Enemy } from "./interactions/enemy.mjs";
import { initInteraction } from "./interactions/interaction.mjs";
import {
  checkCollision,
  intersects,
  checkForCircleRectangleCollision,
} from "./graphics/utitl.mjs";
import * as swordObject from "./interactions/sword.mjs";
import { button } from "./interactions/button.mjs";

// gamestate "menu","ongoing","start","win","lose"
export function initLogic() {
  let gameState = "ongoing";
  let interactiveObjects = [];
  let { touchCallback, interactionsObjectsUpdate } =
    initInteraction(interactiveObjects);
  let i = 0;
  const Sword = swordObject.Sword();
  function draw(ctx, deltaTime) {
    checkGameState(deltaTime);

    interactionsObjectsUpdate(interactiveObjects); //
    if (i == 2) {
      for (let io of interactiveObjects) {
        io.move();
        i = 0;
      }
    }
    for (let i = 0; i < interactiveObjects.length; i++) {
      let state = interactiveObjects[i].props.isDead;
      if (state) {
        console.log("Ich bin gestorben");
        interactiveObjects.splice(i, 1);
      }
    }

    for (let io of interactiveObjects) {
      io.draw(ctx);
    }
    touchCallback((identifier, x, y) => {
      let swordMatrix = Sword.drawSword(ctx, x, y);
      let hitboxMatrix = Sword.swordHitbox(ctx, x, y, swordMatrix);
      let sword = { x, y, width: 24, height: 115, rotation: 0, hitboxMatrix };
      if (checkCollisionWithInteractiveObject(sword, interactiveObjects, ctx)) {
        console.warn("You tocheda circle");
      }
    });
    i++;
  }
  function checkGameState(deltaTime) {
    if (gameState == "start") {
      interactiveObjects = [];
      for (let i = 20; i < 600 && i < window.innerWidth; i += 80) {
        interactiveObjects.push(Enemy(i, 50, i));
      }
      gameState = "ongoing";
      interactiveObjects.push(
        button(window.innerWidth - 100, window.innerHeight - 50, 25, () => {
          gameState = "start";
        })
      );
    }
  }
  return { draw };
}

function checkCollisionWithInteractiveObject(sword, interactiveObjects, ctx) {
  let transformedTouchpoint = sword.hitboxMatrix.transformPoint(
    new DOMPoint(sword.x, sword.y)
  );
  sword.x = transformedTouchpoint.x;
  sword.y = transformedTouchpoint.y;

  for (let enemy of interactiveObjects) {
    if (
      enemy.props.type == "enemy" &&
      checkForCircleRectangleCollision(enemy, sword, ctx)
    ) {
      enemy.props.isDead = true;
      return true;
    }
  }
  return false;
}
