<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# TV'S MICROSERVICE | DEV TIPS

This is the TV'S microservice for the DevTips project. Its objective is to show tips based on the user's subscription information, facilitating the process by generating and verifying identity through QR codes and subscription API keys.

## Run this project

### 1. Clone this repository

```bash
# Option 1: Clone using the web URL (HTTPS)
$ git clone https://github.com/stivenloaiza/dev-tips-tvs-backend.git

# Option 2: Use a password-protected SSH key (SSH)
$ git clone git@github.com:stivenloaiza/dev-tips-tvs-backend.git
```

### 2. Install dependencies

```bash
$ npm install
```

### 3. Environment Variables

To configure the environment variables, follow these steps:

1. Create a `.env` file in the root of the project
2. Copy the content of this file and paste it in the `.env` file
3. Fill the variables with your data

```bash
#* ENVIRONMENT VARIABLES | TV'S MICROSERVICE

#* DATABASE ENVIRONMENT
ENVIRONMENT = 'YOUR ENVIRONMENT'

#* DATABASE CONECTION REMOTE
# EXAMPLE: mongodb+srv://{DB_USERNAME}:{DB_PASSWORD}@{DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority&appName=Tvs
DB_USERNAME = 'YOU DB USERNAME'
DB_PASSWORD = 'YOUR DB PASSWORD'
DB_CLUSTER = 'YOUR DB CLUSTER'

#* DATABASE CONECTION LOCAL
# EXAMPLE: {DB_CONNECTION}{DB_HOST}
DB_CONNECTION = 'YOUR DB CONNECTION'
DB_HOST = 'YOUR DB HOST'

#* PROJECT PORT
PORT = 'YOUR PORT'

#* MICROSERVICES URL
USER_URL = 'MICROSERVICE URL USER'
CRONJOBS_URL = 'MICROSERVICE URL CRONJOBS'
TIPS_URL = 'MICROSERVICE URL TIPS'
AUTH_URL = 'MICROSERVICE URL AUTH'
```

### 4. Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Endpoints

### Start by QR Code

- **Generate QR Code**

  - **GET** `/api/v1/qr-code/generate-qr`
  - Generates a QR code and an associated URL with a unique code.

- **Check Authentication**

  - **GET** `/api/v1/qr-code/check/:code`
  - Verify if a QR code has been authenticated.

- **Verify QR Code**

  - **GET** `/api/v1/qr-code/verify-qr`
  - Verify the authenticity of a QR code.

- **User Exists**

  - **GET** `/api/v1/qr-code/user-exists`
  - Verify if a user exists by email.

- **Generate Verification Code**

  - **GET** `/api/v1/qr-code/generate-code/:email`
  - It generates a verification code and associates it with an email.

- **Send Verification Code**

  - **POST** `/api/v1/qr-code/send-code`
  - Sends a verification code to the user's email address.

- **Code Match**

  - **POST** `/api/v1/qr-code/code-match`
  - Verifies if a verification code is valid and has not been used.

- **Get User Subscriptions**
  - **POST** `/api/v1/qr-code/code-subscriptions`
  - Obtains user subscriptions based on a verification code.

### Start by API Key

- **Validate API Key**
  - **GET** `/api/v1/auth/validate-apikey`
  - Valida una API key.

### Mock Tips

- **Get Mock Tips**
  - **GET** `/api/v1/mock-tips/tips`
  - Obtiene tips mock para propósitos de prueba.

## Postman collection

**Postman collection:** [Collection here](./postman/TV'S%20MICROSERVICE.postman_collection.json)

## Swagger documentation

```bash
http://localhost:{PORT}/api/doc
```

## Consumption to Other Microservices

- **Users**: [GitHub repository](https://github.com/stivenloaiza/dev-tips-users-backend)
- **Tips**: [GitHub repository](https://github.com/stivenloaiza/dev-tips-tips-backend)
- **Cron Jobs**: [GitHub repository](https://github.com/stivenloaiza/dev-tips-cronjobs-backend)

## Colaboradores

- Samuel Vera Miranda: [GitHub profile](https://github.com/SamuelSml) | Backend
- Manuela Giraldo Arango: [GitHub profile](https://github.com/Arangog20) | Backend
- Daniel Stiven López Carmona: [GitHub profile](https://github.com/stiv-ca) | Frontend
- Alexander Hernández Martínez: [GitHub profile](https://github.com/AlexanderHernandez17) | Frontend
- Juan Camilo Atehortua: [GitHub profile](https://github.com/JuanCamilo97-stack) | Frontend

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
