const defaults = {
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

    constructor(sprite, context2d, options) {
        //must be an initialized sprite
        this.sprite = sprite;
        this.context2d = context2d;

        this.speed = options.speed || defaults.speed;
        this.tileWidth = options.tileWidth || defaults.tileWidth;
    }

    move(direction) {
        //If the direction received was 0 and the character isn't moving, there's no reason to do anything else
        if ((direction.x == 0 && direction.y == 0) && !this.#moving) return;
        
        //If the newly input direction is 0, set the state to no longer moving
        if (direction.x == 0 && direction.y == 0) {
            this.#moving = false;
        } else {
            this.#moving = true;
            this.#direction = direction;
            this.sprite.position.x += direction.x * this.speed;
            this.sprite.position.y += direction.y * this.speed;
        }
    }

    //accessors
    getDirection() {
        return this.#direction;
    }

    //Boolean methods
    isMoving() {
        return this.#moving;
    }

}