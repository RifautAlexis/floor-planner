import * as THREE from 'three';

export class Renderer extends THREE.WebGLRenderer {
  private renderer!: THREE.WebGLRenderer;

  constructor(rendererType?: THREE.WebGLRenderer) {
    super();
    this.renderer = rendererType ?? new THREE.WebGLRenderer({ antialias: true });
  }
}