class Jogador {
    constructor(ctx, teclado) {
        this.ctx = ctx
        this.teclado = teclado
        this.x = 0
        this.y = 0
        this.vel = 3
        this.nave = new Image()
        this.nave.src = "nave.png"
        this.nave.addEventListener('load', ()=>{
            this.desenhar()
        })
    }

    gerenciar() {
        if (this.teclado.esquerda) {
            this.x -= this.vel
        }
        if (this.teclado.direita) {
            this.x += this.vel
        }
        if (this.teclado.cima) {
            this.y -= this.vel
        }
        if (this.teclado.baixo) {
            this.y += this.vel
        }
    }

    desenhar() {
        this.gerenciar()
        this.ctx.drawImage(this.nave,this.x,this.y)
    }
}