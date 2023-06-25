//templates of how various objects should be formatted
const template_Slot = {duration: 15, position: {x: 0, y: 0}};
const template_Animation = [/* Array of slots */];
const template_Animations = {
    "idle": template_Animation,
    "walkUp": "more animations here..."
}; 

const defaults = {
    animations: {}
};

class AnimationPlayer {

    //Private members
    #animations;
    #currentAnimation;
    #currentAnimationSlot;
    #currentFrame;

    constructor(options) {
        this.#animations = options.animations || defaults.animations;

        this.#currentAnimation = 0;
        this.#currentAnimationSlot = 0;
        this.#currentFrame = 0;
    }

    playAnimation(animationName) {
        //If the passed animation name does not match the one that's playing, start the new one
        if (animationName !== this.#currentAnimation) {
            this.#currentAnimation = animationName;
            this.#currentAnimationSlot = 0;
            this.#currentFrame = 0;
            return;
        }
        
        else {
            if (this.#currentFrame <= this.#currentAnimationSlot.duration ) {
                this.#currentFrame++;
            }

            //Check if the next animation slot will be OOB (if its the end of the animation, restart it)
            else if (this.#currentAnimationSlot + 1 >= this.#animations[this.#currentAnimation].length) {
                this.#currentAnimationSlot = 0;
                this.#currentFrame = 0;
            }

            else {
                this.#currentAnimationSlot++;
                this.#currentFrame = 0;
            }
        }
    }

    //Accessors/getters
    getCurrentAnimation() {
        return this.#currentAnimation;
    }
    getCurrentAnimationSlot() {
        return this.#currentAnimationSlot;
    }
    getCurrentFrame() {
        return this.#currentFrame;
    }
}