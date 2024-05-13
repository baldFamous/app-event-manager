# Página Principal

### -- Barra de Navegación
Componente persistente en todas las páginas que incluye enlaces a:
- **Eventos**
- **Organizadores**
- **Iniciar Sesión**
- *Opcionales:* Contacto, Acerca de

### -- Slogan
Un banner atractivo con un breve eslogan que resuma la visión del sitio.

### -- Vista previa de Eventos
Lista de eventos próximos o destacados, posiblemente con un carrusel de imágenes para hacer la página más visual.

### -- Sección de pie de página
Información de contacto, derechos de autor, enlaces a redes sociales, etc.

# Página de Eventos

### -- Barra de Filtros
Componentes de selección para filtrar eventos por localidad y fecha.

### -- Lista de Eventos
Mostrar eventos filtrados. Cada evento debe incluir:
- Nombre
- Imagen (si disponible)
- Fecha
- Breve descripción

### -- Detalles del Evento
Al hacer clic en un evento, se muestra más información como ubicación, precio, y opción para reservar.

# Página de Organizadores

### -- Lista de Organizadores
Muestra cada organizador con una imagen genérica, nombre y número de eventos organizados.

### -- Detalles del Organizador
Al hacer clic en un organizador, se abre una página con los eventos organizados por él, con opciones similares a la página de eventos.

# Página de Inicio de Sesión y Registro

### -- Formulario de Inicio de Sesión/Registro
Campos para ingresar o registrar detalles.

### -- Opción de Recuperación de Contraseña
Enlace para ayudar a los usuarios a recuperar contraseñas olvidadas.

# Recomendaciones de Diseño y Mejora

## Filtros de búsqueda avanzados
Además de localidad y fecha, considera filtros por tipo de evento o precio.

## Interactividad
Asegúrate de que las páginas sean interactivas y amigables para el usuario, con mensajes de error claros y confirmaciones visuales de acciones como reservaciones.

## Responsividad
Diseña el sitio para que sea completamente funcional en dispositivos móviles.

## Accesibilidad
Implementa prácticas de accesibilidad web para asegurar que todos puedan usar el sitio eficientemente.

# Modificaciones al Modelo de Datos

- Considera agregar campos de imagen para usuarios y eventos para hacer el sitio más visual.
- Asegúrate de que el campo de rol en "Usuario" tenga restricciones definidas (como enum) para evitar roles no válidos.
