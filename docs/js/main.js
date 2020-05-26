"use strict";
var Ball = (function () {
    function Ball() {
        this.speedX = 6;
        this.speedY = 6;
        this.div = document.createElement("ball");
        var game = document.getElementsByTagName("game")[0];
        game.appendChild(this.div);
        this.x = Math.random() * window.innerWidth - 40;
        this.y = Math.random() * window.innerHeight - 40;
    }
    Ball.prototype.changeDirectionSpeedX = function () {
        this.speedX *= -1;
    };
    Ball.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    Ball.prototype.update = function () {
        if (this.x >= window.innerWidth - 40 || this.x <= 0) {
            this.speedX *= -1;
        }
        if (this.y >= window.innerHeight - 40 || this.y <= 0) {
            this.speedY *= -1;
        }
        this.x += this.speedX;
        this.y += this.speedY;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Ball;
}());
var Game = (function () {
    function Game() {
        this.balls = [];
        this.paddles = [];
        this.score1 = 0;
        this.score2 = 0;
        this.scoreboard1 = document.getElementsByTagName("score")[0];
        this.scoreboard2 = document.getElementsByTagName("score")[1];
        for (var i = 0; i < 5; i++) {
            this.balls.push(new Ball());
        }
        this.paddles.push(new Paddle(1));
        this.paddles.push(new Paddle(2));
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        for (var i = 0; i < this.balls.length; i++) {
            var collision = this.checkCollision(this.paddles[0].getRectangle(), this.balls[i].getRectangle());
            if (collision) {
                console.log("Collision = " + collision);
                this.balls[i].changeDirectionSpeedX();
                this.score1++;
                this.scoreboard1.innerText = "P1 Score: " + this.score1;
            }
            collision = this.checkCollision(this.paddles[1].getRectangle(), this.balls[i].getRectangle());
            if (collision) {
                console.log("Collision = " + collision);
                this.balls[i].changeDirectionSpeedX();
                this.score2++;
                this.scoreboard2.innerText = "P2 Score: " + this.score2;
            }
            this.balls[i].update();
        }
        this.paddles[0].update();
        this.paddles[1].update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var Paddle = (function () {
    function Paddle(paddleNumber) {
        var _this = this;
        this.downSpeed = 0;
        this.upSpeed = 0;
        this.createPaddle = function () {
        };
        if (paddleNumber === 1) {
            this.div = document.createElement("paddle");
            var game = document.getElementsByTagName("game")[0];
            game.appendChild(this.div);
            this.upkey = 87;
            this.downkey = 83;
            this.x = 0;
            this.y = 200;
            window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
            window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        }
        if (paddleNumber === 2) {
            this.div = document.createElement("paddle");
            var game = document.getElementsByTagName("game")[0];
            game.appendChild(this.div);
            this.upkey = 38;
            this.downkey = 40;
            this.x = window.innerWidth - 25;
            this.y = 200;
            window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
            window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        }
    }
    Paddle.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    Paddle.prototype.onKeyDown = function (e) {
        console.log(e.keyCode);
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 5;
                break;
            case this.downkey:
                this.downSpeed = 5;
                break;
        }
    };
    Paddle.prototype.onKeyUp = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 0;
                break;
            case this.downkey:
                this.downSpeed = 0;
                break;
        }
    };
    Paddle.prototype.update = function () {
        var newY = this.y - this.upSpeed + this.downSpeed;
        if (newY > 0 && newY + 100 < window.innerHeight)
            this.y = newY;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Paddle;
}());
//# sourceMappingURL=main.js.map