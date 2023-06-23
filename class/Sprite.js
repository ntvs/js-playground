class Sprite {
    src = "./assets/characters/debug.png";
    castsShadow = true;
    position = {x: 0, y: 0};
    enabled = true;

    sprites = {main: new Image(), shadow: new Image()};

    constructor(src, castsShadow, position, enabled) {
        this.src = src;
        this.castsShadow = castsShadow;
        this.position = position;
        this.enabled = enabled;
    }

    init() {
        return new Promise((resolve, reject) => {
            this.sprites.shadow.src = "./assets/environment/shadow.png";
            this.sprites.shadow.onload = () => {
                resolve();
            }
        }).then(() => new Promise((resolve, reject) => {
            this.sprites.main.src = this.src;
            this.sprites.main.onload = () => {
                resolve();
            }
        }));
    } 

    render(context2d) {
        if (this.enabled) {
            if (this.castsShadow) context2d.drawImage(this.sprites.shadow, this.position.x, this.position.y);
            context2d.drawImage(this.sprites.main, this.position.x, this.position.y);
        }
    }
}