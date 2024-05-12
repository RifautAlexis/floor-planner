import * as THREE from 'three';

export class Camera extends THREE.Camera {
    camera: THREE.Camera;
    
    constructor(cameraType?: THREE.Camera) {
        super();
        this.camera = cameraType ?? new THREE.Camera();
    }

}