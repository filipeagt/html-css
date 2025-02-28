class Cpu {
    constructor(ctx, bola) {        
        this.ctx = ctx
        this.bola = bola
        this.largura = 20
        this.altura = 100
        this.vel = 2.5
        this.x = this.ctx.canvas.width - this.largura
        this.y = this.ctx.canvas.height/2 - this.altura/2
        this.inicioX = this.x
        this.inicioY = this.y 
        this.yMeio = Math.random()*this.altura       
    }

    gerenciar() {
        if (this.bola.dirX > 0 && this.bola.x > this.ctx.canvas.width/2) {
            //Rebater a bola
            if (this.bola.y + this.bola.altura/2 > this.y+this.yMeio) {
                this.y += this.vel
            }
            if (this.bola.y + this.bola.altura/2 < this.y+this.yMeio) {
                this.y -= this.vel
            }
            if (this.bola.x + this.bola.largura < this.x) {
                this.x -= this.vel
            }
        } else {
            //Ir para posição de origem
            if (this.y > this.inicioY) {
                this.y -= this.vel
            }
            if (this.y < this.inicioY) {
                this.y += this.vel
            }
            if (this.x > this.inicioX) {
                this.x -= this.vel
            }
            if (this.x < this.inicioX) {
                this.x += this.vel
            }
        }
        //Colisão com a bola
        if (
            (this.x <= this.bola.x + this.bola.largura && this.x + this.largura >= this.bola.x) &&
            (this.y + this.altura >= this.bola.y && this.y <= this.bola.y + this.bola.altura)
        ) {            
            this.bola.dirX = -1
            this.bola.dirY = ((this.bola.y+this.bola.altura/2) - (this.y + this.altura/2))/20
            console.log(this.dirY)
            this.yMeio = Math.random()*this.altura
        }
    }

    desenhar() {
        this.gerenciar()
        this.ctx.fillStyle = "#000"
        this.ctx.fillRect(this.x,this.y,this.largura,this.altura)
    }
}