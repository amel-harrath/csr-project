# 🌿 CSR Data Management API

A backend API to help companies track and manage their compliance with Corporate Social Responsibility (CSR) requirements.

---

## 📘 Context

One of the goals of this system is to help companies become and stay compliant with official CSR requirements.  
A company is considered compliant with a requirement if it has uploaded the relevant, validated, and unexpired documents.

---

## ✅ Use Cases

- 📋 A **Requirements page** to:

  - View all CSR requirements
  - View compliance status for each requirement

- 📄 A **Documents page** to:

  - View documents grouped by document type
  - Upload a new document
  - Update a document's status (e.g. "validated", "expired")
  - Delete a document

- 🧠 **Compliance logic**:
  - A document is considered valid if it is "validated" and not expired
  - A requirement is compliant if the company has all required document types with at least one valid document

---

## 🧠 Tech Stack

| Layer      | Tech              |
| ---------- | ----------------- |
| Language   | Node.js + Express |
| ORM        | Sequelize         |
| Database   | PostgreSQL        |
| Validation | Joi               |
| Transpiler | Babel             |
| Dev Tools  | nodemon, dotenv   |

---

## 🗂️ Project Structure

```
src/
├── api/ # Express routers and controllers seperated by domain
├── components/ # Domain components
├── middlewares/ # Custom middlewares
├── models/ # Sequelize models
├── services/ # Business logic layer
├── seeders/ # Sequelize seeders
├── migrations/ # Sequelize migrations
├── utils/ # Utilities (e.g. Joi schema, custom errors, scripts)
├── server.js # Express app setup
├── index.js # Entry point to start the app
```

## 🗃️ Database Schema

The application uses Sequelize with a relational database (PostgreSQL) to manage the data. Below is the database schema for the application, describing the main entities and their relationships.

### Tables

#### **`document_types`**

This table stores the different types of documents (e.g., policies, certificates).

| Column        | Type        | Description                             |
| ------------- | ----------- | --------------------------------------- |
| `id`          | `INTEGER`   | Primary key, auto-increment             |
| `slug`        | `STRING`    | Unique identifier for the document type |
| `name`        | `STRING`    | Name of the document type               |
| `description` | `STRING`    | Description of the document type        |
| `created_at`  | `TIMESTAMP` | Record creation timestamp               |
| `updated_at`  | `TIMESTAMP` | Record last update timestamp            |

#### **`documents`**

This table stores documents uploaded by the company, associated with a document type.

| Column             | Type        | Description                                       |
| ------------------ | ----------- | ------------------------------------------------- |
| `id`               | `INTEGER`   | Primary key, auto-increment                       |
| `document_type_id` | `INTEGER`   | Foreign key referencing `document_types.id`       |
| `company_id`       | `INTEGER`   | ID of the company the document belongs to         |
| `status`           | `STRING`    | Status of the document (e.g., validated, expired) |
| `expires_at`       | `DATE`      | Expiry date of the document                       |
| `created_at`       | `TIMESTAMP` | Record creation timestamp                         |
| `updated_at`       | `TIMESTAMP` | Record last update timestamp                      |

#### **`requirements`**

This table stores CSR requirements that the company needs to fulfill.

| Column        | Type        | Description                             |
| ------------- | ----------- | --------------------------------------- |
| `id`          | `INTEGER`   | Primary key, auto-increment             |
| `slug`        | `STRING`    | Unique identifier for the requirement   |
| `name`        | `STRING`    | Name of the requirement                 |
| `description` | `TEXT`      | Detailed description of the requirement |
| `created_at`  | `TIMESTAMP` | Record creation timestamp               |
| `updated_at`  | `TIMESTAMP` | Record last update timestamp            |

#### **`requirement_document_type`**

This is a junction table that links requirements and document types. A requirement can have multiple document types, and a document type can apply to multiple requirements.

| Column             | Type        | Description                                 |
| ------------------ | ----------- | ------------------------------------------- |
| `requirement_id`   | `INTEGER`   | Foreign key referencing `requirements.id`   |
| `document_type_id` | `INTEGER`   | Foreign key referencing `document_types.id` |
| `created_at`       | `TIMESTAMP` | Record creation timestamp                   |
| `updated_at`       | `TIMESTAMP` | Record last update timestamp                |

#### **`users`**

This table stores user information, typically for the CSR manager or company admin.

| Column       | Type        | Description                             |
| ------------ | ----------- | --------------------------------------- |
| `id`         | `INTEGER`   | Primary key, auto-increment             |
| `username`   | `STRING`    | Username for the user                   |
| `email`      | `STRING`    | Email address of the user               |
| `password`   | `STRING`    | Password (hashed) for the user          |
| `company_id` | `INTEGER`   | ID of the company the user is part of   |
| `role`       | `STRING`    | Role of the user (e.g., admin, manager) |
| `created_at` | `TIMESTAMP` | Record creation timestamp               |
| `updated_at` | `TIMESTAMP` | Record last update timestamp            |

#### **`companies`**

This table stores information about the companies that are managing their CSR compliance.

| Column       | Type        | Description                  |
| ------------ | ----------- | ---------------------------- |
| `id`         | `INTEGER`   | Primary key, auto-increment  |
| `name`       | `STRING`    | Name of the company          |
| `created_at` | `TIMESTAMP` | Record creation timestamp    |
| `updated_at` | `TIMESTAMP` | Record last update timestamp |

---

### Relationships

- **Document Type ↔ Document**  
  A `document_type` can have multiple `documents`, but each `document` belongs to only one `document_type`. This relationship is represented by the foreign key `document_type_id` in the `documents` table.

- **Requirement ↔ Document Type**  
  A `requirement` can have multiple `document_types`. This many-to-many relationship is represented by the `requirement_document_type` junction table, which holds `requirement_id` and `document_type_id`.

- **Company ↔ Document**  
  A `company` can have multiple `documents`, but each `document` belongs to only one `company`. This relationship is represented by the foreign key `company_id` in the `documents` table.

- **User ↔ Company**  
  A `user` is associated with a `company`. This relationship is represented by the foreign key `company_id` in the `users` table.

---

## ⚙️ Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/amel-harrath/csr-project.git
   cd csr-project
   ```
2. Set up the .env file
   ```
   NODE_ENV= development
   DB_USERNAME= myDBUsername
   DB_PASSWORD= myDBPassword
   DB_DATABASE= myDBName
   DB_HOST= myDBHost
   DB_PORT= myDBPort
   PORT= myAppPort
   ```

## 🛠️ Installation & Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Initialize database:
   ```bash
   npm run db-init
   ```
3. Start the application
   ```bash
   npm run dev
   ```
4. Visit the app at http://localhost:3001

---

## 🔐 Auth Placeholder

**Authentication:** Currently, the app does not implement authentication.  
Instead, pass the following header in all your API requests:

```
x-user-id: 1
```

(Use any existing user ID from your seed)

---

## 🚀 API Routes

📌 You can find the full API documentation here:  
👉 [Postman API Docs](https://documenter.getpostman.com/view/44253950/2sB2cd6K3D)

### 📄 Documents

| Method | Endpoint             | Description                        |
| ------ | -------------------- | ---------------------------------- |
| GET    | `/api/documents`     | List all documents grouped by type |
| POST   | `/api/documents`     | Upload a new document              |
| PATCH  | `/api/documents/:id` | Update document status             |
| DELETE | `/api/documents/:id` | Delete a document                  |

### 📋 Requirements

| Method | Endpoint                | Description             |
| ------ | ----------------------- | ----------------------- |
| GET    | `/api/requirements`     | List all requirements   |
| GET    | `/api/requirements/:id` | Get requirement details |
