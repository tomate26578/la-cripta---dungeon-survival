namespace SpriteKind {
    export const Llave = SpriteKind.create()
    export const Jefe = SpriteKind.create()
    export const BalaJefe = SpriteKind.create()
}

let etapa = 1
let bajas = 0
let llaves = 0
let vidaJefe = 67
let ultimoGolpe = -1000
let jefe: Sprite = null

let suelo = image.create(16, 16)
suelo.fill(13)
suelo.setPixel(3, 5, 12)
suelo.setPixel(11, 12, 12)
let pared = image.create(16, 16)
pared.fill(12)
pared.fillRect(1, 1, 14, 14, 11)
let puerta = image.create(16, 16)
puerta.fill(12)
puerta.fillRect(4, 1, 8, 15, 6)

let mapaArena = tiles.createTilemap(
    hex`
    08000800
    0101010201010101
    0100000000000001
    0100000000000001
    0200000000000002
    0100000000000001
    0100000000000001
    0100000000000001
    0101010201010101
    `,
    image.create(8, 8),
    [suelo, pared, puerta],
    TileScale.Sixteen
)
tiles.setCurrentTilemap(mapaArena)
for (let fila = 0; fila < 8; fila++) {
    for (let columna = 0; columna < 8; columna++) {
        if (fila == 0 || fila == 7 || columna == 0 || columna == 7) {
            tiles.setWallAt(tiles.getTileLocation(columna, fila), true)
        }
    }
}

let dibujoJugador = image.create(8, 8)
dibujoJugador.fillRect(2, 0, 4, 5, 8)
dibujoJugador.fillRect(1, 4, 6, 3, 8)
dibujoJugador.setPixel(3, 2, 1)
dibujoJugador.setPixel(5, 2, 1)
let jugador = sprites.create(dibujoJugador, SpriteKind.Player)
tiles.placeOnTile(jugador, tiles.getTileLocation(4, 4))
controller.moveSprite(jugador, 80, 80)
scene.cameraFollowSprite(jugador)
scene.setBackgroundColor(15)
info.setLife(8)
info.setScore(0)

let dibujoEnemigo = image.create(8, 8)
dibujoEnemigo.fillRect(1, 1, 6, 6, 5)
dibujoEnemigo.setPixel(2, 3, 1)
dibujoEnemigo.setPixel(5, 3, 1)

let pisoLaberinto = image.create(16, 16)
pisoLaberinto.fill(7)
let muroLaberinto = image.create(16, 16)
muroLaberinto.fill(6)
muroLaberinto.fillRect(2, 2, 12, 12, 5)
let salida = image.create(16, 16)
salida.fill(11)
salida.fillRect(4, 2, 8, 14, 4)
let dibujoLlave = image.create(8, 8)
dibujoLlave.fillRect(1, 1, 3, 3, 5)
dibujoLlave.fillRect(3, 3, 2, 4, 5)
dibujoLlave.setPixel(6, 6, 5)

function ponerPared(x: number, y: number) {
    let lugar = tiles.getTileLocation(x, y)
    tiles.setTileAt(lugar, muroLaberinto)
    tiles.setWallAt(lugar, true)
}

function crearLaberinto() {
    tiles.setCurrentTilemap(tiles.createTilemap(
        hex`
        10001000
        00000000000000000000000000000000
        00000000000000000000000000000000
        00000000000000000000000000000000
        00000000000000000000000000000000
        00000000000000000000000000000000
        00000000000000000000000000000000
        00000000000000000000000000000000
        00000000000000000000000000000000
        00000000000000000000000000000000
        00000000000000000000000000000000
        00000000000000000000000000000000
        00000000000000000000000000000000
        00000000000000000000000000000000
        00000000000000000000000000000000
        00000000000000000000000000000000
        00000000000000000000000000000000
        `,
        image.create(16, 16),
        [pisoLaberinto, muroLaberinto, salida],
        TileScale.Sixteen
    ))
    scene.setBackgroundColor(1)
    for (let n = 0; n < 16; n++) {
        ponerPared(n, 0)
        ponerPared(n, 15)
        ponerPared(0, n)
        ponerPared(15, n)
    }
    for (let y = 1; y < 15; y++) {
        if (y != 3) ponerPared(4, y)
        if (y != 11) ponerPared(8, y)
        if (y != 4) ponerPared(12, y)
    }
    for (let x = 1; x < 4; x++) {
        if (x != 2) ponerPared(x, 6)
        if (x != 3) ponerPared(x, 11)
    }
    for (let x = 5; x < 8; x++) {
        if (x != 6) ponerPared(x, 5)
        if (x != 5) ponerPared(x, 10)
    }
    for (let x = 9; x < 12; x++) {
        if (x != 10) ponerPared(x, 7)
        if (x != 11) ponerPared(x, 12)
    }
    ponerPared(14, 9)
    let puerta = tiles.getTileLocation(2, 0)
    tiles.setTileAt(puerta, salida)
    tiles.setWallAt(puerta, true)
    tiles.placeOnTile(jugador, tiles.getTileLocation(2, 2))
    for (let lugar of [tiles.getTileLocation(3, 13), tiles.getTileLocation(9, 2), tiles.getTileLocation(14, 13)]) {
        let llave = sprites.create(dibujoLlave, SpriteKind.Llave)
        tiles.placeOnTile(llave, lugar)
    }
}

function crearEnemigo() {
    let enemigo = sprites.create(dibujoEnemigo, SpriteKind.Enemy)
    let entrada = Math.randomRange(0, 3)
    if (entrada == 0) tiles.placeOnTile(enemigo, tiles.getTileLocation(3, 1))
    else if (entrada == 1) tiles.placeOnTile(enemigo, tiles.getTileLocation(3, 6))
    else if (entrada == 2) tiles.placeOnTile(enemigo, tiles.getTileLocation(1, 3))
    else tiles.placeOnTile(enemigo, tiles.getTileLocation(6, 3))
    enemigo.follow(jugador, 20)
}

function crearJefe() {
    for (let enemigo of sprites.allOfKind(SpriteKind.Enemy)) enemigo.destroy()
    let dibujoJefe = image.create(16, 16)
    dibujoJefe.fillRect(2, 4, 12, 11, 10)
    dibujoJefe.fillRect(0, 1, 4, 5, 5)
    dibujoJefe.fillRect(12, 1, 4, 5, 5)
    dibujoJefe.fillRect(5, 0, 6, 4, 5)
    dibujoJefe.fillRect(4, 7, 3, 3, 1)
    dibujoJefe.fillRect(9, 7, 3, 3, 1)
    jefe = sprites.create(dibujoJefe, SpriteKind.Jefe)
    tiles.placeOnTile(jefe, tiles.getTileLocation(3, 1))
    vidaJefe = 67
    jefe.follow(jugador, 18)
    jugador.sayText("EL GUARDIAN DESPIERTA", 2500, false)
}

function iniciarJefe() {
    suelo.fill(2)
    pared.fill(10)
    puerta.fill(4)
    tiles.setCurrentTilemap(mapaArena)
    tiles.placeOnTile(jugador, tiles.getTileLocation(4, 4))
    info.setLife(8)
    crearJefe()
}

function disparar() {
    let direccion = Math.randomRange(0, 3)
    let vx = 0
    let vy = 0
    if (direccion == 0) vx = 120
    else if (direccion == 1) vx = -120
    else if (direccion == 2) vy = 120
    else vy = -120
    let bala = sprites.createProjectileFromSprite(img`
        . 5 5 .
        5 1 1 5
        5 1 1 5
        . 5 5 .
    `, jugador, vx, vy)
    bala.setFlag(SpriteFlag.DestroyOnWall, true)
    bala.lifespan = 1500
}

function perderVida() {
    if (game.runtime() - ultimoGolpe >= 1500) {
        ultimoGolpe = game.runtime()
        info.changeLifeBy(-1)
    }
}

controller.A.onEvent(ControllerButtonEvent.Pressed, function () { if (etapa != 2) disparar() })
controller.A.onEvent(ControllerButtonEvent.Repeated, function () { if (etapa != 2) disparar() })
game.onUpdateInterval(1800, function () { if (etapa == 1) crearEnemigo() })

sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (bala, enemigo) {
    bala.destroy()
    enemigo.destroy()
    bajas++
    info.changeScoreBy(10)
    if (bajas == 25) {
        etapa = 2
        for (let resto of sprites.allOfKind(SpriteKind.Enemy)) resto.destroy()
        for (let resto of sprites.allOfKind(SpriteKind.Projectile)) resto.destroy()
        jugador.sayText("LABERINTO DE LAS TRES LLAVES", 3000, false)
        pause(3000)
        crearLaberinto()
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (jugador, enemigo) {
    enemigo.destroy()
    perderVida()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Llave, function (jugador, llave) {
    llave.destroy()
    llaves++
    if (llaves == 3) {
        tiles.setWallAt(tiles.getTileLocation(2, 0), false)
        jugador.sayText("PUERTA ABIERTA: VUELVE AL INICIO", 3000, false)
    }
})
scene.onOverlapTile(SpriteKind.Player, salida, function () {
    if (etapa == 2 && llaves == 3) {
        etapa = 3
        jugador.sayText("EL GUARDIAN TE ESPERA", 3000, false)
        pause(3000)
        iniciarJefe()
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Jefe, function () { perderVida() })

game.onUpdateInterval(2500, function () {
    if (etapa != 3 || jefe == null) return
    let bala = sprites.create(img`
        . 4 4 .
        4 2 2 4
        4 2 2 4
        . 4 4 .
    `, SpriteKind.BalaJefe)
    bala.setPosition(jefe.x, jefe.y)
    let dx = jugador.x - jefe.x
    let dy = jugador.y - jefe.y
    let distancia = Math.max(Math.abs(dx), Math.abs(dy))
    if (distancia == 0) { bala.destroy(); return }
    bala.vx = dx * 40 / distancia
    bala.vy = dy * 40 / distancia
    bala.setFlag(SpriteFlag.DestroyOnWall, true)
    bala.lifespan = 2500
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.BalaJefe, function (jugador, bala) {
    bala.destroy()
    perderVida()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Jefe, function (bala, guardian) {
    bala.destroy()
    vidaJefe -= 5
    if (vidaJefe <= 0) {
        vidaJefe = 0
        guardian.destroy()
        jefe = null
        info.changeScoreBy(100)
        game.setGameOverMessage(true, "CRIPTA LIBERADA")
        game.over(true)
    }
})
info.onLifeZero(function () {
    game.setGameOverMessage(false, "GAME OVER")
    game.over(false)
})

scene.createRenderable(100, function (pantalla) {
    pantalla.fillRect(0, 13, 120, 11, 15)
    if (etapa == 1) pantalla.print("Bajas: " + bajas + "/25", 2, 15, 1)
    if (etapa == 2) pantalla.print("Llaves: " + llaves + "/3", 2, 15, 1)
    if (etapa == 3) pantalla.print("Jefe: " + vidaJefe + "/67", 2, 15, 1)
})

