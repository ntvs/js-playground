//Constants
const FRAMERATE = 30; //Target frames per second
const TARGET = 1000/FRAMERATE; //Target frame duration, in milliseconds
const X_OFFSET = 8; //X offset in px, used to center 32x32px sprite 
const TILE_SIZE = 16; //Size of a tile on the grid in px

//Javascript sleep implemented with promises
function sleep(n) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {resolve()}, n);
    });
}

//Initialize an array of sprites in order (synchronously load textures)
function initSprites(spriteArray) {
    console.log("Initializing sprites...");
    spriteArray.forEach(async sprite => {
        await sprite.init();
    });
    console.log("Sprites initialized successfully.");
}

//Sequentially render an array of sprites in the provided order
function sequentialRender(spriteArray, context2d) {
    spriteArray.forEach(sprite => {
        sprite.render(context2d);
    });
}

function handlePlayerMovement(char, keyboard) {
    let inputVector = keyboard.getInputVector();

    //normalization hack
    if (inputVector.x !== 0 && inputVector.y !== 0) {
        inputVector = {x: inputVector.x * 0.5, y: inputVector.y * 0.5};
    }
    
    //If the character is already moving, keep moving him until hes back on the grid
    if (char.isMoving() && ((char.sprite.position.x-X_OFFSET) % TILE_SIZE !== 0) || (char.sprite.position.y) % TILE_SIZE !== 0) {
        char.move(char.getDirection());
    }

    //If he's on the grid, regardless of if he's moving or not, we can receive new input
    else if (((char.sprite.position.x-X_OFFSET) % TILE_SIZE == 0) || (char.sprite.position.y) % TILE_SIZE == 0) {
        char.move(inputVector);
    }
}

//Main function
async function main() {
    let delta = 1; //Initial delta time if needed

    //Canvas
    const canvas = document.querySelector("canvas");
    const context2d = canvas.getContext("2d");

    //Initialize sprites/layers
    let sprites = [
        new Sprite("./assets/backgrounds/debug_2.png", false, {x: 0, y: 0}, true), // 0: background
        new Sprite("./assets/characters/debug.png", true, {x: X_OFFSET+(16*6), y: 0+(16*5)}, true), // 1: character
        new Sprite("./assets/environment/light_mask.png", false, {x: 0, y: 0}, true), // 2: light map
        new Sprite("./assets/environment/watermark.png", false, {x: 0, y: 0}, true) // 3: demo watermark
    ];
    initSprites(sprites);

    let char = new Character(sprites[1], context2d, {speed: 2});

    //let keyboard = new KeyboardSync(window, false);
    let keyboard = new Keyboard(window, false);
    
    while (true) {
        let starTime = Date.now(); //Time at start of execution

        //execution here
        handlePlayerMovement(char, keyboard);
        
        sequentialRender(sprites, context2d);

        delta = Date.now() - starTime; //Change in time between beginning of execution to the end
        
        //If execution occurred faster than the target time, wait the remaining time
        //If execution took longer than the target, proceed without waiting
        if(delta < TARGET) {
            //console.log(`Delta: ${delta}ms. Sleeping ${TARGET-delta}ms...`);
            await sleep(TARGET-delta);
        }
    }
}

main();