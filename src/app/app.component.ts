import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
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

  camera!: THREE.Camera;
  scene!: THREE.Scene;
  renderer!: THREE.WebGLRenderer;
  orbitControl!: OrbitControls;
  labelRenderer!: CSS2DRenderer;

  width: number = window.innerWidth;
  height: number = window.innerHeight;

  ctrlDown = false;
  lineId = 0;
  line!: THREE.Line;
  drawingLine = false;
  readonly measurementLabels: { [key: number]: CSS2DObject } = {};

  readonly raycaster = new THREE.Raycaster();
  intersects!: THREE.Intersection[];
  readonly mouse = new THREE.Vector2();

  ngOnInit(): void {
    this.init();
    this.animate();

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Control') {
          console.log('TRUE');
          this.ctrlDown = true
          this.orbitControl.enabled = false
          this.renderer.domElement.style.cursor = 'crosshair'
      }
    });
    
    window.addEventListener('keyup', (event) => {
        if (event.key === 'Control') {
            console.log("FALSE");
            this.ctrlDown = false
            this.orbitControl.enabled = true
            this.renderer.domElement.style.cursor = 'pointer'
            if (this.drawingLine) {
                //delete the last line because it wasn't committed
                this.scene.remove(this.line)
                this.scene.remove(this.measurementLabels[this.lineId])
                this.drawingLine = false
            }
        }
    });

    
    // this.renderer.domElement.addEventListener('pointerdown', this.onClick, false);
    this.renderer.domElement.addEventListener('pointerdown', (event: PointerEvent) => {
      console.log(( event.clientX / this.renderer.domElement.clientWidth ) * 2 - 1,
      - ( event.clientY / this.renderer.domElement.clientHeight ) * 2 + 1,);
    }, false);
  }

  ngAfterViewInit(): void {
    // const plane = new THREE.Plane( new THREE.Vector3( 1, 1, 0 ), 0 );
    // const planeHelper = new THREE.PlaneHelper( plane, 1, 0xffff00 );
    
    var grid = new THREE.GridHelper( 200, 10 );
    this.scene.add( grid );

    this.renderer.render(this.scene, this.camera);
  }

  private init() {
    const viewSize = 900;
    const aspectRation = this.width / this.height;
    this.camera = new THREE.OrthographicCamera(
      -aspectRation*viewSize / 2,
      aspectRation*viewSize / 2,
      viewSize / 2,
      -viewSize / 2,
      -1000,
      1000
    );
    this.camera.position.set(0, 90, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.width, this.height);
    document.body.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xFFFFFF);

    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
    this.labelRenderer.domElement.style.position = 'absolute';
    this.labelRenderer.domElement.style.top = '0px';
    this.labelRenderer.domElement.style.pointerEvents = 'none';
    document.body.appendChild(this.labelRenderer.domElement);

    this.orbitControl = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbitControl.enableRotate = false;
    this.orbitControl.minZoom = 1;
    this.orbitControl.maxZoom = 10;
    // this.orbit.target.set(0, 310, 0);
    this.orbitControl.update();
  }

  private animate() {
           
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);

  }

  // private onClick(popo: HTMLCanvasElement, ev: PointerEvent) {
  //   console.log(this.ctrlDown);
  //   if (this.ctrlDown) {
  //     console.log(event.clientX, event.clientY);
  //   }
  // }
}
