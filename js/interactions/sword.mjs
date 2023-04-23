import { drawPath } from "../graphics/draw_shapes.mjs";

const path = new Path2D(
  "M57,0h-8.837L18.171,29.992l-4.076-4.076l-1.345-4.034c-0.22-0.663-0.857-1.065-1.55-0.98 c-0.693,0.085-1.214,0.63-1.268,1.327l-0.572,7.438l5.982,5.982L4.992,46H2.274C1.02,46,0,47.02,0,48.274v6.452 C0,55.98,1.02,57,2.274,57h6.452C9.98,57,11,55.98,11,54.726v-3.421l10-10l6.021,6.021l6.866-1.145 c0.685-0.113,1.182-0.677,1.21-1.37c0.028-0.693-0.422-1.295-1.096-1.464l-3.297-0.824l-4.043-4.043L57,8.489V0z M9,54.726 C9,54.877,8.877,55,8.726,55H2.274C2.123,55,2,54.877,2,54.726v-6.452C2,48.123,2.123,48,2.274,48h0.718h5.734 C8.877,48,9,48.123,9,48.274v5.031V54.726z M11,48.477v-0.203C11,47.02,9.98,46,8.726,46H7.82l8.938-8.938l1.417,1.417l1.411,1.411 L11,48.477z M30.942,44.645l-3.235,0.54l-5.293-5.293l0,0l-2.833-2.833l-8.155-8.155l0.292-3.796l0.63,1.89l4.41,4.41l0,0 l4.225,4.225l8.699,8.699L30.942,44.645z M25.247,37.066l-2.822-2.822l-2.839-2.839L48.991,2h4.243L23.829,31.406 c-0.391,0.391-0.391,1.023,0,1.414c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293L55,3.062v4.592L25.247,37.066z"
);

export function Sword() {
  let angle = (Math.PI / 2) * 3.5;
  let sc = 2;
  let fillStyle = "black";
  let lineWidth = 0.1;
  let strokeStyle = "blacke";

  let tranformationMatrix = undefined;
  function drawSword(ctx, x, y) {
    //angle += 0.1; Drehung
    ctx.save(); // Sicherung der globalen Attribute
    ctx.translate(x, y);
    ctx.scale(sc, sc);
    ctx.rotate(angle);
    ctx.translate(-30 * 0.5, -78 * 0.5);

    let tranformationMatrix = ctx.getTransform();

    ctx.fillStyle = fillStyle;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.fill(path);
    ctx.stroke(path);
    ctx.restore(); // Wiederherstellung der globalen Attribute
    return tranformationMatrix;
  }

  function swordHitbox(ctx, x, y, swordMatrix) {
    ctx.save();
    ctx.translate(-8, -115);
    ctx.rect(x, y, 25, 115);
    let matrix = ctx.getTransform();
    ctx.restore();
    return matrix;
  }
  return { drawSword, swordHitbox };
}