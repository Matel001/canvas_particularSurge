const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

addEventListener("resize", function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    ctx.fillStyle = "rgb(30,30,30)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
})

let mouse = {
	x: canvas.width/2,
	y: canvas.height/2
};


addEventListener("mousemove", function(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    //createCircle();
})

rgbaColorArray=[
    "rgba(44,62,80, ",
    "rgba(231, 76, 60, ",
    "rgba(236, 240, 241, ",
    "rgba(41, 128, 185, ",
];

function setBG(){
    ctx.fillStyle = "rgb(30,30,30)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function randomIntFrom(min, max){
    return Math.round(Math.random()*(max-min)+min);
}

function Circle(x, y, dx, dy, radius, color_index, color_alpha){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color_index = color_index;
    this.color_alpha = color_alpha;
    let color;
    
    this.update = function(){
        this.x += this.dx;
        this.y += this.dy;
        this.radius = this.radius * 0.97;
        color = rgbaColorArray[this.color_index] + this.color_alpha+")";
        
        if(this.radius < 10){
            this.color_alpha = this.color_alpha * 0.9;
            if(this.color_alpha < 0.1){
                this.color_alpha = 0;
            }
        }
        
        if(this.x + this.radius >= canvas.width || this.x - this.radius <= 0){
            this.dx = -this.dx;
        }
        if(this.y + this.radius >= canvas.height || this.y - this.radius <= 0){
            this.dy = -this.dy;
        }
        this.delete();
        this.draw();
    };
    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.closePath();  
        
    };
    this.delete = function(){
        if (this.color_alpha < 0.05){
            circleArray.pop();
            //createCircle();
        }
    }
}

let circleArray = [];
function createCircle(){
            let radius = 30;
            let x = mouse.x;
            let y = mouse.y;
            let color_alpha = 1;
            let color_index = randomIntFrom(0,3);
            let dx = (Math.random()*4)-2;
            let dy = (Math.random()*4)-2;
        
    if(x-radius < 0){
        x = radius;
        if(dx < 0){
            dx = -dx;
        }
    }
    else if(x + radius > canvas.width){
        x = canvas.width - radius;
        if(dx > 0){
            dx = -dx;
        }
    }
    if(y - radius < 0){
        y = radius;
        if(dy < 0){
            dy = -dy;
        }
    }
    else if (y + radius > canvas.height){
        y = canvas.height - radius;
        if(dy > 0){
            dy = -dy;
        }
    }
            circleArray.unshift(new Circle(x, y, dx, dy, radius, color_index, color_alpha));
}
function init(){
    //circleArray = [];
    for (let i = 0; i < 50; i++)
        {
            let radius = 20;
            let x = mouse.x;
            let y = mouse.y;
            let color_alpha = 1;
            let color_index = randomIntFrom(0,3);
            let dx = (Math.random()*3)-1;
            let dy = (Math.random()*3)-1;
            circleArray.unshift(new Circle(x, y, dx, dy, radius, color_index, color_alpha));
        }
}
// Animation Loop
function animate() {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    setBG();
    for (let i = 0; i<circleArray.length; i++)
    {
          circleArray[i].update(); 
    }
  
}


setInterval(createCircle, 12);
//init(); 
animate();

