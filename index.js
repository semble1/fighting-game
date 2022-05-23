const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const gravity = 0.2

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
    framesMax: 15,
    scale: 3,
    framesHold: 20,
    offset: {
        x: 70,
        y: -10
    },
    sprites: {
        idle: {
            imageSrc: './assets/knight/knightIdle.png',
            framesMax: 15
        },
        run: {
            imageSrc: './assets/knight/knightRun.png',
            framesMax: 8
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
    //enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    //player1 movement
    player.image = player.sprites.idle.image
    player.framesMax = player.sprites.idle.framesMax
    if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 3
        player.image = player.sprites.run.image
        player.framesMax = player.sprites.run.framesMax
    }
    else if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -3
        player.image = player.sprites.run.image
        player.framesMax = player.sprites.run.framesMax
    }

    //player2 movement
    if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 3
    }
    else if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -3
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
        case 'w':
            player.velocity.y = -10
        break
        case ' ':
            player.attack()
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
            enemy.velocity.y = -10
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