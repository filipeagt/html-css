class Pad {
    constructor(ctx, teclado) {
        this.largura = 20
        this.altura = 100
        this.ctx = ctx
        this.teclado = teclado
        this.x = 0
        this.y = this.ctx.canvas.height/2 - this.altura/2
        this.vel = 3
        
    }

    gerenciar() {
        if (this.teclado.esquerda && this.x > 0) {
            this.x -= this.vel
        }
        if (this.teclado.direita && this.x < this.ctx.canvas.width/2-this.largura) {
            this.x += this.vel
        }
        if (this.teclado.cima && this.y > 0) {
            this.y -= this.vel
        }
        if (this.teclado.baixo && this.y < this.ctx.canvas.height-this.altura) {
            this.y += this.vel
        }
    }

    desenhar() {
        this.gerenciar()
        this.ctx.fillStyle = "#000"
        this.ctx.fillRect(this.x,this.y,this.largura,this.altura)
    }
}