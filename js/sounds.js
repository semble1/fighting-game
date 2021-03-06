const music = new Howl({
    src: ['./assets/sounds/background.wav'],
    loop: true,
    autoplay: true,
    volume: 0.003,
    onplayerror: function() {
        music.once('unlock', function() {
            music.play()
        })
    }
})

music.play()

const jump = new Howl({
    src: ['./assets/sounds/jump.wav'],
    volume: 0.05
})

const hit = new Howl({
    src: ['./assets/sounds/hit.wav'],
    volume: 0.05
})

const rolling = new Howl({
    src: ['./assets/sounds/roll.wav'],
    volume: 0.01
})

const sword = new Howl({
    src: ['./assets/sounds/sword.wav'],
    volume: 0.05
})