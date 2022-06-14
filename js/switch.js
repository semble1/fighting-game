const characters = document.querySelector('.characters')
const knight = document.querySelector('.knight')
const adv = document.querySelector('.adv')
const ranger = document.querySelector('.ranger')

knight.onclick = function() {
    player.scale = 3
    player.framesHold = 3
    player.offset = {
        x: 130,
        y: 100
    }
    player.attackBox.width = 115
    player.sprites = knightSprites
    for (const sprite in player.sprites) {
        knightSprites[sprite].image = new Image()
        knightSprites[sprite].image.src = knightSprites[sprite].imageSrc
    }
    characters.remove()
    animate()
}

adv.onclick = function() {
    player.scale = 3.5
    player.framesHold = 5
    player.offset = {
        x: 130,
        y: -12
    }
    player.attackBox.width = 35
    player.attackBox.offset.x = 50
    player.offset.x = 30
    player.position.x = 100
    player.sprites = advSprites
    for (const sprite in player.sprites) {
        advSprites[sprite].image = new Image()
        advSprites[sprite].image.src = advSprites[sprite].imageSrc
    }
    characters.remove()
    animate()
}

ranger.onclick = function() {
    player.scale = 2.5
    player.framesHold = 5
    player.offset = {
        x: 130,
        y: 175
    }
    player.attackBox.width = 290
    player.attackBox.offset.x = 100
    player.offset.x = 300
    player.sprites = rangerSprites
    for (const sprite in player.sprites) {
        rangerSprites[sprite].image = new Image()
        rangerSprites[sprite].image.src = rangerSprites[sprite].imageSrc
    }
    characters.remove()
    animate()
}