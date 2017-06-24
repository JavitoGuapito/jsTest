//Para cargar un modulo en node usamos la funcion require(), le pasamos por parametro el nombre del modulo a cargar. Aqui tendremo todos
//los metodos de alto nivel que nos proporciona express para el desarrollo del servidor. En la variable app inicializamos el modulo, es decir,
//como si crearamos un objeto, de tal forma que cuando queramos acceder a algun metodo de express entraremos a esta variable a traves de la //notacion dot
var express = require('express')
var app = express();

//Creamos el objeto servidor y lo ponemos a escuchar en un puerto a traves del metodo de express listen
var server = require('http').Server(app);

//el metodo use te dice cuales seran los objetos http de la que tendra la funcion middleware(funciones que dan acceso al objeto solicitus y objeto respuesta, es decir, un ciclo de solicitudes respuestas) En este caso todos los de la tarjeta public
app.use(express.static('public'));

console.log("My sockets server is running");

//De nuevo, cargamos el modulo socket.io, el cual se usa para poder realizar direcciones bidireccionales entre servidor y clientes web, con socket io podremos implementar aplicaciones web en tiempo real, como por ejemplo chats. Tiene dos partes, programacion en el cliente y programacion en el lado del server node.js. socket.io utiliza el principalmente protocolo WebSocket el cual proporciona un canal con  conexion bidireccional en TCP, este se implementa en cliente y servidor.
var socket = require('socket.io')(server);

//Inicializamo un "objeto" con las funciones que nos ofrece socket.io. Por parametro le pasamo el servidor (inicializado en la variable server y escuchando en un puerto) escuchanndo en un puerto, el cual se usara para el socket. Esto lo usaremos para realizar las conexiones, ya que las queremos de tiempo real y bidireccionales. Lo que escribamos en el lado del cliente lo realizaremos usando socket.io.
var io = socket(server);

//esto se ejecuta cuando se produce un evento. En socket io un evento puede ser por ejemplo que se conecte alguien o se mande un mensaje.
//Esto por ejemplo es un evento cada vez que entre una nueva conexion(Esto nos lo indica el primer parametro) y lo que hare será ejecutar un metodo dado en el segundo parametro.
io.sockets.on('connection', newConnection);

function newConnection(socket){
    console.log('new Connection' + socket.id);
    socket.on('mouse', mouseMsg)
    function mouseMsg(data){
        console.log(data);
        socket.broadcast.emit('mouse', data);
    }
}


