import { Graphics } from "pixi.js";

export class DrawZone extends Graphics {
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
  public draw() {
    if (!this.startingPointX || !this.startingPointY || !this.lastPointX || !this.lastPointY) return;

    this.clear();
    this.setStrokeStyle({ width: 5, color: 'pink' })
        .moveTo(this.startingPointX!, this.startingPointY!)
        .lineTo(this.lastPointX!, this.lastPointY!)
        .stroke();
  }
}