# 🏥 Proyecto Integrador Laboratorio 2 - Clínica

**Proyecto Integrador Laboratorio 2 - Clínica** es una aplicación web desarrollada con **Node.js, Express, Handlebars y MySQL** para la gestión de laboratorios clínicos. Permite administrar **pacientes, médicos, técnicos, bioquímicos, órdenes de trabajo y resultados de exámenes**.

---

## 📌 Características

- 🏥 **Gestión de pacientes y personal médico** (médicos, bioquímicos, recepcionistas, técnicos).
- 📋 **Administración de órdenes de trabajo y exámenes clínicos**.
- 🔐 **Sistema de autenticación y control de acceso**.
- 📄 **Interfaces dinámicas con Handlebars**.
- 📊 **Base de datos MySQL** para almacenamiento estructurado de información.
- 🎨 **Diseño responsivo y estilizado con CSS**.

---

## 🛠️ Tecnologías utilizadas

- **Node.js & Express.js**: Servidor web y API REST.
- **MySQL**: Base de datos relacional.
- **Handlebars.js**: Motor de plantillas para renderizar HTML dinámico.
- **CSS3**: Estilos personalizados.
- **JavaScript (ES6+)**: Lógica del frontend y validaciones.

---

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

