export class Segment {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }

  equals(seg) {
    // return (
    //   (this.p1.equals(seg.p1) && this.p2.equals(seg.p2)) ||
    //   (this.p2.equals(seg.p1) && this.p1.equals(seg.p2))
    // );
    return this.includes(seg.p1) && this.includes(seg.p2);
  }

  // helper to check if seg includes a point
  includes(point) {
    return this.p1.equals(point) || this.p2.equals(point);
  }

  draw(ctx, width = 2, color = "black") {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.stroke();
  }
}
