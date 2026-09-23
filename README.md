# Breve_Ejercicio_Tema_1
Daniel Maroto Navarro

El problema desarrollar un juego sobre saltar obstáculos para no caer al vacío mientras recoge monedas. El juego sería en 2D. 
El jugador sería un cuadrado azul que se mueve izquierda, derecha y salta. El jugador si no está tocando el suelo cae y sale de la pantalla.
El jugador tiene 3 vidas cada vez que cae al vacío el jugador reinicia hasta 3 veces si se agotan el usuario ha perdido.
El escenario del juego serían plataformas elevadas con varias monedas recolectables. El objetivo del juego sería recolectar las monedas y llegar al final sin caer.

El juego sería para navegador web (Google Chrome, Mozilla Firefox, Microsoft Edge, etc.). 
El lenguaje elegido sería HTML 5 y Javascript

Para este juego usaremos el paradigma imperativo y orientado a objetos, estructurado por un game loop que se ejecuta continuamente.
Si se pulsa flecha derecha el jugador aumentaría la velocidad hacia la derecha. Si se pulsa la flecha izquierda aumenta la velocidad del jugador hacía la izquierda. Si se pulsa Espacio y el jugador está sobre el suelo se aplica fuerza de salto. Al saltar aumentaría su velocidad hacía arriba y progresivamente iría hacía abajo.
Si el personaje entra en colisión con una plataforma este caería hacia abajo. 
Si el jugador entra en contacto con una moneda esto sumaria un +1 en el puntaje del juego y la moneda desaparecería-
Si el jugador toca el fondo del mapa se reiniciaría hasta 3 veces y a la siguiente se mostraría game over siempre que el jugador cae o pierde reiniciar el mapa.
Poner una puerta final para ganar y mostrar HAS GANADO.

Archivos a generar:
   - index.html: Estructura base con un elemento canvas donde se renderiza el juego y el diseño/estilos CSS básicos.
   - game.js: Código JavaScript completo con las clases del Jugador, Plataformas, Monedas, Puerta, sistema de colisiones y Game Loop.
Ejecución y despliegue:
   - El juego debe ejecutarse localmente abriendo index.html en cualquier navegador web moderno sin necesidad de servidores externos.
  
