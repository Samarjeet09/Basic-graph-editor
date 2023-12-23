// file containts functions and helpers

export function getNearestPoint(point, pointSet, threshold = Number.MAX_SAFE_INTEGER ) {
  let minDist = Number.MAX_SAFE_INTEGER;
  let nearest = null;
  for (const graphPt of pointSet) {
    const dist = distance(point, graphPt);
    if (dist < minDist && dist < threshold) {
      minDist = dist;
      nearest = graphPt;
    }
  }
  return nearest;
}

function distance(p1, p2) {
  // calculates the euclidian dist
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}
