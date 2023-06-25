const characterDefaults = {
    speed: 1,
    tileWidth: 16,
    position: {x: 0, y: 0}
};

class Character {

    //Instance variables
    sprite;
    context2d;
    speed;
    tileWidth;

    //Private members
    #moving = false;
    #direction;
    #animationPlayer

    constructor(sprite, context2d, options) {
        //must be an initialized sprite
        this.sprite = sprite;
        this.context2d = context2d;

        this.speed = options.speed || characterDefaults.speed;
        this.#animationPlayer = options.animationPlayer || new AnimationPlayer({});
    }

    move(direction) {
        //If the direction received was 0 and the character isn't moving, there's no reason to do anything else
        //console.log(direction);
        if ((direction.x == 0 && direction.y == 0) && !this.#moving) {
            this.#animationPlayer.playAnimation("idle");
            this.#updateSprite();
            return;
        };
        
        //If the newly input direction is 0, set the state to no longer moving
        if (direction.x == 0 && direction.y == 0) {
            this.#moving = false;
            this.#animationPlayer.playAnimation("idle");
        } else {
            this.#moving = true;
            this.#direction = direction;
            this.sprite.position.x += direction.x * this.speed;
            this.sprite.position.y += direction.y * this.speed;

            //direction-based animations
            if (direction.x == 0 && direction.y == 1) this.#animationPlayer.playAnimation("down");
            else if (direction.x == 0 && direction.y == -1) this.#animationPlayer.playAnimation("up");
            else if (direction.x == -1 && direction.y == 0) this.#animationPlayer.playAnimation("left");
            else if (direction.x == 1 && direction.y == 0) this.#animationPlayer.playAnimation("right");
            else if (direction.x == -0.5 && direction.y == 0.5) this.#animationPlayer.playAnimation("down_left");
            else if (direction.x == 0.5 && direction.y == 0.5) this.#animationPlayer.playAnimation("down_right");
            else if (direction.x == -0.5 && direction.y == -0.5) this.#animationPlayer.playAnimation("up_left");
            else if (direction.x == 0.5 && direction.y == -0.5) this.#animationPlayer.playAnimation("up_right");
        }

        this.#updateSprite();
    }

    //accessors
    getDirection() {
        return this.#direction;
    }

    //Boolean methods
    isMoving() {
        return this.#moving;
    }

    #updateSprite() {
        //console.log(this.#animationPlayer.getAnimations());
        this.sprite.offset.x = this.#animationPlayer.getAnimations()[this.#animationPlayer.getCurrentAnimation()][this.#animationPlayer.getCurrentAnimationSlot()].position.x;
        this.sprite.offset.y = this.#animationPlayer.getAnimations()[this.#animationPlayer.getCurrentAnimation()][this.#animationPlayer.getCurrentAnimationSlot()].position.y;
    }

}