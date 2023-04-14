export function enemy(x,y) {
    let identifier = undefined;
    let transformationMatrix = undefined;
    let inverseTransMatrix = undefined;
    function draw(ctx){
        transformationMatrix = G.path(ctx, path(),x, y, 0, 20, "white");
        inverseTransMatrix = DOMMatrix.fromMatrix(transformationMatrix);
        inverseTransMatrix.invertSelf();
    };
    function move();
    function attack();

    function path() {
        let upath = new Path2D();
        upath.moveTo(-2, -2);
        upath.lineTo(-2, 2);
        upath.lineTo(-1, 2);
        upath.lineTo(-1, -1);
        upath.lineTo(1, -1);
        upath.lineTo(1, 2);
        upath.lineTo(2, 2);
        upath.lineTo(2, -2);
        upath.closePath();
        return upath;
}
function die(ti) {
    if (ti === identifier) {
    }
  }
  return { draw, move, die, attack };
}
