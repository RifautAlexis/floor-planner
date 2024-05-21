import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Application, FederatedPointerEvent, Graphics } from 'pixi.js';
import { Grid } from './core/grid';
import { Viewport } from 'pixi-viewport';
import { Blueprint } from './core/blueprint';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  app: Application = new Application();

  /** The canvas element. */
  private canvasElement!: HTMLCanvasElement;

  /** Zones */
  blueprint: Blueprint = new Blueprint();
  drawZone: Graphics = new Graphics();
  grid?: Grid;

  async ngOnInit(): Promise<void> {
    this.canvasElement = <HTMLCanvasElement>(
      document.getElementById('floorplanner-canvas')
    );

    await this.app.init({
      background: 'white',
      resizeTo: window,
      canvas: this.canvasElement,
    });
    document.body.appendChild(this.app.canvas);

    
    this.grid = new Grid(
      this.canvasElement.width,
      this.canvasElement.height
    );

    this.grid.drawGrid();

    const floorPlannerContainer = new Viewport({
      screenWidth: this.canvasElement.width,
      screenHeight: this.canvasElement.height,
      worldWidth: this.canvasElement.width,
      worldHeight: this.canvasElement.height,
      events: this.app.renderer.events,
    });
    this.app.stage.addChild(floorPlannerContainer);
    
    floorPlannerContainer
      // .drag()
      .pinch()
      .wheel()
      .decelerate();
    
    floorPlannerContainer.addChild(this.grid);
    floorPlannerContainer.addChild(this.blueprint);
    floorPlannerContainer.addChild(this.drawZone);

    floorPlannerContainer.onmouseup = (_: FederatedPointerEvent) => {
      this.blueprint.startDrawing = !this.blueprint.startDrawing
    }

    floorPlannerContainer.onmousedown = (event: FederatedPointerEvent) => {
      if (this.blueprint.startDrawing) {
        this.blueprint.lines.push({
          strartingNode: { x: this.blueprint.startingPointX!, y: this.blueprint.startingPointY! },
          endNode: { x: this.blueprint.lastPointX!, y: this.blueprint.lastPointY! },
        });
        this.blueprint.startingPointX = null;
        this.blueprint.startingPointY = null;

        this.refresh();
      } else {
        const {x, y}: {x: number, y: number} = this.updateTarget(event);
        this.blueprint.startingPointX = x;
        this.blueprint.startingPointY = y;
      }
    };

    floorPlannerContainer.onmousemove = (event: FederatedPointerEvent) => {
      event.preventDefault();
      if (!this.blueprint.startingPointX || !this.blueprint.startingPointY) return;

      if(this.blueprint.startDrawing) {

        const {x, y}: {x: number, y: number} = this.updateTarget(event);
        this.blueprint.lastPointX = x;
        this.blueprint.lastPointY = y;
        this.blueprint.draw(this.drawZone, this.blueprint.lastPointX, this.blueprint.lastPointY);
      }
    };
  }

  refresh() {
    this.drawZone.clear();
    this.blueprint.clear();
    this.blueprint.lines.forEach((line) => {
      this.blueprint
        .setStrokeStyle({ width: 5, color: 'black' })
        .moveTo(line.strartingNode.x, line.strartingNode.y)
        .lineTo(line.endNode.x, line.endNode.y)
        .stroke();
    });
  }

  /** */
  private updateTarget(event: FederatedPointerEvent): {x: number, y: number} {
    const snapTolerance = 20;
    console.log(
      Math.floor(event.global.x / snapTolerance) * snapTolerance,
      Math.floor(event.global.y / snapTolerance) * snapTolerance
    );
    return {x: Math.floor(event.global.x / snapTolerance) * snapTolerance, y: Math.floor(event.global.y / snapTolerance) * snapTolerance};
  }
}
