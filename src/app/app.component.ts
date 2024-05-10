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
    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const material = new THREE.MeshNormalMaterial();

    const mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);

    this.renderer.setAnimationLoop((time) => {
      this.animate(time, mesh);
    });
    document.body.appendChild(this.renderer.domElement);
  }

  private animate(time: number, mesh: THREE.Mesh) {
    mesh.rotation.x = time / 2000;
    mesh.rotation.y = time / 1000;

    this.renderer.render(this.scene, this.camera);
  }

  private init() {
    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      0.01,
      10
    );
    this.camera.position.z = 1;

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.width, this.height);
  }
}
