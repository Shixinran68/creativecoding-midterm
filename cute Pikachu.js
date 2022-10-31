// cute Pikachu.js

//create cute Pikachu class
    class Cute {
         constructor(cuteImg) {
        this.life = 3;
        this.position = new Point(width / 8, height / 2);//initial position of the cute Pikachu
         this.image = cuteImg;
         this.ghost = new GhostSystem(resources.ghostImg);
       this.vulnerable = true;
        this.hit = false;
        this.hitDuration = 0;
        this.posA = 20;//moving distance for per keypress
    }

    run() {
         this.exitHitStatus();
         this.emitGhost();
         this.showCute();
        
    }

    //when cute Pikachu hits the lightning, it will change colors
    showCute() {
        push(); // avoid affecting other images
         let index = frameCount % 10;
        if (this.hit) {
            tint(255, 70, 70);
            this.hitDuration++;
        }
        imageMode(CENTER);
        image(this.image[int(index / 2.5)], this.position.x, this.position.y);
        pop();
    }

    exitHitStatus() {
        if (this.hit && this.hitDuration > 30 ) {
            this.hit = false;
            this.hitDuration = 0;
            this.vulnerable = true;
        }
    }

    checkEdges() {
            if (this.position.y < 0){
                this.position.y = 0;}
            else if (this.position.y > height){
                this.position.y = height;}
            else if (this.position.x <0){
                this.position.x = 0;}
            else  if(this.position.x > width){
                this.position.x = width;}
        }

//set the operating keys on the keyboard
    emitGhost() {
        for (let t = 0; t < 6; t++) {
            keyEvent('w', this, obj => obj.position.y -= obj.posA / 4);
            keyEvent('W', this, obj => obj.position.y -= obj.posA / 4);
            keyEvent('s', this, obj => obj.position.y += obj.posA / 4);
            keyEvent('S', this, obj => obj.position.y += obj.posA / 4);
            keyEvent('a', this, obj => obj.position.x -= obj.posA / 4);
            keyEvent('A', this, obj => obj.position.x -= obj.posA / 4);
            keyEvent('d', this, obj => obj.position.x += obj.posA / 4);
            keyEvent('D', this, obj => obj.position.x += obj.posA / 4);
            this.checkEdges();
            //example about how to use oscillate(), reference: https://p5js.org/reference/#/p5.Oscillator
             this.ghost.emit(new Point(this.position.x, this.position.y + this.oscillate()));
             this.ghost.remove();
             this.ghost.update();
        }
        this.ghost.show();
    }
//how the ghost will oscillate around value from -4 to 4
    oscillate() {
        return 4 * Math.sin(frameCount / 2); 
    }

    hurt() {
        //definiton of "--"", reference from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Decrement
        this.life--;
        this.vulnerable = false;
        this.hit = true;
    }

    reload() {
        this.life = 3;
         this.ghost = new GhostSystem(resources.ghostImg);
        this.vulnerable = true;
        this.hit = false;
        this.hitDuration = 0;
    }
}