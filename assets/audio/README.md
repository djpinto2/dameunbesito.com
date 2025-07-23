# Directorio de Audio

Este directorio contiene archivos de audio para mejorar la experiencia del usuario en el sitio web de "Dame Un Besito".

## Archivos de Audio Sugeridos

### Música de Fondo
- `background-music.mp3` - Música suave de fondo para la página principal
- `ambient-sounds.mp3` - Sonidos ambientales de la pastelería

### Efectos de Sonido
- `notification.mp3` - Sonido de notificación para formularios
- `success.mp3` - Sonido de éxito para pedidos completados
- `hover.mp3` - Efecto de sonido al pasar el mouse sobre elementos

### Audio Descriptivo
- `product-description.mp3` - Descripción de productos en audio
- `store-intro.mp3` - Introducción de la pastelería en audio

## Especificaciones de Audio

### Formatos Aceptados
- MP3 (recomendado para música)
- WAV (para efectos de sonido de alta calidad)
- OGG (alternativa libre de derechos)
- AAC (para mejor compresión)

### Calidad y Tamaño
- Música de fondo: 128-192 kbps
- Efectos de sonido: 320 kbps
- Duración: 30 segundos - 3 minutos para música de fondo
- Tamaño de archivo máximo: 5MB por archivo

### Optimización
- Comprimir archivos de audio
- Mantener calidad auditiva aceptable
- Considerar diferentes velocidades de conexión
- Proporcionar versiones de diferentes calidades

## Uso en el Sitio Web

### Implementación HTML5
```html
<audio id="background-music" loop>
    <source src="assets/audio/background-music.mp3" type="audio/mpeg">
    Tu navegador no soporta audio.
</audio>
```

### Control con JavaScript
```javascript
const audio = document.getElementById('background-music');
audio.volume = 0.3; // 30% del volumen
audio.play();
```

### Efectos de Sonido
```javascript
function playSound(soundFile) {
    const audio = new Audio(`assets/audio/${soundFile}`);
    audio.volume = 0.5;
    audio.play();
}
```

## Consideraciones de Accesibilidad

### Controles de Usuario
- Proporcionar controles para activar/desactivar audio
- Permitir ajuste de volumen
- Respetar las preferencias del usuario
- No reproducir audio automáticamente sin consentimiento

### Subtítulos y Transcripciones
- Proporcionar transcripciones para contenido de audio
- Incluir subtítulos cuando sea apropiado
- Considerar usuarios con discapacidad auditiva

## Notas Importantes
- El audio debe ser opcional y no intrusivo
- Respetar las políticas de autoplay de los navegadores
- Considerar el impacto en el rendimiento de la página
- Mantener consistencia con la marca y el ambiente de la pastelería
- Asegurar que los archivos de audio tengan los derechos de uso apropiados 