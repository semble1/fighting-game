class Sprite {
    constructor({
        position, 
        imageSrc, 
        scale = 1, 
        framesMax = 1, 
        framesHold = 10, 
        offset = {x: 0, y: 0}
    }) {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = framesHold
        this.offset = offset
    }

    draw() {
        ctx.drawImage(
            this.image, 
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            (this.image.width / this.framesMax) * this.scale, 
            this.image.height * this.scale
        )
    }

    animateFrames() {
        this.framesElapsed++

        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent ++
            }
            else {
                this.framesCurrent = 0
            }
        }
    }

    update() {
        this.draw()
        this.animateFrames()
    }
}

let counter = 0;

class Fighter extends Sprite{
    constructor({
        position, 
        velocity, 
        color = 'red',
        imageSrc, 
        scale = 1, 
        framesMax = 1,
        offset = {x: 0, y: 0},
        framesHold = 10,
        sprites,
        attackBox = {offset: {}, width: undefined, height: undefined}
    }) {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        })

        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        }
        this.color = color
        this.isAttacking
        this.specialAttack
        this.isRolling = false
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = framesHold
        this.sprites = sprites
        this.dead = false

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }

    update() {
        this.draw()

        if (!this.dead) {
            this.animateFrames()
        }
        
        //attack boxes
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y

        //draw attack boxes
        //ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        //gravity function
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 110) {
            this.velocity.y = 0
            this.position.y = 316
        }
        else {
            this.velocity.y += gravity
        }

        //left/right boundary boxes
        if (this.position.x <= 0){
            this.position.x = 0
        }
        else if (this.position.x >= 924) {
            this.position.x = 924
        }

        //ceiling
        if (this.position.y <= 0) {
            this.position.y = 0
        }
    }

    attack() {
        counter += 1
        if (counter % 2 === 0) {
            this.switchSprite('attack1')
        }
        else {
            this.switchSprite('attack2')
        }
        
        this.isAttacking = true
        sword.play()
    }

    roll() {
        setTimeout(() => {
            this.isRolling = true
        }, 30)
        
        this.switchSprite('roll')
        rolling.play()

        setTimeout(() => {
            this.isRolling = false
        }, 550)
    }

    takeHit(dmg = 10) {
        this.health -= dmg
        hit.play()

        if (this.health <= 0) {
            this.switchSprite('death')
        }
        else this.switchSprite('takeHit')

        this.isAttacking = false
    }

    switchSprite(sprite) {
        //override all other animations
        if (this.image === this.sprites.death.image) {
            if (this.framesCurrent === this.sprites.death.framesMax -1) {
                this.dead = true
            }
            return
        }
        else if (this.image === this.sprites.attack1.image && this.framesCurrent < this.sprites.attack1.framesMax - 1) return
        else if (this.image === this.sprites.attack2.image && this.framesCurrent < this.sprites.attack2.framesMax - 1) return
        else if (this.image === this.sprites.roll.image && this.framesCurrent < this.sprites.roll.framesMax - 1) return
        else if (this.image === this.sprites.slide.image && this.framesCurrent < this.sprites.slide.framesMax - 1) return
        else if (this.sprites === rangerSprites && this.image === this.sprites.special.image && this.framesCurrent < this.sprites.special.framesMax - 1) return
        else if (this.image === this.sprites.takeHit.image && this.framesCurrent < this.sprites.takeHit.framesMax - 1) return

        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                    //this.framesHold = this.sprites.idle.framesHold
                    this.framesCurrent = 0
                }
                break
            case 'run':
                if (this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                    //this.framesHold = this.sprites.run.framesHold
                    this.framesCurrent = 0
                }
                break
            case 'jump':
                if (this.image !== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax
                    //this.framesHold = this.sprites.jump.framesHold
                    this.framesCurrent = 0
                }
                break
            case 'fall':
                if (this.image !== this.sprites.fall.image) {
                    this.image = this.sprites.fall.image
                    this.framesMax = this.sprites.fall.framesMax
                    //this.framesHold = this.sprites.fall.framesHold
                    this.framesCurrent = 0
                }
                break
            case 'attack1':
                if (this.image !== this.sprites.attack1.image) {
                    this.image = this.sprites.attack1.image
                    this.framesMax = this.sprites.attack1.framesMax
                    //this.framesHold = this.sprites.attack1.framesHold
                    this.framesCurrent = 0
                }
                break
            case 'attack2':
                if (this.image !== this.sprites.attack2.image) {
                    this.image = this.sprites.attack2.image
                    this.framesMax = this.sprites.attack2.framesMax
                    //this.framesHold = this.sprites.attack2.framesHold
                    this.framesCurrent = 0
                }
                break
            case 'special':
                if (this.image !== this.sprites.special.image) {
                    this.image = this.sprites.special.image
                    this.framesMax = this.sprites.special.framesMax
                    //this.framesHold = this.sprites.special.framesHold
                    this.framesCurrent = 0
                }
                break
            case 'slide':
                if (this.image !== this.sprites.slide.image) {
                    this.image = this.sprites.slide.image
                    this.framesMax = this.sprites.slide.framesMax
                    //this.framesHold = this.sprites.slide.framesHold
                    this.framesCurrent = 0
                }
                break
            case 'roll':
                if (this.image !== this.sprites.roll.image) {
                    this.image = this.sprites.roll.image
                    this.framesMax = this.sprites.roll.framesMax
                    //this.framesHold = this.sprites.roll.framesHold
                    this.framesCurrent = 0
                }
                break
            case 'takeHit':
                if (this.image !== this.sprites.takeHit.image) {
                    this.image = this.sprites.takeHit.image
                    this.framesMax = this.sprites.takeHit.framesMax
                    //this.framesHold = this.sprites.takeHit.framesHold
                    this.framesCurrent = 0
                }
                break
            case 'death':
                if (this.image !== this.sprites.death.image) {
                    this.image = this.sprites.death.image
                    this.framesMax = this.sprites.death.framesMax
                    //this.framesHold = this.sprites.death.framesHold
                    this.framesCurrent = 0
                }
                break
        }
    }
}