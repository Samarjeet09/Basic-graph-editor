import { Graph } from "./js/math/graph.js";
import { Point } from "./js/primitives/point.js";
import { Segment } from "./js/primitives/segment.js";
import { GraphEditor } from "./js/graphEditor/graphEditor.js";
document.addEventListener("DOMContentLoaded", function () {
  const can1 = document.getElementById("can1");
  can1.width = 600;
  can1.height = 600;
  const canvasWidth = can1.width;
  const canvasHeight = can1.height;
  // get the context
  const ctx = can1.getContext("2d");
  const p1 = new Point(200, 200);
  const p2 = new Point(400, 500);
  const p3 = new Point(200, 400);
  const p4 = new Point(500, 200);

  const s1 = new Segment(p1, p2);
  const s2 = new Segment(p1, p3);
  const s3 = new Segment(p3, p2);
  const s4 = new Segment(p4, p2);

  const graph = new Graph([p1, p2, p3, p4], [s1, s2, s3, s4]);
  // graph.draw(ctx);
  // making a graph editor
  const graphEditor = new GraphEditor(can1, graph);
  // it will change on every mouse movement 
  // we will make a animation loop 
  animate();
  function animate(){
     ctx.clearRect(0,0,can1.width,can1.height);
     graphEditor.display();
     requestAnimationFrame(animate);
  }


});
