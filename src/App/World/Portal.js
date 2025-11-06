import * as THREE from "three";
import App from "../App";
import ModalManager from "../UI/ModalManager";
import { gsap } from "gsap";

export default class Portal {
    constructor(portalMesh, modalInfo) {
        this.app = new App();
        this.portalMesh = portalMesh;
        this.modalInfo = modalInfo;
        this.modalManager = new ModalManager();

        this.portalNearMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.8,
        });

        this.portalFarMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.8,
        });

        // Create a glowing material once
        this.portalGlowMaterial = new THREE.MeshStandardMaterial({
            color: 0x00ffff,
            emissive: 0x00ffff,
            emissiveIntensity: 0, // start with no glow
            transparent: true,
            opacity: 0.8,
        });

        this.portalMesh.material = this.portalFarMaterial;

        this.prevIsNear = false;

        // Bounding box for group or single mesh
        if (this.portalMesh instanceof THREE.Group) {
            const box = new THREE.Box3().setFromObject(this.portalMesh);
            this.portalCenter = new THREE.Vector3();
            box.getCenter(this.portalCenter);
        } else {
            this.portalCenter = new THREE.Vector3();
            this.portalMesh.getWorldPosition(this.portalCenter);
        }

        // Light for glow
        this.portalLight = new THREE.PointLight(0x00ffff, 0, 20); // start with 0 intensity
        this.portalMesh.add(this.portalLight);
    }

    // Call this each frame with a normalized time of day (0 = day, 1 = night)
    setGlow(timeOfDay) {
        // Smoothly interpolate emissive intensity based on time of day
        const targetIntensity = timeOfDay * 5; // max 5
        const targetLightIntensity = timeOfDay * 7;

        gsap.to(this.portalGlowMaterial, { emissiveIntensity: targetIntensity, duration: 1 });
        gsap.to(this.portalLight, { intensity: targetLightIntensity, duration: 1 });

        // Swap material if not already glowing
        if (this.portalMesh.material !== this.portalGlowMaterial) {
            this.portalMesh.material = this.portalGlowMaterial;
        }
    }

    // Your existing loop method
    loop() {
        this.character = this.app.world.character.instance;
        if (this.character) {
            const distance = this.character.position.distanceTo(this.portalCenter);
            const isNear = distance < 2;

            if (isNear && !this.prevIsNear) {
                this.modalManager.openModal(this.modalInfo.title, this.modalInfo.description);
                this.portalMesh.material = this.portalNearMaterial;
            } else if (!isNear && this.prevIsNear) {
                this.modalManager.closeModal();
                this.portalMesh.material = this.portalFarMaterial;
            }

            this.prevIsNear = isNear;
        }
    }
}




// export default class Portal {
//     constructor(portalMesh, modalInfo) {
//         this.app = new App();
//         this.portalMesh = portalMesh;
//         this.modalInfo = modalInfo;
//         this.modalManager = new ModalManager();

//         // Materials for portal state
//         this.portalNearMaterial = new THREE.MeshBasicMaterial({
//             color: 0xFFFFFF,
//             transparent: true,
//             opacity: 0.8,
//         });

//         this.portalFarMaterial = new THREE.MeshBasicMaterial({
//             color: 0x00FFFF,
//             transparent: true,
//             opacity: 0.8,
//         });

//         this.portalMesh.material = this.portalFarMaterial;
//         this.prevIsNear = false;

//         // Check if portalMesh is a group or a single mesh
//         if (this.portalMesh instanceof THREE.Group) {
//             console.log("This portal is a group with children:", this.portalMesh.children);
//             // Compute bounding box center for distance calculation
//             const box = new THREE.Box3().setFromObject(this.portalMesh);
//             this.portalCenter = new THREE.Vector3();
//             box.getCenter(this.portalCenter);
//         } else {
//             console.log("This portal is a single mesh.");
//             this.portalCenter = new THREE.Vector3();
//             this.portalMesh.getWorldPosition(this.portalCenter);
//         }



//     }

//     loop() {
//         this.character = this.app.world.character.instance;
//         if (this.character) {
//             // Compute current distance to portal center
//             const distance = this.character.position.distanceTo(this.portalCenter);
//             // console.log("Distance to portal:", distance.toFixed(2));


//             const isNear = distance < 2;
//             if (isNear) {
//                 if (!this.prevIsNear) {
//                     this.modalManager.openModal(this.modalInfo.title, this.modalInfo.description);
//                     this.portalMesh.material = this.portalNearMaterial;
//                 }
//                 this.prevIsNear = true;
//             } else {
//                 if (this.prevIsNear) {
//                     this.modalManager.closeModal();
//                     this.portalMesh.material = this.portalFarMaterial;
//                 }
//                 this.prevIsNear = false;
//             }
//         }
//     }





//     setGlow(on) {
//         if (on) {
//             this.portalGlowMaterial = new THREE.MeshStandardMaterial({
//             color: 0x00ffff,           // base color
//             emissive: 0x00ffff,        // glowing color
//             emissiveIntensity: 0,      // how strong the glow is
//             transparent: true,
//             opacity: 0.8,
//         });
//         this.portalMesh.material = this.portalGlowMaterial;

//         this.portalLight = new THREE.PointLight(0x00ffff, 7, 20); // color, intensity, distance
//         this.portalLight.position.set(0, 0, 0); // center of portal
//         gsap.to(this.portalGlowMaterial,{emissiveIntensity:5,duration:4})
//         gsap.to(this.portalLight,{intensity:7,duration:3})
//         this.portalMesh.add(this.portalLight);
//         } 
//         else {
//             gsap.to(this.portalGlowMaterial, { emissiveIntensity: 0, duration: 3 });
//             gsap.to(this.portalLight, { intensity: 0, duration: 3 });
//             this.portalMesh.material=this.portalFarMaterial
//         }
//     }
// }

