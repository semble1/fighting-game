function playerOneMove() {
    //player1 movement
    if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 7
        player.switchSprite('run')
    }
    else if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -7
        player.switchSprite('run')
    }
    else {
        player.switchSprite('idle')
    }
}

function playerOneSlide() {
    //player1 slide
    if (keys.s.pressed && player.lastKey === 'd') {
        player.velocity.x = 15
        player.switchSprite('slide')
    }
}

function playerOneJump() {
    //player1 jump
    if (player.velocity.y < 0) {
        player.switchSprite('jump')
    }
    else if (player.velocity.y > 0) {
        player.switchSprite('fall')
    }
}

function playerOneDetect() {
    //detect for collisions & player 2 gets hit
    if (
        rectangularCollision({
            rectangle1: player,
            rectangle2: enemy
        }) && 
        player.isAttacking && 
        player.framesCurrent === 2 &&
        player.sprites != rangerSprites &&
        enemy.isRolling === false)
        {
        enemy.takeHit()

        //animate health bar damage
        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        })
    }//ranger
    else if (
        rectangularCollision({
            rectangle1: player,
            rectangle2: enemy
        }) && 
        player.isAttacking && 
        player.framesCurrent === 8 &&
        player.sprites === rangerSprites &&
        enemy.isRolling === false)
        {
        enemy.takeHit()
        //ranger special (25 dmg)
        if (
            player.specialAttack
        ) {
            enemy.takeHit(15)
            player.specialAttack = false
        }

        //animate health bar damage
        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        })
    }
}

function playerOneMiss() {
    //if player1 misses
    if (player.isAttacking && 
        player.framesCurrent === 2 && 
        player.sprites != rangerSprites) {
        player.isAttacking = false
    }//ranger
    else if (player.isAttacking && 
        player.framesCurrent === 8 && 
        player.sprites === rangerSprites) {
        player.isAttacking = false
    }
}

function rangerSpecial() {
    if (keys.s.pressed && player.lastKey === 'a' && player.sprites === rangerSprites) {
        player.specialAttack = true
        player.isAttacking = true
        player.switchSprite('special')
    }
}