class Ball {
    
    private div : HTMLElement
    private x : number
    private y : number
    private speedX : number = 6
    private speedY : number = 6

    public changeDirectionSpeedX() {
        this.speedX *= -1
    }

    public getRectangle() {
        return this.div.getBoundingClientRect()
    }
    
    constructor() {
        this.div = document.createElement("ball")

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.div)

        this.x = Math.random() * window.innerWidth-40
        this.y = Math.random() * window.innerHeight-40
    }
    
    public update() : void {
        if (this.x >= window.innerWidth-40 || this.x <= 0) {
            this.speedX *= -1
        }
        if (this.y >= window.innerHeight-40 || this.y <= 0) {
            this.speedY *= -1
        }

        this.x += this.speedX
        this.y += this.speedY
        // console.log(`xBall = ${this.x}, yBall = ${this.y}`);
        
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
}