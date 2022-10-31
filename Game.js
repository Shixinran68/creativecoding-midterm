// Game.js

//set the three game sections' values
let GameStage = {
    WELCOME: 0,
    GAMEPLAY: 1,
    GAMEOVER: 2,
}


class Game {
    constructor() {
        this.components = {
        clouds: new CloudSystem(resources.cloudImg),
        lightnings:new LightningSystem(resources.lightningImg),
        cute: new Cute(resources.cuteImg),//ghost will be included in cute Pikachu
        UI: new UI(),
        music: new Music(resources.bgm)
        };
        this.stage = GameStage.WELCOME;
        this.components.lightnings.loadCute(this.components.cute);
        this.components.UI.loadCute(this.components.cute);
    }

    run() {
    //example of "switch" and "cases", reference: https://editor.p5js.org/esztvi/sketches/yuvIkGYR3
        switch (this.stage) {
            case GameStage.WELCOME: this.welcome(); break;
            case GameStage.GAMEPLAY: this.gamePlay(); break;
            case GameStage.GAMEOVER: this.gameOver(); break;
        }
    }

    welcome() {
        background(123,139,111);
        this.components.UI.showWelcomeMessage();
    //use "Enter" to start the game
        keyCodeEvent(ENTER, this, obj => { obj.stage = GameStage.GAMEPLAY } );
    }

    gamePlay() {
        [
             this.components.clouds,
             this.components.lightnings,
             this.components.cute
        ].forEach(element => element.run());
        //show how many lifes left 
        this.components.UI.showGameplayHUD();
        this.components.music.play();
        this.checkGameOver();
        this.cheat();
    }

    checkGameOver() {
            if (this.components.cute.life < 1) {
            this.stage = GameStage.GAMEOVER;
            this.components.music.stop();
        }
    }

    gameOver() {
        background(123,139,111);
        this.components.UI.showGameOverMessage();
        this.checkNewGame();
    }

   //press "enter" again to start the game again
    checkNewGame() {
        keyCodeEvent(ENTER, this, obj => {
            obj.stage = GameStage.GAMEPLAY;
            [
                obj.components.cute,
                obj.components.lightnings
            ].forEach(element => element.reload());
        });
    }

    //press "c" will add 1 life for the cute Pikachu
    cheat() {
        keyEvent('C', this, obj => obj.components.cute.life+=1);
        keyEvent('c', this, obj => obj.components.cute.life+=1);
    }
}

class Music {
    constructor(bgm) {
        this.bgm = bgm;
        this.firstPlay = true;
    }

    play() {
        if (this.firstPlay) { // Start to play background music
            this.bgm.play();
            this.firstPlay = false;
        }
        else if (!this.bgm.isPlaying()) // Loop
        //definition of jump, reference from: https://p5js.org/reference/#/p5.SoundFile/jump
            this.bgm.jump(4);
    }

    stop() {
        this.firstPlay = true;
        this.bgm.stop();
    }
}

class UI {
    constructor() {
        this.staticText = { // prepare fixed textobj resources
            title: new Text({
                content: "CUTE PIKACHU",
                align: [CENTER, CENTER],
                position: new Point(width / 2, height / 4),
                size: 100
            }),

            guide: new Text({
                content: "Dodge lightnings\n\nPress W,S,A,D to control\n\nPress ENTER to start",
                align: [CENTER, CENTER],
                position: new Point(width / 2, height * 0.6),
                size: 30
            }),

            gameOver: new Text({
                content: "GAME OVER",
                align: [CENTER, CENTER],
                position: new Point(width / 2, height / 4),
                size: 100
            }),
            
            playAgain: new Text({
                content: "Cute Pikachu is dead\n\nPress ENTER to play again",
                align: [CENTER, CENTER],
                position: new Point(width / 2, height * 0.6),
                size: 30
            })
        }
         this.cuteIcon = resources.cuteIcon; // Load HUD display icons
    }

    showWelcomeMessage() {
        let textobj = [this.staticText.title, this.staticText.guide];
        textobj.forEach(element => element.display());
    }

    showGameplayHUD() {
         this.showCuteLife();
    }

         showCuteLife() {
        imageMode(CENTER); // cute icon
        image(this.cuteIcon, 40, 40);
        new Text({ // cute Pikachu life number
            content: this.cute.life,
            align: [LEFT, CENTER],
            position: new Point(90, 40),
            size: 40
        }).display();
    }

         loadCute(cute) {
         this.cute = cute;
    }

    showGameOverMessage() {
        let textobj = [this.staticText.gameOver, this.staticText.playAgain];
        textobj.forEach(element => element.display());
    } 
}
