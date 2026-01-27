class Usuario {
  constructor(usuario, contraseña, nombre, correo, altura, peso, edad, genero) {
    this.usuario = usuario;
    this.contraseña = contraseña;
    this.nombre = nombre;
    this.correo = correo;
    this.altura = altura || 0;
    this.peso = peso || 0;
    this.edad = edad || 0;
    this.genero = genero ? this.añadirGenero(genero) : "Otro";
    this.entrenamientos = [];
  }

  añadirGenero(genero) {
    if (genero.toLowerCase()[0] === "h") return "Hombre";
    if (genero.toLowerCase()[0] === "m") return "Mujer";
    return "Otro";
  }

  añadirEntrenamiento(entrenamiento) {
    this.entrenamientos.push(entrenamiento);
  }

  info() {
    return `Usuario: ${this.usuario}  Contraseña: ${this.contraseña}  Nombre: ${this.nombre}  Correo: ${this.correo}  Altura: ${this.altura} cm  Peso: ${this.peso} kg  Edad: ${this.edad} años  Género: ${this.genero} Nº entrenamientos: ${this.entrenamientos.length}`;
  }

  comprobarIgualdad(otraPersona) {
    return this.usuario === otraPersona.usuario && this.contraseña === otraPersona.contraseña;
  }
}