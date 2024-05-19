import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Application, Assets, Graphics, Sprite } from 'pixi.js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  app = new Application();

  /** The canvas element. */
  private canvasElement!: HTMLCanvasElement;

  /** Grid parameters */
  gridSpacing = 20; // pixels
  gridWidth = 1;
  gridColor = "#f1f1f1";

  async ngOnInit(): Promise<void> {
    this.canvasElement = <HTMLCanvasElement>document.getElementById('floorplanner-canvas');

    await this.app.init({ background: 'white', resizeTo: window, canvas: this.canvasElement});
    document.body.appendChild(this.app.canvas);

    const graphic = new Graphics();
    this.drawGrid(graphic);
    this.app.stage.addChild(graphic);
  }

  

  /** */
  private drawGrid(graphic: Graphics) {
    const originX = 0;
    const originY = 0;
    var offsetX = this.calculateGridOffset(-originX);
    var offsetY = this.calculateGridOffset(-originY);
    var width = this.canvasElement.width;
    var height = this.canvasElement.height;
    for (var x = 0; x <= (width / this.gridSpacing); x++) {
      this.drawLine(graphic, this.gridSpacing * x + offsetX, 0, this.gridSpacing * x + offsetX, height, this.gridWidth, this.gridColor);
    }
    for (var y = 0; y <= (height / this.gridSpacing); y++) {
      this.drawLine(graphic, 0, this.gridSpacing * y + offsetY, width, this.gridSpacing * y + offsetY, this.gridWidth, this.gridColor);
    }
  }

  /** returns n where -gridSize/2 < n <= gridSize/2  */
  private calculateGridOffset(n: number) {
    if (n >= 0) {
      return (n + this.gridSpacing / 2.0) % this.gridSpacing - this.gridSpacing / 2.0;
    } else {
      return (n - this.gridSpacing / 2.0) % this.gridSpacing + this.gridSpacing / 2.0;
    }
  }

  /** */
  private drawLine(graphic: Graphics, startX: number, startY: number, endX: number, endY: number, width: number, color: string) {
    // width is an integer
    // color is a hex string, i.e. #ff0000
    graphic
      .setStrokeStyle({ width: width, color: color })
      .moveTo(startX, startY)
      .lineTo(endX, endY)
      .stroke();
  }
}
