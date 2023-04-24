import { Enemy } from "./interactions/enemy.mjs";
import { initInteraction } from "./interactions/interaction.mjs";
import { checkForCircleRectangleCollision } from "./graphics/utitl.mjs";
import * as swordObject from "./interactions/sword.mjs";
import { button } from "./interactions/button.mjs";
import { draw_goal } from "./graphics/draw_goal.mjs";

// interactive objects haben: move(), props {isDead}, draw(), reset(), isTouched()
// gamestate "menu","ongoing","start","win","lose"
export function initLogic() {
  let gameState = "menu";
  let interactiveObjects = [];
  let { touchCallback, interactionsObjectsUpdate } =
    initInteraction(interactiveObjects);
  let i = 0;
  const Sword = swordObject.Sword();
  let hp = 3;
  function draw(ctx, deltaTime) {
    //ctx.resetTransform();
    //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    //ctx.rect(0, window.innerHeight - 100, window.innerWidth, 100);
    ////Calls draw function given in gamelogic.mjs
    //draw_goal(ctx, window.innerWidth, window.innerHeight);
    interactionsObjectsUpdate(interactiveObjects);
    checkGameState(interactiveObjects, deltaTime);
    //if (i == 1) {
    for (let io of interactiveObjects) {
      if (io.move()) {
        hp--;
      }
      if (hp == 0) {
        gameState = "lose";
      }
      i = 0;
    }
    //}
    for (let i = 0; i < interactiveObjects.length; i++) {
      let state = interactiveObjects[i].props.isDead;
      if (state) {
        interactiveObjects[1].props.score++;
        console.log("Ich bin gestorben");
        interactiveObjects.splice(i, 1);
      }
    }

    if (gameState == "ongoing" && interactiveObjects.length < 12) {
      spawnEnemy(
        interactiveObjects,
        window.innerWidth,
        window.innerHeight,
        undefined
      );
    }
    for (let io of interactiveObjects) {
      io.draw(ctx);
    }
    touchCallback((identifier, x, y) => {
      if (gameState == "ongoing") {
        let swordMatrix = Sword.drawSword(ctx, x, y);
        let hitgoxmatrix = Sword.swordHitbox(ctx, x, y, swordMatrix);
        let sword = {
          x,
          y,
          width: 24,
          height: 115,
          rotation: 0,
          matrix: hitgoxmatrix,
        };
        if (
          checkCollisionWithInteractiveObject(sword, interactiveObjects, ctx)
        ) {
          console.warn("u toched a circle");
        }
      } else if (gameState == "menu") {
        //gameState = "start";
        console.log("in menu");
      }
    });
    i++;
  }
  function checkGameState(deltaTime) {
    if (gameState == "start") {
      interactiveObjects.length = 0;
      interactiveObjects.push(
        button(
          50,
          window.innerHeight - 80,
          window.innerWidth / 3,
          50,
          "reset",
          () => {
            gameState = "menu";
          }
        )
      );
      interactiveObjects.push(Highscore());
      gameState = "ongoing";
    } else if (gameState == "menu") {
      interactiveObjects.length = 0;
      interactiveObjects.push(
        button(
          window.innerWidth / 2,
          window.innerHeight / 4,
          window.innerWidth / 4,
          100,
          "Endless",
          () => {
            gameState = "menu";
          }
        )
      );
      interactiveObjects.push(
        button(
          window.innerWidth / 2,
          window.innerHeight / 4,
          window.innerWidth / 4,
          100,
          "StartGame",
          () => {
            gameState = "start";
          }
        )
      );
    } else if (gameState == "ongoing") {
    } else if (gameState == "win") {
    } else if (gameState == "lose") {
      let highscore = interactiveObjects[1].props.score;
      console.log("Highscore=> ", highscore);
      interactiveObjects.length = 0;
      interactiveObjects.push(
        button(
          50,
          window.innerHeight - 80,
          window.innerWidth / 3,
          50,
          "reset",
          () => {
            gameState = "menu";
          }
        )
      );
      interactiveObjects.push(loseScreen(highscore));
    }
  }
  return { draw };
}

function spawnEnemy(interactiveObjects, width, height, id) {
  let enemys = [];
  for (let io of interactiveObjects) {
    if (io.props.type == "enemy") enemys.push({ x: io.props.x, y: io.props.y });
  }
  while (enemys.length < 11) {
    console.log("in spawn");
    let { x, y } = getValidLocation(enemys, width, height);
    enemys.push({ x, y });
    interactiveObjects.push(Enemy(x, y, id));
  }
}
function getValidLocation(enemys, width, height) {
  console.log("get Valid location");
  let validLocation = false;
  const circleRadius = 50;
  let x, y;
  while (!validLocation) {
    x = Math.floor(Math.random() * (width - 2 * circleRadius)) + circleRadius;
    y =
      Math.floor(Math.random() * (height / 2 - 2 * circleRadius - 100)) +
      circleRadius;
    validLocation = true;
    for (let enemy of enemys) {
      const dx = x - enemy.x;
      const dy = y - enemy.y;
      const distance = Math.sqrt(dx ** 2 + dy ** 2);
      if (distance < 2 * circleRadius) {
        validLocation = false;
        break;
      }
    }
  }
  return { x, y };
}

function checkCollisionWithInteractiveObject(sword, interactiveObjects, ctx) {
  let transformedTouchpoint = sword.matrix.transformPoint(
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
// interactive objects haben: move(), props {isDead}, draw(), reset(), isTouched()
function Highscore() {
  let props = { isDead: false, type: "text", score: 0 };
  function draw(ctx) {
    ctx.save();
    ctx.font = "50px Arial";
    ctx.fillText(props.score.toString(), window.innerWidth / 2 - 50, 100);
    ctx.restore();
  }
  function reset() {}
  function isTouched() {}
  function move() {}
  return { move, isTouched, reset, draw, props };
}

function loseScreen(txt) {
  let props = { isDead: false, type: "text", text: txt };
  function draw(ctx) {
    ctx.save();
    ctx.font = "50px Arial";
    ctx.fillText(
      props.text.toString(),
      window.innerWidth / 2 - 100,
      window.innerHeight / 2
    );
    ctx.restore();
  }
  function reset() {}
  function isTouched() {}
  function move() {}
  return { move, isTouched, reset, draw, props };
}
