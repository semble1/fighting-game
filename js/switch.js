const characters = document.querySelector('.characters')
const knight = document.querySelector('.knight')
const adv = document.querySelector('.adv')

knight.onclick = function() {
    player.scale = 3
    player.framesHold = 3
    player.offset = {
        x: 130,
        y: 100
    }
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
    player.sprites = advSprites
    for (const sprite in player.sprites) {
        advSprites[sprite].image = new Image()
        advSprites[sprite].image.src = advSprites[sprite].imageSrc
    }
    characters.remove()
    animate()
}