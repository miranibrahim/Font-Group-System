# Font Group Management System

A seamless single-page application for managing font groups, built with a PHP backend and React frontend.

## 🔍 Overview

The Font Group Management System allows users to:
- Upload TTF font files
- Preview uploaded fonts in real-time
- Create font groups by combining multiple fonts
- Manage font groups (view, edit, delete)

All operations are performed without page reloads, providing a smooth user experience.

You can check the live version of the project here: [Font Group Management System](https://fontfolio-group.vercel.app)

## 🛠️ Tech Stack

**Backend:**
- Core PHP (OOP)
- Cloudinary (for font file storage)
- MySQL Database

**Frontend:**
- React.js
- Tailwind CSS

## 🏗️ Project Structure

```
Font-group-system/
├── backend/
│   ├── app/
│   │   ├── Controllers/
│   │   │   ├── FontController.php
│   │   │   └── GroupController.php
│   │   ├── Config/
│   │   │   ├── BaseController.php
│   │   │   ├── Database.php
│   │   │   └── Router.php
│   │   └── Models/
│   │       ├── Font.php
│   │       └── Group.php
│   ├── config/
│   │   ├── cloudinary.php
│   │   └── config.php
│   ├── migrations/
│   │   └── ... (database migration files)
│   ├── public/
│   │   ├── index.php
│   │   └── routes.php
│   ├── vendor/
│   │   └── ... (cloudinary files)
│   ├── .env
│   ├── .gitignore
│   ├── .htaccess
│   ├── composer.json
│   └── composer.lock
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── FontRows.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── GroupRows.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Root.jsx
│   │   │   └── Routes.jsx
│   │   ├── Pages/
│   │   │   ├── CreateGroup.jsx
│   │   │   ├── EditGroup.jsx
│   │   │   ├── GroupList.jsx
│   │   │   ├── Home.jsx
│   │   │   └── UploadFont.jsx
│   │   ├── utils/
│   │   │   └── axiosInstance.js
│   │   ├── main.jsx
│   │   ├── App.css
│   │   └── index.css
│   ├── .env.local
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   └── vite.config.json
└── README.md
```

## ✨ Key Features

### Font Management
- Upload TTF font files with drag-and-drop functionality
- View all uploaded fonts with preview
- Real-time font style display

### Group Management
- Create groups with at least two fonts
- Dynamic row addition for multiple font selection
- Edit existing font groups
- Remove font groups


You can include the SQL commands in your `README.md` under the **Database Setup** section for clarity. Here's the updated section with the SQL commands included:

## 🚀 Installation & Setup

### Prerequisites
- PHP 7.4+
- MySQL
- Node.js & npm
- Composer

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Font-group-system.git
   cd Font-group-system/backend
   ```

2. Install dependencies:
   ```bash
   composer install
   ```

3. Configure environment:
   - Copy the example environment file:
     ```bash
     cp .env.example .env
     ```
   - Edit the `.env` file with your database and Cloudinary credentials.

4. Create the required database tables in MySQL:
   - Log into your MySQL server:
     ```bash
     mysql -u your_username -p
     ```
   - Create the database (if not already created):
     ```sql
     CREATE DATABASE font_group_system;
     USE font_group_system;
     ```

   - Run the following SQL commands to create the tables:

     ```sql
     CREATE TABLE `font_groups` (
       `id` int NOT NULL AUTO_INCREMENT,
       `name` varchar(255) NOT NULL,
       `fonts` text NOT NULL,
       PRIMARY KEY (`id`)
     ) DEFAULT CHARSET=utf8mb4 
     COLLATE=utf8mb4_general_ci;

     CREATE TABLE `fonts` (
       `id` int NOT NULL AUTO_INCREMENT,
       `name` varchar(255) NOT NULL,
       `path` varchar(255) NOT NULL,
       `public_id` varchar(255) DEFAULT NULL,
       PRIMARY KEY (`id`)
     ) DEFAULT CHARSET=utf8mb4 
     COLLATE=utf8mb4_general_ci;
     ```

5. Start the PHP server:
   ```bash
   php -S localhost:8000 -t public
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment:
   - Copy the example environment file:
     ```bash
     cp .env.example .env.local
     ```
   - Edit the `.env.local` file with your API URL:
     ```bash
     VITE_API_BASE_URL=http://localhost:8000/api
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Access the application at `http://localhost:5173`
```

Now, when you set up your backend, make sure to run the provided SQL commands in MySQL to create the necessary `font_groups` and `fonts` tables.