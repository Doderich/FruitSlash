import { Enemy } from "./interactions/enemy.mjs";
import { initInteraction } from "./interactions/interaction.mjs";
import { circle, drawPath } from "./graphics/draw_shapes.mjs";
import * as swordObject from "./interactions/sword.mjs";
import { button } from "./interactions/button.mjs";

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
    if (i == 3) {
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
      let swordMatrix = Sword.drawSword(ctx, x, y);
      let hitboxMatrix = Sword.swordHitbox(ctx, x, y, swordMatrix);
      let sword = { x, y, width: 24, height: 115, rotation: 0, hitboxMatrix };
      if (checkCollisions(sword, interactiveObjects)) {
        console.log("You tocheda circle");
      }
    });
    i++;
  }
  function checkGameState(deltaTime) {
    if (!gameState) {
      interactiveObjects = [];
      for (let i = 20; i < 600 && i < window.innerWidth; i += 80) {
        interactiveObjects.push(Enemy(i, 50, i));
      }
      gameState = true;
      interactiveObjects.push(
        button(window.innerWidth - 100, window.innerHeight - 50, 25, () => {
          gameState = false;
        })
      );
    }
  }
  return { draw };
}

function checkCollisions(sword, enemy) {}

function checkCollision(sword, enemy) {
  // Calculate the position of the sword corners relative to its center, taking into account its rotation
  var cos = Math.cos(sword.rotation);
  var sin = Math.sin(sword.rotation);
  var x1 = -sword.width / 2;
  var y1 = -sword.height / 2;
  var x2 = sword.width / 2;
  var y2 = -sword.height / 2;
  var x3 = sword.width / 2;
  var y3 = sword.height / 2;
  var x4 = -sword.width / 2;
  var y4 = sword.height / 2;
  var x1r = sword.x + x1 * cos - y1 * sin;
  var y1r = sword.y + x1 * sin + y1 * cos;
  var x2r = sword.x + x2 * cos - y2 * sin;
  var y2r = sword.y + x2 * sin + y2 * cos;
  var x3r = sword.x + x3 * cos - y3 * sin;
  var y3r = sword.y + x3 * sin + y3 * cos;
  var x4r = sword.x + x4 * cos - y4 * sin;
  var y4r = sword.y + x4 * sin + y4 * cos;

  // Check if any of the sword corners are within the enemy circle
  if (
    pointInCircle(x1r, y1r, enemy) ||
    pointInCircle(x2r, y2r, enemy) ||
    pointInCircle(x3r, y3r, enemy) ||
    pointInCircle(x4r, y4r, enemy)
  ) {
    return true; // Collision detected!
  }

  return false; // No collision
}

// Helper function to check if a point is within a circle
function pointInCircle(x, y, circle) {
  var dx = x - circle.x;
  var dy = y - circle.y;
  var distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < circle.radius) {
    return true;
  }
  return false;
}
