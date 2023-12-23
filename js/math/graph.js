export class Graph {
  constructor(points = [], segments = []) {
    this.points = points;
    this.segments = segments;
  }

  addPoint(point) {
    this.points.push(point);
  }

  containsPoint(point) {
    // we want to check if there is any point p equal to
    // the given point
    // equals is a method of point class as we want to
    // check equality of our obj point
    return this.points.find((p) => p.equals(point));
  }

  tryAddPoint(point) {
    if (!this.containsPoint(point)) {
      this.addPoint(point);
      return true;
    }
    return false;
  }

  addSegment(segment) {
    this.segments.push(segment);
  }

  constainsSegment(seg) {
    // equals is func of segment class
    return this.segments.find((s) => s.equals(seg));
  }

  tryAddSegment(seg) {
    if (!this.constainsSegment(seg) && !seg.p1.equals(seg.p2)) {
      this.addSegment(seg);
      return true;
    }
    return false;
  }

  removeSegment(seg) {
    this.segments.splice(this.segments.indexOf(seg), 1);
  }

  getSegmentsWithPoint(p) {
    const segs = [];
    for (const seg of this.segments) {
      if (seg.includes(p)) {
        segs.push(seg);
      }
    }
    return segs;
  }
  removePoint(p) {
    // we also want to remove the segments connected to points
    // console.log(p.x)
    const segs = this.getSegmentsWithPoint(p);
    for (const seg of segs) {
      this.removeSegment(seg);
    }
    this.points.splice(this.points.indexOf(p), 1);
  }

  draw(ctx) {
    for (const segment of this.segments) {
      segment.draw(ctx);
    }
    for (const point of this.points) {
      point.draw(ctx);
    }
  }
}
