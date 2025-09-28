# Eldes

**Eldes** es un proyecto de front-end desarrollado en **Angular**.  
Incluye el diseño y la implementación de las siguientes secciones principales:

- **Home**: página de inicio con la presentación general de la plataforma.  
- **Ranking**: muestra posiciones y puntajes de usuarios, obtenidos dinámicamente.  
- **Certificados**: sección donde se visualizan los certificados completados por el usuario.

El proyecto se conecta con un backend en **.NET** que expone los datos desde una base de datos en **Microsoft SQL Server**.

---

## 🚀 Requisitos previos

Antes de ejecutar este proyecto, asegurate de contar con el siguiente entorno:

### Frontend
- **Node.js** >= 20  
- **Angular CLI** 20.0.4  
- **Angular** 20.x  
- **Angular Material** 20.1.0  
- **RxJS** 7.8.2  
- **TypeScript** 5.8.3  
- **Zone.js** 0.15.1  

### Backend
- **.NET Framework / .NET Core** (según implementación del backend, recomendado .NET 6+ si es Core)  
- **SQL Server Express 2019** (versión 15.0.4382.1) o superior  

### Sistema operativo recomendado
- Windows 10 Home (o superior)  
- Procesador: 12 cores  
- Memoria: 8 GB RAM  

---

## ⚙️ Instalación y ejecución

### 1. Frontend (Angular)

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/VSerra12/eldes-front
   cd eldes-front
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Ejecutar en modo desarrollo:
   ```bash
   ng serve -o
   ```
   La aplicación se abrirá en [http://localhost:4200](http://localhost:4200)

---

### 2. Backend (.NET)

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/bacarvalho/eldesAPI.git
   cd eldesAPI
   ```

2. Restaurar dependencias:
   ```bash
   dotnet restore
   ```

3. Ejecutar la API:
   ```bash
   dotnet run
   ```
   Por defecto quedará en [http://localhost:5283](http://localhost:5283)
---

### 3. Base de Datos (SQL Server)

1. Instalar **SQL Server Express** (si no está instalado).  
   Versión recomendada: 2019 (15.0.4382.1).

2. Restaurar la base de datos:
   - Abrir **SQL Server Management Studio (SSMS)**.
   - Conectarse al servidor local
   - Ejecutar los scripts de creación de tablas y datos iniciales ubicados en la carpeta `/database`.

3. Verificar conexión desde el backend:
   - Configurar el `ConnectionString` en `appsettings.json` (ejemplo):
     ```json
     "ConnectionStrings": {
       "DefaultConnection": "Server=localhost;Database=ReplicaELdeS;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=true"
     }
     ```

---

## 📦 Comandos útiles

### Frontend (Angular)
- **Compilar en modo producción**
  ```bash
  ng build --configuration production
  ```

- **Ejecutar pruebas unitarias**
  ```bash
  ng test
  ```

- **Ejecutar pruebas end-to-end (E2E)**
  ```bash
  ng e2e
  ```

### Backend (.NET)
- **Compilar**
  ```bash
  dotnet build
  ```

- **Ejecutar**
  ```bash
  dotnet run
  ```

- **Ejecutar pruebas**
  ```bash
  dotnet test
  ```
