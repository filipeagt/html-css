class Bola {
    constructor(ctx, jogador) {
        this.ctx = ctx
        this.jogador = jogador
        this.movendo = false
        this.dirX = 0
        this.dirY = 0
        this.largura = 20
        this.altura = 20        
        this.x = this.ctx.canvas.width/2 - this.largura/2
        this.y = this.ctx.canvas.height/2 - this.altura/2
        this.vel = 3
        
    }

    iniciar() {
        this.movendo = true
        this.dirX = -1
        //this.dirY = Math.random()*10 > 5 ? -1 : 1
    }

    gerenciar() {
        if(this.movendo == true) {
            //Movimentação
            this.x += this.dirX*this.vel
            this.y += this.dirY*this.vel
            //Colisão com bordas
            if (this.x >= this.ctx.canvas.width-this.largura) {
                this.dirX = -1
            }
            if (this.x <= 0) {
                this.dirX = 1
            }
            if (this.y >= this.ctx.canvas.height-this.altura) {
                this.dirY *= -1
            }
            if (this.y <= 0) {
                this.dirY *= -1
            }
            //Colisão com o jogador
            if (
                (this.x <= this.jogador.x + this.jogador.largura && this.x + this.largura >= this.jogador.x) &&
                (this.y + this.altura >= this.jogador.y && this.y <= this.jogador.y + this.jogador.altura)
            ) {
                this.dirX = 1
                this.dirY = ((this.y+this.altura/2) - (this.jogador.y+this.jogador.altura/2))/20
                console.log(this.dirY)
            }
        }
        /*
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
        */
    }

    desenhar() {
        this.gerenciar()
        this.ctx.fillStyle = "#000"
        this.ctx.fillRect(this.x,this.y,this.largura,this.altura)
    }
}