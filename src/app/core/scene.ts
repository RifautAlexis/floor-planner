import * as THREE from 'three';

export class Scene extends THREE.Scene {
    scene: THREE.Scene;

    constructor(sceneType?: THREE.Scene) {
        super();
        this.scene = sceneType ?? new THREE.Scene();
    }
}