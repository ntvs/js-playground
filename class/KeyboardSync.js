const KEYBIND = {
    UP: "w",
    DOWN: "s",
    LEFT: "a",
    RIGHT: "d"
};

class KeyboardSync {
    DIRECTION = "";

    debugEnabled = false;

    constructor(eventEmitter, debugEnabled) {

        this.debugEnabled = debugEnabled

        eventEmitter.addEventListener('keydown', (e) => {
            
            if (this.DIRECTION === "") {
                if (e.key.toLowerCase() == KEYBIND.UP) {
                    this.DIRECTION = "UP";
                } else if (e.key.toLowerCase() == KEYBIND.DOWN) {
                    this.DIRECTION = "DOWN";
                } else if (e.key.toLowerCase() == KEYBIND.LEFT) {
                    this.DIRECTION = "LEFT";
                } else if (e.key.toLowerCase() == KEYBIND.RIGHT) {
                    this.DIRECTION = "RIGHT";
                }
            }
            
            if (this.debugEnabled) {
                console.log("Unbound key pressed", e);
            }
        });

        eventEmitter.addEventListener('keyup', (e) => {
            
            //issue here
            if (e.key.toLowerCase() == KEYBIND.UP || e.key.toLowerCase() == KEYBIND.DOWN || e.key.toLowerCase() == KEYBIND.LEFT || e.key.toLowerCase() == KEYBIND.RIGHT) {
                this.DIRECTION = "";
            }
            
            if (this.debugEnabled) {
                console.log("Unbound key depressed", e);
            }
        });

    }
}