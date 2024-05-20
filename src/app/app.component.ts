import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Application, Graphics } from 'pixi.js';
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

    floorPlannerContainer.drag().pinch().wheel().decelerate();

    floorPlannerContainer.addChild(this.grid);
    floorPlannerContainer.addChild(this.blueprint);
    floorPlannerContainer.addChild(this.drawZone);

    floorPlannerContainer.onmousedown = (event: MouseEvent) => {
      if (this.blueprint.startDrawing) {
        this.blueprint.lines.push({
          strartingNode: { x: this.blueprint.startingPointX!, y: this.blueprint.startingPointY! },
          endNode: { x: this.blueprint.lastPointX!, y: this.blueprint.lastPointY! },
        });
        this.blueprint.startingPointX = null;
        this.blueprint.startingPointY = null;

        console.log('this.lines', this.blueprint.lines);

        this.refresh();
      } else {
        this.blueprint.startingPointX = event.clientX;
        this.blueprint.startingPointY = event.clientY;
      }

      this.blueprint.startDrawing = !this.blueprint.startDrawing;
    };

    floorPlannerContainer.onmousemove = (event: MouseEvent) => {
      event.preventDefault();
      if (!this.blueprint.startingPointX || !this.blueprint.startingPointY) return;

      this.blueprint.lastPointX = event.clientX;
      this.blueprint.lastPointY = event.clientY;
      console.log(this.blueprint.startDrawing, this.blueprint.startingPointX, this.blueprint.startingPointY, this.blueprint.lastPointX, this.blueprint.lastPointY);

      this.blueprint.draw(this.drawZone);
    };

    // this.drawZone.setStrokeStyle({ width: 5, color: 'blue' })
    // .moveTo(100, 100)
    // .lineTo(this.lastPointX!, this.lastPointX!)
    // .stroke();
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
}
