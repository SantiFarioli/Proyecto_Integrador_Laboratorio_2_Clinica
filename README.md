# Sistema de Gestión de Laboratorio Clínico 🧪

Aplicación web desarrollada como proyecto integrador universitario para la gestión integral de un laboratorio clínico. El sistema permite registrar pacientes, generar órdenes de análisis clínicos, procesar muestras y gestionar resultados de exámenes de laboratorio. Implementado utilizando un stack completo en JavaScript, con arquitectura MVC (Modelo-Vista-Controlador) y conexión a base de datos relacional MySQL.

## 🧬 Funcionalidades principales

- **Gestión de pacientes**: Registro, modificación y consulta de datos personales y clínicos.
- **Órdenes de análisis clínicos**: Carga de solicitudes con múltiples estudios asociados.
- **Manejo de muestras**: Seguimiento de muestras recolectadas y procesadas.
- **Carga de resultados**: Ingreso de valores obtenidos y validación por parte del bioquímico.
- **Valores de referencia**: Comparación automática según edad, sexo y embarazo.
- **Roles diferenciados**:
  - **Recepcionista**: Alta de pacientes y carga de órdenes.
  - **Técnico Bioquímico**: Registro de muestras y resultados.
  - **Bioquímico**: Validación final de resultados.
  - **Administrador**: Gestión completa del sistema, usuarios y configuraciones.

## ⚙️ Tecnologías utilizadas

- **Backend**: Node.js + Express
- **Frontend**: Handlebars + HTML/CSS + Bootstrap
- **Base de datos**: MySQL con Sequelize ORM
- **Autenticación**: Manejada por sesiones (express-session)
- **Arquitectura**: Patrón MVC

## 📁 Organización del proyecto

- `src/controllers`: Lógica de negocio por módulo.
- `src/models`: Definición de entidades y relaciones.
- `src/router`: Rutas Express agrupadas por funcionalidad.
- `src/views`: Plantillas dinámicas según el rol del usuario.
- `src/app.js`: Configuración principal de la aplicación.

## 🎓 Proyecto académico

Este sistema fue desarrollado como trabajo integrador de la materia **Laboratorio de Computación II** en el marco de una carrera universitaria de informática.



## 📁 Estructura del Proyecto

```bash
Proyecto_Integrador_Laboratorio_2_Clinica/
│── src/
│   ├── app.js                        # Configuración principal del servidor
│   ├── index.js                      # Punto de entrada del servidor
│   ├── database/database.js          # Configuración y conexión a MySQL
│   ├── controllers/                  # Controladores para cada módulo
│   │   ├── admin.controller.js
│   │   ├── paciente.controller.js
│   │   ├── medico.controller.js
│   │   ├── ordenTrabajo.controller.js
│   ├── models/                        # Modelos de base de datos
│   │   ├── paciente.js
│   │   ├── usuario.js
│   │   ├── examen.js
│   │   ├── orden_trabajo.js
│   ├── router/                        # Rutas de la API
│   │   ├── paciente.ruta.js
│   │   ├── medico.ruta.js
│   │   ├── usuario.ruta.js
│   ├── public/                        # Archivos estáticos (CSS, imágenes, JS)
│   │   ├── css/
│   │   ├── js/
│   │   ├── img/
│   ├── views/                         # Plantillas Handlebars
│   │   ├── layouts/main.handlebars
│   │   ├── loginPersonalLab.handlebars
│   │   ├── admin.handlebars
│── package.json                       # Dependencias del proyecto
│── dise__o_BD.pdf                     # Diseño de la base de datos
```

---

## 🚀 Instalación y Uso

### 1️⃣ Clonar el repositorio

```sh
git clone https://github.com/SantiFarioli/Proyecto_Integrador_Laboratorio_2_Clinica.git
cd Proyecto_Integrador_Laboratorio_2_Clinica
```

### 2️⃣ Instalar dependencias

```sh
npm install
```

### 3️⃣ Configurar la base de datos

- Crear la base de datos en **MySQL** según el esquema en `dise__o_BD.pdf`.
- Configurar la conexión en `database.js`.

### 4️⃣ Ejecutar el servidor

```sh
node src/index.js
```

- Acceder en el navegador a **[http://localhost:3000/](http://localhost:3000/)**.

---

![image](https://github.com/user-attachments/assets/27894f35-10c2-4038-8a54-ff056ce20783)
![image](https://github.com/user-attachments/assets/fd4d6ce1-b7db-46a7-861d-27cfcd45955f)
![image](https://github.com/user-attachments/assets/35b34869-e006-41ca-90e4-b137e65917c0)
![image](https://github.com/user-attachments/assets/a4222524-8ad0-4ea4-a890-3b0b0b7fa3c5)


## 📜 Licencia

Este proyecto es de uso libre bajo la licencia **MIT**.

