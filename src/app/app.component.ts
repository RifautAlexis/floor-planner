import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

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

  /** Grid parameters */
  gridSpacing = 20; // pixels
  gridWidth = 1;
  gridColor = "#f1f1f1";

  /** Drawing */
  startDrawing = false;
  startingPointX: number | null = null;
  startingPointY: number | null = null;
  lastPointX: number | null = null;
  lastPointY: number | null = null;

  /** Lines Drawed */
  lines: {strartingNode: {x: number, y: number}, endNode: {x: number, y: number} }[] = [];

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

    this.canvasElement.onmousedown = ((event: MouseEvent) => {
      if (this.startDrawing) {
        this.lines.push({
          strartingNode: {x: this.startingPointX!, y: this.startingPointY!},
          endNode: {x: this.lastPointX!, y: this.lastPointY!}
        });
        this.startingPointX = null;
        this.startingPointY = null;
        console.log('this.lines', this.lines);
      } else {
        this.startingPointX = event.clientX;
        this.startingPointY = event.clientY;
      }
        
      this.startDrawing = !this.startDrawing;
      console.log('onmousedown', this.startDrawing);
      
    });

    this.canvasElement.onmousemove = ((event: MouseEvent) => {
      event.preventDefault();      
      if(!this.startingPointX || !this.startingPointY) return;

      console.log(this.startDrawing, this.startingPointX, this.startingPointY);
      this.lastPointX = event.clientX;
      this.lastPointY = event.clientY;

      this.draw();
      
    });
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

    this.lines.forEach((line) => {
      this.drawLine(line.strartingNode.x, line.strartingNode.y, line.endNode.x, line.endNode.y, 5, 'black');
    });

    if(this.startDrawing) {
      console.log('this.startDrawing', this.startingPointX!, this.startingPointY!, this.lastPointX!, this.lastPointY!);
      this.drawLine(this.startingPointX!, this.startingPointY!, this.lastPointX!, this.lastPointY!, 5, 'black');
    }
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
