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
    if (keys.s.pressed && 
        player.lastKey === 'd' && 
        (player.sprites === priestSprites || 
        player.sprites === rangerSprites)) {
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

function knightAttack() {
    if (player.sprites === knightSprites) {
        if (
            rectangularCollision({
                rectangle1: player,
                rectangle2: enemy
            }) &&
            player.isAttacking &&
            player.framesCurrent === 4 &&
            enemy.isRolling === false
        ) {
            if (player.lastSprite === knightSprites.attack1) {
                enemy.takeHit(5)
            }
            else if (player.lastSprite === knightSprites.attack2) {
                enemy.takeHit(2.5)
                setTimeout(function() {enemy.takeHit(2.5)}, 200)
            }
        }

        //animate health bar damage
        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        })

        //if attack misses
        if (player.isAttacking &&
            player.framesCurrent === 4) {
                player.isAttacking = false
            }
    }
}

function knightCombos() {
    if (player.lastSprite === knightSprites.attack1) {
        player.attackBox.width = 225
        player.attackBox.offset.x = -60
        player.switchSprite('attack2')
    } else {
        player.attackBox.width = 115
        player.attackBox.offset.x = 45
        player.switchSprite('attack1')
    }
}

function playerOneMiss() {
    //if player1 misses
    if (player.isAttacking && 
        player.framesCurrent === 2 && 
        player.sprites != knightSprites) {
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