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

//Main function
async function main() {
    const FRAMERATE = 30; //Target frames per second
    const TARGET = 1000/FRAMERATE; //target frame duration, in milliseconds
    let delta = 1;

    //Canvas
    const canvas = document.querySelector("canvas");
    const context2d = canvas.getContext("2d");

    //Initialize sprites/layers
    let sprites = [
        new Sprite("./assets/backgrounds/debug_2.png", false, {x: 0, y: 0}, true), // 0: background
        new Sprite("./assets/characters/debug.png", true, {x: 8+(16*6), y: 0+(16*5)}, true), // 1: character
        new Sprite("./assets/environment/light_mask.png", false, {x: 0, y: 0}, true), // 2: light map
        new Sprite("./assets/environment/watermark.png", false, {x: 0, y: 0}, true) // 3: demo watermark
    ];
    initSprites(sprites);

    let char = new Character(sprites[1], context2d, {speed: 2});

    let keyboard = new KeyboardSync(window, false);
    
    while (true) {
        let starTime = Date.now(); //Time at start of execution

        //execution here
        char.move(keyboard.DIRECTION, delta);
        
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