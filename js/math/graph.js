class Graph {
  constructor(points = [], segments = []) {
    this.points = points;
    this.segments = segments;
  }

  draw(ctx) {
    for (const segment of this.segments) {
      segment.draw(ctx);
    }
    for (const point in this.points) {
      point.draw(ctx);
    }
  }
}
