# Font Group Management System

A seamless single-page application for managing font groups, built with a PHP backend and React frontend.

## 🔍 Overview

The Font Group Management System allows users to:
- Upload TTF font files
- Preview uploaded fonts in real-time
- Create font groups by combining multiple fonts
- Manage font groups (view, edit, delete)

All operations are performed without page reloads, providing a smooth user experience.

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
│   │   └── Controllers/
│   │       ├── FontController.php
│   │       └── GroupController.php
│   ├── config/
│   │   ├── cloudinary.php
│   │   └── config.php
│   ├── migrations/
│   │   └── ... (database migration files)
│   ├── public/
│   │   ├── index.php
│   │   └── routes.php
│   └── vendor/
├── frontend/
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
│   │   └── utils/
│   │       └── main.jsx
│   └── .env.local
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

## 🚀 Installation & Setup

### Prerequisites
- PHP 7.4+
- MySQL
- Node.js & npm
- Composer

### Backend Setup
1. Clone the repository
   ```
   git clone https://github.com/yourusername/Font-group-system.git
   cd Font-group-system/backend
   ```

2. Install dependencies
   ```
   composer install
   ```

3. Configure environment
   ```
   cp .env.example .env
   ```
   Edit the `.env` file with your database and Cloudinary credentials

4. Run database migrations
   ```
   php migrate.php
   ```

5. Start the PHP server
   ```
   php -S localhost:8000 -t public
   ```

### Frontend Setup
1. Navigate to frontend directory
   ```
   cd ../frontend
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Configure environment
   ```
   cp .env.example .env.local
   ```
   Edit the `.env.local` file with your API URL

4. Start the development server
   ```
   npm run dev
   ```

5. Access the application at `http://localhost:5173`

## 💻 Usage

1. **Upload Fonts**
   - Drag and drop TTF files or click to upload
   - View uploaded fonts with preview functionality

2. **Create Font Groups**
   - Select at least two fonts from the uploaded list
   - Add more rows as needed for additional fonts
   - Name your font group and save

3. **Manage Groups**
   - View all created font groups
   - Edit existing groups to add or remove fonts
   - Delete groups that are no longer needed

## 📝 Implementation Details

- **SOLID Principles**: The project follows SOLID design principles for maintainable and scalable code
- **Single Page Application**: All operations are performed without page reloads
- **Validation**: Ensures proper file types (TTF only) and group requirements (minimum 2 fonts)


This project is licensed under the MIT License - see the LICENSE file for details.
