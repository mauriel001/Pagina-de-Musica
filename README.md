# MusicApp

Reproductor de música hecho con React Native y Expo. Permite explorar canciones, reproducirlas con audio real y crear playlists.

## Funcionalidades

- Pantalla de inicio con categorías, canciones populares y playlists.
- Reproductor con audio real (`expo-av`) y barra de tiempo interactiva.
- Retoma la canción donde se quedó (versión web).
- Pantalla de búsqueda con géneros.
- Playlists: crear, nombrar, agregar canciones y visualizarlas.
- El estado se conserva al cambiar de pantalla.

## Tecnologías

- Expo y React Native
- React Navigation (native stack)
- React Native Paper
- expo-av
- @react-native-community/slider
- @expo/vector-icons
- React Context para el estado global

## Cómo ejecutarlo

```bash
git clone https://github.com/mauriel001/Pagina-de-Musica.git
cd Pagina-de-Musica
npm install
npx expo start
```

Presiona `w` para abrirlo en el navegador, o escanea el QR con Expo Go.

Si algo se ve raro después de actualizar archivos, reinicia con la caché limpia: `npx expo start -c`

## Estructura del proyecto

```text
App.js               Providers y navegación
AudioContext.js      Reproducción, progreso y seek
PlaylistContext.js   Playlists en memoria
songs.js             Datos compartidos de las canciones
Vista1.js            Inicio
Vista2.js            Reproductor
Vista3.js            Búsqueda
Vista4.js            Mis playlists
Vista5.js            Detalle de una playlist
assets/              Portadas y audios
```

## Agregar canciones

1. Copia la portada y el audio dentro de `assets/`, con nombres en minúsculas y sin espacios.
2. Regístrala en `songs.js`:

```javascript
{
  id: '4',
  title: 'Mi canción',
  artist: 'Mi artista',
  image: require('./assets/mi-cancion.jpg'),
  audio: require('./assets/mi-cancion.mp3'),
},
```

Nota sobre derechos de autor: no subas canciones comerciales a un repositorio público. Usa música propia o con licencia libre.

## Desarrollo asistido por IA

Esta funcionalidad se construyó con ayuda de un agente (Claude).

### Prompt utilizado

> Implementa una funcionalidad que permita:
>
> 1. Crear una nueva playlist y asignarle un nombre
> 2. Agregar canciones existentes de la aplicación.
> 3. Visualizar la playlist creada.
> 4. Mostrar las canciones que contiene.
> 5. Debe utilizar React Native Paper.
>
> Consideraciones
>
> * No utilizar una API externa.
> * No instalar nuevas librerías.
> * Reutilizar los componentes y datos existentes.
> * No eliminar funcionalidades actuales.
> * La playlist debe conservarse mientras el usuario navega por la aplicación.

### Plan propuesto por el agente

1. Mover las canciones de `Vista1.js` a `songs.js` para reutilizarlas sin duplicar datos.
2. Crear `PlaylistContext.js` con React Context, por encima del `NavigationContainer`, para conservar las playlists al navegar sin instalar librerías.
3. Crear `Vista4.js` (Mis playlists) con `Card`, `FAB` y un `Dialog` con `TextInput` para crear una playlist con nombre.
4. Crear `Vista5.js` (detalle) para mostrar las canciones con `List.Item` y agregar las existentes con `Checkbox`.
5. Integrar todo en `App.js` y `Vista1.js` sin eliminar funcionalidades previas.

## Notas

- Las playlists viven en memoria: se conservan al navegar, pero se pierden al cerrar o recargar la app.
- La posición de reproducción se guarda con `localStorage`, por lo que funciona en web. En una app nativa haría falta `AsyncStorage`.
- `expo-av` está marcado como deprecated por Expo; una mejora futura es migrar a `expo-audio`.
