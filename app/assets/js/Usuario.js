class Usuario {
  constructor(usuario, contraseña, nombre, correo, altura, peso, edad, genero, entrenamientos = []) {
    this.usuario = usuario;
    this.contraseña = contraseña;
    this.nombre = nombre;
    this.correo = correo;
    this.altura = altura;
    this.peso = peso;
    this.edad = edad;
    this.genero = genero ? this.añadirGenero(genero) : "Otro";
    this.entrenamientos = entrenamientos;
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

  comprobarIgualdadStr(usuario, correo) {
    return this.usuario === usuario && this.correo === correo;
  }
}

export default Usuario;