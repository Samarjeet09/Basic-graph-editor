import { Point } from "../primitives/point.js";
import { getNearestPoint } from "../math/utilities.js";
import { Segment } from "../primitives/segment.js";
export class GraphEditor {
  constructor(canvas, graph) {
    this.canvas = canvas;
    this.graph = graph;
    this.ctx = this.canvas.getContext("2d");
    this.selected = null;
    this.hovered = null;
    this.dragging = false;

    this.mouseLoc = null;
    // adding a private method
    this.#addEventListeners();
  }

  #addEventListeners() {
    this.canvas.addEventListener("mousedown", (event) => {
      if (event.button == 2) {
        // right click
        if (this.selected) {
          this.selected = null;
        } else if (this.hovered) {
          this.#removePoint(this.hovered);
        }
      }
      if (event.button == 0) {
        //   we want to check if we have selected already exsisting point
        //   we can comment it now cus we are handling it in movemouse
        //   this.hovered = getNearestPoint(mouseLoc, this.graph.points, 24);
        //   if clicked on a point then select that point only else add a new point
        if (this.hovered) {
          // to add segments btw exsisting we need to add seg btw selected and hovered when clicked
          this.#select(this.hovered);
          this.dragging = true;
          return;
        }
        this.graph.addPoint(this.mouseLoc);
        // adding segments btw new pts
        this.#select(this.mouseLoc);
        this.selected = this.mouseLoc;
        this.hovered = this.mouseLoc;
      }
    });
    this.canvas.addEventListener("mousemove", (event) => {
      this.mouseLoc = new Point(event.offsetX, event.offsetY);
      //   we want to check if we have selected already exsisting point
      this.hovered = getNearestPoint(this.mouseLoc, this.graph.points, 24);

      //   if dragging is true (on click)-> change posi of pt
      if (this.dragging == true) {
        this.selected.x = this.mouseLoc.x;
        this.selected.y = this.mouseLoc.y;
      }
    });

    // getting rid of menu on rightclick
    this.canvas.addEventListener("contextmenu", (e) => e.preventDefault());
    this.canvas.addEventListener("mouseup", () => (this.dragging = false));
  }

  #select(pt) {
    if (this.selected) {
      this.graph.tryAddSegment(new Segment(this.selected, pt));
    }
    this.selected = pt;
  }

  #removePoint(pt) {
    this.graph.removePoint(pt);
    if (this.selected == pt) {
      this.selected = null;
    }
    this.hovered = null;
  }

  display() {
    this.graph.draw(this.ctx);
    if (this.hovered) {
      this.hovered.draw(this.ctx, { fill: true });
    }
    if (this.selected) {
      const intent = this.hovered ? this.hovered : this.mouseLoc;
      // drawing a temp seg(cus we are not adding)
      new Segment(this.selected, intent).draw(this.ctx, { dash: [3, 3] });
      this.selected.draw(this.ctx, { outline: true });
    }
  }
}
