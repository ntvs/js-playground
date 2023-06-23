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

    #moving = false;
    #direction = "";
    #finalPosition;

    constructor(sprite, context2d, options) {
        //must be an initialized sprite
        this.sprite = sprite;
        this.context2d = context2d;

        this.speed = options.speed || defaults.speed;
        this.tileWidth = options.tileWidth || defaults.tileWidth;
    }

    move(direction, delta) {
        //console.log(this.#direction, this.#moving, this.sprite.position, this.#finalPosition);
        if (!this.#moving) {
            if (direction == "UP") {
                this.#moving = true;
                this.#finalPosition = {x: this.sprite.position.x, y: this.sprite.position.y - this.tileWidth};
                this.#direction = "UP";
                this.sprite.position.y -= (this.speed);

            } else if (direction == "DOWN") {
                this.#moving = true;
                this.#finalPosition = {x: this.sprite.position.x, y: this.sprite.position.y + this.tileWidth};
                this.#direction = "DOWN";
                this.sprite.position.y += (this.speed);

            } else if (direction == "LEFT") {
                this.#moving = true;
                this.#finalPosition = {x: this.sprite.position.x - this.tileWidth, y: this.sprite.position.y};
                this.#direction = "LEFT";
                this.sprite.position.x -= (this.speed);

            } else if (direction == "RIGHT") {
                this.#moving = true;
                this.#finalPosition = {x: this.sprite.position.x + this.tileWidth, y: this.sprite.position.y};
                this.#direction = "RIGHT";
                this.sprite.position.x += (this.speed);

            }
        }
        
        //issue here
        else if (this.sprite.position.x == this.#finalPosition.x && this.sprite.position.y == this.#finalPosition.y) {
            this.#moving = false;
            this.#direction = "";
        } 
        
        else {
            if (this.#direction == "UP") {
                this.sprite.position.y -= (this.speed);
            } else if (this.#direction == "DOWN") {
                this.sprite.position.y += (this.speed);
            } else if (this.#direction == "LEFT") {
                this.sprite.position.x -= (this.speed);
            } else if (this.#direction == "RIGHT") {
                this.sprite.position.x += (this.speed);
            }
        }
    }

    //Boolean methods
    isMoving() {
        return this.#moving;
    }

}