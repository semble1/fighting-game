const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const gravity = 0.9

canvas.width = 1024
canvas.height = 576

ctx.fillRect(0, 0, canvas.width, canvas.height)

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './assets/background.png'
})

const player = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    },
    imageSrc: './assets/knight/knightIdle.png',
    framesMax: 10,
    scale: 3,
    framesHold: 3,
    offset: {
        x: 130,
        y: 100
    },
    sprites: {
        idle: {
            imageSrc: './assets/knight/knightIdle.png',
            framesMax: 10
        },
        run: {
            imageSrc: './assets/knight/knightRun.png',
            framesMax: 10
        },
        jump: {
            imageSrc: './assets/knight/knightJump.png',
            framesMax: 3
        },
        fall: {
            imageSrc: './assets/knight/knightFall.png',
            framesMax: 3
        },
        attack1: {
            imageSrc: './assets/knight/knightAttack1.png',
            framesMax: 4
        },
        attack2: {
            imageSrc: './assets/knight/knightAttack2.png',
            framesMax: 6
        },
        slide: {
            imageSrc: './assets/knight/knightSlide.png',
            framesMax: 4
        },
        roll: {
            imageSrc: './assets/knight/knightRoll.png',
            framesMax: 12,
            framesHold: 2
        }     
    }
})

const enemy = new Fighter({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
    offset: {
        x: -50,
        y: 0
    },
    imageSrc: './assets/enemyknight/knightIdle.png',
    framesMax: 10,
    scale: 3,
    framesHold: 3,
    offset: {
        x: 130,
        y: 100
    },
    sprites: {
        idle: {
            imageSrc: './assets/enemyknight/knightIdle.png',
            framesMax: 10
        },
        run: {
            imageSrc: './assets/enemyknight/knightRun.png',
            framesMax: 10
        },
        jump: {
            imageSrc: './assets/enemyknight/knightJump.png',
            framesMax: 3
        },
        fall: {
            imageSrc: './assets/enemyknight/knightFall.png',
            framesMax: 3
        },
        attack1: {
            imageSrc: './assets/enemyknight/knightAttack1.png',
            framesMax: 4
        },
        attack2: {
            imageSrc: './assets/enemyknight/knightAttack2.png',
            framesMax: 6
        },
        slide: {
            imageSrc: './assets/enemyknight/knightSlide.png',
            framesMax: 4
        },
        roll: {
            imageSrc: './assets/enemyknight/knightRoll.png',
            framesMax: 12,
            framesHold: 2
        }     
    }
})

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

decreaseTimer()

function animate() {
    window.requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    background.update()

    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    //player1 movement
    if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 10
        player.switchSprite('run')
    }
    else if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -10
        player.switchSprite('run')
    }
    else {
        player.switchSprite('idle')
    }
    
    //slide
    if (keys.s.pressed && player.lastKey === 'd') {
        player.velocity.x = 20
        player.switchSprite('slide')
    }

    //jumping
    if (player.velocity.y < 0) {
        player.switchSprite('jump')
    }
    else if (player.velocity.y > 0) {
        player.switchSprite('fall')
    }

    //player2 movement
    if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 10
    }
    else if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -10
    }

    //detect for collisions
    if (
        rectangularCollision({
            rectangle1: player,
            rectangle2: enemy
        }) && 
        player.isAttacking) {
        player.isAttacking = false

        enemy.health -= 20
        document.querySelector('#enemyHealth').style.width = enemy.health + '%'
    }

    if (
        rectangularCollision({
            rectangle1: enemy,
            rectangle2: player
        }) && 
        enemy.isAttacking) {
        enemy.isAttacking = false

        player.health -= 20
        document.querySelector('#playerHealth').style.width = player.health + '%'
    }

    //end game based on health
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({player, enemy, timerId})
    }
}

animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
        break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
        break
        case 's':
            keys.s.pressed = true
        break
        case 'w':
            player.velocity.y = -20
        break
        case ' ':
            player.attack()
        break
        case 'f':
            player.switchSprite('roll')
        break

        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
        break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
        break
        case 'ArrowUp':
            enemy.velocity.y = -20
        break
        case 'ArrowDown':
            enemy.attack()
        break
    }
})

window.addEventListener('keyup', (event) => {
    //player1 keys
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
        break
        case 'a':
            keys.a.pressed = false
        break
        case 's':
            keys.s.pressed = false
        break
    }

    //player2 keys
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
        break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
        break
    }
})