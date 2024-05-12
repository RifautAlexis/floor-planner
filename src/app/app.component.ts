import { AfterViewInit, Component, ElementRef, OnInit, inject, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {
    CSS2DRenderer,
    CSS2DObject,
} from 'three/examples/jsm/renderers/CSS2DRenderer'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [{ provide: Window, useValue: window }],
})
export class AppComponent implements OnInit, AfterViewInit {
  window = inject(Window);

  /** The canvas element. */
  private canvasElement!: HTMLCanvasElement;

  /** The 2D context. */
  private context!: CanvasRenderingContext2D;

  // grid parameters
  gridSpacing = 20; // pixels
  gridWidth = 1;
  gridColor = "#f1f1f1";

  ngOnInit(): void {
    this.canvasElement = <HTMLCanvasElement>document.getElementById('floorplanner-canvas');
    this.context = this.canvasElement.getContext('2d')!;

    this.init();
    this.animate();
  }

  ngAfterViewInit(): void {
  }

  private init() {
    this.handleWindowResize();
  }

  private animate() { }

  /** */
  public handleWindowResize() {
    this.canvasElement.height = this.window.innerHeight;
    this.canvasElement.width = parent.innerWidth;
    this.draw();
  }

  /** */
  public draw() {
    this.context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

    this.drawGrid();

    // if (this.viewmodel.mode == floorplannerModes.DRAW) {
    //   this.drawTarget(this.viewmodel.targetX, this.viewmodel.targetY, this.viewmodel.lastNode);
    // }

    // this.floorplan.getWalls().forEach((wall) => {
    //   this.drawWallLabels(wall);
    // });
  }

  /** */
  private drawGrid() {
    const originX = 0;
    const originY = 0;
    var offsetX = this.calculateGridOffset(-originX);
    var offsetY = this.calculateGridOffset(-originY);
    var width = this.canvasElement.width;
    var height = this.canvasElement.height;
    for (var x = 0; x <= (width / this.gridSpacing); x++) {
      this.drawLine(this.gridSpacing * x + offsetX, 0, this.gridSpacing * x + offsetX, height, this.gridWidth, this.gridColor);
    }
    for (var y = 0; y <= (height / this.gridSpacing); y++) {
      this.drawLine(0, this.gridSpacing * y + offsetY, width, this.gridSpacing * y + offsetY, this.gridWidth, this.gridColor);
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
  private drawLine(startX: number, startY: number, endX: number, endY: number, width: number, color: string) {
    // width is an integer
    // color is a hex string, i.e. #ff0000
    this.context.beginPath();
    this.context.moveTo(startX, startY);
    this.context.lineTo(endX, endY);
    this.context.lineWidth = width;
    this.context.strokeStyle = color;
    this.context.stroke();
  }

}
