import * as THREE from "three";
import App from "../App";
import ModalManager from "../UI/ModalManager";

export default class Portal {
    constructor(portalMesh, modalInfo) {
        this.app = new App();
        this.portalMesh = portalMesh;
        this.modalInfo = modalInfo;
        this.modalManager = new ModalManager();

        // Materials for portal state
        this.portalNearMaterial = new THREE.MeshBasicMaterial({
            color: 0xFFFFFF,
            transparent: true,
            opacity: 0.8,
        });

        this.portalFarMaterial = new THREE.MeshBasicMaterial({
            color: 0x00FFFF,
            transparent: true,
            opacity: 0.8,
        });

        this.portalMesh.material = this.portalFarMaterial;
        this.prevIsNear = false;

        // Check if portalMesh is a group or a single mesh
        if (this.portalMesh instanceof THREE.Group) {
            console.log("This portal is a group with children:", this.portalMesh.children);
            // Compute bounding box center for distance calculation
            const box = new THREE.Box3().setFromObject(this.portalMesh);
            this.portalCenter = new THREE.Vector3();
            box.getCenter(this.portalCenter);
        } else {
            console.log("This portal is a single mesh.");
            this.portalCenter = new THREE.Vector3();
            this.portalMesh.getWorldPosition(this.portalCenter);
        }
    }

    loop() {
        this.character = this.app.world.character.instance;
        if (this.character) {
            // Compute current distance to portal center
            const distance = this.character.position.distanceTo(this.portalCenter);
            console.log("Distance to portal:", distance.toFixed(2));

            const isNear = distance < 2;
            if (isNear) {
                if (!this.prevIsNear) {
                    this.modalManager.openModal(this.modalInfo.title, this.modalInfo.description);
                    this.portalMesh.material = this.portalNearMaterial;
                }
                this.prevIsNear = true;
            } else {
                if (this.prevIsNear) {
                    this.modalManager.closeModal();
                    this.portalMesh.material = this.portalFarMaterial;
                }
                this.prevIsNear = false;
            }
        }
    }
}
