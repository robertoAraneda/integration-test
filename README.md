
# Users API Documentation

## Introducción

Esta documentación describe las API disponibles para gestionar usuarios en la aplicación. La API permite crear, obtener, actualizar y eliminar usuarios de manera eficiente y segura.

## Base URL
## Endpoints

### 1. Crear Usuario

- **URL:** `/users`
- **Método HTTP:** `POST`
- **Descripción:** Crea un nuevo usuario en el sistema.
- **Cuerpo de la Solicitud:**

  El cuerpo debe cumplir con la estructura definida en `CreateUserDto` utilizando las validaciones especificadas.

  ```json
  {
    "name": "Juan",
    "family": "Pérez",
    "email": "juan.perez@example.com",
    "password": "securepassword123",
    "isActive": true
  }
  ```


### Validaciones:

name: Requerido, debe ser una cadena no vacía.
family: Requerido, debe ser una cadena no vacía.
email: Requerido, debe ser un correo electrónico válido.
password: Requerido, debe ser una cadena no vacía.
isActive: Requerido, debe ser un valor booleano.


### Respuestas:

### Éxito (201 Created):

```json
{
  "id": 1,
  "name": "Juan",
  "family": "Pérez",
  "email": "juan.perez@example.com",
  "isActive": true,
  "createdAt": "2024-08-26T12:00:00.000Z",
  "updatedAt": "2024-08-26T12:00:00.000Z"
}
```
### Error de Validación (400 Bad Request):

```json
{
  "statusCode": 400,
  "message": [
    "email must be an email",
    "name should not be empty"
  ],
  "error": "Bad Request"
}
```

### 2. Obtener Todos los Usuarios

- **URL:** `/users`
- **Método HTTP:** `GET`
- **Descripción:** Recupera una lista de todos los usuarios registrados

### Respuestas:

### Éxito (200 OK):

```json
[
  {
    "id": 1,
    "name": "Juan",
    "family": "Pérez",
    "email": "juan.perez@example.com",
    "isActive": true,
    "createdAt": "2024-08-26T12:00:00.000Z",
    "updatedAt": "2024-08-26T12:00:00.000Z"
  },
  {
    "id": 2,
    "name": "María",
    "family": "García",
    "email": "maria.garcia@example.com",
    "isActive": false,
    "createdAt": "2024-08-26T13:00:00.000Z",
    "updatedAt": "2024-08-26T13:00:00.000Z"
  }
]
```
### 3. Obtener Usuario por ID

- **URL:** `/users/:id`
- **Método HTTP:** `GET`
- **Descripción:** Recupera los detalles de un usuario específico mediante su ID.

### Parámetros de Ruta:

| Parámetro | Tipo   | Descripción                        |
|-----------|--------|------------------------------------|
| `id`      | string | ID único del usuario a recuperar   |

### Respuestas:

Éxito (200 OK):

```json
{
  "id": 1,
  "name": "Juan",
  "family": "Pérez",
  "email": "juan.perez@example.com",
  "isActive": true,
  "createdAt": "2024-08-26T12:00:00.000Z",
  "updatedAt": "2024-08-26T12:00:00.000Z"
}
```

### No Encontrado (404 Not Found):

```json
{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}
```

### 4. Actualizar Usuario

- **URL:** `/users/:id`
- **Método HTTP:** `PATCH`
- **Descripción:** Actualiza la información de un usuario existente.
- **Parametros de ruta** 

| Parámetro | Tipo   | Descripción                        |
|-----------|--------|------------------------------------|
| `id`      | string | ID único del usuario a actualizar  |


- **Cuerpo de la Solicitud:**

El cuerpo debe seguir la estructura definida en UpdateUserDto. Asumiendo que UpdateUserDto permite campos opcionales, los campos disponibles son los mismos que en CreateUserDto, pero no todos son obligatorios.

```json
{
  "email": "juan.perez@nuevoemail.com",
  "isActive": false
}
```
### Validaciones:

- **name**: Opcional, si se proporciona, debe ser una cadena no vacía.
- **family**: Opcional, si se proporciona, debe ser una cadena no vacía.
- **email**: Opcional, si se proporciona, debe ser un correo electrónico válido.
- **password**: Opcional, si se proporciona, debe ser una cadena no vacía.
- **isActive**: Opcional, si se proporciona, debe ser un valor booleano.

### Respuestas:

Éxito (200 OK):

```json
{
  "id": 1,
  "name": "Juan",
  "family": "Pérez",
  "email": "juan.perez@nuevoemail.com",
  "isActive": false,
  "createdAt": "2024-08-26T12:00:00.000Z",
  "updatedAt": "2024-08-26T14:00:00.000Z"
}
```

### Error de Validación (400 Bad Request):

```json
{
  "statusCode": 400,
  "message": [
    "email must be an email"
  ],
  "error": "Bad Request"
}
```

No Encontrado (404 Not Found):

```json
{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}
```

### 5. Eliminar Usuario

- **URL:** `/users/:id`
- **Método HTTP:** `DELETE`
- **Descripción:** Elimina un usuario existente del sistema.
- **Parametros de ruta** 

| Parámetro | Tipo   | Descripción                        |
|-----------|--------|------------------------------------|
| `id`      | string | ID único del usuario a actualizar  |

### Respuestas:

Éxito (204 No Content): Indica que la operación se realizó correctamente y que no hay contenido que devolver.

No Encontrado (404 Not Found):

```json
{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}
```

DTOs (Data Transfer Objects)
CreateUserDto
Define la estructura y validaciones para la creación de un usuario.

typescript
Copy code
import { IsBoolean, IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  family: string;
  
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsBoolean()
  isActive: boolean;
}

Descripción de Campos:

Campo	Tipo	Validación	Descripción
name	string	@IsNotEmpty()	Nombre del usuario
family	string	@IsNotEmpty()	Apellido del usuario
email	string	@IsEmail()	Correo electrónico
password	string	@IsNotEmpty()	Contraseña del usuario
isActive	boolean	@IsBoolean()	Estado activo del usuario
UpdateUserDto
Define la estructura y validaciones para la actualización de un usuario. Asume que todos los campos son opcionales y se aplican las mismas validaciones que en CreateUserDto si se proporcionan.

typescript
Copy code
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
Descripción de Campos:

Todos los campos de CreateUserDto son opcionales en UpdateUserDto, pero si se proporcionan, deben cumplir con las mismas validaciones.

Campo	Tipo	Validación	Descripción
name	string	@IsNotEmpty()	Nombre del usuario
family	string	@IsNotEmpty()	Apellido del usuario
email	string	@IsEmail()	Correo electrónico
password	string	@IsNotEmpty()	Contraseña del usuario
isActive	boolean	@IsBoolean()	Estado activo del usuario
Ejemplos de Uso
1. Crear un Usuario
Solicitud:

bash
Copy code
POST /users
Content-Type: application/json

{
  "name": "Juan",
  "family": "Pérez",
  "email": "juan.perez@example.com",
  "password": "securepassword123",
  "isActive": true
}
Respuesta Exitosa:

bash
Copy code
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": 1,
  "name": "Juan",
  "family": "Pérez",
  "email": "juan.perez@example.com",
  "isActive": true,
  "createdAt": "2024-08-26T12:00:00.000Z",
  "updatedAt": "2024-08-26T12:00:00.000Z"
}
2. Obtener Todos los Usuarios
Solicitud:

bash
Copy code
GET /users
Respuesta Exitosa:

bash
Copy code
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "id": 1,
    "name": "Juan",
    "family": "Pérez",
    "email": "juan.perez@example.com",
    "isActive": true,
    "createdAt": "2024-08-26T12:00:00.000Z",
    "updatedAt": "2024-08-26T12:00:00.000Z"
  },
  {
    "id": 2,
    "name": "María",
    "family": "García",
    "email": "maria.garcia@example.com",
    "isActive": false,
    "createdAt": "2024-08-26T13:00:00.000Z",
    "updatedAt": "2024-08-26T13:00:00.000Z"
  }
]
3. Obtener un Usuario por ID
Solicitud:

bash
Copy code
GET /users/1
Respuesta Exitosa:

bash
Copy code
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 1,
  "name": "Juan",
  "family": "Pérez",
  "email": "juan.perez@example.com",
  "isActive": true,
  "createdAt": "2024-08-26T12:00:00.000Z",
  "updatedAt": "2024-08-26T12:00:00.000Z"
}
Respuesta de Usuario No Encontrado:

css
Copy code
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}
4. Actualizar un Usuario
Solicitud:

bash
Copy code
PATCH /users/1
Content-Type: application/json

{
  "email": "juan.perez@nuevoemail.com",
  "isActive": false
}
Respuesta Exitosa:

bash
Copy code
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 1,
  "name": "Juan",
  "family": "Pérez",
  "email": "juan.perez@nuevoemail.com",
  "isActive": false,
  "createdAt": "2024-08-26T12:00:00.000Z",
  "updatedAt": "2024-08-26T14:00:00.000Z"
}
Respuesta de Error de Validación:

css
Copy code
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "statusCode": 400,
  "message": [
    "email must be an email"
  ],
  "error": "Bad Request"
}
Respuesta de Usuario No Encontrado:

css
Copy code
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}
5. Eliminar un Usuario
Solicitud:

bash
Copy code
DELETE /users/1
Respuesta Exitosa:

css
Copy code
HTTP/1.1 204 No Content
Respuesta de Usuario No Encontrado:

css
Copy code
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}
Respuestas de Errores Comunes
400 Bad Request
Se produce cuando la solicitud contiene datos inválidos según las reglas de validación establecidas en los DTOs.

Ejemplo de Respuesta:

json
Copy code
{
  "statusCode": 400,
  "message": [
    "email must be an email",
    "name should not be empty"
  ],
  "error": "Bad Request"
}
404 Not Found
Se produce cuando se intenta acceder, actualizar o eliminar un usuario que no existe en el sistema.

Ejemplo de Respuesta:

json
Copy code
{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}
