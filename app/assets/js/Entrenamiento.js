class Entrenamiento {

    constructor(distancia, tiempo) {
        if (!this.comprobarValoresEntrenamiento(distancia, tiempo)) 
            return false; 
        this.distancia = distancia;
        this.tiempo = tiempo;
        this.velocidad = this.calcularVelocidad();
        this.fecha = new Date();
        this.nivelEsfuerzo = this.calcularNivelEsfuerzo();
    }

    calcularVelocidad() {
        return (this.distancia / (this.tiempo / 60)).toFixed(2);
    }

    comprobarValoresEntrenamiento(distancia, tiempo) {
        if (isNaN(distancia) || distancia <= 0) { alert("Distancia inválida."); return false; }
        if (isNaN(tiempo) || tiempo <= 0) { alert("Tiempo inválido."); return false; }
        return true;
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