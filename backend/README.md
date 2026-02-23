# CarePlus Backend System

Production-ready backend for the CarePlus ecosystem, built with NestJS, Prisma, and PostgreSQL.

## Features
- **RESTful API**: Clean and modular architecture.
- **JWT Authentication**: Secure login and registration.
- **RBAC**: Role-based access control (Admin, User).
- **Validation**: Strict input validation using DTOs and class-validator.
- **API Documentation**: Swagger UI integrated.

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment**:
   Update `.env` with your `DATABASE_URL` and `JWT_SECRET`.

3. **Initialize Database**:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

4. **Run Project**:
   ```bash
   # Development
   npm run start:dev

   # Production
   npm run build
   npm run start:prod
   ```

## Documentation
Once running, access Swagger documentation at: `http://localhost:3000/api/docs`

## License
UNLICENSED
