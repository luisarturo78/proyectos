# 📊 Monitor de Infraestructura en Tiempo Real

Una aplicación Full-Stack ligera diseñada para visualizar el consumo de recursos de tu servidor (CPU y Memoria RAM) en tiempo real. Utiliza WebSockets para mantener una comunicación constante entre el hardware del servidor y una interfaz web dinámica.

## ✨ Características Principales

* **Monitoreo en Vivo:** Lectura constante del hardware mediante el módulo nativo `os` de Node.js.
* **Comunicación Bidireccional:** Uso de WebSockets para empujar datos al navegador sin necesidad de que el usuario recargue la página.
* **Eficiencia de Recursos:** Sistema inteligente que detiene la recolección de datos automáticamente cuando no hay ventanas del monitor abiertas, evitando fugas de memoria.
* **Gráfico Dinámico:** Visualización del consumo de RAM a través de un gráfico de líneas que avanza en el tiempo, manteniendo un historial limpio de 10 puntos de datos.
* **Modo Oscuro Nativo:** Interfaz de usuario minimalista adaptada para reducir la fatiga visual.

---

## 🛠️ Arquitectura y Stack Tecnológico

| Capa | Tecnología | Función Principal |
| :--- | :--- | :--- |
| **Backend** | Node.js | Entorno de ejecución para interactuar con el sistema operativo. |
| **Backend** | Express | Marco web para servir los archivos estáticos (HTML/CSS/JS). |
| **Backend** | Socket.io (Server) | Creación del túnel de comunicación constante. |
| **Frontend** | HTML5 / CSS3 | Estructura e interfaz de usuario en modo nocturno. |
| **Frontend** | Chart.js | Renderizado y animación del gráfico en el lienzo (`<canvas>`). |
| **Frontend** | Socket.io (Client) | Recepción e inyección de los datos del servidor en el gráfico. |

---

## ⚙️ Requisitos Previos

Antes de ejecutar este proyecto, asegúrate de tener instalado:
* [Node.js](https://nodejs.org/) (Incluye NPM).

---

## 📦 Instalación

1. Clona o descarga este repositorio en tu computadora.
2. Abre una terminal, navega hasta la carpeta del proyecto y descarga las dependencias necesarias ejecutando:

```bash
npm install express socket.io
