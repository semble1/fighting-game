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

function attackSpecial() {
    if (keys.s.pressed && player.comboKey === 'a' && player.velocity.y === 0) {
        player.specialAttack++
        if (player.specialAttack < 4) {
            keys.d.pressed = false
            player.stuck = true
            player.isAttacking = true
            player.lastSprite = player.sprites.special
            player.switchSprite('special')
            player.comboKey = 'e'
            if (player.sprites === bladeSprites) {
                setTimeout(function() {player.stuck = false}, 800)
            }
            else if (player.sprites === priestSprites || player.sprites === shinSprites) {
                setTimeout(function() {player.stuck = false}, 2500)
            }
            else if (player.sprites === monkSprites) {
                setTimeout(function() {player.stuck = false}, 1800)
            }
            else {setTimeout(function() {player.stuck = false}, 1200)}
        }
        else {return}
    }
}

function parryAttack() {
    if (player.comboKey === 'q' && enemy.isParryable) {
        player.switchSprite('special')
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
            enemy.isRolling === false
        ) {
            if (player.velocity.y != 0 && player.framesCurrent === 3) {
                enemy.takeHit(5)
            }
            else if (player.lastSprite === player.sprites.special && player.framesCurrent === 12) {
                enemy.stuck = true
                enemy.takeHit(20)
                setTimeout(function() {enemy.takeHit(1)}, 700)
                setTimeout(function() {enemy.takeHit(1)}, 1400)
                setTimeout(function() {enemy.takeHit(1)}, 2100)
                setTimeout(function() {enemy.takeHit(1)}, 2800)
                setTimeout(function() {enemy.takeHit(1)}, 3500)
                setTimeout(function() {enemy.stuck = false}, 100)
            }
            else if (player.lastSprite === knightSprites.attack1 && player.framesCurrent === 4) {
                enemy.takeHit(5)
            }
            else if (player.lastSprite === knightSprites.attack2 && player.framesCurrent === 4) {
                enemy.takeHit(2.5)
                setTimeout(function() {enemy.takeHit(2.5)}, 200)
            }
        }

        //animate health bar damage
        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        })

        //if attack misses
        if (player.isAttacking) {
            if (player.velocity.y != 0 && player.framesCurrent === 3) {
                player.isAttacking = false
            }
            else if (player.lastSprite === player.sprites.special && player.framesCurrent === 12) {
                player.isAttacking = false
            }
            else if (player.lastSprite === knightSprites.attack1 && player.framesCurrent === 4) {
                player.isAttacking = false
            }
            else if (player.lastSprite === knightSprites.attack2 && player.framesCurrent === 4) {
                player.isAttacking = false
            }
        }
    }
}

function knightCombos() {
    if (player.sprites === knightSprites) {
        if (player.velocity.y !=0) {
            player.attackBox.width = 175
            player.attackBox.offset.x = 45
            player.switchSprite('air')
        }
        else if (player.lastSprite === knightSprites.attack1) {
            player.attackBox.width = 225
            player.attackBox.offset.x = -60
            player.switchSprite('attack2')
        } else {
            player.attackBox.width = 115
            player.attackBox.offset.x = 45
            player.switchSprite('attack1')
        }
    }
}

function knightSpecial() {
    if (player.sprites === knightSprites) {
        if (player.lastSprite === player.sprites.special) {
            player.attackBox.width = 200
            player.attackBox.offset.x = 45
        }
    }
}

const cancelAnimationFrame = window.cancelAnimationFrame

function poisonArrow() {
    anim = window.requestAnimationFrame(poisonArrow)
    poison.position.x = enemy.position.x - 240
    poison.position.y = enemy.position.y - 50
    poison.update()
    
    setTimeout(function() {cancelAnimationFrame(anim)}, 2350)
}

function tangleArrow() {
    anim = window.requestAnimationFrame(tangleArrow)
    tangle.position.x = enemy.position.x - 240
    tangle.position.y = enemy.position.y - 50
    tangle.update()
    
    setTimeout(function() {cancelAnimationFrame(anim)}, 700)
}

function rangerAttack() {
    if (player.sprites === rangerSprites) {
        if (
            rectangularCollision({
                rectangle1: player,
                rectangle2: enemy
            }) &&
            player.isAttacking &&
            enemy.isRolling === false
        ) {
            //air attack
            if (player.velocity.y != 0 && player.framesCurrent === 5) {
                enemy.takeHit(5)
            }
            //special
            else if (player.lastSprite === player.sprites.special && player.framesCurrent === 8) {
                enemy.stuck = true
                enemy.takeHit(20)
                setTimeout(function() {enemy.stuck = false}, 100)
            }
            //basic attack
            else if (player.lastSprite === rangerSprites.attack1 && player.framesCurrent === 4) {
                enemy.takeHit(5)
            }
            //poison arrow
            else if (player.lastSprite === rangerSprites.attack2 && 
                player.framesCurrent === 8 && 
                player.comboKey === 'a') {
                    enemy.takeHit(2)
                    setTimeout(function() {enemy.takeHit(2)}, 600)
                    setTimeout(function() {enemy.takeHit(2)}, 1200)
                    setTimeout(function() {enemy.takeHit(2)}, 1800)
                    poisonArrow()
                    player.comboKey = 'e'
            }
            //tangle arrow
            else if (player.lastSprite === rangerSprites.attack2 && 
                player.framesCurrent === 8 && 
                player.comboKey === 'w') {
                    enemy.takeHit(10)
                    setTimeout(function() {
                        enemy.velocity.x = 100
                    }, 50)
                    tangleArrow()
                    player.comboKey = 'e'
            }
            //basic arrow
            else if (player.lastSprite === rangerSprites.attack2 && player.framesCurrent === 8) {
                enemy.takeHit(5)
            }   
        }

        //animate health bar damage
        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        })

        //if attack misses
        if (player.isAttacking) {
            if (player.velocity.y != 0 && player.framesCurrent === 5) {
                player.isAttacking = false
            }
            else if (player.lastSprite === player.sprites.special && player.framesCurrent === 8) {
                player.isAttacking = false
            }
            else if (player.lastSprite === rangerSprites.attack1 && player.framesCurrent === 4) {
                player.isAttacking = false
            }
            else if (player.lastSprite === rangerSprites.attack2 && player.framesCurrent === 8) {
                player.isAttacking = false
            }
        }
    }
}

function rangerCombos() {
    if (player.sprites === rangerSprites) {
        if (player.velocity.y !=0) {
            player.attackBox.width = 80
            player.attackBox.offset.x = 145
            player.attackBox.offset.y = 100
            player.attackBox.height = 300
            player.switchSprite('air')
        }
        else if (player.lastSprite === rangerSprites.attack1) {
            player.attackBox.width = 290
            player.attackBox.height = 50
            player.attackBox.offset.y = 50
            player.attackBox.offset.x = 100
            player.switchSprite('attack2')
        } 
        else {
            player.attackBox.width = 120
            player.attackBox.height = 50
            player.attackBox.offset.y = 50
            player.attackBox.offset.x = 100
            player.switchSprite('attack1')
        }
    }
}

function rangerSpecial() {
    if (player.sprites === rangerSprites) {
        if (player.lastSprite === player.sprites.special) {
            player.attackBox.width = 270
        }
    }
}

function bladeAttack() {
    if (player.sprites === bladeSprites) {
        if (
            rectangularCollision({
                rectangle1: player,
                rectangle2: enemy
            }) &&
            player.isAttacking &&
            enemy.isRolling === false
        ) {
            if (player.velocity.y != 0 && player.framesCurrent === 3) {
                enemy.takeHit(3)
                setTimeout(function() {enemy.takeHit(1)}, 100)
                setTimeout(function() {enemy.takeHit(1)}, 200)
            }
            else if (player.lastSprite === player.sprites.special && player.framesCurrent === 4) {
                enemy.stuck = true
                enemy.takeHit(20)
                setTimeout(function() {enemy.stuck = false}, 500)
            }
            else if (player.lastSprite === bladeSprites.attack1 && player.framesCurrent === 2) {
                enemy.takeHit(5)
            }
            else if (player.lastSprite === bladeSprites.attack2 && player.framesCurrent === 2) {
                enemy.takeHit(5)
            }
            else if (player.lastSprite === bladeSprites.attack3 && player.framesCurrent === 2 && player.velocity.y === 0) {
                enemy.takeHit(5)
                setTimeout(function() {enemy.takeHit(1)}, 200)
                setTimeout(function() {enemy.takeHit(1)}, 300)
                setTimeout(function() {enemy.takeHit(1)}, 400)
                setTimeout(function() {enemy.takeHit(1)}, 500)
                setTimeout(function() {enemy.takeHit(1)}, 600)
                setTimeout(function() {enemy.takeHit(1)}, 700)
            }
        }

        //animate health bar damage
        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        })

        //if attack misses
        if (player.isAttacking) {
            if (player.velocity.y != 0 && player.framesCurrent === 3) {
                player.isAttacking = false
            }
            else if (player.lastSprite === player.sprites.special && player.framesCurrent === 4) {
                player.isAttacking = false
            }
            else if (player.lastSprite === bladeSprites.attack1 && player.framesCurrent === 2){
                player.isAttacking = false
            }
            else if (player.lastSprite === bladeSprites.attack2 && player.framesCurrent === 2){
                player.isAttacking = false
            }
            else if (player.lastSprite === bladeSprites.attack3 && player.framesCurrent === 2 && player.velocity.y === 0){
                player.isAttacking = false
            }
        }
    }
}

function bladeCombos() {
    if (player.sprites === bladeSprites) {
        if (player.velocity.y !=0) {
            player.attackBox.width = 60
            player.attackBox.offset.x = 140
            player.switchSprite('air')
        }
        else if (player.lastSprite === bladeSprites.attack1) {
            player.attackBox.width = 90
            player.attackBox.offset.x = 50
            player.switchSprite('attack2')
        } 
        else if (player.lastSprite === bladeSprites.attack2) {
            player.attackBox.width = 90
            player.attackBox.offset.x = 50
            player.switchSprite('attack3')
        }
        else {
            player.attackBox.width = 90
            player.attackBox.offset.x = 50
            player.switchSprite('attack1')
        }
    }
}

function bladeSpecial() {
    if (player.sprites === bladeSprites) {
        if (player.lastSprite === player.sprites.special) {
            player.attackBox.width = 450
            player.attackBox.offset.x = -150
        }
    }
}

function priestAttack() {
    if (player.sprites === priestSprites) {
        if (
            rectangularCollision({
                rectangle1: player,
                rectangle2: enemy
            }) &&
            player.isAttacking &&
            enemy.isRolling === false
        ) {
            //air attack
            if (player.velocity.y != 0 && player.framesCurrent === 3) {
                enemy.takeHit(5)
                enemy.velocity.x = 50
            }
            //special
            else if (player.lastSprite === player.sprites.special && player.framesCurrent === 13) {
                enemy.stuck = true
                enemy.takeHit(15)
                setTimeout(function() {enemy.takeHit(5)}, 700)
                setTimeout(function() {enemy.stuck = false}, 1000)
            }
            //basic attack
            else if (player.lastSprite === priestSprites.attack1 && player.framesCurrent === 3) {
                enemy.takeHit(4)
            }
            //basic arrow
            else if (player.lastSprite === priestSprites.attack2 && player.framesCurrent === 11) {
                enemy.takeHit(6)
                enemy.velocity.x = 50
            }
        }

        //animate health bar damage
        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        })

        //if attack misses
        if (player.isAttacking) {
            if (player.velocity.y != 0 && player.framesCurrent === 3) {
                player.isAttacking = false
            }
            else if (player.lastSprite === player.sprites.special && player.framesCurrent === 13) {
                player.isAttacking = false
            }
            else if (player.lastSprite === priestSprites.attack1 && player.framesCurrent === 3) {
                player.isAttacking = false
            }
            else if (player.lastSprite === priestSprites.attack2 && player.framesCurrent === 11) {
                player.isAttacking = false
            }
        }
    }
}

function priestCombos() {
    if (player.sprites === priestSprites) {
        if (player.velocity.y !=0) {
            player.attackBox.width = 85
            player.attackBox.offset.x = 150
            player.switchSprite('air')
        }
        else if (player.lastSprite === priestSprites.attack1) {
            player.attackBox.width = 85
            player.attackBox.offset.x = 100
            player.switchSprite('attack2')
        } 
        else {
            player.attackBox.width = 85
            player.attackBox.offset.x = 100
            player.switchSprite('attack1')
        }
    }
}

function priestSpecial() {
    if (player.sprites === priestSprites) {
        if (player.lastSprite === player.sprites.special) {
            player.attackBox.width = 70
            player.attackBox.offset.x = 150
        }
    }
}

function shinAttack() {
    if (player.sprites === shinSprites) {
        if (
            rectangularCollision({
                rectangle1: player,
                rectangle2: enemy
            }) &&
            player.isAttacking &&
            enemy.isRolling === false
        ) {
            if (player.velocity.y != 0 && player.framesCurrent === 3) {
                enemy.takeHit(6)
            }
            else if (player.lastSprite === player.sprites.special && player.framesCurrent === 12) {
                enemy.stuck = true
                enemy.takeHit(10)
                setTimeout(function() {enemy.takeHit(10)}, 400)
                setTimeout(function() {enemy.takeHit(10)}, 600)
                setTimeout(function() {enemy.stuck = false}, 1000)

            }
            else if (player.lastSprite === shinSprites.attack1 && player.framesCurrent === 2) {
                enemy.takeHit(4)
            }
            else if (player.lastSprite === shinSprites.attack2 && player.framesCurrent === 2) {
                setTimeout(function() {enemy.takeHit(2)}, 150)
                setTimeout(function() {enemy.takeHit(2)}, 250)
                setTimeout(function() {enemy.takeHit(2)}, 350)
            }
        }

        //animate health bar damage
        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        })

        //if attack misses
        if (player.isAttacking) {
            if (player.velocity.y != 0 && player.framesCurrent === 3) {
                player.isAttacking = false
            }
            else if (player.lastSprite === player.sprites.special && player.framesCurrent === 12) {
                player.isAttacking = false
            }
            else if (player.lastSprite === shinSprites.attack1 && player.framesCurrent === 2) {
                player.isAttacking = false
            }
            else if (player.lastSprite === shinSprites.attack2 && player.framesCurrent === 2) {
                player.isAttacking = false
            }
        }
    }
}

function shinCombos() {
    if (player.sprites === shinSprites) {
        if (player.velocity.y !=0) {
            player.attackBox.width = 100
            player.attackBox.offset.x = 100
            player.switchSprite('air')
        }
        else if (player.lastSprite === shinSprites.attack1) {
            player.attackBox.width = 100
            player.attackBox.offset.x = 100
            player.switchSprite('attack2')
        }
        else {
            player.attackBox.width = 25
            player.attackBox.offset.x = 100
            player.switchSprite('attack1')
        }
    }
}

function shinSpecial() {
    if (player.sprites === shinSprites) {
        if (player.lastSprite === player.sprites.special) {
            player.attackBox.width = 50
            player.attackBox.offset.x = 20
        }
    }
}

function monkAttack() {
    if (player.sprites === monkSprites) {
        if (
            rectangularCollision({
                rectangle1: player,
                rectangle2: enemy
            }) &&
            player.isAttacking &&
            enemy.isRolling === false
        ) {
            if (player.velocity.y != 0 && player.framesCurrent === 3) {
                enemy.takeHit(5)
            }
            else if (player.lastSprite === player.sprites.special && player.framesCurrent === 7) {
                enemy.stuck = true
                enemy.takeHit(10)
                setTimeout(function() {enemy.takeHit(10)}, 1000)
                setTimeout(function() {enemy.stuck = false}, 1500)
            }
            if (player.lastSprite === monkSprites.attack1 && player.framesCurrent === 2) {
                enemy.takeHit(5)
            }
            else if (player.lastSprite === monkSprites.attack2 && player.framesCurrent === 2) {
                enemy.takeHit(5)
                setTimeout(function() {enemy.takeHit(5)}, 200)
            }
        }

        //animate health bar damage
        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        })

        //if attack misses
        if (player.isAttacking) {
            if (player.velocity.y != 0 && player.framesCurrent === 3) {
                player.isAttacking = false
            }
            else if (player.lastSprite === player.sprites.special && player.framesCurrent === 7) {
                player.isAttacking = false
            }
            else if (player.lastSprite === monkSprites.attack1 && player.framesCurrent === 2) {
                player.isAttacking = false
            }
            else if (player.lastSprite === monkSprites.attack2 && player.framesCurrent === 2) {
                player.isAttacking = false
            }
        }
    }
}

function monkCombos() {
    if (player.sprites === monkSprites) {
        if (player.velocity.y !=0) {
            player.attackBox.width = 150
            player.attackBox.offset.x = -50
            player.switchSprite('air')
        }
        else if (player.lastSprite === monkSprites.attack1) {
            player.attackBox.width = 10
            player.attackBox.offset.x = 80
            player.switchSprite('attack2')
        } else {
            player.attackBox.width = 10
            player.attackBox.offset.x = 80
            player.switchSprite('attack1')
        }
    }
}

function monkSpecial() {
    if (player.sprites === monkSprites) {
        if (player.lastSprite === player.sprites.special) {
            player.attackBox.width = 80
            player.attackBox.offset.x = 80
        }
    }
}