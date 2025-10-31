import * as THREE from 'three';
import App from '../App';
import { inputStore } from '../Utils/Store';


export default class AnimationController {
    constructor() {
        this.app = new App();
        this.scene = this.app.scene;
        this.avatar = this.app.world.character.avatar;

        inputStore.subscribe((input) => this.onInput(input))
        this.instantiateAnimations()
    }

    instantiateAnimations(){
        const idle=this.avatar.animations[0]
        this.mixer=new THREE.AnimationMixer(this.avatar.scene)

        this.animations=new Map()
        this.avatar.animations.forEach((clip) => {
            this.animations.set(clip.name, this.mixer.clipAction(clip))
        })

        this.currentAction=this.animations.get('idle')
        this.currentAction.play()

    }

    playAnimation(name){
        if(this.currentAction===this.animations.get(name)) return//if the current action is the same u want to play right now dont do anuything
        const action=this.animations.get(name)
        action.reset()
        action.play()
        action.crossFadeFrom(this.currentAction,0.4)

        this.currentAction=action//storing the previous action so heres a beter fade
    }

    onInput(input){
        if(input.forward || input.backward || input.left || input.right){
            this.playAnimation('run')    
        }
        else{
           this.playAnimation('idle')
        }

    }

    loop(deltaTime){
        this.mixer.update(deltaTime)
    }
}