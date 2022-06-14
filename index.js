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
    imageSrc: './assets/background.png',
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
    attackBox: {
        offset: {
            x: 45,
            y: 50
        },
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

    player.velocity.x = 0
    enemy.velocity.x = 0

    playerOneMove()
    playerOneSlide()
    playerOneJump()
    playerOneDetect()
    playerOneMiss()
    rangerSpecial()

    playerTwoMove()
    playerTwoSlide()
    playerTwoJump()
    playerTwoDetect()
    playerTwoMiss()

    //end game based on health
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({player, enemy, timerId})
    }
}

backgroundAnimate()

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
                if (player.velocity.y != 0) {
                    return
                }
                else {
                    player.velocity.y = -20
                    jump.play()
                }
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
            case 'k':
                keys.k.pressed = true
            break
            case 'i':
                if (enemy.velocity.y != 0) {
                    return
                }
                else {
                    enemy.velocity.y = -20
                    jump.play()
                }
            break
            case 'u':
                enemy.attack()
            break
            case 'h':
                enemy.roll()
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