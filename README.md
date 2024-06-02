# Gestor de Eventos

Gestor de Eventos es una aplicación para la gestión de eventos, desarrollada con Django REST Framework en el backend y React en el frontend.


## Estructura del Proyecto

El proyecto está dividido en dos carpetas principales:

- **backend**: Contiene el código del servidor y la API construida con Django.
- **frontend**: Contiene el código de la interfaz de usuario construida con React.

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas:

- Python 3.x
- Node.js
- npm (Node Package Manager)
- virtualenv

## Instalación

### Clonar el repositorio

```sh
git clone https://github.com/baldFamous/app-event-manager.git
cd app-event-manager
```

### Configuración del Backend

1. Crear y activar un entorno virtual:

    ```sh
    python -m venv venv
   
    source venv/bin/activate  # MacOS y Linux
    ```
    En Windows usa 
    ```sh
    venv\Scripts\activate
    ```

2. Instalar las dependencias del backend:

    ```sh
    pip install -r backend/requirements.txt
    ```

3. Configurar la base de datos y realizar las migraciones:

    ```sh
    python backend/manage.py makemigrations
    python backend/manage.py migrate
    ```

4. Ejecutar el servidor de desarrollo de Django:

    ```sh
    python backend/manage.py runserver
    ```

### Configuración del Frontend

1. Instalar las dependencias del frontend:

    ```sh
    cd frontend
    npm install
    ```

2. Ejecutar el servidor de desarrollo de React:

    ```sh
    npm start
    ```

## Uso

- Accede a `http://localhost:8000` para interactuar con la Admin Page de Django.
- Accede a `http://localhost:3000` para ver la interfaz de usuario del frontend.

## Contribución

Si deseas contribuir al proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-feature`).
3. Realiza tus cambios y haz commit (`git commit -m 'Agregar nueva feature'`).
4. Sube los cambios a tu repositorio (`git push origin feature/nueva-feature`).
5. Abre un Pull Request.


## Contacto

Para cualquier duda o consulta, puedes contactar a los mantenedores del proyecto.

- LinkedIn: [Bastian Rodriguez](https://www.linkedin.com/in/bastian-rodriguez-8b0781211/)

---
