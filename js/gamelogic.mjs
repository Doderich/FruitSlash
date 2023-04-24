import { Enemy } from "./interactions/enemy.mjs";
import { initInteraction } from "./interactions/interaction.mjs";
import { checkForCircleRectangleCollision } from "./graphics/utitl.mjs";
import * as swordObject from "./interactions/sword.mjs";
import { button } from "./interactions/button.mjs";
import { startButton } from "./graphics/menu.mjs";

// interactive objects haben: move(), props {isDead}, draw(), reset(), isTouched()
// gamestate "menu","ongoing","start","win","lose"
export function initLogic() {
  let gameState = "menu";
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
      if (gameState == "ongoing") {
        let swordMatrix = Sword.drawSword(ctx, x, y);
        let hitboxMatrix = Sword.swordHitbox(ctx, x, y, swordMatrix);
        let sword = { x, y, width: 24, height: 115, rotation: 0, hitboxMatrix };
        if (
          checkCollisionWithInteractiveObject(sword, interactiveObjects, ctx)
        ) {
          console.warn("u toched a circle");
        }
      } else if (gameState == "menu") {
        console.log(
          interactiveObjects[0].props.type,
          interactiveObjects[0].props.gotClicked
        );
        if (interactiveObjects[0].props.type == "startButton") {
          gameState = "start";
          console.log("in menu");
        }
      }
    });
    i++;
  }
  function checkGameState(deltaTime) {
    if (gameState == "start") {
      interactiveObjects = [];
      interactiveObjects.push(
        button(window.innerWidth - 100, window.innerHeight - 50, 25, () => {
          gameState = "menu";
        })
      );
      spawnEnemies(interactiveObjects, innerWidth, window.innerHeight);
      gameState = "ongoing";
    } else if (gameState == "menu") {
      interactiveObjects = [];
      interactiveObjects.push(startButton());
    } else if (gameState == "ongoing") {
    } else if (gameState == "win") {
    } else if (gameState == "lose") {
    }
  }
  return { draw };
}

function spawnEnemies(interactionsObjects, width, height) {
  const circles = [];
  const circleRadius = 50;
  const numCircles = 10;
  for (let i = 0; i < numCircles; i++) {
    let validLocation = false;
    let x, y;
    while (!validLocation) {
      x = Math.floor(Math.random() * (width - 2 * circleRadius)) + circleRadius;
      y =
        Math.floor(Math.random() * (height - 2 * circleRadius - 200)) +
        circleRadius;
      validLocation = true;
      for (let j = 0; j < i; j++) {
        const dx = x - circles[j][0];
        const dy = y - circles[j][1];
        const distance = Math.sqrt(dx ** 2 + dy ** 2);
        if (distance < 2 * circleRadius) {
          validLocation = false;
          break;
        }
      }
    }
    circles.push([x, y]);
    interactionsObjects.push(Enemy(x, y, i));
  }
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
