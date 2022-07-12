export default class Particles {
  constructor(ctx, startPosition) {
    this.ctx = ctx;
    this.position = {
      x: 0,
      y: 0,
    };

    this.position.x = startPosition.x;
    this.position.y = startPosition.y;
  }

  draw() {
    this.ctx.strokeStyle = "rgb(250, 250, 0)";
    this.ctx.beginPath();
    this.ctx.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2);
    this.ctx.stroke();
  }

  tick(elapsedTime) {
    this.draw();
    // console.log("particles");
  }
}
