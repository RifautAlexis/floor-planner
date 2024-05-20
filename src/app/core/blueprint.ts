import { Graphics } from "pixi.js";

/** Plan containing lines, rooms, etc */
export class Blueprint extends Graphics {
  /** Lines Drawed */
  lines: {
    strartingNode: { x: number; y: number };
    endNode: { x: number; y: number };
  }[] = [];

  /** Drawing */
  startDrawing: boolean = false;
  startingPointX: number | null = null;
  startingPointY: number | null = null;
  lastPointX: number | null = null;
  lastPointY: number | null = null;

  constructor() {
    super();
  }

  /** */
  public draw(drawZone: Graphics) {
    drawZone.clear();
    drawZone.setStrokeStyle({ width: 5, color: 'pink' })
    .moveTo(this.startingPointX!, this.startingPointY!)
    .lineTo(this.lastPointX!, this.lastPointY!)
    .stroke();
  }
}