import * as THREE from "three";
import App from "../App.js";
import assetStore from "../Utils/AssetStore.js";
import Portal from "./Portal.js";
import ModalContentProvider from "../UI/ModalContentProvider.js";

export default class Environment {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.physics = this.app.world.physics;

    this.pane=this.app.gui.pane

    //pull the environment
    this.assetStore=assetStore.getState()
    this.environment=this.assetStore.loadedAssets.environment
    

    this.loadEnvironment();
    this.addGround();
    this.addLights()
    this.addPortals()
    this.addWalls();
    // this.addStairs();
    // this.addMeshes();

    this.isNight=false
     this.createToggleButton()
    
  }

  loadEnvironment() {
    const environmentScene=this.environment.scene
    this.scene.add(environmentScene)


    environmentScene.position.set(-10,5,23)//-10, 5, 20
    environmentScene.rotation.set(0, -7, 0)
    //environmentScene.scale.setScalar(1.7)


  const physicalObjects = ['trees','terrain','rocks','gates','Floor','bushes','stairs'];
  const shadowCasters = ['trees','terrain','rocks','gates','bushes'];
  const shadowReceivers = ['terrain','Floor'];


// for(const child of environmentScene.children){
//   child.traverse((obj) => {
//     if(obj.isMesh){
//       obj.castShadow=shadowCasters.some((keyword) => child.name/includes(keyword))
//       obj.receiveShadow=shadowReceivers.some((keyword) => child.name.includes(keyword))
//       if(physicalObjects.some((keyword) => child.name.includes(keyword))){
//         this.physics.add(obj,"fixed","cuboid")
//       }
//     }
//   })
// }
  this.environment.scene.traverse((obj) => {
      if(obj.isMesh && obj.name.includes("Floor")) {
          this.physics.add(obj, "fixed", "cuboid");
      }
  });


  for(const child of environmentScene.children){
    // Physics
    const isPhysicalObject = physicalObjects.some(keyword => child.name.includes(keyword));
    if(isPhysicalObject){
      child.traverse((obj) => {
        if(obj.isMesh){
          this.physics.add(obj,"fixed","cuboid");
        }
      });
    }

  // Shadows
  const isShadowCaster = shadowCasters.some(keyword => child.name.includes(keyword));
  if(isShadowCaster){
    child.traverse((obj) => {
      if(obj.isMesh){
        obj.castShadow = true;
      }
    });
  }

  const isShadowReceiver = shadowReceivers.some(keyword => child.name.includes(keyword));
  if(isShadowReceiver){
    child.traverse((obj) => {
      if(obj.isMesh){
        obj.receiveShadow = true;
      }
    });
  }
}
  

    // const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    // this.scene.add(ambientLight);

    // this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // this.directionalLight.position.set(1, 1, 1);
    // this.directionalLight.castShadow = true;
    // this.scene.add(this.directionalLight);
}

  addGround() {
    const groundGeometry = new THREE.BoxGeometry(100, 1, 100);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: "white",
      visible:false
    });
    this.groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    this.scene.add(this.groundMesh);
    this.physics.add(this.groundMesh, "fixed", "cuboid");
  }

  // addLights() {
  //   // Store references for toggling
  //   this.ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
  //   this.scene.add(this.ambientLight);

  //   this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
  //   this.directionalLight.position.set(50, 70, 50);
  //   this.directionalLight.castShadow = true;
  //   this.scene.add(this.directionalLight);
  // }
  addLights(){
      this.ambientLight = new THREE.AmbientLight(0xffffff, 1);
      this.scene.add(this.ambientLight);

      this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
      this.directionalLight.position.set(50, 70, 50); 
      this.directionalLight.castShadow = true;
      this.scene.add(this.directionalLight);
    
      
      this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      this.directionalLight.position.set(50, 70, 50); 
      this.directionalLight.castShadow = true;
      this.directionalLight.shadow.camera.top = 30
      this.directionalLight.shadow.camera.right = 30
      this.directionalLight.shadow.camera.left = -30
      this.directionalLight.shadow.camera.bottom = -30
      this.directionalLight.shadow.bias = -0.002
      this.directionalLight.shadow.normalBias = 0.072
      this.scene.add(this.directionalLight);
    
  }

  addPortals(){
    const portalMesh1=this.environment.scene.getObjectByName('portals')
    const portalMesh2=this.environment.scene.getObjectByName('portals001')
    const portalMesh3=this.environment.scene.getObjectByName('portals002')

    const modalContentProvider=new ModalContentProvider()
    //get

    this.portal1=new Portal(portalMesh1,modalContentProvider.getModalInfo('aboutMe'))
    this.portal2=new Portal(portalMesh2,modalContentProvider.getModalInfo('projects'))
    this.portal3=new Portal(portalMesh3,modalContentProvider.getModalInfo('contactMe'))


  }
  
   addWalls() {
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: "gray",
    });

    const wallGeometry = new THREE.BoxGeometry(100, 10, 1);

    const wallPositions = [
      { x: 0, y: 5, z: 28 },
      { x: 0, y: 5, z: -25 },
      { x: 20, y: 5, z: 0, rotation: { y: Math.PI / 2 } },
      { x: -20, y: 5, z: 0, rotation: { y: Math.PI / 2 } },
    ];

    wallPositions.forEach((position) => {
      const wallMesh = new THREE.Mesh(wallGeometry, wallMaterial);
      wallMesh.position.set(position.x, position.y, position.z);
      if (position.rotation)
        wallMesh.rotation.set(
          position.rotation.x || 0,
          position.rotation.y || 0,
          position.rotation.z || 0
        );
      this.scene.add(wallMesh);
      this.physics.add(wallMesh, "fixed", "cuboid");
      wallMesh.visible=false
    });
  }

  loop(){
    this.portal1.loop()
    this.portal2.loop()
    this.portal3.loop()
  }

  



  // Method to toggle night/day
  toggleNightMode() {
    this.isNight = !this.isNight;

    if (this.isNight) {
      this.ambientLight.intensity = 0;
      this.directionalLight.intensity = 0;

      this.portal1.setGlow(true);
      this.portal2.setGlow(true);
      this.portal3.setGlow(true);
    } else {
      this.ambientLight = new THREE.AmbientLight(0xffffff, 1);
      this.scene.add(this.ambientLight);

      this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
      this.directionalLight.position.set(50, 70, 50); 
      this.directionalLight.castShadow = true;
      this.scene.add(this.directionalLight);
    
      
      this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      this.directionalLight.position.set(50, 70, 50); 
      this.directionalLight.castShadow = true;
      this.directionalLight.shadow.camera.top = 30
      this.directionalLight.shadow.camera.right = 30
      this.directionalLight.shadow.camera.left = -30
      this.directionalLight.shadow.camera.bottom = -30
      this.directionalLight.shadow.bias = -0.002
      this.directionalLight.shadow.normalBias = 0.072
      this.scene.add(this.directionalLight);
      this.portal1.setGlow(false);
      this.portal2.setGlow(false);
      this.portal3.setGlow(false);
    }
  }



  createToggleButton() {
    const button = document.createElement("button");
    button.textContent = "Toggle Night Mode";
    button.style.position = "absolute";
    button.style.top = "10px";
    button.style.left = "10px";
    button.style.padding = "10px 20px";
    button.style.background = "#222";
    button.style.color = "#fff";
    button.style.border = "none";
    button.style.cursor = "pointer";
    document.body.appendChild(button);

    button.addEventListener("click", () => {
      this.toggleNightMode();
      button.textContent = this.isNight ? "Turn Day On" : "Turn Night On";
    });
  }

  

  
}
