import { FederatedPointerEvent, Graphics } from "pixi.js";
import { gridSpace } from "../config";
import { Point } from "../models/point";

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

  

  /** */
  getSnapPoint(event: FederatedPointerEvent): Point {
    const pointX = this.closestMultipleOfSnapTolerance(event.global.x);
    const pointY = this.closestMultipleOfSnapTolerance(event.global.y);

    return {
      x: pointX,
      y: pointY
    };
  }

  private closestMultipleOfSnapTolerance(num: number): number {
    const lowerMultiple = Math.floor(num / gridSpace) * gridSpace;
    const upperMultiple = Math.ceil(num / gridSpace) * gridSpace;

    if (Math.abs(num - lowerMultiple) < Math.abs(num - upperMultiple)) {
        return lowerMultiple;
    } else {
        return upperMultiple;
    }
  }
}