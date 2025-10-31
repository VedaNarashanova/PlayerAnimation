import * as THREE from 'three'
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { sizesStore } from './Utils/Store.js';


import App from './App.js'

export default class Camera{
    constructor() {
        this.app = new App()
        this.canvas = this.app.canvas

        this.sizesStore = sizesStore

        this.sizes = this.sizesStore.getState()

        this.setInstance()
        this.setControls()
        this.setResizeLister()
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            1,
            600
          );
        // this.instance.position.z = 100
        // this.instance.position.y = 20
         this.instance.position.set(0, 0, 60); 
    }

    setControls() {
        this.controls = new OrbitControls(this.instance, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;      // allow zoom
    this.controls.enablePan = true;       // allow moving camera sideways
    this.controls.enableRotate = true;    // allow rotating camera

    // Optional: set min/max zoom
    this.controls.minDistance = 10;  // closest
    this.controls.maxDistance = 200; // farthest

    }

    setResizeLister() {
        this.sizesStore.subscribe((sizes)=>{
            this.instance.aspect = sizes.width / sizes.height
            this.instance.updateProjectionMatrix()
        })
    }

    loop() {
        this.controls.update()


        // this.characterController = this.app.world.characterController?.rigidBody
        // if(this.characterController) {


        //     const characterPosition = this.characterController.translation()
        //     const characterRotation = this.characterController.rotation()

        //     const cameraOffset = new THREE.Vector3(0, 28, 35)//(0, 40, 60)
        //     cameraOffset.applyQuaternion(characterRotation)
        //     cameraOffset.add(characterPosition)

        //     const targetOffset = new THREE.Vector3(0,8, 0)//(0,7, 0)
        //     targetOffset.applyQuaternion(characterRotation)
        //     targetOffset.add(characterPosition)

        //     this.instance.position.lerp(cameraOffset, 0.1)
        //     this.controls.target.lerp(targetOffset, 0.1)
        // }
    }
}