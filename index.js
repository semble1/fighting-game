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
        x: 100,
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
    scale: 3,
    offset: {
        x: 130,
        y: 100
    },
    framesHold: 3,
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
            framesMax: 2
        },
        roll: {
            imageSrc: './assets/knight/knightRoll.png',
            framesMax: 12
        },
        takeHit: {
            imageSrc: './assets/knight/knightTakeHit.png',
            framesMax: 3
        },
        takeHit: {
            imageSrc: './assets/knight/knightTakeHit.png',
            framesMax: 3
        },
        death: {
            imageSrc: './assets/knight/knightDeath.png',
            framesMax: 10
        }
    },
    attackBox: {
        offset: {
            x: 45,
            y: 50
        },
        width: 115,
        height: 50
    }
})

const enemy = new Fighter({
    position: {
        x: 800,
        y: 0
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
    scale: 3,
    offset: {
        x: 130,
        y: 100
    },
    framesHold: 3,
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
            framesMax: 2
        },
        roll: {
            imageSrc: './assets/enemyknight/knightRoll.png',
            framesMax: 12
        },
        takeHit: {
            imageSrc: './assets/enemyknight/knightTakeHit.png',
            framesMax: 3
        },
        death: {
            imageSrc: './assets/enemyknight/knightDeath.png',
            framesMax: 10
        }
    },
    attackBox: {
        offset: {
            x: -115,
            y: 50
        },
        width: 120,
        height: 50
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
    e: {
        pressed: false
    },
    s: {
        pressed: false
    },
    i: {
        pressed: false
    },
    j: {
        pressed: false
    },
    k: {
        pressed: false
    },
    l: {
        pressed: false
    },
    u: {
        pressed: false
    },
    k: {
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
    
    //player1 slide
    if (keys.s.pressed && player.lastKey === 'd') {
        player.velocity.x = 20
        player.switchSprite('slide')
    }

    //player1 jump
    if (player.velocity.y < 0) {
        player.switchSprite('jump')
    }
    else if (player.velocity.y > 0) {
        player.switchSprite('fall')
    }

    //player2 movement
    if (keys.l.pressed && enemy.lastKey === 'l') {
        enemy.velocity.x = 10
        enemy.switchSprite('run')
    }
    else if (keys.j.pressed && enemy.lastKey === 'j') {
        enemy.velocity.x = -10
        enemy.switchSprite('run')
    }
    else {
        enemy.switchSprite('idle')
    }

    //player2 slide
    if (keys.k.pressed && enemy.lastKey === 'j') {
        enemy.velocity.x = -20
        enemy.switchSprite('slide')
    }

    //player2 jump
    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump')
    }
    else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall')
    }

    //detect for collisions & player 2 gets hit
    if (
        rectangularCollision({
            rectangle1: player,
            rectangle2: enemy
        }) && 
        player.isAttacking && 
        player.framesCurrent === 2 &&
        enemy.isRolling === false)
        {
        enemy.takeHit()
        player.isAttacking = false

        document.querySelector('#enemyHealth').style.width = enemy.health + '%'
    }

    //if player1 misses
    if (player.isAttacking && player.framesCurrent === 2) {
        player.isAttacking = false
    }

    //detect for collisions & player 1 gets hit
    if (
        rectangularCollision({
            rectangle1: enemy,
            rectangle2: player
        }) && 
        enemy.isAttacking && 
        enemy.framesCurrent === 2 &&
        player.isRolling === false) 
        {
        player.takeHit()
        enemy.isAttacking = false

        document.querySelector('#playerHealth').style.width = player.health + '%'
    }

    //if player2 misses
    if (enemy.isAttacking && enemy.framesCurrent === 2) {
        enemy.isAttacking = false
    }

    //end game based on health
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({player, enemy, timerId})
    }
}

animate()

window.addEventListener('keydown', (event) => {
    if (!player.dead) {
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
            case 'e':
                player.attack()
            break
            case 'f':
                player.roll()
            break
        }
    }

    if (!enemy.dead) {
        switch (event.key) {
            case 'l':
                keys.l.pressed = true
                enemy.lastKey = 'l'
            break
            case 'j':
                keys.j.pressed = true
                enemy.lastKey = 'j'
            break
            case 'i':
                enemy.velocity.y = -20
            break
            case 'u':
                enemy.attack()
            break
            case 'h':
                enemy.roll()
            break
            case 'k':
                keys.k.pressed = true
            break
        }
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
        case 'l':
            keys.l.pressed = false
        break
        case 'j':
            keys.j.pressed = false
        break
        case 'k':
            keys.k.pressed = false
        break
    }
})