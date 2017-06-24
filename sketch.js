var socket;

function setup(){
    createCanvas(1920, 1080);
    background(51);
    socket = io.connect();
    socket.on('mouse', newDrawing);
}

function newDrawing(data){
    noStroke();
    fill(255);
    ellipse(data.x, data.y, 40,40);
}

function mouseDragged(){
    console.log('Sending: ' + mouseX + ', ' + mouseY);
    noStroke();
    fill(255);
    ellipse(mouseX, mouseY, 40,40);
    
    var data = {
        x:mouseX,
        y:mouseY
    }
    
    socket.emit('mouse', data);
}

function draw() {
}

