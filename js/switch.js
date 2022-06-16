const characters = document.querySelector('.characters')
const knight = document.querySelector('.knight')
const blade = document.querySelector('.blade')
const ranger = document.querySelector('.ranger')
const priest = document.querySelector('.priest')
const shin = document.querySelector('.shin')
const monk = document.querySelector('.monk')

knight.onclick = function() {
    player.scale = 2.5
    player.framesHold = 5
    player.offset = {
        x: 130,
        y: 177
    }
    player.attackBox.width = 115
    player.offset.x = 300
    player.sprites = knightSprites
    for (const sprite in player.sprites) {
        knightSprites[sprite].image = new Image()
        knightSprites[sprite].image.src = knightSprites[sprite].imageSrc
    }
    characters.remove()
    animate()
}

ranger.onclick = function() {
    player.scale = 2.5
    player.framesHold = 5
    player.offset = {
        x: 130,
        y: 177
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

blade.onclick = function() {
    player.scale = 2.55
    player.framesHold = 5
    player.offset = {
        x: 130,
        y: 183
    }
    player.attackBox.width = 90
    player.attackBox.offset.x = 50
    player.offset.x = 300
    player.sprites = bladeSprites
    for (const sprite in player.sprites) {
        bladeSprites[sprite].image = new Image()
        bladeSprites[sprite].image.src = bladeSprites[sprite].imageSrc
    }
    characters.remove()
    animate()
}

priest.onclick = function() {
    player.scale = 2.6
    player.framesHold = 5
    player.offset = {
        x: 130,
        y: 190
    }
    player.attackBox.width = 85
    player.attackBox.offset.x = 100
    player.offset.x = 300
    player.sprites = priestSprites
    for (const sprite in player.sprites) {
        priestSprites[sprite].image = new Image()
        priestSprites[sprite].image.src = priestSprites[sprite].imageSrc
    }
    characters.remove()
    animate()
}

shin.onclick = function() {
    player.scale = 2.6
    player.framesHold = 5
    player.offset = {
        x: 130,
        y: 190
    }
    player.attackBox.width = 20
    player.attackBox.offset.x = 100
    player.offset.x = 300
    player.sprites = shinSprites
    for (const sprite in player.sprites) {
        shinSprites[sprite].image = new Image()
        shinSprites[sprite].image.src = shinSprites[sprite].imageSrc
    }
    characters.remove()
    animate()
}

monk.onclick = function() {
    player.scale = 3.1
    player.framesHold = 5
    player.offset = {
        x: 130,
        y: 235
    }
    player.attackBox.width = 10
    player.attackBox.offset.x = 80
    player.offset.x = 400
    player.sprites = monkSprites
    for (const sprite in player.sprites) {
        monkSprites[sprite].image = new Image()
        monkSprites[sprite].image.src = monkSprites[sprite].imageSrc
    }
    characters.remove()
    animate()
}