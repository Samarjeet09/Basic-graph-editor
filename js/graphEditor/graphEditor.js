import { Point } from "../primitives/point.js";
import { getNearestPoint } from "../math/utilities.js";
export class GraphEditor {
  constructor(canvas, graph) {
    this.canvas = canvas;
    this.graph = graph;
    this.ctx = this.canvas.getContext("2d");
    this.selected = null;
    this.hovered = null;
    this.dragging = false;
    // adding a private method
    this.#addEventListeners();
  }

  #addEventListeners() {
    this.canvas.addEventListener("mousedown", (event) => {
      if (event.button == 2) {
        // right click
        if (this.hovered) {
          this.graph.removePoint(this.hovered);
          if (this.selected == this.hovered) {
            this.selected = null;
          }
          this.hovered = null;
          return;
        }
      }
      if (event.button == 0) {
        const mouseLoc = new Point(event.offsetX, event.offsetY);
        //   we want to check if we have selected already exsisting point
        //   we can comment it now cus we are handling it in movemouse
        //   this.hovered = getNearestPoint(mouseLoc, this.graph.points, 24);
        //   if clicked on a point then select that point only else add a new point
        if (this.hovered) {
          this.selected = this.hovered;
          this.dragging = true;
          return;
        }
        this.graph.points.push(mouseLoc);
        this.selected = mouseLoc;
        this.hovered = mouseLoc;
      }
    });
    this.canvas.addEventListener("mousemove", (event) => {
      const mouseLoc = new Point(event.offsetX, event.offsetY);
      //   we want to check if we have selected already exsisting point
      this.hovered = getNearestPoint(mouseLoc, this.graph.points, 24);

      //   if dragging is true (on click)-> change posi of pt
      if (this.dragging == true) {
        this.selected.x = mouseLoc.x;
        this.selected.y = mouseLoc.y;
      }
    });

    // getting rid of menu on rightclick
    this.canvas.addEventListener("contextmenu", (e) => e.preventDefault());
    this.canvas.addEventListener("mouseup", () => (this.dragging = false));
  }
  display() {
    this.graph.draw(this.ctx);
    if (this.selected) {
      this.selected.draw(this.ctx, { outline: true });
    }
    if (this.hovered) {
      this.hovered.draw(this.ctx, { fill: true });
    }
  }
}
