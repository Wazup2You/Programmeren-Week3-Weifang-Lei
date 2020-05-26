/// <reference path="ball.ts"/>

class Game {
    
    private balls:Ball[] = []
    private paddles:Paddle[] = []
    private score1: number = 0
    private score2: number = 0

    private scoreboard1 : HTMLElement = <HTMLElement>document.getElementsByTagName("score")[0]
    private scoreboard2 : HTMLElement = <HTMLElement>document.getElementsByTagName("score")[1]

    constructor() {
        for (let i = 0; i < 5; i++) {
            this.balls.push(new Ball())
        }
        this.paddles.push(new Paddle(1))
        this.paddles.push(new Paddle(2))
        this.gameLoop()
    }
    
    private gameLoop(){
        for (let i = 0; i < this.balls.length; i++) {
            // Paddle 1
            let collision = this.checkCollision(this.paddles[0].getRectangle(), this.balls[i].getRectangle())
            if (collision) {
                console.log(`Collision = ${collision}`)
                this.balls[i].changeDirectionSpeedX()
                this.score1++
                this.scoreboard1.innerText = `P1 Score: ${this.score1}`
            }
            // Paddle 2
            collision = this.checkCollision(this.paddles[1].getRectangle(), this.balls[i].getRectangle())
            if (collision) {
                console.log(`Collision = ${collision}`)
                this.balls[i].changeDirectionSpeedX()
                this.score2++
                this.scoreboard2.innerText = `P2 Score: ${this.score2}`
            }

            this.balls[i].update()
        }
        this.paddles[0].update()
        this.paddles[1].update()    
        requestAnimationFrame(()=>this.gameLoop())
    }

    checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
     }
} 

window.addEventListener("load", () => new Game())