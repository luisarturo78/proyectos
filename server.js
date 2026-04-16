// PASO 1: PREPARAR EL MOTOR (BACKEND). IMPORTACION DE HERRAMIENTAS (Llamando a los especialistas).
const express = require('express'); // Importa el marco para crear el servidor web.
const http = require('http'); // Importa el modulo nativo de Node para crear el servidor HTTP.
const { Server } = require('socket.io'); // Importa la tecnologia de "Websockets" para comunicacion bidireccional.
const os = require('os'); // Importa el modulo que permite "leer" el hardware (CPU, RAM).
const { clearInterval } = require('timers');

// PASO 2: CONFIGURACION DEL SISTEMA (Construyendo la base).

const app = express(); // Crea la aplicacion Express (nuestra secretaria que maneja rutas).
const server = http.createServer(app); // Creamos el servidor fisico usando la app de Express.
const io = new Server(server); // Instalamos una "antena de radio" (socket.io) sobre nuestro 


// PASO 3: ARCHIVOS ESTATICOS (FACHADA).
// Esta seccion le dice al servidor "Si alguien pide una pagina, buscala en la carpeta 'public'".
app.use(express.static('public'));

// PASO 4: FLUJO DE COMUNICACION (El evento de conexion).
// Este bloque se activa SOLO cuando un usuario abre el dashboard en su navegador.
io.on('connection', (socket) => {
    // El socket es el cable individual que conecta a este usuario especifico.
    console.log('Nuevo monitor conectado');

    // PASO 5: RECOLECCION DE DATOS (SENSOR).
    // Usamos setInterval para crear un bucle que se repite cada 1000ms (1 segundo).

    const interval = setInterval(() => {

        // Creamos un objeto 'stats' con la informacion del actual hardware.
        const stats = {
            // os.loadavg()[0] lee la carga del CPU en el ultimo minuto.
            cpu: os.loadavg()[0],

            // Calculamos: (1 - MemoriaLibre / MemoriaTotal) * para obtener el % de uso.
            mem: (1 - os.freemem() / os.totalmem()) * 100,

            // Capturamos la hora exacta para el eje X del grafico.
            time: new Date().toLocaleTimeString()
        };

        // PASO 6: EMISION (Transmitiendo por la radio).
        // Enviamos el objeto 'stats' a traves del cable (socket) con el nombre 'datos-servidor'.
        socket.emit('datos-servidor', stats);

    }, 1000); // El pulso del monitor es de 1 segundo.

    // PASO 7: CIERRE DE CICLO (Limpieza)
    // Si el usuario cierra la ventana, destruimos el intervalo para no gastar recursos.
        socket.on('disconnect', () => {
            clearInterval(interval); // Detiene el reloj de recoleccion de datos.
            console.log('Monitor desconectado');
        });

    });

    // PASO 8: PUESTA EN MARCHA.

    const PORT = 3300;
    server.listen(PORT, () => {
        console.log(`Servidor listo en http://localhost:${PORT}`);
    });

