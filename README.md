# 💪 WebApp WorkOut

Una aplicación web para registrar y gestionar tus entrenamientos deportivos. Todo se guarda localmente en tu navegador, sin necesidad de servidor ni base de datos.

## 🚀 Funcionalidades

- **Registro y login** de usuarios con validación de formularios
- **Añadir entrenamientos** con cálculo automático de velocidad y nivel de esfuerzo
- **Ver, buscar y borrar entrenamientos** con filtrado por fechas
- **Mejor entrenamiento** filtrable por distancia, tiempo o velocidad
- **Foro de comentarios** donde los usuarios pueden publicar opiniones
- **Modo día/noche** que persiste entre sesiones
- **Animación de entrada** al acceder por primera vez

## 📁 Estructura del proyecto

```
├── index.html                  # Página de login y registro
├── app/
│   ├── main.html               # Página principal
│   ├── assets/
│   │   ├── css/
│   │   │   ├── style.css       # Estilos principales y responsive
│   │   │   └── login.css       # Estilos de la página de login
│   │   ├── js/
│   │   │   ├── login.js        # Lógica de login, registro y animaciones
│   │   │   ├── main.js         # Lógica principal de entrenamientos y foro
│   │   │   ├── changeTheme.js  # Gestión del modo día/noche
│   │   │   ├── userLocalStorage.js  # Operaciones con localStorage
│   │   │   ├── cardMaker.js    # Creación dinámica de elementos DOM
│   │   │   ├── Usuario.js      # Clase Usuario
│   │   │   └── Entrenamiento.js # Clase Entrenamiento
│   │   └── images/             # Imágenes del slideshow y GIFs
```

## 🛠️ Tecnologías

- **HTML5** y **CSS3** con variables y media queries
- **JavaScript ES6** con módulos (import/export)
- **jQuery 3.7.1** para manipulación del DOM y animaciones
- **localStorage** para persistencia de datos

## 📖 Cómo funciona

1. Al entrar por primera vez aparece una animación de bienvenida y un modal informativo
2. Se puede registrar un nuevo usuario o iniciar sesión con uno existente
3. Una vez logueado, se puede añadir entrenamientos introduciendo distancia (km) y tiempo (min)
4. La aplicación calcula automáticamente la velocidad y asigna un nivel de esfuerzo:
   - **Malo**: velocidad < 8 km/h
   - **Bueno**: velocidad entre 8 y 15 km/h
   - **Muy bueno**: velocidad > 15 km/h
5. Se puede buscar entrenamientos por rango de fechas o filtrar el mejor por distintos criterios
6. El foro permite publicar y eliminar comentarios