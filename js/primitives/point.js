export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  equals(point) {
    // check given point is equal to this point
    return this.x == point.x && this.y == point.y;
  }

  draw(ctx, { size = 18, color = "red", outline = false, fill = false } = {}) {
    const rad = size / 2;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(this.x, this.y, rad, 0, Math.PI * 2);
    ctx.fill();
    if (outline) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "green";
      ctx.arc(this.x, this.y, rad * 1.5, 0, Math.PI * 2);
      ctx.stroke();
    }
    if (fill) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, rad * 1, 0, Math.PI * 2);
      ctx.fillStyle = "cyan";
      ctx.fill();
    }
  }
}
