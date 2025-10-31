import * as THREE from 'three'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import Loop from './Utils/Loop.js'
import World from './World/World.js'
import Resize from './Utils/Resize.js'
import AssetLoader from './Utils/AssetLoader.js'
import Preloader from './UI/Preloader.js'
import InputController from './UI/InputController.js'
import GUI from './UI/GUI.js'
import ModalManager from './UI/ModalManager.js'

let instance = null

export default class App{
    constructor() {
        if(instance) return instance
        instance = this

        //accessing the methods from the consol
        window.ModalManager=new ModalManager()

        // threejs elements
        this.canvas = document.querySelector("canvas.threejs");
        this.scene = new THREE.Scene()

        
        this.gui=new GUI()
        this.assetLoader = new AssetLoader()
        this.preloader = new Preloader()
        this.inputController = new InputController()
        this.world = new World()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.loop = new Loop()
        this.resize = new Resize()

        // this.renderer = new THREE.WebGLRenderer({ antialias: true });
        // this.renderer.outputEncoding = THREE.sRGBEncoding;
        // this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        // this.renderer.toneMappingExposure = 1;
        // this.renderer.physicallyCorrectLights = true;

        // //shadows
        // this.renderer.shadowMap.enabled = true;
        // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }
}
