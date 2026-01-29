class Entrenamiento {

    constructor(distancia, tiempo, fecha = null) {
        this.distancia = distancia;
        this.tiempo = tiempo;
        this.velocidad = this.calcularVelocidad();
        this.fecha = fecha instanceof Date ? fecha : new Date();
        this.nivelEsfuerzo = this.calcularNivelEsfuerzo();
    }

    calcularVelocidad() {
        return (this.distancia / (this.tiempo / 60)).toFixed(2);
    }
    calcularNivelEsfuerzo() {
        if (this.velocidad < 8) return "Malo";
        if (this.velocidad <= 15) return "Bueno";
        return "Muy bueno";
    }

    info() {
        return `Distancia: ${this.distancia}km, Tiempo: ${this.tiempo}min, Velocidad: ${this.velocidad}km/h, Nivel de esfuerzo: ${this.nivelEsfuerzo}, Fecha: ${this.fecha}`;
    }
}

export default Entrenamiento;