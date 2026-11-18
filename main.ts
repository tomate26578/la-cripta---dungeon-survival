namespace SpriteKind {
    export const Llave = SpriteKind.create()
    export const Salida = SpriteKind.create()
    export const Jefe = SpriteKind.create()
}
/**
 * DISEÑOS DEL MAPA
 * 
 * Cada baldosa mide 16 por 16 píxeles.
 */
/**
 * Convertir todo el borde en una pared sólida.
 * 
 * Las puertas también bloquean la salida del jugador.
 */
/**
 * MAPA CUADRADO DE 8 POR 8 BALDOSAS
 * 
 * 00 = suelo, 01 = pared, 02 = puerta.
 * 
 * La primera línea indica el tamaño del mapa.
 */
// PROYECTIL CONTRA ENEMIGO
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (proyectil, enemigo) {
    proyectil.destroy()
    enemigo.destroy()
    eliminados = eliminados + 1
    info.changeScoreBy(10)
    if (eliminados >= objetivo) {
        if (etapa == 1) {
            iniciarEtapa2()
        }
        if (etapa == 3) {
            abrirSalida3()
        }
        if (etapa == 5) {
            crearJefe()
        }
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Jefe, function (proyectil, guardian) {
    proyectil.destroy()
    vidaJefe = vidaJefe - 1
    if (vidaJefe <= 0) {
        guardian.destroy()
        jefe = null
info.changeScoreBy(100)
        game.setGameOverMessage(true, "CRIPTA LIBERADA")
        game.over(true)
    }
})
function iniciarEtapa2 () {
    if (etapa != 1 || salida != null) {
        return
    }
    salida = sprites.create(img`
        . 5 5 5 5 5 5 . 
        5 5 1 1 1 1 5 5 
        5 1 1 1 1 1 1 5 
        5 1 1 1 1 1 1 5 
        5 1 1 1 1 1 1 5 
        5 1 1 1 1 1 1 5 
        5 5 1 1 1 1 5 5 
        . 5 5 5 5 5 5 . 
        `, SpriteKind.Salida)
    tiles.placeOnTile(salida, tiles.getTileLocation(3, 1))
    jugador.sayText("PUERTA ABIERTA", 2000, false)
}
function crearEnemigo5 () {
    enemigo5 = sprites.create(img`
        . 5 5 5 5 5 . . 
        5 5 5 5 5 5 5 . 
        5 1 5 5 1 5 5 . 
        5 5 5 5 5 5 5 . 
        . 5 5 5 5 5 . . 
        5 5 . . . 5 5 . 
        5 . . . . . 5 . 
        5 . . . . . 5 . 
        `, SpriteKind.Enemy)
    entrada3 = Math.randomRange(0, 3)
    if (entrada3 == 0) {
        tiles.placeOnTile(enemigo5, tiles.getTileLocation(7, 1))
    } else if (entrada3 == 1) {
        tiles.placeOnTile(enemigo5, tiles.getTileLocation(7, 10))
    } else if (entrada3 == 2) {
        tiles.placeOnTile(enemigo5, tiles.getTileLocation(1, 5))
    } else {
        tiles.placeOnTile(enemigo5, tiles.getTileLocation(14, 5))
    }
    enemigo5.follow(jugador, 50)
}
// ETAPA 4: EL ENCIERRO
function cargarEtapa4 () {
    etapa = 4
    llaves = 0
    info.setLife(5)
    for (let enemigo4 of sprites.allOfKind(SpriteKind.Enemy)) {
        enemigo4.destroy()
    }
    for (let proyectil3 of sprites.allOfKind(SpriteKind.Projectile)) {
        proyectil3.destroy()
    }
    for (let bala of sprites.allOfKind(SpriteKind.BalaJefe)) {
        bala.destroy()
    }

    if (jefe != null) {
        jefe.destroy()
    }
    jefe = null
if (salida != null) {
        salida.destroy()
    }
    salida = null
sueloGris = image.create(16, 16)
    sueloGris.fill(15)
    sueloGris.setPixel(2, 9, 11)
    sueloGris.setPixel(12, 4, 11)
    muroGris = image.create(16, 16)
    muroGris.fill(11)
    muroGris.fillRect(2, 2, 12, 12, 12)
    muroGris.fillRect(4, 4, 8, 8, 13)
    tiles.setCurrentTilemap(tiles.createTilemap(
        hex`
0e000e00
0000000000000000000000000000
0000000000000000000000000000
0000000000000000000000000000
0000000000000000000000000000
0000000000000000000000000000
0000000000000000000000000000
0000000000000000000000000000
0000000000000000000000000000
0000000000000000000000000000
0000000000000000000000000000
0000000000000000000000000000
0000000000000000000000000000
0000000000000000000000000000
0000000000000000000000000000
        `,
        img`
. . . . . . . . . . . . . .
. . . . . . . . . . . . . .
. . . . . . . . . . . . . .
. . . . . . . . . . . . . .
. . . . . . . . . . . . . .
. . . . . . . . . . . . . .
. . . . . . . . . . . . . .
. . . . . . . . . . . . . .
. . . . . . . . . . . . . .
. . . . . . . . . . . . . .
. . . . . . . . . . . . . .
. . . . . . . . . . . . . .
. . . . . . . . . . . . . .
. . . . . . . . . . . . . .
        `,
        [sueloGris, muroGris],
        TileScale.Sixteen
    ))
    for (let fila4 = 0; fila4 <= 13; fila4++) {
        for (let columna4 = 0; columna4 <= 13; columna4++) {
            borde3 = fila4 == 0 || fila4 == 13 || columna4 == 0 || columna4 == 13
            vertical2 = (columna4 == 3 || columna4 == 6 || columna4 == 9) && fila4 > 1 && fila4 < 12 && fila4 != 2 && fila4 != 5 && fila4 != 8 && fila4 != 11
            horizontal2 = (fila4 == 3 || fila4 == 6 || fila4 == 9) && columna4 > 1 && columna4 < 12 && columna4 != 2 && columna4 != 5 && columna4 != 8 && columna4 != 11
            if (borde3 || vertical2 || horizontal2) {
                lugar3 = tiles.getTileLocation(columna4, fila4)
                tiles.setTileAt(lugar3, muroGris)
                tiles.setWallAt(lugar3, true)
            }
        }
    }
    tiles.placeOnTile(jugador, tiles.getTileLocation(1, 1))
    crearLlave(11, 2)
    crearLlave(2, 11)
    crearLlave(11, 11)
    salida = sprites.create(img`
        2 2 2 2 2 2 2 2 
        2 1 1 1 1 1 1 2 
        2 1 1 1 1 1 1 2 
        2 1 1 1 1 1 1 2 
        2 1 1 1 1 1 1 2 
        2 1 1 1 1 1 1 2 
        2 1 1 1 1 1 1 2 
        2 2 2 2 2 2 2 2 
        `, SpriteKind.Salida)
    tiles.placeOnTile(salida, tiles.getTileLocation(12, 12))
    jugador.sayText("ENCIERRO: 3 LLAVES", 3000, false)
}
// DISPAROS
function disparar () {
    direccion = Math.randomRange(0, 3)
    if (direccion == 0) {
        velocidadX = 120
    } else if (direccion == 1) {
        velocidadX = -120
    } else if (direccion == 2) {
        velocidadY = 120
    } else {
        velocidadY = -120
    }
    proyectil = sprites.createProjectileFromSprite(img`
        . 5 5 . 
        5 1 1 5 
        5 1 1 5 
        . 5 5 . 
        `, jugador, velocidadX, velocidadY)
    proyectil.setFlag(SpriteFlag.DestroyOnWall, true)
    proyectil.lifespan = 1500
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    disparar()
})
function cargarEtapa2 () {
    etapa = 2
    llaves = 0
    info.setLife(5)
    for (let enemigo2 of sprites.allOfKind(SpriteKind.Enemy)) {
        enemigo2.destroy()
    }
    for (let proyectil2 of sprites.allOfKind(SpriteKind.Projectile)) {
        proyectil2.destroy()
    }
    if (salida != null) {
        salida.destroy()
    }
    salida = null
sueloAzul = image.create(16, 16)
    sueloAzul.fill(1)
    sueloAzul.setPixel(3, 3, 8)
    sueloAzul.setPixel(12, 11, 8)
    muroAzul = image.create(16, 16)
    muroAzul.fill(8)
    muroAzul.fillRect(2, 2, 12, 12, 9)
    muroAzul.fillRect(4, 4, 8, 8, 1)
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
        img`
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
        `,
        [sueloAzul, muroAzul],
        TileScale.Sixteen
    ))
    // Divisiones con pasos alternados: forman un laberinto conectado.
    for (let fila2 = 0; fila2 <= 15; fila2++) {
        for (let columna2 = 0; columna2 <= 15; columna2++) {
            borde = fila2 == 0 || fila2 == 15 || columna2 == 0 || columna2 == 15
            vertical = (columna2 == 4 || columna2 == 8 || columna2 == 12) && fila2 > 1 && fila2 < 14 && fila2 != 3 && fila2 != 7 && fila2 != 11
            horizontal = (fila2 == 4 || fila2 == 8 || fila2 == 12) && columna2 > 1 && columna2 < 14 && columna2 != 2 && columna2 != 6 && columna2 != 10
            if (borde || vertical || horizontal) {
                lugar = tiles.getTileLocation(columna2, fila2)
                tiles.setTileAt(lugar, muroAzul)
                tiles.setWallAt(lugar, true)
            }
        }
    }
    tiles.placeOnTile(jugador, tiles.getTileLocation(2, 2))
    crearLlave(13, 2)
    crearLlave(2, 13)
    crearLlave(13, 13)
    salida = sprites.create(img`
        2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 
        `, SpriteKind.Salida)
    tiles.placeOnTile(salida, tiles.getTileLocation(14, 14))
    jugador.sayText("BUSCA 3 LLAVES", 3000, false)
}
// ENEMIGO CONTRA JUGADOR
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (personaje, enemigo) {
    // Evita perder varias vidas al mismo tiempo.
    if (game.runtime() - ultimoGolpe >= 1000) {
        ultimoGolpe = game.runtime()
        enemigo.destroy()
        info.changeLifeBy(-1)
    }
})
function abrirSalida3 () {
    if (etapa != 3 || salida != null) {
        return
    }
    salida = sprites.create(img`
        . 5 5 5 5 5 5 . 
        5 5 1 1 1 1 5 5 
        5 1 1 1 1 1 1 5 
        5 1 1 1 1 1 1 5 
        5 1 1 1 1 1 1 5 
        5 1 1 1 1 1 1 5 
        5 5 1 1 1 1 5 5 
        . 5 5 5 5 5 5 . 
        `, SpriteKind.Salida)
    tiles.placeOnTile(salida, tiles.getTileLocation(6, 1))
    jugador.sayText("SALIDA ABIERTA", 2500, false)
}
function cargarEtapa5 () {
    etapa = 5
    if (salida != null) {
        salida.destroy()
    }
    salida = null
eliminados = 0
    objetivo = 40
    info.setLife(4)
    sueloVioleta = image.create(16, 16)
    sueloVioleta.fill(3)
    sueloVioleta.setPixel(4, 4, 6)
    sueloVioleta.setPixel(12, 12, 6)
    muroVioleta = image.create(16, 16)
    muroVioleta.fill(10)
    muroVioleta.fillRect(2, 2, 12, 12, 5)
    muroVioleta.fillRect(4, 4, 8, 8, 15)
    puertaVioleta = image.create(16, 16)
    puertaVioleta.fill(10)
    puertaVioleta.fillRect(4, 1, 8, 15, 7)
    tiles.setCurrentTilemap(tiles.createTilemap(
        hex`
10000c00
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
        img`
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
        `,
        [sueloVioleta, muroVioleta, puertaVioleta],
        TileScale.Sixteen
    ))
    for (let fila5 = 0; fila5 <= 11; fila5++) {
        for (let columna5 = 0; columna5 <= 15; columna5++) {
            borde4 = fila5 == 0 || fila5 == 11 || columna5 == 0 || columna5 == 15
            roca = (fila5 == 3 || fila5 == 8) && (columna5 == 4 || columna5 == 11)
            if (borde4 || roca) {
                lugar4 = tiles.getTileLocation(columna5, fila5)
                tiles.setTileAt(lugar4, muroVioleta)
                tiles.setWallAt(lugar4, true)
            }
        }
    }
    tiles.setTileAt(tiles.getTileLocation(7, 0), puertaVioleta)
    tiles.setTileAt(tiles.getTileLocation(7, 11), puertaVioleta)
    tiles.setTileAt(tiles.getTileLocation(0, 5), puertaVioleta)
    tiles.setTileAt(tiles.getTileLocation(15, 5), puertaVioleta)
    tiles.placeOnTile(jugador, tiles.getTileLocation(8, 6))
    jugador.sayText("NUCLEO: 40 BAJAS", 3000, false)
}
// ETAPA 3: LA FORJA ROJA
function cargarEtapa3 () {
    etapa = 3
    if (salida != null) {
        salida.destroy()
    }
    salida = null
eliminados = 0
    objetivo = 32
    info.setLife(4)
    sueloRojo = image.create(16, 16)
    sueloRojo.fill(14)
    sueloRojo.setPixel(3, 5, 4)
    sueloRojo.setPixel(11, 12, 4)
    muroRojo = image.create(16, 16)
    muroRojo.fill(4)
    muroRojo.fillRect(2, 2, 12, 12, 2)
    muroRojo.fillRect(4, 4, 8, 8, 15)
    portonRojo = image.create(16, 16)
    portonRojo.fill(2)
    portonRojo.fillRect(4, 1, 8, 15, 5)
    tiles.setCurrentTilemap(tiles.createTilemap(
        hex`
0e000c00
0000000000000000000000000000
0000000000000000000000000000
0000000000000000000000000000
0000000000000000000000000000
0000000000000000000000000000
0000000000000000000000000000
0000000000000000000000000000
0000000000000000000000000000
0000000000000000000000000000
0000000000000000000000000000
0000000000000000000000000000
0000000000000000000000000000
        `,
        img`
. . . . . . . . . . . . . .
. . . . . . . . . . . . . .
. . . . . . . . . . . . . .
. . . . . . . . . . . . . .
. . . . . . . . . . . . . .
. . . . . . . . . . . . . .
. . . . . . . . . . . . . .
. . . . . . . . . . . . . .
. . . . . . . . . . . . . .
. . . . . . . . . . . . . .
. . . . . . . . . . . . . .
. . . . . . . . . . . . . .
        `,
        [sueloRojo, muroRojo, portonRojo],
        TileScale.Sixteen
    ))
    for (let fila3 = 0; fila3 <= 11; fila3++) {
        for (let columna3 = 0; columna3 <= 13; columna3++) {
            borde2 = fila3 == 0 || fila3 == 11 || columna3 == 0 || columna3 == 13
            columnaRoca = columna3 == 3 || columna3 == 4 || columna3 == 9 || columna3 == 10
            filaRoca = fila3 == 3 || fila3 == 8
            if (borde2 || columnaRoca && filaRoca) {
                lugar2 = tiles.getTileLocation(columna3, fila3)
                tiles.setTileAt(lugar2, muroRojo)
                tiles.setWallAt(lugar2, true)
            }
        }
    }
    tiles.setTileAt(tiles.getTileLocation(6, 0), portonRojo)
    tiles.setTileAt(tiles.getTileLocation(6, 11), portonRojo)
    tiles.setTileAt(tiles.getTileLocation(0, 5), portonRojo)
    tiles.setTileAt(tiles.getTileLocation(13, 5), portonRojo)
    tiles.placeOnTile(jugador, tiles.getTileLocation(7, 6))
    jugador.sayText("FORJA: 32 BAJAS", 3000, false)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Jefe, function (personaje, guardian) {
    if (game.runtime() - ultimoGolpe >= 1000) {
        ultimoGolpe = game.runtime()
        info.changeLifeBy(-1)
    }
})
// DERROTA
info.onLifeZero(function () {
    if (etapa == 3) {
        cargarEtapa2()
    } else if (etapa == 5) {
        cargarEtapa4()
    } else {
        game.setGameOverMessage(false, "GAME OVER")
        game.over(false)
    }
})
controller.A.onEvent(ControllerButtonEvent.Repeated, function () {
    disparar()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Llave, function (personaje, llave) {
    if (etapa == 2 || etapa == 4) {
        llave.destroy()
        llaves = llaves + 1
        if (llaves == 3) {
            salida.setImage(img`
                7 7 7 7 7 7 7 7 
                7 1 1 1 1 1 1 7 
                7 1 1 1 1 1 1 7 
                7 1 1 1 1 1 1 7 
                7 1 1 1 1 1 1 7 
                7 1 1 1 1 1 1 7 
                7 1 1 1 1 1 1 7 
                7 7 7 7 7 7 7 7 
                `)
            jugador.sayText("SALIDA ABIERTA", 2500, false)
        }
    }
})
// ENEMIGOS
function crearEnemigo () {
    enemigo = sprites.create(img`
        . . c c c c . . 
        . c c c c c c . 
        . c 2 c c 2 c . 
        . c c c c c c . 
        . . c c c c . . 
        . c c . . c c . 
        . c . . . . c . 
        c c . . . . c c 
        `, SpriteKind.Enemy)
    entrada = Math.randomRange(0, 3)
    // Aparecen inmediatamente dentro de cada puerta.
    if (entrada == 0) {
        tiles.placeOnTile(enemigo, tiles.getTileLocation(3, 1))
    } else if (entrada == 1) {
        tiles.placeOnTile(enemigo, tiles.getTileLocation(3, 6))
    } else if (entrada == 2) {
        tiles.placeOnTile(enemigo, tiles.getTileLocation(1, 3))
    } else {
        tiles.placeOnTile(enemigo, tiles.getTileLocation(6, 3))
    }
    enemigo.follow(jugador, 30)
}
function crearLlave (columna: number, fila: number) {
    llave = sprites.create(img`
        . . . 5 5 . . . 
        . . 5 . . 5 . . 
        . . 5 . . 5 . . 
        . . . 5 5 . . . 
        . . . 5 . . . . 
        . . . 5 5 5 . . 
        . . . 5 . . . . 
        . . . 5 5 . . . 
        `, SpriteKind.Llave)
    tiles.placeOnTile(llave, tiles.getTileLocation(columna, fila))
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Salida, function (personaje, puertaSalida) {
    if (etapa == 1 && eliminados >= objetivo) {
        cargarEtapa2()
    } else if (etapa == 2 && llaves == 3) {
        cargarEtapa3()
    } else if (etapa == 3 && eliminados >= objetivo) {
        cargarEtapa4()
    } else if (etapa == 4 && llaves == 3) {
        cargarEtapa5()
    }
})
function crearJefe () {
    if (etapa != 5 || jefe != null) {
        return
    }
    for (let enemigo6 of sprites.allOfKind(SpriteKind.Enemy)) {
        enemigo6.destroy()
    }
    imagenJefe = image.create(16, 16)
    imagenJefe.fillRect(2, 4, 12, 11, 10)
    imagenJefe.fillRect(0, 1, 4, 5, 5)
    imagenJefe.fillRect(12, 1, 4, 5, 5)
    imagenJefe.fillRect(5, 0, 6, 4, 5)
    imagenJefe.fillRect(4, 7, 3, 3, 1)
    imagenJefe.fillRect(9, 7, 3, 3, 1)
    jefe = sprites.create(imagenJefe, SpriteKind.Jefe)
    tiles.placeOnTile(jefe, tiles.getTileLocation(8, 2))
    vidaJefe = 67
    jefe.follow(jugador, 35)
    jugador.sayText("EL GUARDIAN DESPIERTA", 3000, false)
}
function crearEnemigo3 () {
    enemigo3 = sprites.create(img`
        . . 2 2 2 2 . . 
        . 2 2 2 2 2 2 . 
        . 2 1 2 2 1 2 . 
        . 2 2 2 2 2 2 . 
        . . 2 2 2 2 . . 
        . 2 2 . . 2 2 . 
        . 2 . . . . 2 . 
        2 2 . . . . 2 2 
        `, SpriteKind.Enemy)
    entrada2 = Math.randomRange(0, 3)
    if (entrada2 == 0) {
        tiles.placeOnTile(enemigo3, tiles.getTileLocation(6, 1))
    } else if (entrada2 == 1) {
        tiles.placeOnTile(enemigo3, tiles.getTileLocation(6, 10))
    } else if (entrada2 == 2) {
        tiles.placeOnTile(enemigo3, tiles.getTileLocation(1, 5))
    } else {
        tiles.placeOnTile(enemigo3, tiles.getTileLocation(12, 5))
    }
    enemigo3.follow(jugador, 42)
}
let entrada2 = 0
let enemigo3: Sprite = null
let imagenJefe: Image = null
let llave: Sprite = null
let entrada = 0
let enemigo: Sprite = null
let lugar2: tiles.Location = null
let filaRoca = false
let columnaRoca = false
let borde2 = false
let portonRojo: Image = null
let muroRojo: Image = null
let sueloRojo: Image = null
let lugar4: tiles.Location = null
let roca = false
let borde4 = false
let puertaVioleta: Image = null
let muroVioleta: Image = null
let sueloVioleta: Image = null
let lugar: tiles.Location = null
let horizontal = false
let vertical = false
let borde = false
let muroAzul: Image = null
let sueloAzul: Image = null
let proyectil: Sprite = null
let velocidadY = 0
let velocidadX = 0
let direccion = 0
let lugar3: tiles.Location = null
let horizontal2 = false
let vertical2 = false
let borde3 = false
let muroGris: Image = null
let sueloGris: Image = null
let entrada3 = 0
let enemigo5: Sprite = null
let vidaJefe = 0
let etapa = 0
let jugador: Sprite = null
let ultimoGolpe = 0
let objetivo = 0
let jefe: Sprite = null
let salida: Sprite = null
let llaves = 0
// DUNGEON SURVIVAL: LA CRIPTA
// Flechas: moverse.
// A: disparar. También se puede mantener presionado.
// VARIABLES
let eliminados = 0
objetivo = 25
ultimoGolpe = -1000
let suelo = image.create(16, 16)
suelo.fill(13)
suelo.setPixel(3, 5, 12)
suelo.setPixel(11, 12, 12)
let pared = image.create(16, 16)
pared.fill(12)
pared.fillRect(1, 1, 14, 6, 11)
pared.fillRect(1, 9, 14, 6, 11)
let puerta = image.create(16, 16)
puerta.fill(12)
puerta.fillRect(3, 1, 10, 15, 6)
puerta.fillRect(5, 3, 6, 13, 15)
puerta.setPixel(10, 9, 5)
tiles.setCurrentTilemap(tiles.createTilemap(
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
    img`
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    `,
    [suelo, pared, puerta],
    TileScale.Sixteen
))
for (let fila = 0; fila <= 7; fila++) {
    for (let columna = 0; columna <= 7; columna++) {
        if (fila == 0 || fila == 7 || columna == 0 || columna == 7) {
            tiles.setWallAt(tiles.getTileLocation(columna, fila), true)
        }
    }
}
scene.setBackgroundColor(15)
// JUGADOR
jugador = sprites.create(img`
    . . 8 8 8 8 . . 
    . 8 8 8 8 8 8 . 
    . 8 1 8 8 1 8 . 
    . 8 1 8 8 1 8 . 
    . . 8 8 8 8 . . 
    . 8 8 9 9 8 8 . 
    . . 8 9 9 8 . . 
    . . 8 . . 8 . . 
    `, SpriteKind.Player)
tiles.placeOnTile(jugador, tiles.getTileLocation(4, 4))
controller.moveSprite(jugador, 80, 80)
scene.cameraFollowSprite(jugador)
info.setLife(5)
info.setScore(0)
scene.createRenderable(100, function (pantalla) {
    pantalla.fillRect(0, 13, 100, 11, 15)
    pantalla.print(
        "Bajas: " + eliminados + "/" + objetivo,
        2,
        15,
        1
    )
})
etapa = 1
scene.createRenderable(101, function (pantalla) {
    if (etapa == 2) {
        pantalla.fillRect(0, 13, 100, 11, 15)
        pantalla.print("Llaves: " + llaves + "/3", 2, 15, 1)
    }
})
scene.createRenderable(102, function (pantalla) {
    if (etapa == 4) {
        pantalla.fillRect(0, 13, 100, 11, 15)
        pantalla.print("Llaves: " + llaves + "/3", 2, 15, 1)
    }
})
vidaJefe = 67
scene.createRenderable(103, function (pantalla) {
    if (etapa == 5 && jefe != null) {
        pantalla.fillRect(0, 25, 100, 11, 15)
        pantalla.print("Jefe: " + vidaJefe + "/67", 2, 27, 1)
    }
})
game.onUpdateInterval(750, function () {
    if (etapa == 5 && eliminados < objetivo) {
        crearEnemigo5()
    }
})
game.onUpdateInterval(850, function () {
    if (etapa == 3 && eliminados < objetivo) {
        crearEnemigo3()
    }
})
// Aparece un enemigo cada 1,2 segundos.
game.onUpdateInterval(1200, function () {
    if (etapa == 1 && eliminados < objetivo) {
        crearEnemigo()
    }
})

// ATAQUE DEL JEFE FINAL
namespace SpriteKind {
    export const BalaJefe = SpriteKind.create()
}

function dispararJefe() {
    if (etapa != 5 || jefe == null) return

    let bala = sprites.create(img`
        . 4 4 .
        4 2 2 4
        4 2 2 4
        . 4 4 .
    `, SpriteKind.BalaJefe)
    bala.setPosition(jefe.x, jefe.y)

    let diferenciaX = jugador.x - jefe.x
    let diferenciaY = jugador.y - jefe.y
    let distancia = Math.max(Math.abs(diferenciaX), Math.abs(diferenciaY))
    if (distancia == 0) {
        bala.destroy()
        return
    }

    bala.vx = diferenciaX * 65 / distancia
    bala.vy = diferenciaY * 65 / distancia
    bala.setFlag(SpriteFlag.DestroyOnWall, true)
    bala.lifespan = 2500
}

game.onUpdateInterval(2000, function () {
    dispararJefe()
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.BalaJefe, function (personaje, bala) {
    bala.destroy()
    if (etapa == 5 && game.runtime() - ultimoGolpe >= 1000) {
        ultimoGolpe = game.runtime()
        info.changeLifeBy(-1)
    }
})
