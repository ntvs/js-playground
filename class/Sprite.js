const spriteDefaults = {
    src: "./assets/characters/debug.png",
    position: {x: 0, y: 0},
    offset: {x: 0, y: 0},
    tileSize: {x: 32, y: 32},
    enabled: true,
    castsShadow: false
};

class Sprite {
    src;
    position; //sprite position on screen
    offset; //window position on spritesheet to clip
    tileSize; //size of the image/window

    enabled; //whether or not the sprite gets rendered
    castsShadow; //whether or not sprite has a shadow

    sprites = {main: new Image(), shadow: new Image()}; //object container the images for the main sprite and shadow sprite

    constructor(options) {
        if (!options) {
            this.src = spriteDefaults.src;
            this.position = Object.create(spriteDefaults.position);

            this.offset = Object.create(spriteDefaults.offset);
            this.tileSize = Object.create(spriteDefaults.tileSize);

            this.enabled = spriteDefaults.enabled;
            this.castsShadow = spriteDefaults.castsShadow;
        }

        this.src = options.src || spriteDefaults.src;
        this.position = options.position || Object.create(spriteDefaults.position);

        this.offset = options.offset || Object.create(spriteDefaults.offset);
        this.tileSize = options.tileSize || Object.create(spriteDefaults.tileSize);

        if ("enabled" in options) {
            this.enabled = options.enabled;
        } else {
            this.enabled = spriteDefaults.enabled;
        }

        if ("castsShadow" in options) {
            this.castsShadow = options.castsShadow;
        } else {
            this.castsShadow = spriteDefaults.castsShadow;
        }
    }

    //actually this is pointless and doesn't work as intended 🥲
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
            context2d.drawImage(this.sprites.main, this.offset.x*this.tileSize.x, this.offset.y*this.tileSize.y, this.tileSize.x, this.tileSize.y, this.position.x, this.position.y, this.tileSize.x, this.tileSize.y);
        }
    }
}