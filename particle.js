// particle.js

//the idea of using "particle" is inspired by an article: "chrome-extension://efaidnbmnnnibpcajpcglclefindmkaj/https://www.lri.fr/~mbl/ENS/IG2/devoir2/files/docs/fuzzyParticles.pdf" 
//create particle class
class Particle {
    constructor(image) {
        this.image = image;
    //all the frames for the animation
        this.totalFrame = image.length;
    //the current frame position
    //about how to use round(), reference:https://p5js.org/reference/#/p5/round
        this.curFrame = round(random(0, this.totalFrame));
    }

    show() {
    //reference about the idea of frameCount: https://p5js.org/reference/#/p5/frameCount
    //reference of "===": https://p5js.org/reference/#/p5/===
    //changing the frames of clouds and lightning, the smaller number after "%", the faster changes for the clouds and lightnings
       this.curFrame += (frameCount % 2 === 0);
    //let the elements of particle system appears in order, and defines their positions
        let changeframes = this.curFrame % this.totalFrame;
        imageMode(CENTER);
        image(this.image[changeframes], this.position.x, this.position.y);
    }
    //if the x coordinate is less than 0, the particle will disappear
    isDead() {
        return this.position.x < 0 ? true : false;
    }
    //the definition of update comes from the reference: https://p5js.org/reference/#/p5.PeakDetect/update
    //the speed of the particles moving from right to left
    update() {
        this.position.x -= this.speed;
    }
    //the birth position of the point, the class of point can be found in another file "position.js"
    birth(point) {
        this.curFrame = round(random(0, this.totalFrame));
        this.position = point;
    }

}
//the class of the amount of particles
class ParticleSystem {
    constructor(image) {
        this.image = image;
        this.Particle == Particle; // constructor function of particle class (above)
        this.list = []; // for holding particles in a list
        this.prob =0.5; // probability of emitting one particle in each frame; that's why the colors of different particles are different
        this.num = 56; // the maximum number of particles in the list
    }

    //set the number of particles when they "birth" at the begining
    emit() {
        if (this.list.length < this.num && random() < this.prob) {//"&&" satisfy two conditions
            let particle = new this.Particle(this.image);
            particle.birth( new Point(width, random(0, height)) );
            this.list.push(particle);
        }
    }
    //if one particle in the list "isDead", it will be removed from the list
    remove() {
        for (let i in this.list)
            if (this.list[i].isDead())
            //about how to use splice, reference: https://p5js.org/reference/#/p5/splice
            //clean the "dead" particle
                this.list.splice(i, 1);
    }
    //update from the begining to the last
    update() {
        this.list.forEach(p => p.update())
    }
    //show from the begining to the last
    show() {
        this.list.forEach(p => p.show())
    }
    //run all the programs
    run() {
        this.emit();
        this.update();
        this.show();
        this.remove();
    }
    //reload a round of the list
    reload() {
        this.list = []
    }
}

    class Cloud extends Particle {
      
    constructor(image) {
        super(image);
        this.speed = 22;
    }
}

    class CloudSystem extends ParticleSystem {
    constructor(image) {
        super(image);
        this.Particle = Cloud;
        this.num = 33;
        this.prob =0.26;
    }
}

    class Ghost extends Particle {
    constructor(image) {
        super(image);
        this.speed = 20;
    }

    show() {
        imageMode(CENTER);
        image(this.image[0], this.position.x, this.position.y);
    }
}

class GhostSystem extends ParticleSystem {
    constructor(image) {
        super(image);
        this.Particle = Ghost;
        this.num = 20;
    }

    emit(pos) {
        if (this.list.length < this.num) {
           let ghost = new this.Particle(this.image);
          ghost.position = pos; 
           this.list.push(ghost);
        }
    }
}

    class Lightning extends Particle {
    constructor(image) {
        super(image);
        this.speed = 30;
    }

    //"vulnerable" is defined in another file "cute Pikachu.js"
        hit(cute) {
      if(cute.vulnerable && this.position.isInsideSquare(cute.position, 50))//isInsideSquare is defined in another file "position.js"
           cute.hurt();
    }
}

    class LightningSystem extends ParticleSystem {
    constructor(image) {
        super(image);
        this.Particle = Lightning;
        this.num = 15;
        this.prob = 0.3;
    }

        loadCute(cute) {
       this.cute = cute;
    }

    hit() {
       this.list.forEach(element => element.hit(this.cute));
    }

    run() {
        super.run();
        this.hit();
    }
}
