function playerTwoMove() {
     //player2 movement
     if (keys.l.pressed && enemy.lastKey === 'l') {
        enemy.velocity.x = 7
        enemy.switchSprite('run')
    }
    else if (keys.j.pressed && enemy.lastKey === 'j') {
        enemy.velocity.x = -7
        enemy.switchSprite('run')
    }
    else {
        enemy.switchSprite('idle')
    }
}

function playerTwoSlide() {
    //player2 slide
    if (keys.k.pressed && enemy.lastKey === 'j') {
        enemy.velocity.x = -15
        enemy.switchSprite('slide')
    }
}

function playerTwoJump() {
    //player2 jump
    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump')
    }
    else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall')
    }
}

function playerTwoDetect() {
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

        //animate health bar damage
        gsap.to('#playerHealth', {
            width: player.health + '%'
        })
    }
}

function playerTwoMiss() {
    //if player2 misses
    if (enemy.isAttacking && enemy.framesCurrent === 2) {
        enemy.isAttacking = false
    }
}