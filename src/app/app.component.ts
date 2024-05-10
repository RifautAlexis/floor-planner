import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as THREE from 'three';

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

  camera!: THREE.PerspectiveCamera;
  scene!: THREE.Scene;
  renderer!: THREE.WebGLRenderer;

  width: number = window.innerWidth;
  height: number = window.innerHeight;

  ngOnInit(): void {
    this.init();
  }

  ngAfterViewInit(): void {
    const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

    const points = [];
    points.push( new THREE.Vector3( - 10, 0, 0 ) );
    points.push( new THREE.Vector3( 0, 10, 0 ) );
    points.push( new THREE.Vector3( 10, 0, 0 ) );

    const geometry = new THREE.BufferGeometry().setFromPoints( points );

    const line = new THREE.Line( geometry, material );
    
    this.scene.add(line);

    this.renderer.render(this.scene, this.camera);
    document.body.appendChild(this.renderer.domElement);
  }

  private init() {
    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      0.01,
      1000
    );
    this.camera.position.set( 0, 0, 100 );
    this.camera.lookAt( 0, 0, 0 );

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.width, this.height);
  }
}
