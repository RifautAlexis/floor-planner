import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Application, Assets, Graphics, Sprite } from 'pixi.js';
import { Grid } from './core/grid';

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

  async ngOnInit(): Promise<void> {
    this.canvasElement = <HTMLCanvasElement>document.getElementById('floorplanner-canvas');

    await this.app.init({ background: 'white', resizeTo: window, canvas: this.canvasElement});
    document.body.appendChild(this.app.canvas);

    const graphic = new Grid(this.canvasElement.width, this.canvasElement.height);
    graphic.drawGrid();
    this.app.stage.addChild(graphic);
  }
}
