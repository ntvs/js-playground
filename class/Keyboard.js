const KEYBIND = {
    UP: "w",
    DOWN: "s",
    LEFT: "a",
    RIGHT: "d"
};

class Keyboard {
    UP = 0;
    DOWN = 0;
    LEFT = 0;
    RIGHT = 0;

    debugEnabled = false;

    constructor(eventEmitter, debugEnabled) {

        this.debugEnabled = debugEnabled

        eventEmitter.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() == KEYBIND.UP) {
                this.UP = 1;
            } else if (e.key.toLowerCase() == KEYBIND.DOWN) {
                this.DOWN = 1;
            } else if (e.key.toLowerCase() == KEYBIND.LEFT) {
                this.LEFT = 1;
            } else if (e.key.toLowerCase() == KEYBIND.RIGHT) {
                this.RIGHT = 1;
            } else if (this.debugEnabled) {
                console.log("Unbound key pressed", e);
            }
        });

        eventEmitter.addEventListener('keyup', (e) => {
            if (e.key.toLowerCase() == KEYBIND.UP) {
                this.UP = 0;
            } else if (e.key.toLowerCase() == KEYBIND.DOWN) {
                this.DOWN = 0;
            } else if (e.key.toLowerCase() == KEYBIND.LEFT) {
                this.LEFT = 0;
            } else if (e.key.toLowerCase() == KEYBIND.RIGHT) {
                this.RIGHT = 0;
            } else if (this.debugEnabled) {
                console.log("Unbound key depressed", e);
            }
        });

    }

    getInputVector() {
        return {
            x: this.RIGHT-this.LEFT,
            y: this.DOWN-this.UP
        };
    }
}