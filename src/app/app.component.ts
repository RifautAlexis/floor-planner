import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Application, FederatedPointerEvent, Graphics } from 'pixi.js';
import { Grid } from './core/grid';
import { Viewport } from 'pixi-viewport';
import { Blueprint } from './core/blueprint';
import { DrawZone } from './core/draw-zone';

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
  drawZone: DrawZone = new DrawZone();
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
      this.drawZone.startDrawing = !this.drawZone.startDrawing
    }

    floorPlannerContainer.onmousedown = (event: FederatedPointerEvent) => {
      if (this.drawZone.startDrawing) {
        this.blueprint.lines.push({
          startingNode: { x: this.drawZone.startingPointX!, y: this.drawZone.startingPointY! },
          endNode: { x: this.drawZone.lastPointX!, y: this.drawZone.lastPointY! },
        });
        this.drawZone.startingPointX = null;
        this.drawZone.startingPointY = null;

        this.refresh();

        // console.log(this.blueprint.lines);
        // console.log(this.blueprint.findShapes().length);
      } else {
        const {x, y}: {x: number, y: number} = this.drawZone.getSnapPoint(event);
        this.drawZone.startingPointX = x;
        this.drawZone.startingPointY = y;
      }
    };

    floorPlannerContainer.onmousemove = (event: FederatedPointerEvent) => {
      event.preventDefault();
      if (!this.drawZone.startingPointX || !this.drawZone.startingPointY) {        
        const {x, y}: {x: number, y: number} = this.drawZone.getSnapPoint(event);
        this.drawZone.clear();
        this.drawZone
          .setStrokeStyle({ width: 5, color: 'pink' })
          .circle(x, y, 10)
          .stroke();
      };

      if(this.drawZone.startDrawing) {

        const {x, y}: {x: number, y: number} = this.drawZone.getSnapPoint(event);
        this.drawZone.lastPointX = x;
        this.drawZone.lastPointY = y;
        this.drawZone.draw();
      }
    };
  }

  refresh() {
    this.drawZone.clear();
    this.blueprint.clear();
    this.blueprint.lines.forEach((line) => {
      this.blueprint
        .setStrokeStyle({ width: 5, color: 'black' })
        .moveTo(line.startingNode.x, line.startingNode.y)
        .lineTo(line.endNode.x, line.endNode.y)
        .stroke();
    });
  }
}
